import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  // Pass the request to the Supabase middleware to update session
  // and handle route protection
  const response = await updateSession(request);

  // Also keep the existing custom header
  response.headers.set("x-next-url", request.nextUrl.pathname);

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
