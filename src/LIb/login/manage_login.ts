import bcrypt from "bcryptjs";
import { cookies } from 'next/headers';
import { jwtVerify, SignJWT } from 'jose'
import { redirect } from "next/navigation";


const jwtSecretKey=process.env.JWT_SECRET_KEY
const jwtEncodedKey = new TextEncoder().encode(jwtSecretKey)

const logiExpeSeconds = Number(process.env.LOGIN_EXPIRATION_SECONDS) || 86400;
const loginExpeStr = process.env.LOGIN_EXPIRATION_STRING || '1d';
const loginCookieName = process.env.LOGIN_COOKIE_NAME || 'loginSession'

type jwtPayload = {
    username:string,
    expiresArt:Date
}

export async function hashPassword(password:string){
const hash = await bcrypt.hash(password,10)
const base64 = Buffer.from(hash).toString('base64')
return base64

}

export async function verifyPassword(password:string , base64:string){
    const hash = Buffer.from(base64).toString('utf-8')
const isvalid = await bcrypt.compare(password,hash)
return isvalid
}

export async function createLoginSession(username:string) {
    const expiresArt = new Date(Date.now() + logiExpeSeconds * 1000);
    const loginSession = await signJwt({ username,expiresArt});
    const cookieStore = await cookies()

    cookieStore.set(loginCookieName,loginSession, {
        httpOnly:true,
        secure:true,
        sameSite:'strict',// retruito
        expires:expiresArt
    });

}

// Essa funçao pega o logincooki quando o prazo de expira chega ele deleta o loginCookie//

export async function deleteLoginSession() {

    const cookieStore = await cookies()
    cookieStore.set(loginCookieName, '' , {expires: new Date(0)}) // caso o delete não funcione eu ja deixo ela vazia //
    cookieStore.delete(loginCookieName)
    }

export async function getLoginSession (){
    const cookieStore = await cookies()

    const jwt = cookieStore.get(loginCookieName)?.value;

    if(!jwt) return false

    return verifyJwt(jwt)
}

export async function verifyLoginSession() {
const jwtPayload = await getLoginSession()

if (!jwtPayload) return false;

return jwtPayload.username === process.env.LOGIN_USER
}

export async function requireLoginSessionOrRedirect() {
const isAuthenticated = await getLoginSession()

if(!isAuthenticated){
    redirect('/admin/login')
}
}


export async function signJwt(jwtPayload:jwtPayload) {
    return new SignJWT(jwtPayload).setProtectedHeader({

            alg:'HS256' , typ:'JWT',

 }).setIssuedAt().setExpirationTime(loginExpeStr).sign(jwtEncodedKey);


}
// essa function vai verifica se o login dele não expirou
export async function verifyJwt (jwt:string | undefined = ''){
    try{
        const {payload} = await jwtVerify(jwt, jwtEncodedKey,{
            algorithms:['HS256'],
        });
        return payload
    }catch{
        console.log('invalido')
        return false;
    }

}
