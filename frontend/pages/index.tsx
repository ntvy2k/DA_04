// import type { NextPage } from "next";
import React, { Fragment, useEffect, useRef, useState } from "react";
import Head from "next/head";
import HomeLayout from "../components/Layouts/homeLayout";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { GetStaticProps } from "next";
import axios from "axios";
import styles from "../styles/Home.module.css"
import Link from 'next/link'
import { useRouter } from "next/router";
import Quizz from "../public/Quizz.json"
import LoginAnimation from "../public/Blogging.json"
import Lottie from "react-lottie"
import { Book, Bug, Google } from "react-bootstrap-icons";
import { motion, useAnimation } from "framer-motion"
import { InView } from "react-intersection-observer"

const titleVariants = {
  hidden: {
    opacity: 0,
    y: 30
  },
  visible: {
    opacity: 1,
    y: 0,
  }
}

const scaleToBigger = {
  hidden: {
    opacity: 0,
    scale: 0
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      delay: 0.6,
      duration: 2
    }
  }
}

const toTheRight = {
  hidden: {
    opacity: 0,
    x: 100
  },
  visible: {
    opacity: 1,
    x: 0
  }
}

const Home = () => {
  const animation = useAnimation()
  const animation1 = useAnimation()
  const handInView = (inView: boolean) => {
    if (inView) {
      animation.start("visible")
    }
  }
  const handInView1 = (inView: boolean) => {
    if (inView) {
      animation1.start("visible")
    }
  }
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
  const bloggingOptions = {
    loop: true,
    autoplay: true,
    animationData: LoginAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const quizzOptions = {
    loop: true,
    autoplay: true,
    animationData: Quizz,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <HomeLayout>
      <Fragment>
        <Head>
          <title>Test Docker</title>
          <meta name="description" content="Adudududu" />
          <link rel="icon" href="/favicon.ico" />
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.14.0/devicon.min.css"></link>
        </Head>
        <Container>

          {/* <Container className="d-flex flex-column align-items-center">

            <h3>Nhóm chúng tôi méo ngán ngôn ngữ nào</h3>
            <p>Dưới đây là những ngôn ngữ hàng đầu được chắc lọc từ tinh túy nhân loại</p>
            <Container className="d-flex justify-content-around flex-wrap">
              {data.map((course: any) => {
                return (
                  <Card className={styles.card}>
                    <Card.Body className="d-flex flex-column align-items-center">
                      <Card.Text className={styles.card_icon}><i className={`${course.icon} fs-1`}></i></Card.Text>
                      <Card.Title>{course.name.toUpperCase()}</Card.Title>
                      <Card.Text>
                        <Button className={styles.card_button}>
                          <Link href={`/${course.slug}`}>
                            <a className={styles.card_link}>Học Ngay</a>
                          </Link>
                        </Button>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                )
              })}
            </Container>
          </Container> */}
          <Container className={styles.section}>
            <div className="row align-items-center">
              <div className="col col-md-6">
                <motion.h1
                  className={styles.title}
                  variants={titleVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ type: 'spring' }}
                >Nơi học những điều mới gì cũng có trừ porn</motion.h1>
                <motion.p
                  variants={titleVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ type: 'spring', delay: 0.2 }}
                >Web nhái lửa chùa đm nextjs như lìn</motion.p>
                <motion.button
                  className={styles.button}
                  variants={titleVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ type: 'spring', delay: 0.4 }}
                ><Link href='/search'><a className="text-decoration-none link-secondary">Khám Phá</a></Link></motion.button>
              </div>
              <motion.div
                className="col col-md-6"
                variants={scaleToBigger}
                initial="hidden"
                animate="visible"
              >
                <Lottie options={bloggingOptions} height={400} width={400} />
              </motion.div>
            </div>
          </Container>
          <InView
            as="div"
            onChange={(inView, entry) => {
              handInView(inView)
            }}
            threshold={0.4}
          >
            <Container className="d-flex flex-column align-items-center">
              <motion.h1
                variants={titleVariants}
                initial="hidden"
                animate={animation}
                transition={{ type: 'spring' }}
              >Các bước học code hiệu quả</motion.h1>
              <motion.p
                variants={titleVariants}
                initial="hidden"
                animate={animation}
                transition={{ type: 'spring', delay: 0.2 }}
              >Theo khuyến khích của nhóm chúng tôi</motion.p>
              <div className="row justify-content-around">
                <motion.div
                  className="col"
                  variants={toTheRight}
                  initial="hidden"
                  animate={animation}
                  transition={{ type: 'spring' }}
                >
                  <Card className={styles.card}>
                    <Card.Body className={styles.card_body}>
                      <Card.Text><Book className={`${styles.card_icon} ${styles.book}`} /></Card.Text>
                      <Card.Title>Học</Card.Title>
                      <Card.Text>
                        Some quick example text to build on the card title and make up the bulk of
                        the card's content.
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </motion.div>
                <motion.div
                  className="col"
                  variants={toTheRight}
                  initial="hidden"
                  animate={animation}
                  transition={{ type: 'spring', delay: 0.2 }}
                >
                  <Card className={styles.card}>
                    <Card.Body className={styles.card_body}>
                      <Card.Text><Google className={`${styles.card_icon} ${styles.google}`} /></Card.Text>
                      <Card.Title>Google</Card.Title>
                      <Card.Text>
                        Some quick example text to build on the card title and make up the bulk of
                        the card's content.
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </motion.div>
                <motion.div
                  className="col"
                  variants={toTheRight}
                  initial="hidden"
                  animate={animation}
                  transition={{ type: 'spring', delay: 0.4 }}
                >
                  <Card className={styles.card}>
                    <Card.Body className={styles.card_body}>
                      <Card.Text><Bug className={`${styles.card_icon} ${styles.bug}`} /></Card.Text>
                      <Card.Title>Sửa lỗi</Card.Title>
                      <Card.Text>
                        Some quick example text to build on the card title and make up the bulk of
                        the card's content.
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </motion.div>
              </div>
            </Container>
          </InView>
          <InView
            as="div"
            onChange={(inView, entry) => {
              handInView1(inView)
            }}
            threshold={0.4}
          >
            <Container className={styles.section}>
              <div className="row align-items-center">
                <motion.div
                  className="col"
                  variants={scaleToBigger}
                  initial="hidden"
                  animate={animation1}
                >
                  <Lottie options={quizzOptions} height={400} width={400}></Lottie>
                </motion.div>
                <div className="col">
                  <motion.h1
                    className={styles.title}
                    variants={titleVariants}
                    initial="hidden"
                    animate={animation1}
                    transition={{ type: 'spring', delay: 0.4 }}
                  >Ôn lại kiến thức cùng những câu hỏi thú vị</motion.h1>
                  <motion.p
                    variants={titleVariants}
                    initial="hidden"
                    animate={animation1}
                    transition={{ type: 'spring', delay: 0.6 }}
                  >Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus quia fugiat quas est omnis, sint earum, et modi dolor repudiandae praesentium delectus, id quod porro accusamus ipsa aliquam eius libero!</motion.p>
                  <motion.button
                    className={styles.button}
                    variants={titleVariants}
                    initial="hidden"
                    animate={animation1}
                    transition={{ type: 'spring', delay: 0.8 }}
                  >Ôn Tập</motion.button>
                </div>
              </div>
            </Container>
          </InView>
        </Container>
      </Fragment>
    </HomeLayout >
  );
};

// export const getStaticProps: GetStaticProps = async () => {
//   const response = await axios.get('http://nginx/api/course/');
//   const data = response.data;
//   return {
//     props: { data },
//   };
// };

export default Home;
