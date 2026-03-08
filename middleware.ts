import { NextRequest, NextResponse } from "next/server";

function unauthorizedResponse() {
  return new NextResponse("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Admin Area"',
    },
  });
}

function misconfiguredResponse() {
  return new NextResponse("Admin authentication is not configured.", {
    status: 500,
  });
}

function isAuthorized(request: NextRequest) {
  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;

  if (!username || !password) {
    return null;
  }

  const authHeader = request.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Basic ")) {
    return false;
  }

  const encoded = authHeader.slice(6);
  const decoded = atob(encoded);
  const separatorIndex = decoded.indexOf(":");

  if (separatorIndex === -1) {
    return false;
  }

  const incomingUsername = decoded.slice(0, separatorIndex);
  const incomingPassword = decoded.slice(separatorIndex + 1);

  return incomingUsername === username && incomingPassword === password;
}

export function middleware(request: NextRequest) {
  const authorized = isAuthorized(request);

  if (authorized === null) {
    return misconfiguredResponse();
  }

  if (!authorized) {
    return unauthorizedResponse();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/pages", "/api/page/:path*"],
};
