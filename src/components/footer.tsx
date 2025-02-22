import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex flex-col items-center gap-4 bg-primary text-background h-[var(--footer-height)] py-4">
      <p className="text-lg text-center">
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
    </footer>
  );
}
