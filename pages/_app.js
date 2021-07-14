import { appWithTranslation } from "next-i18next";
import { Layout } from "../components/Layout/Layout";
import { Provider } from "next-auth/client";
import "../styles/globals.css";

const MyApp = ({ Component, pageProps }) => {
  return (
    <Provider session={pageProps.session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
};

export default appWithTranslation(MyApp);
