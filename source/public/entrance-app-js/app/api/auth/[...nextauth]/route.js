import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import _ from 'restutils-helpers';

const { PRIVATE_API_URL } = process.env;

const toUrl = url => {
  const base = PRIVATE_API_URL.endsWith('/')
    ? PRIVATE_API_URL.substring(0, PRIVATE_API_URL.length - 1)
    : PRIVATE_API_URL;
  return url.startsWith('/') ? `${base}${url}` : `${base}/${url}`;
}


export const authOptions = {
  pages: {
    signIn: "/login/request",
  },
  providers: [
    CredentialsProvider({
      name: "LoginCode",
      credentials: {
        address: { label: "Address", type: "text", placeholder: "Email Address or Mobile Number" },
        code: { label: "Code", type: "text", placeholder: "ex: ABC123" },
      },
      authorize: async (creds) => {

        console.log('in authorizer', creds);
        
        if (!creds.address || !creds.code) {
          return null;
        }

        const result = await _.doPost(toUrl('login/confirm'), creds);
        console.log('result', result);

        if (result.user?.id) {
          console.log('sending user to front end')
          return { 
            ...result,
            address: creds.address 
          };
        }

        return null;
      }
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }