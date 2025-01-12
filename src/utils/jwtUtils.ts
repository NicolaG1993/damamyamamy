import jwt, { JwtPayload } from "jsonwebtoken";
import { jwtVerify } from "jose";

// Define the expected shape of the token payload
interface TokenPayload extends JwtPayload {
    id: number;
    email: string;
    isAdmin: boolean;
}

function signToken(mappedUser: TokenPayload) {
    return jwt.sign(mappedUser, process.env.JWT_SECRET || "", {
        expiresIn: "3h",
    });
}

function verifyToken(token: string) {
    return jwt.verify(token, process.env.JWT_SECRET || "") as TokenPayload;
}

async function middlewareVerifyToken(
    token: string
): Promise<TokenPayload | null> {
    const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET || "");

    try {
        const { payload } = await jwtVerify(token, SECRET_KEY);
        return payload as TokenPayload;
    } catch (error) {
        console.error("Error verifying JWT:", error);
        return null;
    }
}

// Helper function to check if the error is a JWT error
function isJwtError(error: unknown): error is { name: string } {
    return typeof error === "object" && error !== null && "name" in error;
}

export { signToken, verifyToken, middlewareVerifyToken, isJwtError };
