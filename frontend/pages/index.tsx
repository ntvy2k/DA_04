import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import courseApi from "./api/courseApi";
import HeaderCourse from "../components/HeaderCourse/index";

const Home = ({ response }: { response: any }) => {

  return (
    <div className={styles.container}>
      <Head>
        <title>Test Docker</title>
        <meta name="description" content="Adudududu" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeaderCourse data={response} />

      <div>Hello Django NextJS Nginx</div>
      <button type="button">
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
    </div >
  );
};

export async function getServerSideProps() {
  const response = await courseApi.getAll();

  return {
    props: { response }
  }
}

export default Home;
