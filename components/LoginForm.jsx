import styles from "../styles/Comment.module.css";
import { useTranslation } from "next-i18next";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/client";
import { useRouter } from 'next/router'

export const LoginForm = ({ props, onFormSend }) => {
  const router = useRouter()
  const { t } = useTranslation("common");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    onFormSend({ data });
  };

  return (
    <section>
      <h2>{t("sign-in")}</h2>
      <article>
        <div className={styles.form}>
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
        </div>
      </article>
    </section>
  );
};
