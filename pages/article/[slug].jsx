import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import styles from "/styles/Article.module.css";
import { ArticleComponent } from "../../components/Article/Article";
import Comments from "../../components/Article/Comments";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { useState } from "react";

export async function getServerSideProps({ query, locale }) {
  const slug = query.slug;
  const page = query.page || 1;
  const res = await fetch(
    `http://localhost:3000/api/articles/${slug}?page=${page}`
  );
  const data = await res.json();
  return {
    props: {
      slug,
      data,
      ...(await serverSideTranslations(locale, [
        "footer",
        "aside",
        "header",
        "post",
        "common",
      ])),
    },
  };
}

function Article({ slug, data }) {
  const router = useRouter();
  const refreshData = () => {
    router.replace(router.asPath, undefined, { scroll: false });
  };

  const deleteComment = async (id) => {
    await fetch(`http://localhost:3000/api/comments/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    });
    refreshData();
  };

  const addComment = async ({ message }) => {
    await fetch(`http://localhost:3000/api/articles/${slug}/`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ message }),
    });
    refreshData();
  };

  return (
    <main className={styles.grid}>
      <ArticleComponent data={data.article} />
      <Comments
        data={data.comments}
        onFormSend={addComment}
        deleteComment={deleteComment}
      />
    </main>
  );
}

export default Article;
