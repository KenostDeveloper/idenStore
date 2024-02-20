import NextAuth, { NextAuthOptions } from "next-auth"
import YandexProvider from "next-auth/providers/yandex"
import { db } from "./db";
import { PrismaAdapter } from "@next-auth/prisma-adapter"


// export const { auth, signIn, signOut, handlers: { GET, POST } } = NextAuth({
//     adapter: PrismaAdapter(db),
//     providers: [
//         YandexProvider({
//             clientId: process.env.YANDEX_CLIENT_ID!,
//             clientSecret: process.env.YANDEX_CLIENT_SECRET!
//         })
//     ],
//     callbacks: {
//         async session({session, user}){
//             session.user = user
//             return session
//         },
//     }
// });

export const authOptions = {
    adapter: PrismaAdapter(db),
    secret: process.env.NEXTAUTH_SECRET!,
    providers: [
        YandexProvider({
            clientId: process.env.YANDEX_CLIENT_ID!,
            clientSecret: process.env.YANDEX_CLIENT_SECRET!
        })
    ],
    callbacks: {
        async session({session, user}:any){
            session.user = user
            return session
        },   
    }
} satisfies NextAuthOptions