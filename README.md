# Middleware

Middleware allow to run some login before a request complete.

---

### Send a response from middleware

```javascript
import { NextResponse } from "next/server";

export const middleware = (request) => {
  // Use: NextResponse  object from nextjs
  return NextResponse.json({
    message: "Hello world",
  });
};
```

---

### Allow to access next data

```javascript
import { NextResponse } from "next/server";

export const middleware = (request) => {
  return NextResponse.next();
};
```

---

### Redirect to another route

Redirect from middleware is different from "redirect" function. We usually use following way to redirect user.

```javascript
const { NextResponse } = require("next/server");

export const middleware = (request) => {
  return NextResponse.redirect(new URL("/", request.url));
};

// This code introduced but, when I try to access "/" route nextjs try to get this path and its occur a infinity loop.
```

Corrected code:

```javascript
import { NextResponse } from "next/server";

export const middleware = (request) => {
  // Add condition

  if (request.url.includes("test"))
    return NextResponse.redirect(new URL("/", request.url));

  return NextResponse.next();
};

// By the way, We can use config instead the condition

export const config = {
  matcher: ["/test", "/about", "/dashboard/:path*"],
};
```

### Setting cookies

```javascript
import { NextResponse } from "next/server";

export const middleware = (request) => {
  //  Get cookie from request
  const cookie = request.cookies.get("nextjs"); // .getAll(), .delete, .has, .clear

  console.log(cookie); // undefined

  const response = NextResponse.next();

  // Setting cookie
  response.cookies.set("key", "value");
  response.cookies.set({
    name: "test",
    value: "1",
    path: "/",
  });

  console.log(response.cookies.get("test")); // { name: 'test', value: '1' }

  return response;
};
```

### Setting Headers

```javascript
import { NextResponse } from "next/server";

export const middleware = (request) => {
  // Getting headers object/map
  const requestHeader = new Headers(request.headers);

  // Setting header
  requestHeader.set("x-test", "test header");

  // We can also set request headers in NextResponse.rewrite
  const response = NextResponse.next({
    request: {
      // New request headers
      headers: requestHeader,
    },
  });

  response.headers.set("x-test1", "hello header");
  return response;
};
```

## CORS

```javascript
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
```
