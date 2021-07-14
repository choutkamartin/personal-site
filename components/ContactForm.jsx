import { useTranslation } from "next-i18next";
import { useForm } from "react-hook-form";

export const ContactForm = ({ props, onFormSend }) => {
  const { t } = useTranslation(["contact-form", "common"]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    onFormSend({ data });
  };

  return (
    <main>
      <section>
        <h2>{t("sign-in")}</h2>
        <article>
          <form onSubmit={handleSubmit(onSubmit)} className="form">
            <div className="input">
              <label>{t("common:first-name")}</label>
              <input
                {...register("firstName", { required: true })}
                placeholder="Martin"
              />
              {errors.firstName && (
                <p className="input-error">{t("common:input-required")}</p>
              )}
            </div>
            <div className="input">
              <label>{t("common:last-name")}</label>
              <input
                {...register("lastName", { required: true })}
                placeholder="Choutka"
              />
              {errors.lastName && (
                <p className="input-error">{t("common:input-required")}</p>
              )}
            </div>
            <div className="input">
              <label>{t("common:message")}</label>
              <textarea
                {...register("message", { required: true })}
                placeholder="Text"
              />
              {errors.message && (
                <p className="input-error">{t("common:input-required")}</p>
              )}
            </div>
            <button type="submit">
              {t("common:sign-in")} <img src="/icons/arrow-right-circle.svg" />
            </button>
          </form>
        </article>
      </section>
    </main>
  );
};
