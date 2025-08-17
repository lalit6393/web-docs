import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Example of default export
export default async function middleware(request: NextRequest) {
  // console.log("token= ",request.cookies.get('token')?.value);
  
  const token = (await cookies()).get('token')?.value

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