import { NextResponse } from "next/server";

export const middleware = (request) => {
  if (request.url.includes("test"))
    return NextResponse.redirect(new URL("/", request.url));

  return NextResponse.next();
};
