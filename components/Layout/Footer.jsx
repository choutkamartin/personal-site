import { useTranslation } from "next-i18next";

export const Footer = () => {
  const { t } = useTranslation("footer");
  return <footer dangerouslySetInnerHTML={{ __html: t("text") }}></footer>;
};
