import styles from "../styles/Blog.module.css";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";

export const NewPost = ({ onFormSend }) => {
  const { t } = useTranslation("posts");
  const router = useRouter();
  const [titleCs, setTitleCs] = useState("");
  const [titleEn, setTitleEn] = useState("");
  const [slug, setSlug] = useState("");
  const [textCs, setTextCs] = useState("");
  const [textEn, setTextEn] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    if (!titleCs) {
      alert("Please add a valid email");
      return;
    }

    onFormSend({ titleCs, titleEn, slug, textCs, textEn });

    setTitleCs("");
    setTitleEn("");
    setSlug("");
    setTextCs("");
    setTextEn("");
  };

  return (
    <main className={styles.grid}>
      <section>
        <h2>Přidat nový příspěvěk</h2>
        <article>
          <form className="form" onSubmit={onSubmit}>
            <div className="input">
              <label>Název článku</label>
              <input
                value={titleCs}
                onChange={(e) => setTitleCs(e.target.value)}
              ></input>
            </div>
            <div className="input">
              <label>Název článku (anglicky)</label>
              <input
                value={titleEn}
                onChange={(e) => setTitleEn(e.target.value)}
              ></input>
            </div>
            <div className="input">
              <label>Slug</label>
              <input
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
              ></input>
            </div>
            <div className="input">
              <label>HTML CS</label>
              <textarea
                name=""
                id=""
                cols="30"
                rows="10"
                value={textCs}
                onChange={(e) => setTextCs(e.target.value)}
              ></textarea>
            </div>
            <div className="input">
              <label>HTML EN</label>
              <textarea
                name=""
                id=""
                cols="30"
                rows="10"
                value={textEn}
                onChange={(e) => setTextEn(e.target.value)}
              ></textarea>
            </div>
            <button>Vytvořit</button>
          </form>
        </article>
      </section>
      <section>
        <h2>Náhled</h2>
        <article dangerouslySetInnerHTML={{ __html: textCs }}></article>
      </section>
    </main>
  );
};
