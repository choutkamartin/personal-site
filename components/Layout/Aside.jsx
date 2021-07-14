import styles from "/styles/Aside.module.css";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { signOut, useSession } from "next-auth/client";
import { LanguageButton } from "../LanguageButton";

export const Aside = () => {
  const [session, loading] = useSession();
  const { t } = useTranslation("common");
  const router = useRouter();
  return (
    <aside>
      <div>
        <Image
          src="/avatar.jpg"
          className={styles.avatar}
          width="50"
          height="50"
          alt="Profilový obrázek"
        />
        <div className={styles.text}>
          <h3>Martin Choutka</h3>
          <small>{t("small")}</small>
        </div>
        <div className={styles.social}>
          <a
            href="https://github.com/choutkamartin"
            target="_blank"
            rel="noopener"
          >
            <img src="/icons/github.svg" alt="GitHub" width="18" height="18" />
          </a>
          <a
            href="https://twitter.com/choutkamartin"
            target="_blank"
            rel="noopener"
          >
            <img
              src="/icons/twitter.svg"
              alt="Twitter"
              width="18"
              height="18"
            />
          </a>
          <a
            href="https://www.linkedin.com/in/choutkamartin/"
            target="_blank"
            rel="noopener"
          >
            <img
              src="/icons/linkedin.svg"
              alt="LinkedIn"
              width="18"
              height="18"
            />
          </a>
        </div>
      </div>
      <nav>
        <ul className={styles.menu}>
          <li>
            <Link href="/">
              <a>
                <img
                  src="/icons/house.svg"
                  className="icon"
                  alt="Ikona Domů"
                  width="44"
                  height="44"
                />
                {t("home")}
              </a>
            </Link>
          </li>
          <li>
            <Link href="/projects">
              <a>
                <img
                  src="/icons/kanban.svg"
                  className="icon"
                  alt="Ikona Politika"
                  width="44"
                  height="44"
                />
                {t("projects")}
              </a>
            </Link>
          </li>
          <li>
            <Link href="/articles/list">
              <a>
                <img
                  src="/icons/pencil.svg"
                  className="icon"
                  alt="Ikona Tužka"
                  width="44"
                  height="44"
                />
                {t("blog")}
              </a>
            </Link>
          </li>
          <li>
            <Link href="/contact-form">
              <a>
                <img
                  src="/icons/reply.svg"
                  className="icon"
                  alt="Ikona Odpovědět"
                  width="44"
                  height="44"
                />
                {t("contact-form")}
              </a>
            </Link>
          </li>
          {!session && (
            <li>
              <Link href="/auth/login">
                <a>
                  <img
                    src="/icons/key.svg"
                    className="icon"
                    alt="Ikona Přihlášení"
                    width="44"
                    height="44"
                  />
                  {t("login")}
                </a>
              </Link>
            </li>
          )}
          {session && (
            <li>
              <Link href="/auth/login">
                <a onClick={() => signOut({ redirect: false })}>
                  <img
                    src="/icons/key.svg"
                    className="icon"
                    alt="Ikona Odhlášení"
                    width="44"
                    height="44"
                  />
                  {t("logout")}
                </a>
              </Link>
            </li>
          )}
        </ul>
      </nav>
      <LanguageButton />
    </aside>
  );
};
