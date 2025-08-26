import slugify from "slugify"
import { makeRandomString } from "./make-random-string"


export const markeSlugText = (text:string) => {
    const slug = slugify(text,{
        lower:true,
        strict:true,
        trim:true
    })
return `${slug}-${makeRandomString()} `
}



