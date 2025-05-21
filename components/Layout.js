import NavBar from "./NavBar";
import Head from "next/head";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Kashurpedia - The Free Encyclopedia</title>
        <meta name="description" content="Kashurpedia - The Free Encyclopedia" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <div className="container">
        {children}
      </div>
    </>
  );
}
