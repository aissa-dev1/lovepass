import Link from "next/link";

export default function Footer() {
  return (
    <footer className="h-[var(--footer-height)] flex flex-col items-center gap-4 pt-4 bg-primary text-white mt-20">
      <p className="text-center lg:text-lg">
        &copy;{new Date().getFullYear()}{" "}
        <Link href="/">
          <span className="font-bold">LovePass</span>
        </Link>{" "}
        by{" "}
        <a href="https://www.instagram.com/aissa.creates" target="_blank">
          <span className="font-bold">@aissa.creates</span>
        </a>{" "}
        All rights reserved.
      </p>
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
    </footer>
  );
}
