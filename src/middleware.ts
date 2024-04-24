import { NextRequest, NextResponse } from 'next/server';



export function middleware ( request: NextRequest ) {
  const pathname = request.nextUrl.pathname;

  // if ( !authRoutes?.some( path => pathname.includes( path ) ) ) {
  //   const token = request.cookies.get( 'token' );
  //   if ( !token ) {
  //     const url = new URL( '/login', request.url );
  //     return NextResponse.redirect( url );
  //   }
  // }

  return NextResponse.next();
}

export const config = {
  matcher: [ '/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt|monitoring).*)' ]
};
