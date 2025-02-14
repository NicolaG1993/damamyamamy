import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { middlewareVerifyToken } from "./utils/jwtUtils";

const ADMIN_PATH = "/admin";
const LOGIN_PATH = "/admin/login";
const FORBIDDEN_PATH = "/403"; // Optional forbidden page
const PROTECTED_API_ROUTES = [
    "/api/users/:path*",
    "/api/clients/:path*",
    "/api/items/:path*",
    "/api/categories/:path*",
    "/api/brands/:path*",
    "/api/tags/:path*",
]; // List of API routes restricted to admin users (eg. "/api/admin/:path*", "/api/private-data", "/api/reports/:path*")

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl; // This one is read-only
    const url = req.nextUrl.clone(); // This one is used to be modified
    const authToken = req.cookies.get("damamyamamy_auth_token")?.value;

    // Exclude the login page from middleware processing
    if (url.pathname === LOGIN_PATH) {
        return NextResponse.next();
    }

    // Check if the request is for a protected API route
    const isProtectedApiRoute = PROTECTED_API_ROUTES.some((pattern) => {
        // Convert :path* to a regex wildcard (.*) to match sub-paths
        const regexPattern = pattern.replace(":path*", ".*");
        const regex = new RegExp(`^${regexPattern}$`); // Ensure it matches the entire pathname
        return regex.test(pathname);
    });

    // Handle protected API routes
    if (isProtectedApiRoute) {
        if (!authToken) {
            console.warn(
                "No token found for protected API route. Returning 401."
            );
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        const tokenPayload = await middlewareVerifyToken(authToken);

        if (!tokenPayload || !tokenPayload.isAdmin) {
            console.warn("Unauthorized access to protected API route.");
            return NextResponse.json({ message: "Forbidden" }, { status: 403 });
        }

        return NextResponse.next(); // Allow access if valid admin token
    }

    // If no token exists
    if (!authToken) {
        // If accessing admin routes, redirect to the login page
        if (url.pathname.startsWith(ADMIN_PATH)) {
            url.pathname = LOGIN_PATH;
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
            url.pathname = FORBIDDEN_PATH; // Redirect to forbidden page
            return NextResponse.redirect(url);
        }
    } else {
        // Token is invalid or expired
        console.warn("Token invalid or expired. Redirecting to login...");
        url.pathname = LOGIN_PATH;

        const response = NextResponse.redirect(url);

        response.cookies.set("damamyamamy_auth_token", "", { maxAge: 0 }); // Clear cookie

        return response;
    }
}

export const config = {
    matcher: ["/admin/:path*", "/api/:path*"], // Apply middleware only to admin routes and all api calls
};
