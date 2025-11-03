import { NextResponse } from "next/server";

// Origin must included in .env file
const allowOrigins = ["https://test.com", "http://localhost:3000"];

const corsOrigin = {
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export const middleware = (request) => {
  const origin = request.headers.get("origin");

  const isAllowedOrigin = allowOrigins.includes(origin);

  const isPreflight = request.method === "OPTIONS";

  if (isPreflight) {
    const preflightHeaders = {
      ...(isAllowedOrigin && { "Access-Control-Allow-Origin": origin }),
      ...corsOrigin,
    };

    return NextResponse.json({}, { headers: preflightHeaders });
  }
  const response = NextResponse.next();

  if (isAllowedOrigin) {
    response.headers.set("Access-Control-Allow-Origin", origin);
  }

  Object.entries(corsOrigin).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
  return response;
};

export const config = {
  matcher: "/api/test",
};
