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
