import NextAuth from "next-auth";
import Providers from "next-auth/providers";

export default NextAuth({
  pages: {
    signOut: "/auth/logout",
    error: "/auth/error",
    verifyRequest: "/auth/verify-request",
    newUser: null,
  },
  session: {
    jwt: false,
    maxAge: 8 * 60 * 60,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    encryption: true,
  },
  database: process.env.MONGODB_URI,
  providers: [
    Providers.Facebook({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
    }),
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    session: async (session, user) => {
      session.id = user.id;
      return Promise.resolve(session);
    },
  },
});
