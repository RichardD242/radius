import { NextResponse } from "next/server";
import {
  buildAuthorizeUrl,
  createOAuthState,
  getCookieOptions,
  getStateCookieName,
} from "@/lib/hackclub-auth";

export function GET() {
  console.log("[OAuth] Initiating login flow...");
  const state = createOAuthState();
  const authorizeUrl = buildAuthorizeUrl(state);
  console.log("[OAuth] Redirecting to:", authorizeUrl.split("?")[0]);

  const response = NextResponse.redirect(authorizeUrl);
  response.cookies.set(getStateCookieName(), state, getCookieOptions(10 * 60));

  return response;
}
