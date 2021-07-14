import styles from "/styles/Article.module.css";
import { useRouter } from "next/router";
import { format } from "date-fns";

export const ArticleComponent = ({ data }) => {
  const router = useRouter();

  return (
    <>
      <section>
        <h2>Článek</h2>
        <article>
          <h3>{data.title}</h3>
          <div dangerouslySetInnerHTML={{ __html: data.textCs }} />
        </article>
      </section>
      <section>
        <h2>Statistiky</h2>
        <article>
          <h3>Datum</h3>
          <p>{format(new Date(data.date), "dd/MM/yyyy")}</p>
          <h3>Kategorie</h3>
          {data.category.map((category) => {
            return <div className={`pill ${styles.pill}`}>{category}</div>;
          })}
          <h3>Sdílet</h3>
          <div className={styles.social}>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=https://martinchoutka.cz${router.asPath}`}
              target="_blank"
              rel="noopener"
              className="icon"
            >
              <img
                src="/icons/facebook.svg"
                width="16"
                height="16"
                alt="Logo Facebook"
              />
            </a>
            <a
              href={`https://twitter.com/share?url=https://martinchoutka.cz${router.asPath}`}
              target="_blank"
              rel="noopener"
              className="icon"
            >
              <img
                src="/icons/twitter.svg"
                width="16"
                height="16"
                alt="Logo Twitter"
              />
            </a>
          </div>
        </article>
      </section>
    </>
  );
};
