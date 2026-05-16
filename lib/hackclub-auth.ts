const HACKCLUB_AUTHORIZE_URL = "https://auth.hackclub.com/oauth/authorize";
const HACKCLUB_TOKEN_URL = "https://auth.hackclub.com/oauth/token";
const HACKCLUB_API_URL = "https://auth.hackclub.com/api/v1/me";

function getClientId() {
  const id = process.env.HACKCLUB_CLIENT_ID;
  if (!id) throw new Error("Missing HACKCLUB_CLIENT_ID");
  return id;
}

function getClientSecret() {
  const secret = process.env.HACKCLUB_CLIENT_SECRET;
  if (!secret) throw new Error("Missing HACKCLUB_CLIENT_SECRET");
  return secret;
}

function getRedirectUri() {
  const uri = process.env.HACKCLUB_REDIRECT_URI;
  if (!uri) throw new Error("Missing HACKCLUB_REDIRECT_URI");
  return uri;
}

export function createOAuthState(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export function buildAuthorizeUrl(state: string): string {
  const params = new URLSearchParams({
    client_id: getClientId(),
    redirect_uri: getRedirectUri(),
    response_type: "code",
    scope: "openid profile slack_id",
    state,
  });
  return `${HACKCLUB_AUTHORIZE_URL}?${params.toString()}`;
}

export async function exchangeCodeForTokens(code: string) {
  const body = {
    redirect_uri: getRedirectUri(),
    code,
    grant_type: "authorization_code",
  };
  const credentials = Buffer.from(`${getClientId()}:${getClientSecret()}`).toString("base64");
  console.log("[OAuth] Exchanging code for tokens...");
  console.log("[OAuth] Redirect URI:", getRedirectUri());
  console.log("[OAuth] Client ID:", getClientId());
  const response = await fetch(HACKCLUB_TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${credentials}`,
    },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    const errorText = await response.text();
    console.error("[OAuth] Token exchange failed:", response.status, errorText);
    throw new Error(`Token exchange failed: ${response.statusText} - ${errorText}`);
  }
  const tokens = await response.json();
  console.log("[OAuth] Successfully obtained tokens");
  return tokens;
}

export async function buildSessionFromTokens(tokens: any) {
  if (!tokens.id_token) throw new Error("No id_token in response");
  const parts = tokens.id_token.split(".");
  if (parts.length !== 3) throw new Error("Invalid id_token format");
  try {
    const decoded = JSON.parse(Buffer.from(parts[1], "base64").toString());
    const userInfoResponse = await fetch(HACKCLUB_API_URL, {
      headers: {
        Authorization: `Bearer ${tokens.access_token}`,
      },
    });
    let userInfo = null;
    if (userInfoResponse.ok) {
      const data = await userInfoResponse.json();
      userInfo = data.identity;
      console.log("[OAuth] Successfully fetched user info from /api/v1/me");
    } else {
      console.warn("[OAuth] Failed to fetch user info:", userInfoResponse.status);
    }
    return {
      user: {
        id: decoded.sub,
        email: decoded.email,
        name: decoded.name,
        given_name: decoded.given_name,
        family_name: decoded.family_name,
        slack_id: decoded.slack_id,
        ...userInfo,
      },
      tokens: {
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
        expires_in: tokens.expires_in,
        id_token: tokens.id_token,
      },
    };
  } catch (error) {
    console.error("[OAuth] Failed to build session from tokens:", error);
    throw error;
  }
}

export async function signSessionCookie(session: any): Promise<string> {
  if (!session?.user?.id) throw new Error("Invalid session: missing user.id");
  return Buffer.from(JSON.stringify(session)).toString("base64");
}

export function getSessionCookieName(): string {
  return "hackclub_session";
}

export function getStateCookieName(): string {
  return "oauth_state";
}

export function getCookieOptions(maxAge?: number) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge,
  };
}

export function parseSessionCookie(cookie: string): any {
  try {
    return JSON.parse(Buffer.from(cookie, "base64").toString());
  } catch {
    return null;
  }
}
