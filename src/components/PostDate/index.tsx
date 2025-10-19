import { FormatDateTime, FormatRelativeDate } from "../../utils/Format-datetime";

type PostDateProps = {
    dateTime:string,
}

export function PostDate ({dateTime}: PostDateProps){
    return(
          <time
                title={FormatRelativeDate(dateTime)}
                className='text-slate-600  text-sm/tight'
                dateTime={dateTime}
              >
                {FormatDateTime(dateTime)}
              </time>
    )
}
