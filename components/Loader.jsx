import { useTranslation } from "next-i18next";

export const Loader = () => {
  const { t } = useTranslation("about");
  return <div className="loader">Loading...</div>;
};
