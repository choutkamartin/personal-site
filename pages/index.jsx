import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import styles from "../styles/About.module.css";
import { ProgressBar } from "../components/ProgressBar";

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "index",
        "footer",
        "header",
        "aside",
        "common",
      ])),
    },
  };
}

function Index() {
  const { t } = useTranslation("index");
  return (
    <main className={styles.grid}>
      <section>
        <h2>{t("about-me")}</h2>
        <article>
          <div dangerouslySetInnerHTML={{ __html: t("content") }} />
        </article>
      </section>
      <section>
        <h2>{t("my-skills")}</h2>
        <article>
          <ProgressBar name={"HTML"} value={100} />
          <ProgressBar name={"CSS"} value={100} />
          <ProgressBar name={"JavaScript"} value={95} />
          <ProgressBar name={"Node.js"} value={85} />
          <ProgressBar name={"MongoDB"} value={80} />
          <ProgressBar name={"C#"} value={70} />
          <ProgressBar name={"SQL"} value={60} />
          <ProgressBar name={"Git"} value={60} />
        </article>
      </section>
    </main>
  );
}
export default Index;
