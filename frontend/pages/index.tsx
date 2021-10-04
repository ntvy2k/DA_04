// import type { NextPage } from "next";
import React from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import courseApi from "./api/courseApi";
import HeaderCourse from "../components/HeaderCourse";
import { GetStaticProps } from "next";
import { Course } from "../moduleType";
import { AxiosResponse } from "axios";
import { fetch_user } from "../features/auth";
import { useAppDispatch } from "../app/hooks";

const Home = ({ data }: { data: Array<Course> }) => {
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    const local_token = localStorage.getItem("key");
    const token = local_token === null ? "" : local_token;
    dispatch(fetch_user(token))
      .unwrap()
      .then((res) => console.log("res", res))
      .catch((err) => console.log("err", err));
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Test Docker</title>
        <meta name="description" content="Adudududu" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeaderCourse data={data} />

      <div>Hello Django NextJS Nginx</div>
      <div>
        <Link href="/about">
          <a>About Us</a>
        </Link>
        <Link href="/addContent">
          <a>Component Text Edit</a>
        </Link>
        <p></p>
        <Link href="/login">
          <a>Login</a>
        </Link>
        <p></p>
        <Link href="/register">
          <a>Register</a>
        </Link>
      </div>
    </div>
  );
};
export const getStaticProps: GetStaticProps = async () => {
  const response: AxiosResponse<Array<Course>> = await courseApi.getAll();
  const data = response.data;
  return {
    props: { data },
  };
};

export default Home;
