// import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import courseApi from "./api/courseApi";
import HeaderCourse from "../components/HeaderCourse";
import { GetStaticProps } from "next";
import { Course } from "../moduleType";
import { AxiosResponse } from "axios";

const Home = ({ data }: { data: Array<Course> }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Test Docker</title>
        <meta name="description" content="Adudududu" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeaderCourse data={data} />

      <div>Hello Django NextJS Nginx</div>
      <button type="button">Django...</button>
      <div>
        <Link href="/about">
          <a>About Us</a>
        </Link>
        <Link href="/addContent">
          <a>Component Text Edit</a>
        </Link>
      </div>
    </div>
  );
};
export const getStaticProps: GetStaticProps = async () => {
  const response: AxiosResponse<Array<Course>> = await courseApi.getAll();
  const data = response.data
  return {
    props: { data },
  };
}

export default Home;
