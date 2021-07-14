import React from "react";
import { Header } from "./Header";
import { Aside } from "./Aside";
import { Footer } from "./Footer";
import Head from "next/head";

export const Layout = ({ children }) => {
  return (
    <div className="app">
      <Head>
        <title>Martin Choutka - Programování</title>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet" />
        <meta name="author" content="Martin Choutka" />
        <meta
          name="description"
          content="Blog a portfolio, na kterém jsou publikována zajímavá témata o programování."
        />
        <meta property="og:title" content="Martin Choutka" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.martinchoutka.cz/" />
        <meta
          property="og:image"
          content="https://www.martinchoutka.cz/avatar.jpg"
        />
      </Head>
      <Aside />
      <Header />
      {children}
      <Footer />
    </div>
  );
};
