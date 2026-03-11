import { NextRequest, NextResponse } from "next/server";

function backendBaseUrl(): string {
  return process.env.BACKEND_INTERNAL_URL ?? process.env.BACKEND_API_URL ?? "http://localhost:8081";
}

async function proxyRequest(request: NextRequest, path: string[]) {
  const url = new URL(request.url);
  const target = new URL(`${backendBaseUrl()}/${path.join("/")}`);
  target.search = url.search;

  const headers = new Headers(request.headers);
  headers.delete("host");
  headers.delete("connection");

  const response = await fetch(target, {
    method: request.method,
    headers,
    body: request.method === "GET" || request.method === "HEAD" ? undefined : await request.text(),
    cache: "no-store",
  });

  const responseHeaders = new Headers(response.headers);
  responseHeaders.delete("content-encoding");

  return new NextResponse(response.body, {
    status: response.status,
    headers: responseHeaders,
  });
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
