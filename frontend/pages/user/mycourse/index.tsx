import { GetServerSideProps, GetStaticProps } from "next";
import React, { useEffect, useReducer, useState } from "react";
import { Card } from "react-bootstrap";
import HomeLayout from "../../../components/Layouts/homeLayout";
import { CourseList } from "../../../moduleType";
import courseApi from "../../api/courseApi";
import styles from "../../../styles/MyCourse.module.css";
import Link from "next/link";
import Head from "next/head";
import { ChevronDoubleRight, PlusCircle } from "react-bootstrap-icons";
import { motion } from "framer-motion";
import TD4_SETTINGS from "../../../app/config";

const faceUp = {
  hidden: {
    opacity: 0,
    x: 100,
  },
  visible: {
    opacity: 1,
    x: 0,
  },
};

function MyCourse() {
  const [data, setData] = useState<Array<CourseList>>([]);
  const [rerender, setRerender] = useState<boolean>(true);
  useEffect(() => {
    const config = {
      headers: { Authorization: `Token ${localStorage.getItem("key")}` },
    };
    const fetch = async () => {
      const res = await courseApi.getMyCourse(config);
      setData(res.data);
    };
    fetch();
  }, [rerender]);
  const handleDeleteCourse = (courseSlug: string) => {
    const config = {
      headers: { Authorization: `Token ${localStorage.getItem("key")}` },
    };
    courseApi.deleteCourse(courseSlug, config);
    setRerender(!rerender);
  };
  return (
    <>
      <Head>
        <title>Khóa học của tôi | {TD4_SETTINGS.title}</title>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.14.0/devicon.min.css"
        ></link>
      </Head>
      <HomeLayout>
        <div className={`container ${styles.wrapper}`}>
          <div className="d-flex align-items-center">
            <Link href="/user">
              <a className="text-reset text-decoration-none">
                <h4 className={styles.text}>Bảng điều khiển</h4>
              </a>
            </Link>
            <ChevronDoubleRight className={styles.text_icon} />
            <Link href="/user/mycourse">
              <a className="text-reset text-decoration-none">
                <h4 className={styles.text}>Các khóa học của tôi</h4>
              </a>
            </Link>
          </div>
          <div className="d-flex flex-wrap">
            <motion.div
              variants={faceUp}
              initial="hidden"
              animate="visible"
              transition={{ type: "spring", delay: 0.4 }}
            >
              <Card className={styles.card}>
                <Card.Body className={styles.card_body}>
                  <Card.Text>
                    <PlusCircle className={styles.card_icon} />
                  </Card.Text>
                  <Card.Title className="mb-4">Thêm mới khóa học</Card.Title>
                  <Card.Text className="d-flex justify-content-around">
                    <Link href={`/user/mycourse/addcourse`}>
                      <a className={styles.card_button}>Thêm</a>
                    </Link>
                  </Card.Text>
                </Card.Body>
              </Card>
            </motion.div>
            {data.map((course: any, index: any) => {
              return (
                <motion.div
                  key={course.id}
                  variants={faceUp}
                  initial="hidden"
                  animate="visible"
                  transition={{ type: "spring", delay: (index + 2) * 0.2 }}
                >
                  <Card className={styles.card}>
                    <Card.Body className={styles.card_body}>
                      <Card.Text>
                        <i
                          className={`${styles.card_icon} ${course.icon} colored`}
                        />
                      </Card.Text>
                      <Card.Title className="mb-4">
                        {course.name.toUpperCase()}
                      </Card.Title>
                      <Card.Text className="d-flex justify-content-around">
                        <Link href={`/user/mycourse/${course.slug}`}>
                          <a className={styles.card_button}>Chỉnh sửa</a>
                        </Link>
                        <button
                          className={styles.card_button}
                          onClick={() => handleDeleteCourse(course.slug)}
                        >
                          Xóa
                        </button>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </HomeLayout>
    </>
  );
}

export default MyCourse;
