import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Articles } from "../../components/Article/Articles";
import { Loader } from "../../components/Loader";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import Router, { withRouter } from "next/router";
import React from "react";
import { useSession } from "next-auth/client";
import Link from "next/link";
import styles from "../../styles/Article.module.css";

export async function getServerSideProps({ locale, query }) {
  const page = query.page || 1;
  const res = await fetch(`http://localhost:3000/api/posts?page=${page}`);
  const data = await res.json();
  return {
    props: {
      data,
      ...(await serverSideTranslations(locale, ["footer", "aside", "header"])),
    },
  };
}

function Blog({ data, router }) {
  const [session, loading] = useSession();
  const [isLoading, setLoading] = useState(false);
  const startLoading = () => setLoading(true);
  const stopLoading = () => setLoading(false);
  useEffect(() => {
    Router.events.on("routeChangeStart", startLoading);
    Router.events.on("routeChangeComplete", stopLoading);

    return () => {
      Router.events.off("routeChangeStart", startLoading);
      Router.events.off("routeChangeComplete", stopLoading);
    };
  }, []);

  const paginationHandler = (page) => {
    const currentPath = router.pathname;
    const currentQuery = { ...router.query };
    currentQuery.page = page.selected + 1;

    router.push(
      {
        pathname: currentPath,
        query: currentQuery,
      },
      undefined,
      { scroll: false }
    );
  };

  const refreshData = () => {
    router.replace(router.asPath, undefined, { scroll: false });
  };

  const deleteArticle = async (id) => {
    const res = await fetch("/api/articles/delete", {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(id),
    });
    refreshData();
  };

  let content = null;
  if (isLoading) content = <Loader />;
  else {
    content = (
      <Articles articles={data.articles} deleteArticle={deleteArticle} />
    );
  }

  let button = null;
  if (session) {
    if (session.user.email === "martafiixek@gmail.com") {
      button = (
        <Link href="/articles/new?page=1">
          <a className={`icon ${styles.new}`}>
            <img
              src="/icons/plus-circle.svg"
              alt="GitHub"
              width="18"
              height="18"
            />
            Nový članek
          </a>
        </Link>
      );
    }
  }

  return (
    <main>
      <section>
        <h2>Články</h2>
        {button}
        {content}
        <ReactPaginate
          previousLabel={"<"}
          nextLabel={">"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          activeClassName={"active"}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          initialPage={data.meta.pagination.currentPage - 1}
          pageCount={data.meta.pagination.pages}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={paginationHandler}
        />
      </section>
    </main>
  );
}
export default withRouter(Blog);
