import Link from "next/link";

export function Footer() {
  return (
    <footer className=" text-center pb-16 hover:text-blue-500 transition cursor-pointer">

        <p>
            <span>Copyright &copy; {new Date().getFullYear()} - </span>
            <Link href='/'>The Blog</Link>
        </p>

    </footer>
  );
}
