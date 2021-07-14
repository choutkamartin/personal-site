import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { LoginForm } from "/components/LoginForm";

export async function getServerSideProps({ locale, context }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "footer",
        "aside",
        "header",
        "common",
      ])),
    },
  };
}

export default function Login() {
  return (
    <main>
      <LoginForm />
    </main>
  );
}
