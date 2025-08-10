import { jwtVerify, SignJWT } from "jose";

export async function verifyJWT(token: string): Promise<boolean> {
  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.error("JWT secret not found in environment variables");
      return false;
    }

    const encoder = new TextEncoder();
    const secretKey = encoder.encode(secret);

    await jwtVerify(token, secretKey);
    return true;
  } catch (error) {
    console.error("JWT verification failed:", error);
    return false;
  }
}

export async function decodeJWT(token: string): Promise<any | null> {
  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.error("JWT secret not found in environment variables");
      return null;
    }

    const encoder = new TextEncoder();
    const secretKey = encoder.encode(secret);

    const { payload } = await jwtVerify(token, secretKey);
    return payload;
  } catch (error) {
    console.error("JWT decoding failed:", error);
    return null;
  }
}

export async function signJWT(
  payload: Record<string, any>,
  expiresIn: string = "7d"
): Promise<string | null> {
  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.error("JWT secret not found in environment variables");
      return null;
    }

    const encoder = new TextEncoder();
    const secretKey = encoder.encode(secret);

    const jwt = await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime(expiresIn)
      .sign(secretKey);

    return jwt;
  } catch (error) {
    console.error("JWT signing failed:", error);
    return null;
  }
}
