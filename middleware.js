import { NextResponse } from "next/server"

export function middleware(request) {
  const requestHeaders = new Headers(request.headers)
//   url 알고 싶을 때 == request.nextUrl
  requestHeaders.set("x-pathname", request.nextUrl.pathname)

  return NextResponse.next({
    request: {
      headers: requestHeaders
    }
  })
}
            