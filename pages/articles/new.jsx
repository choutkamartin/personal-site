import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Step1 } from "../../components/Form/Step1";
import { Step2 } from "../../components/Form/Step2";
import { useSession } from "next-auth/client";
import { AccessDenied } from "../../components/Layout/AccessDenied";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useState } from "react";
import styles from "../../styles/Blog.module.css";
import Head from "next/head";

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "about",
        "footer",
        "header",
        "aside",
        "common",
      ])),
    },
  };
}

function NewArticle() {
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const [english, setEnglish] = useState(false);
  const [session, loading] = useSession();
  if (!session) {
    return <AccessDenied />;
  }

  const submitArticle = async (data) => {
    console.log(getValues());
    const res = await fetch("/api/articles/new", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(getValues()),
    });
  };

  return (
    <>
      <Head>
        <title>Martin Choutka</title>
        <meta name="description" content="Test" />
      </Head>
      <main>
        <section>
          <h2>Nový článek</h2>
          {router.query.page == "1" && (
            <Step1
              register={register}
              errors={errors}
              handleSubmit={handleSubmit}
              english={english}
              setEnglish={setEnglish}
            />
          )}
          {router.query.page == "2" && (
            <Step2
              register={register}
              errors={errors}
              handleSubmit={handleSubmit}
              english={english}
              watch={watch}
              submitArticle={submitArticle}
            />
          )}
        </section>
      </main>
    </>
  );
}
export default NewArticle;
