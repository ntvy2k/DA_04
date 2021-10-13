// import type { NextPage } from "next";
import React from "react";
import Head from "next/head";
import HomeLayout from "../components/Layouts/homeLayout";
import { Button, Card, Container } from "react-bootstrap";
import { GetStaticProps } from "next";
import axios from "axios";
import styles from "../styles/Home.module.css"

const Home = ({ data }: { data: any }) => {
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
  console.log(data)

  return (
    <HomeLayout>
      <Container>
        <Head>
          <title>Test Docker</title>
          <meta name="description" content="Adudududu" />
          <link rel="icon" href="/favicon.ico" />
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.14.0/devicon.min.css"></link>
        </Head>
        <Container className="d-flex flex-column align-items-center">
          <h3>Nhóm chúng tôi méo ngán ngôn ngữ nào</h3>
          <p>Dưới đây là những ngôn ngữ hàng đầu được chắc lọc từ tinh túy nhân loại</p>
          <Container className="d-flex justify-content-around flex-wrap">
            <Card style={{ width: '15rem' }} className={styles.card}>
              <Card.Body className="d-flex flex-column align-items-center">
                <Card.Text className={styles.card_icon}><i className="devicon-html5-plain fs-1"></i></Card.Text>
                <Card.Title>HTML</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the bulk of
                  the card's content.
                </Card.Text>
                <Card.Text><Button className={styles.card_button}>Học Ngay</Button></Card.Text>
              </Card.Body>
            </Card>
            <Card style={{ width: '15rem' }} className={styles.card}>
              <Card.Body className="d-flex flex-column align-items-center">
                <Card.Text className={styles.card_icon}><i className="devicon-css3-plain fs-1"></i></Card.Text>
                <Card.Title>CSS</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the bulk of
                  the card's content.
                </Card.Text>
                <Card.Text><Button className={styles.card_button}>Học Ngay</Button></Card.Text>
              </Card.Body>
            </Card>
            <Card style={{ width: '15rem' }} className={styles.card}>
              <Card.Body className="d-flex flex-column align-items-center">
                <Card.Text className={styles.card_icon}><i className="devicon-python-plain fs-1"></i></Card.Text>
                <Card.Title>Python</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the bulk of
                  the card's content.
                </Card.Text>
                <Card.Text><Button className={styles.card_button}>Học Ngay</Button></Card.Text>
              </Card.Body>
            </Card>
            <Card style={{ width: '15rem' }} className={styles.card}>
              <Card.Body className="d-flex flex-column align-items-center">
                <Card.Text className={styles.card_icon}><i className="devicon-javascript-plain fs-1"></i></Card.Text>
                <Card.Title>Javascript</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the bulk of
                  the card's content.
                </Card.Text>
                <Card.Text><Button className={styles.card_button}>Học Ngay</Button></Card.Text>
              </Card.Body>
            </Card>
          </Container>
        </Container>
      </Container>
    </HomeLayout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const response = await axios.get('http://nginx/api/course/');
  const data = response.data;
  return {
    props: { data },
  };
};

export default Home;
