import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["footer", "aside", "header"])),
    },
  };
}

function Projects() {
  const router = useRouter();
  return (
    <main>
      <h2>Projekty</h2>
      <section className="grid">
        <article>
          <h3>Bitwarden</h3>
          <img src="/icons/bitwarden.svg" width="72" height="72" />
          <h4>Překlad</h4>
        </article>
      </section>
    </main>
  );
}
export default Projects;
