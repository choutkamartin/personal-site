import styles from "../../styles/Blog.module.css";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

export const Step2 = ({
  register,
  errors,
  handleSubmit,
  english,
  watch,
  submitArticle,
}) => {
  const { t } = useTranslation(["contact-form", "common"]);
  const router = useRouter();

  const back = () => {
    router.push(
      {
        query: "page=1",
      },
      undefined,
      { scroll: false }
    );
  };

  const onSubmit = () => {
    submitArticle();
  };

  const content = watch("contentCs"); // you can also target specific fields by their names
  return (
    <div className={styles.content}>
      <article>
        <h2>Obsah</h2>
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <div className="input">
            <label className={styles.labelImage}>
              Obsah{" "}
              <img src="/icons/czech-republic.svg" width="16" height="16" />
            </label>
            <textarea
              {...register("contentCs", { required: true })}
              placeholder="Martin"
            />
            {errors.contentCs && (
              <p className="input-error">{t("common:input-required")}</p>
            )}
          </div>
          {english == true && (
            <div className="input">
              <label>{t("Angličtina")}</label>
              <textarea
                {...register("contentEn", { required: true })}
                placeholder="Martin"
              />
              {errors.contentEn && (
                <p className="input-error">{t("common:input-required")}</p>
              )}
            </div>
          )}
          <button type="button" onClick={back}>
            Zpět
          </button>
          <button type="submit">Dále</button>
        </form>
      </article>
      <article>
        <h2>Náhled</h2>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </article>
    </div>
  );
};
