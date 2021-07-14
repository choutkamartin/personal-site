import styles from "../../styles/Blog.module.css";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

export const Step1 = ({
  register,
  errors,
  handleSubmit,
  english,
  setEnglish,
}) => {
  const { t } = useTranslation(["contact-form", "common"]);
  const router = useRouter();

  const onSubmit = () => {
    router.push(
      {
        query: "page=2",
      },
      undefined,
      { scroll: false }
    );
  };

  return (
    <article>
      <h3>Základní data</h3>
      <div className="form-check">
        <label className="form-check-label" htmlFor="flexCheckDefault">
          Angličtina
        </label>
        <input
          className="form-check-input"
          type="checkbox"
          checked={english}
          value={english}
          id="flexCheckDefault"
          onChange={() => setEnglish(!english)}
        />
      </div>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="input">
          <label className={styles.labelImage}>
            Název <img src="/icons/czech-republic.svg" width="16" height="16" />
          </label>
          <input
            {...register("articleNameCs", { required: true })}
            placeholder="Článek"
          />
          {errors.articleNameCs && (
            <p className="input-error">{t("common:input-required")}</p>
          )}
        </div>
        {english == true && (
          <div className="input">
            <label className={styles.labelImage}>
              Název
              <img src="/icons/united-states.svg" width="16" height="16" />
            </label>
            <input
              {...register("articleNameEn", { required: true })}
              placeholder="Article"
            />
            {errors.articleNameEn && (
              <p className="input-error">{t("common:input-required")}</p>
            )}
          </div>
        )}
        <div className="input">
          <label>Slug</label>
          <input {...register("slug", { required: true })} placeholder="Slug" />
          {errors.slug && (
            <p className="input-error">{t("common:input-required")}</p>
          )}
        </div>
        <div className="input">
        <label>Kategorie</label>
          <select {...register("category")} className="form-select" multiple>
            <option value="Programování">Programování</option>
            <option value="Ze života">Ze života</option>
          </select>
          {errors.category && (
            <p className="input-error">{t("common:input-required")}</p>
          )}
        </div>
        <button type="submit">Dále</button>
      </form>
    </article>
  );
};
