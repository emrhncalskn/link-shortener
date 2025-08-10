import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { protectedRoutes, publicRoutes } from "./constants/config.constant";
import { verifyJWT } from "./utils/jwt";

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  const response = NextResponse.next();
  const token = req.cookies.get("token")?.value;

  let isTokenValid = false;
  if (token) {
    isTokenValid = await verifyJWT(token);
  }

  if (!token || !isTokenValid) {
    response.cookies.delete("token");
    response.cookies.delete("user");
  }

  const user = req.cookies.get("user")?.value;

  if (token && isTokenValid && !user) {
    try {
      const userResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/user`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const userData = userResponse.data.data;

      response.cookies.set("user", JSON.stringify(userData), {
        httpOnly: false,
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });
    } catch (error) {
      response.cookies.delete("token");
      response.cookies.delete("user");
    }
  }

  if (isProtectedRoute && !isTokenValid) {
    return NextResponse.redirect(new URL("/giris", req.nextUrl));
  }

  if (isPublicRoute && isTokenValid) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
