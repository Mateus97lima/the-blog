import { format, formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

export function FormatDateTime(rawDate:string):string{
const date = new Date(rawDate);

return format(date,"dd/MM/yyyy 'as' HH'h'mm",{
locale:ptBR
})
}
export function FormatRelativeDate(rawDate:string):string{
const date = new Date(rawDate);



return formatDistanceToNow(date,{
locale:ptBR,
addSuffix:true
})
}
export function FormatHours(id:number):string{
const date = new Date(id);



return format(date," HH'h'ss",{
locale:ptBR
})
}

