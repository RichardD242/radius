import { NextRequest, NextResponse } from "next/server";
import {
  buildSessionFromTokens,
  exchangeCodeForTokens,
  getCookieOptions,
  getSessionCookieName,
  getStateCookieName,
  signSessionCookie,
} from "@/lib/hackclub-auth";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const returnedState = url.searchParams.get("state");
  const error = url.searchParams.get("error");
  const errorDescription = url.searchParams.get("error_description");
  const storedState = request.cookies.get(getStateCookieName())?.value;

  if (error) {
    console.error("[OAuth] Authorization error:", error, errorDescription);
    return NextResponse.redirect(new URL(`/?auth=error&error=${error}`, request.url));
  }

  if (!code || !returnedState || !storedState || returnedState !== storedState) {
    console.error("[OAuth] Invalid callback params:", { code: !!code, returnedState: !!returnedState, storedState: !!storedState, stateMatch: returnedState === storedState });
    return NextResponse.redirect(new URL("/?auth=error&reason=invalid_state", request.url));
  }

  try {
    const tokens = await exchangeCodeForTokens(code);
    const session = await buildSessionFromTokens(tokens);
    const sessionCookie = await signSessionCookie(session);
    const response = NextResponse.redirect(new URL("/dashboard", request.url));

    response.cookies.set(
      getSessionCookieName(),
      sessionCookie,
      getCookieOptions(60 * 60 * 24 * 30)
    );
    response.cookies.set(getStateCookieName(), "", {
      ...getCookieOptions(),
      maxAge: 0,
    });

    console.log("[OAuth] Session created successfully for user:", session.user.id);
    return response;
  } catch (error) {
    console.error("[OAuth] Callback error:", error);
    return NextResponse.redirect(new URL(`/?auth=error&reason=${error instanceof Error ? encodeURIComponent(error.message) : 'unknown'}`, request.url));
  }
}
