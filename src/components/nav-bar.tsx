import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="flex items-center bg-primary text-background w-full h-[var(--navbar-height)] shadow-md">
      <div className="container flex items-center justify-between">
        <Link href="/">
          <h1 className="text-2xl font-bold">LovePass</h1>
        </Link>
        <div className="flex items-center gap-3">
          <Link href="/create" className="underline__link">
            Create
          </Link>
          <Link href="/love" className="underline__link">
            Love
          </Link>
          <Link href="/about" className="underline__link">
            About
          </Link>
        </div>
      </div>
    </nav>
  );
}
