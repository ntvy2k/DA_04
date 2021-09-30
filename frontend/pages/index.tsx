// import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import courseApi from "./api/courseApi";
import HeaderCourse from "../components/HeaderCourse";
import { Course } from "../moduleType/course";
import { AxiosResponse } from "axios";
import { useEffect } from "react";

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
        <Link href="/textEdittor">
          <a>Component Text Edit</a>
        </Link>
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  const response: AxiosResponse<Array<Course>> = await courseApi.getAll();
  const data = response.data

  return {
    props: { data },
  };
}

export default Home;
