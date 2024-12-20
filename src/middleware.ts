import { NextRequest, NextResponse } from 'next/server';

import { authRoutes } from '@/constant/auth_routes';
import { getToken, getUserPermission } from '@/helper/cookies';
import { getLandingPage, mapRouteToPermissionName } from '@/helper/routesPermissions';



export async function middleware(request: NextRequest) {
  const err = request.nextUrl.searchParams.get('err');
  // handle session error related first before processing token
  if (err === 'expired_session') {
    request.cookies.clear();
  }

  const pathname = request.nextUrl.pathname;
  const token = await getToken()
  const userPermissions = await getUserPermission()
  const landingPage = getLandingPage(userPermissions)

  if (!authRoutes?.some(path => pathname.includes(path))) {
    if (!token) {
      const url = new URL('/login', request.url);
      return NextResponse.redirect(url);
    }
    const routePermission = mapRouteToPermissionName(pathname)
    const dontHavePermission = routePermission && !userPermissions.includes(routePermission)

    if ((pathname === '/' || dontHavePermission) && landingPage !== '/') {
      const url = new URL(landingPage, request.url);
      return NextResponse.redirect(url);
    }
  } else {
    if (token) {
      const url = new URL(landingPage, request.url);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt|monitoring).*)']
};
