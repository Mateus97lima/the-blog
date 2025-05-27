import clsx from "clsx";

export default function HomePage() {
  return (
    <div>
      <h1 className={clsx('text-xl text-blue-500 hover:text-pink-400 font-bold hover:bg-blue-600 transition duration-100')}>
        hello word
      </h1>
    </div>
  );
}
