import { NextResponse, NextRequest } from "next/server";
import Token from "../lib/token";

export default function middleware(request = NextRequest) {
  console.log(Token());
  const url = request.nextUrl.clone();

  if (url.pathname == "/software") {
    if (Token() == null || Token() == undefined) {
      return NextResponse.rewrite(new URL("/login", request.url));
    }

    return NextResponse.next();
  } 
  
  else if (url.pathname == "/software/employees") {
    if (Token() == null || Token() == undefined) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
  }
  else if (url.pathname == "/software/projects") {
    if (Token() == null || Token() == undefined) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
  }
  else if (url.pathname == "/software/tickets") {
    if (Token() == null || Token() == undefined) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
  }
  
  else if (url.pathname == "/login") {
    if (Token() != null || Token() != undefined) {
      return NextResponse.redirect(new URL("/software", request.url));
    }

    return NextResponse.next();
  } else if (url.pathname == "/") {
    if (Token() != null || Token() != undefined) {
      return NextResponse.redirect(new URL("/software", request.url));
    }

    return NextResponse.next();
  } else if (url.pathname == "/signup") {
    if (Token() != null || Token() != undefined) {
      return NextResponse.redirect(new URL("/software", request.url));
    }

    return NextResponse.next();
  }
}
