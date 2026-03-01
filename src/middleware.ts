import { auth } from "@/lib/auth";

export default auth((req) => {
    // req.auth holds the session data
    // Auth.js v5 handles redirect to pages.signIn automatically when returning Response.redirect,
    // or through the authorized callback in auth.ts
});

export const config = {
    matcher: ["/admin/dashboard/:path*"],
};
