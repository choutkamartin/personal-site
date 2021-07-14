import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ContactForm } from "../components/ContactForm";

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["footer", "aside", "header", "common"])),
    },
  };
}

function Blog() {
  const router = useRouter();

  const onFormSend = async (form) => {
    const res = await fetch("/api/messages/", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(form),
    });
  };

  return <ContactForm onFormSend={onFormSend} />;
}
export default Blog;
