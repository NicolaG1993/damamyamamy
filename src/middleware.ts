import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { middlewareVerifyToken } from "./utils/jwtUtils";

export async function middleware(req: NextRequest) {
    const authToken = req.cookies.get("damamyamamy_auth_token")?.value;

    const url = req.nextUrl.clone();
    const adminPath = "/admin";
    const loginPath = "/admin/login";
    const forbiddenPath = "/403"; // Optional forbidden page

    // Exclude the login page from middleware processing
    if (url.pathname === loginPath) {
        return NextResponse.next();
    }

    // If no token exists, redirect to the login page
    if (!authToken) {
        if (url.pathname.startsWith(adminPath)) {
            url.pathname = loginPath;
            return NextResponse.redirect(url);
        }
        return NextResponse.next(); // Allow non-admin routes to proceed
    }

    // Verify the token using middlewareVerifyToken
    const tokenPayload = await middlewareVerifyToken(authToken);

    if (tokenPayload) {
        if (tokenPayload.isAdmin) {
            // Token is valid, and user is admin; allow access
            return NextResponse.next();
        } else {
            // Token is valid, but user is not an admin
            console.warn("Non-admin user attempted to access admin route.");
            url.pathname = forbiddenPath; // Redirect to forbidden page
            return NextResponse.redirect(url);
        }
    } else {
        // Token is invalid or expired
        console.warn("Token invalid or expired. Redirecting to login...");
        url.pathname = loginPath;
        return NextResponse.redirect(url);
    }
}

export const config = {
    matcher: ["/admin/:path*"], // Apply middleware only to admin routes
};
