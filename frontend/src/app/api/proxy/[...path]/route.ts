// import { NextRequest, NextResponse } from "next/server";

// function backendBaseUrl(): string {
//   const configured = process.env.BACKEND_INTERNAL_URL ?? process.env.BACKEND_API_URL;

//   if (configured) {
//     return configured;
//   }

//   const fallback = process.env.VERCEL
//     ? "https://smart-rate-limiter-1.onrender.com"
//     : "http://localhost:8081";

//   console.warn("[proxy] BACKEND_INTERNAL_URL is missing; using fallback backend URL", {
//     fallback,
//     isVercel: Boolean(process.env.VERCEL),
//   });

//   return fallback;
// }

// async function proxyRequest(request: NextRequest, path: string[]) {
//   const url = new URL(request.url);
//   const target = new URL(`${backendBaseUrl()}/${path.join("/")}`);
//   target.search = url.search;

//   const headers = new Headers(request.headers);
//   headers.delete("host");
//   headers.delete("connection");

//   const authorization = request.headers.get("authorization");
//   if (authorization) {
//     headers.set("Authorization", authorization);
//   }

//   try {
//     console.debug("[proxy] forwarding request", {
//       target: target.toString(),
//       method: request.method,
//       path,
//       hasAuthorizationHeader: Boolean(authorization),
//     });

//     const response = await fetch(target, {
//       method: request.method,
//       headers,
//       body: request.method === "GET" || request.method === "HEAD" ? undefined : await request.text(),
//       cache: "no-store",
//     });

//     console.debug("[proxy] upstream response", {
//       target: target.toString(),
//       status: response.status,
//       statusText: response.statusText,
//     });

//     const responseHeaders = new Headers(response.headers);
//     responseHeaders.delete("content-encoding");

//     return new NextResponse(response.body, {
//       status: response.status,
//       headers: responseHeaders,
//     });
//   } catch (error) {
//     console.error("[proxy] upstream request failed", {
//       target: target.toString(),
//       method: request.method,
//       path,
//       error,
//     });
//     return NextResponse.json(
//       {
//         message: "Proxy request failed",
//         error: error instanceof Error ? error.message : String(error),
//       },
//       { status: 502 },
//     );
//   }
// }

// export async function GET(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
//   const params = await context.params;
//   return proxyRequest(request, params.path);
// }

// export async function POST(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
//   const params = await context.params;
//   return proxyRequest(request, params.path);
// }

// export async function PUT(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
//   const params = await context.params;
//   return proxyRequest(request, params.path);
// }

// export async function PATCH(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
//   const params = await context.params;
//   return proxyRequest(request, params.path);
// }

// export async function DELETE(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
//   const params = await context.params;
//   return proxyRequest(request, params.path);
// }



import { NextRequest, NextResponse } from "next/server";

function backendBaseUrl(): string {
  const configured = process.env.BACKEND_INTERNAL_URL ?? process.env.BACKEND_API_URL;

  if (configured) {
    return configured;
  }

  const fallback = process.env.VERCEL
    ? "https://smart-rate-limiter-1.onrender.com"
    : "http://localhost:8081";

  console.warn("[proxy] BACKEND_INTERNAL_URL is missing; using fallback backend URL", {
    fallback,
    isVercel: Boolean(process.env.VERCEL),
  });

  return fallback;
}

async function proxyRequest(request: NextRequest, path: string[]) {
  const url = new URL(request.url);
  const target = new URL(`${backendBaseUrl()}/${path.join("/")}`);
  target.search = url.search;

  const headers = new Headers(request.headers);
  headers.delete("host");
  headers.delete("connection");

  const authorization = request.headers.get("authorization");
  if (authorization) {
    headers.set("Authorization", authorization);
  }

  try {
    console.debug("[proxy] forwarding request", {
      target: target.toString(),
      method: request.method,
      path,
      hasAuthorizationHeader: Boolean(authorization),
    });

    const response = await fetch(target, {
      method: request.method,
      headers,
      body: request.method === "GET" || request.method === "HEAD" ? undefined : await request.text(),
      cache: "no-store",
    });

    console.debug("[proxy] upstream response", {
      target: target.toString(),
      status: response.status,
      statusText: response.statusText,
    });

    // Read full body into memory before forwarding so nothing gets truncated
    // by stream/encoding mismatches when upstream is gzipped or chunked.
    const responseBody = await response.arrayBuffer();

    const responseHeaders = new Headers(response.headers);
    responseHeaders.delete("content-encoding");
    responseHeaders.delete("content-length"); // let Next.js set the correct length

    return new NextResponse(responseBody, {
      status: response.status,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error("[proxy] upstream request failed", {
      target: target.toString(),
      method: request.method,
      path,
      error,
    });
    return NextResponse.json(
      {
        message: "Proxy request failed",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 502 },
    );
  }
}

export async function GET(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  const params = await context.params;
  return proxyRequest(request, params.path);
}

export async function POST(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  const params = await context.params;
  return proxyRequest(request, params.path);
}

export async function PUT(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  const params = await context.params;
  return proxyRequest(request, params.path);
}

export async function PATCH(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  const params = await context.params;
  return proxyRequest(request, params.path);
}

export async function DELETE(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  const params = await context.params;
  return proxyRequest(request, params.path);
}