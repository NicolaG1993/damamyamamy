import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { middlewareVerifyToken } from "./utils/jwtUtils";

export async function middleware(req: NextRequest) {
    const url = req.nextUrl;
    const token = req.cookies.get("damamyamamy_auth_token")?.value;

    try {
        if (token) {
            // Decode the token if present
            const decodedToken = await middlewareVerifyToken(token);

            // Admin users should be redirected away from `/admin/login` to `/admin`
            if (decodedToken?.isAdmin && url.pathname === "/admin/login") {
                return NextResponse.redirect(new URL("/admin", req.url));
            }

            // Restrict non-admin users from accessing other `/admin` pages
            if (
                url.pathname.startsWith("/admin") &&
                !decodedToken?.isAdmin &&
                url.pathname !== "/admin/login"
            ) {
                return NextResponse.redirect(new URL("/", req.url));
            }
        } else {
            // Redirect unauthenticated users from `/admin` pages to `/admin/login`
            if (
                url.pathname.startsWith("/admin") &&
                url.pathname !== "/admin/login"
            ) {
                return NextResponse.redirect(new URL("/admin/login", req.url));
            }
        }
    } catch (error) {
        console.error("Token error:", error);

        // Redirect invalid token users to `/admin/login`
        if (url.pathname.startsWith("/admin")) {
            return NextResponse.redirect(new URL("/admin/login", req.url));
        }
    }
    return NextResponse.next();
}

// Define the matcher for the middleware
export const config = {
    matcher: ["/admin/:path*"], // Apply the middleware to all `/admin` routes
};
