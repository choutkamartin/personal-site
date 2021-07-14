import { Comment } from "./Comment";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";
import ReactPaginate from "react-paginate";
import Router, { withRouter } from "next/router";
import { useSession } from "next-auth/client";
import { Loader } from "../Loader";
import styles from "../../styles/Comment.module.css";
import { signIn } from "next-auth/client";
import Image from "next/image";

const Comments = ({ data, router, onFormSend, deleteComment }) => {
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
  const { t } = useTranslation(["contact-form", "common"]);

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

  let content = null;
  if (isLoading) content = <Loader />;
  else {
    if (data.content.length > 0) {
      content = data.content.map((comment) => {
        return (
          <Comment
            key={comment._id}
            comment={comment}
            deleteComment={deleteComment}
          />
        );
      });
    } else {
      content = <p>Žádné komentáře</p>;
    }
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    onFormSend(data);
    reset();
  };

  return (
    <section>
      <h2>Komentáře</h2>
      <article>
        <div className={styles.form}>
          {!session && (
            <div>
              <p>Pro přidání komentáře se musíte přihlásit.</p>
              <button
                onClick={() =>
                  signIn("facebook", {
                    callbackUrl: `http://localhost:3000${router.asPath}`,
                  })
                }
              >
                Facebook{" "}
                <img
                  src="/icons/facebook.svg"
                  className={styles.icon}
                  width="16"
                  height="16"
                />
              </button>
              <button
                onClick={() =>
                  signIn("google", {
                    callbackUrl: `http://localhost:3000${router.asPath}`,
                  })
                }
              >
                Google{" "}
                <img
                  src="/icons/google.svg"
                  className={styles.icon}
                  width="16"
                  height="16"
                />
              </button>
            </div>
          )}
          {session && (
            <div>
              <div className={styles.meta}>
                <div className={styles.image}>
                  <Image
                    src={session.user.image}
                    className={styles.image}
                    width={48}
                    height={48}
                    alt="Profilová fotka"
                  />
                </div>
                <h3>{session.user.name}</h3>
              </div>
              <form onSubmit={handleSubmit(onSubmit)} className="form">
                <div className="input">
                  <label htmlFor="message">{t("common:message")}</label>
                  <textarea
                    id="message"
                    {...register("message", { required: true })}
                  />
                  {errors.message && (
                    <p className="input-error">
                      <img
                        src="/icons/exclamation-diamond.svg"
                        width="16"
                        height="16"
                      />
                      {t("common:input-required")}
                    </p>
                  )}
                </div>
                <button type="submit">{t("common:send")}</button>
              </form>
            </div>
          )}
        </div>
        {content}
        <ReactPaginate
        previousLabel={"<"}
        nextLabel={">"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        activeClassName={"active"}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        initialPage={data.pagination.currentPage - 1}
        pageCount={data.pagination.pages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={paginationHandler}
      />
      </article>
    </section>
  );
};

export default withRouter(Comments);
