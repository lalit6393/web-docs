import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Example of default export
export default async function middleware(request: NextRequest) {
  const token = request.cookies.get('token') || '';

  if(!token) console.log("token not found");
  
  if (!token && request.nextUrl.pathname.startsWith('/documents'))
    return NextResponse.redirect(new URL('/login', request.url));

  if (token && (request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/signup')) {
    return NextResponse.redirect(new URL('/documents', request.url));
  }
  // Middleware logic
  return NextResponse.next();
}

export const config = {
  matcher: ['/documents/:path*', '/login', '/signup'],
}