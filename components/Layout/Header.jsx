import styles from "/styles/Header.module.css";
import { useTranslation } from "next-i18next";

export const Header = () => {
  const { t } = useTranslation("header");
  function getGreetings() {
    const today = new Date();
    const currentHour = today.getHours();
    if (currentHour < 12) {
      return t("greetings-morning");
    } else if (currentHour < 18) {
      return t("greetings-afternoon");
    } else {
      return t("greetings-evening");
    }
  }

  return (
    <header>
      <h2>{getGreetings()}</h2>
      <form className={styles.form}>
        <input type="search" placeholder="Hledej" />
        <button type="submit">
          <img
            src="/icons/search.svg"
            alt="Ikona Hledat"
            width="16"
            height="16"
          />
        </button>
      </form>
    </header>
  );
};
