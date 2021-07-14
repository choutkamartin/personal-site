import styles from "../styles/Aside.module.css";
import { useRouter } from "next/router";
import Link from "next/link";

export const LanguageButton = () => {
  const router = useRouter();
  const path = router.asPath;
  return router.locale === "cs" ? (
    <div
      className={styles.language}
      style={{ backgroundImage: `url("/flags/united-kingdom-flag.png")` }}
    >
      <h3>English language</h3>
      <p>Do you wish to switch to English?</p>
      <Link href={path} locale="en">
        <a>
          Change language{" "}
          <img
            src="/icons/language.svg"
            alt="Změna jazyka"
            width="16"
            height="16"
          />
        </a>
      </Link>
    </div>
  ) : (
    <div
      className={styles.language}
      style={{ backgroundImage: `url("/flags/czech-republic-flag.png")` }}
    >
      <h3>Český jazyk</h3>
      <p>Přejete si změnit jazyk na češtinu?</p>
      <Link href={path} locale="cs">
        <a>
          Změnit jazyk{" "}
          <img
            src="/icons/language.svg"
            alt="Změna jazyka"
            width="16"
            height="16"
          />
        </a>
      </Link>
    </div>
  );
};
