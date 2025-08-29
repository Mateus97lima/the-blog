import bcrypt from "bcryptjs";

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



