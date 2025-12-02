import { NextRequest, NextResponse } from "next/server";


export async function middleware (request:NextRequest){

   const isLoginPage = request.nextUrl.pathname.startsWith('/admin/login') // quero checar se esta na pagina de login//
   const isadminPage = request.nextUrl.pathname.startsWith('/admin')// se e alguma pagina do admin//
   const isGateRequest = request.method === 'GET'

   const shouldBeAuthenticated = isadminPage && !isLoginPage;
   const shouldRiderect = shouldBeAuthenticated && isGateRequest;

   if(!shouldRiderect){
    return NextResponse.next()
   }
   const jwtSession = request.cookies.get(process.env.LOGIN_COOKIE_NAME || 'loginSession')?.value

   const isAuthenticated = !!jwtSession

   if(!isAuthenticated){
    const loginUrl = new URL('/login',request.url)

    return NextResponse.redirect(loginUrl)
   }

    return NextResponse.next.toString();


}
   export const config = {
  matcher: '/admin/path',
}
