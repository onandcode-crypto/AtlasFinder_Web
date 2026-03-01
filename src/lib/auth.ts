import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { createServiceClient } from "@/lib/supabase";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "admin@atlasfinder.kr" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("이메일과 비밀번호를 입력해주세요.");
                }

                const supabase = createServiceClient();
                const { data: admin, error } = await supabase
                    .from("admins")
                    .select("*")
                    .eq("email", credentials.email)
                    .single();

                if (error || !admin) {
                    throw new Error("관리자 계정을 찾을 수 없습니다.");
                }

                const isValidPassword = await bcrypt.compare(credentials.password, admin.password_hash);

                if (!isValidPassword) {
                    throw new Error("비밀번호가 일치하지 않습니다.");
                }

                return {
                    id: admin.id,
                    email: admin.email,
                    needsPasswordChange: admin.needs_password_change,
                };
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }: any) {
            if (user) {
                token.id = user.id;
                token.needsPasswordChange = user.needsPasswordChange;
            }
            return token;
        },
        async session({ session, token }: any) {
            if (token && session.user) {
                (session.user as any).id = token.id;
                (session.user as any).needsPasswordChange = token.needsPasswordChange;
            }
            return session;
        }
    },
    pages: {
        signIn: "/admin/login",
    },
    session: {
        strategy: "jwt",
        maxAge: 24 * 60 * 60, // 1일
    },
    secret: process.env.NEXTAUTH_SECRET,
};
