const _                = require('restutils-helpers-js');
const Fastify          = require('fastify');
const { PrismaClient } = require('@prisma/client');
const pkg              = require('./package.json');

const prisma = new PrismaClient();

const fastify = Fastify({
  logger: {
    transport: {
      target: 'pino-pretty',
    }
  }
});
fastify.register(require('fastify-no-icon'))
fastify.register(require('@fastify/sensible'))

fastify.get('/', async (request, reply) => {
  return { 
    name   : pkg.name,
    version: pkg.version,
    date   : new Date().toISOString(),
    vars : {
      NODE_ENV: process.env.NODE_ENV,
      NODE_PORT: process.env.NODE_PORT,
      DB_URL: process.env.DB_URL
    }
  };
});

fastify.get('/api/users', async (request, reply) => {
  const users = await prisma.user.findMany();
  return users;
});
fastify.post('/api/users', async (request, reply) => {
  let user = await prisma.user.findFirst({
    where: {
      addresses: {
        has: request.body.address.trim().toLowerCase()
      }
    }
  });
  if (user) {
    return {...user, isNew: false};
  }
  user = await prisma.user.create({
    data: {
      addresses: [request.body.address.trim().toLowerCase()]
    }
  });
  return {...user, isNew: true};
});

fastify.post('/login/request', async (request, reply) => {

  const now = new Date();
  const fiveMinutesFromNow = new Date(now.getTime() + 5 * 60000);

  let loginRequest = await prisma.loginRequest.findFirst({
    where: {
      text: request.body.address.trim().toLowerCase(),
      ended: null
    }
  });

  if (loginRequest && loginRequest.expiry <= now) {
    await prisma.loginRequest.update({
      where: {
        id: loginRequest.id
      },
      data: {
        ended: loginRequest.expiry
      }
    });
    loginRequest = null;
  }

  if (!loginRequest) { 
    loginRequest = await prisma.loginRequest.create({
      data: {
        text: request.body.address.trim().toLowerCase(),
        code: _.newCode(),
        ended: null,
        expiry: fiveMinutesFromNow
      }
    });
  }

  return {
    id    : loginRequest.id,
    expiry: loginRequest.expiry
  };
});
fastify.post('/login/confirm', async (request, reply) => {

  const now = new Date();
  const fiveMinutesFromNow = new Date(now.getTime() + 5 * 60000);

  let loginRequest = await prisma.loginRequest.findFirst({
    where: {
      text: request.body.address.trim().toLowerCase(),
      ended: null
    }
  });
  if (!loginRequest) {
    return reply.notFound();
  }

  if (loginRequest.expiry <= now) {
    await prisma.loginRequest.update({
      where: {
        id: loginRequest.id
      },
      data: {
        ended: loginRequest.expiry
      }
    });
    return reply.badRequest('Login request expired');
  }

  if (loginRequest.code !== request.body.code.trim().toUpperCase()) {
    return reply.badRequest('Invalid code');
  }

  await prisma.loginRequest.update({
    where: {
      id: loginRequest.id
    },
    data: {
      ended: now
    }
  });

  let user = await prisma.user.findFirst({
    where: {
      addresses: {
        has: request.body.address.trim().toLowerCase()
      }
    }
  });
  if (!user) {
    user = await prisma.user.create({
      data: {
        addresses: [request.body.address.trim().toLowerCase()]
      }
    });
  }

  return {
    user: {
      id: user.id
    }
  };

});

const main = async () => {
  try {
    await fastify.listen({
      port: process.env.NODE_PORT || 3000
    });
  } catch (ex) {
    fastify.log.error(ex);
    process.exit(1);
  }
};

main();