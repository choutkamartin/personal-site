import { format } from "date-fns";
import styles from "../../styles/Article.module.css";
import Link from "next/link";
import { useSession } from "next-auth/client";

export const Articles = ({ articles, deleteArticle }) => {
  const [session, loading] = useSession();

  return (
    <div className={styles.articles}>
      {articles.map((article) => {
        return (
          <article key={article._id} className={styles.article}>
            <h4>{article.title}</h4>
            <div className={styles.data}>
              {article.category.map((category, index) => {
                return (
                  <div className={`pill ${styles.pill}`} key={index}>
                    {category}
                  </div>
                );
              })}
              <div className={styles.date}>
                {format(new Date(article.date), "dd/MM/yyyy")}
              </div>
            </div>
            <div
              dangerouslySetInnerHTML={{
                __html: article.textCs.substring(0, 150),
              }}
            />
            <div>
              <Link href={`/article/${article.slug}`}>
                <a className="icon">
                  <img src="/icons/book.svg" width="16" height="16" />
                </a>
              </Link>
              {session && session.user.email === "martafiixek@gmail.com" && (
                <a className="icon" onClick={() => deleteArticle(article._id)}>
                  <img
                    src="/icons/x-circle.svg"
                    alt="GitHub"
                    width="18"
                    height="18"
                  />
                </a>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
};
