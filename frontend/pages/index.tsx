import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
// import Image from "next/image";
import styles from "../styles/Home.module.css";
import axios from "axios";

const my_get = () => {
  const url = "api/";
  axios
    .get(url)
    .then((data) => {
      console.log("Data:", data);
      alert("Test: OK");
    })
    .catch(() => console.log("Data: failed"));
};

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Test Docker</title>
        <meta name="description" content="Adudududu" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>Hello Django NextJS Nginx</div>
      <button type="button" onClick={my_get}>
        Django...
      </button>
      <div>
        <Link href="/about">
          <a>About Us</a>
        </Link>
        <Link href="/textEdittor">
          <p>Component Text Edit</p>
        </Link>
      </div>
    </div>
  );
};

export default Home;
