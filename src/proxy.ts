import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { routing } from "./i18n/routing";
import { decryptSessionToken, SESSION_COOKIE } from "./lib/session";

const intlMiddleware = createMiddleware(routing);

function getPathLocale(pathname: string) {
  const segment = pathname.split("/")[1];
  return (routing.locales as readonly string[]).includes(segment) ? segment : null;
}

export async function proxy(request: NextRequest) {
  const intlResponse = intlMiddleware(request);
  const { pathname } = request.nextUrl;
  const locale = getPathLocale(pathname);

  // Let next-intl handle unprefixed or unknown-locale paths first.
  if (!locale) {
    return intlResponse;
  }

  const isDashboard =
    pathname === `/${locale}/dashboard` ||
    pathname.startsWith(`/${locale}/dashboard/`);
  const isLogin =
    pathname === `/${locale}/login` ||
    pathname.startsWith(`/${locale}/login/`);

  if (!isDashboard && !isLogin) {
    return intlResponse;
  }

  const session = await decryptSessionToken(
    request.cookies.get(SESSION_COOKIE)?.value
  );

  // Optimistic check only. Pages and data functions verify the session again.
  if (isDashboard && !session) {
    return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
  }

  if (isLogin && session) {
    return NextResponse.redirect(new URL(`/${locale}/dashboard`, request.url));
  }

  return intlResponse;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)$).*)",
  ],
};
