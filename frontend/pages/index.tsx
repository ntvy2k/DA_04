// import type { NextPage } from "next";
import React from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { fetch_user, logout, set_not_authenticated } from "../features/auth";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import HomeLayout from "../components/Layouts/homeLayout";

const Home = () => {
  // const dispatch = useAppDispatch();
  // const user_is_authenticated = useAppSelector(
  //   (state) => state.auth.is_authenticated
  // );
  // React.useEffect(() => {
  //   const local_token = localStorage.getItem("key");
  //   const token = local_token == null ? "" : local_token;
  //   dispatch(fetch_user(token))
  //     .unwrap()
  //     .then((res) => console.log("res", res))
  //     .catch((err) => console.log("err", err));
  // }, [dispatch]);

  // const handleLogout = () => {
  //   const token = localStorage.getItem("key");
  //   if (token !== null) {
  //     logout(token).then(() => {
  //       localStorage.removeItem("key");
  //       dispatch(set_not_authenticated());
  //     });
  //   }
  // };

  return (
    <HomeLayout>
      <div className={styles.container}>
        <Head>
          <title>Test Docker</title>
          <meta name="description" content="Adudududu" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div>Hello Django NextJS Nginx</div>
        <div>
          <Link href="/about">
            <a>About Us</a>
          </Link>
          <Link href="/addContent">
            <a>Component Text Edit</a>
          </Link>
          {/* {user_is_authenticated ? (
          <p>
            <a onClick={() => handleLogout()}>Logout</a>
          </p>
        ) : (
          <>
            <p>
              <Link href="/register">
                <a>Register</a>
              </Link>
            </p>
          </>
        )} */}
        </div>
      </div>
    </HomeLayout>
  );
};

// export const getStaticProps: GetStaticProps = async () => {
//   const response: AxiosResponse<Array<Course>> = await courseApi.getAll();
//   const data = response.data;
//   return {
//     props: { data },
//   };
// };

export default Home;
