import Head from 'next/head';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head></Head>
      {/*Navbar here*/}
      <Component {...pageProps} />
      {/* footer here*/}
    </>
  );
}

export default MyApp;
