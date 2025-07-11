// checkIsAuthMiddleware.ts
import { GetServerSidePropsContext } from "next";
import { decodeToken } from "./app/utils/authDecode";

export const checkAuth = async (context: GetServerSidePropsContext) => {
  // Get token from cookies
  const { req } = context;
  const cookies =
    req.headers.cookie?.split(";").reduce((acc, cookie) => {
      const [key, value] = cookie.trim().split("=");
      acc[key] = value;
      return acc;
    }, {} as Record<string, string>) || {};

  // Look for mbnakomToken instead of token
  const token =
    cookies.mbnakomToken || req.headers.authorization?.split(" ")[1];

  console.log("Token found:", token); // Better logging
  if (!token) {
    return { authenticated: false, user: null };
  }

  try {
    const decoded = decodeToken(token);
    if (decoded && decoded.exp * 1000 > Date.now()) {
      return { authenticated: true, user: decoded };
    }
  } catch (error) {
    console.error("Auth token verification failed:", error);
  }

  return { authenticated: false, user: null };
};
