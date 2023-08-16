# custom-nextauth-backend

Quick demo of how to use a custom backend with NextAuth.js while implementing a two-stage login approach.

## Background  

Out of the box, NextAuth is tighly coupled to its database providers.  Sequences such as the Passwordless login use data structures which are both opinionated and limited.  This project demonstrates how to use a custom backend API to implement a two-stage login process.  

The first stage is meant to _request_ a login and have a code sent to the user's email address or mobile number.  They are then redirected to a form which uses the `authorize` function within the Credentials Provider to send the same address to the back end but, this time, with a one-time-use confirmation code.

<img align="right" width="400" src="https://github.com/FredLackey/custom-nextauth-backend/blob/main/assets/images/project.png?raw=true" />

## Technologies

### Back-End (Private API)

* [Fastify](https://fastify.dev/)
* [MongoDB Atlas](https://www.mongodb.com/atlas)
* [NodeJS](https://nodejs.org/)
* [Prisma.IO](https://www.prisma.io/)

### Front-End (Public App & API)

* [NextJS v13](https://nextjs.org/)
* [NextAuth](https://next-auth.js.org/)
* [React / ReactJS](https://react.dev/)
* [Tailwind CSS](https://tailwindcss.com/)

## Contact Info  

**Fred Lackey**  
[fred.lackey@gmail.com](mailto:fred.lackey@gmail.com)  
[http://fredlackey.com](http://fredlackey.com)  
