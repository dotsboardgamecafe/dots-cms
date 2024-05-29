import { NextRequest, NextResponse } from 'next/server';

import { authRoutes } from '@/constant/auth_routes';



export function middleware ( request: NextRequest ) {
  const err = request.nextUrl.searchParams.get( 'err' );
  // handle session error related first before processing token
  if ( err === 'expired_session' ) {
    request.cookies.clear();
  }

  const pathname = request.nextUrl.pathname;
  const token = request.cookies.get( 'token' );

  if ( !authRoutes?.some( path => pathname.includes( path ) ) ) {
    if ( !token ) {
      const url = new URL( '/login', request.url );
      return NextResponse.redirect( url );
    }
  } else {
    if ( token ) {
      const url = new URL( '/room', request.url );
      return NextResponse.redirect( url );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [ '/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt|monitoring).*)' ]
};
