import NavBar from "@/components/nav-bar";
import styles from "./page.module.scss";

export default function About() {
  return (
    <>
      <NavBar />
      <div className={styles.page}>
        <h2>About LovePass</h2>
        <div className={styles.page_content}>
          <p>
            LovePass is a simple and delightful way to express love and share
            special memories. Create and share unique LovePass cards with
            personalized messages for your loved ones. No accounts required—just
            love!
          </p>
          <h3>How LovePass Works</h3>
          <p>
            1. Go to the Create LovePass page and fill in the recipient&apos;s
            name, your name, and a personal love note.
          </p>
          <p>
            2. Generate a unique LovePass ID and share it with your loved one.
          </p>
          <p>
            3. Your loved one can view the LovePass card using the unique ID.
          </p>
          <h3>Privacy</h3>
          <p>
            Your privacy is important to us. Your LovePass data is currently
            stored in our database, allowing you to retrieve it when needed.
            However, at this stage, data is not linked to a personal account,
            meaning access is limited to the device and browser where it was
            created. In the future, we plan to introduce a way for users to
            retrieve their LovePass across different devices. We do not share
            your data with any third parties.
          </p>
          <h3>Fun Details</h3>
          <p>
            LovePass is designed to make sharing love and memories fun and easy.
            Enjoy creating and sharing your personalized LovePass cards!
          </p>
        </div>
      </div>
    </>
  );
}
