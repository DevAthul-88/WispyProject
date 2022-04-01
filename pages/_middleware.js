import {NextResponse , NextRequest} from 'next/server';
import Token from '../lib/token'

export default function middleware(req = NextRequest){

    const url = req.nextUrl.clone()

    if(url.pathname == '/software'){
        if(Token == null){
            return NextResponse.redirect("/login")
        }
        
        if(Token !== null){
            return NextResponse.next();
        }
    }
  

}