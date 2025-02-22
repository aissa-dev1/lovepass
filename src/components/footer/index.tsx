import Link from "next/link";
import styles from "./index.module.scss";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>
        &copy;{new Date().getFullYear()}{" "}
        <Link href="/">
          <span>LovePass</span>
        </Link>{" "}
        by{" "}
        <a href="https://www.instagram.com/aissa.creates" target="_blank">
          <span>@aissa.creates</span>
        </a>{" "}
        All rights reserved.
      </p>
      <div className={styles.footer_links}>
        <Link href="/create">
          <p>Create</p>
        </Link>
        <Link href="/love">
          <p>Love</p>
        </Link>
        <Link href="/about">
          <p>About</p>
        </Link>
      </div>
    </footer>
  );
}
