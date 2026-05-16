import { NextRequest, NextResponse } from "next/server";
import { getSessionCookieName, parseSessionCookie } from "@/lib/hackclub-auth";

export function GET(request: NextRequest) {
  try {
    const cookie = request.cookies.get(getSessionCookieName())?.value;
    if (!cookie) return NextResponse.json({ session: null });
    const session = parseSessionCookie(cookie);
    return NextResponse.json({ session });
  } catch (e) {
    return NextResponse.json({ session: null });
  }
}
