import Link from "next/link";
import styles from "./index.module.scss";

export default function NavBar() {
  return (
    <nav className={styles.nav_bar}>
      <div className={styles.nav_bar_container}>
        <Link href="/">
          <h1>LovePass</h1>
        </Link>
        <div className={styles.nav_bar_container_links}>
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
      </div>
    </nav>
  );
}
