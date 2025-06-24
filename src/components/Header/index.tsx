import clsx from "clsx"
import Link from "next/link"

export function Header(){
    return(
        //aprendendo resposividade: sm,md,lg,xl//
        <h1 className={clsx('text-4xl/normal font-extrabold py-8',
        'sm:text-5xl/normal sm:py-10',
        'md:text-6xl/normal py-12',
        'lg:text-7xl/normal py-15')}>
            <Link href="/">The Blog</Link>
        </h1>
    )
}
