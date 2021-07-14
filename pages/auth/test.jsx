import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { getProviders, signIn } from 'next-auth/client'

export async function getServerSideProps({ locale, context }) {
  const providers = await getProviders();
  return {
    props: {
      providers,
      ...(await serverSideTranslations(locale, [
        "footer",
        "aside",
        "header",
        "common",
      ])),
    },
  };
}

export default function Test({ providers }) {
  return (
    <>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button onClick={() => signIn(provider.id)}>
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </>
  );
}
