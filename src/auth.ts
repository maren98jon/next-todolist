import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import github from "next-auth/providers/github"
import google from "next-auth/providers/google"
import prisma from "./lib/prisma"
import { signInEmailPassword } from "./auth/actions/auth-actions"



export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        github,
        google,
        Credentials({
            credentials: {
                email: { label: "Correo electronico", type: "email", placeholder: "user@google.eus" },
                password: { label: "Contraseña", type: "password", placeholder: "********" },
            },
            async authorize(credentials) {
                console.log(credentials);

                const user = await signInEmailPassword(credentials!.email as string, credentials!.password as string);
                if (user) {
                    return user;
                }

                return null;
            },
        }),
    ],

    session: {
        strategy: 'jwt'
    },

    callbacks: {

        async signIn({ user, account, profile, email, credentials }) {
            return true;
        },

        async jwt({ token, user, account, profile }) {

            const dbUser = await prisma.user.findUnique({ where: { email: token.email ?? 'no-email' } });
            if (dbUser?.isActive === false) {
                throw Error('El usuario esta desactivado');
            }


            token.roles = dbUser?.roles ?? ['no-roles'];
            token.id = dbUser?.id ?? 'no-uuid';

            return token;
        },

        async session({ session, token }) {
            // Asegúrate de que el token tiene los campos necesarios
            if (session?.user) {
                session.user.roles = token.roles as string[]; // Casting para asegurar el tipo
                session.user.id = token.id as string; // Casting para asegurar el tipo
            }

            return session;
        },

    }
})