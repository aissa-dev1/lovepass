import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="w-full h-[var(--navbar-height)] flex items-center shadow-md bg-primary text-white">
      <div className="container mx-auto flex justify-between items-center px-6">
        <Link href="/">
          <h1 className="text-2xl font-bold sm:text-3xl">LovePass</h1>
        </Link>
        <div className="flex items-center gap-3">
          <Link href="/create">
            <p className="underline hover:no-underline">Create</p>
          </Link>
          <Link href="/love">
            <p className="underline hover:no-underline">Love</p>
          </Link>
          <Link href="/about">
            <p className="underline hover:no-underline">About</p>
          </Link>
        </div>
      </div>
    </nav>
  );
}
