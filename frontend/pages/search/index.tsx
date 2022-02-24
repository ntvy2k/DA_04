import React, { Fragment, useEffect, useState } from "react";
import Head from "next/head";
import courseApi from "../api/courseApi";
import {
  Button,
  ButtonGroup,
  Card,
  Container,
  Dropdown,
  InputGroup,
  ListGroup,
} from "react-bootstrap";
import { useRouter } from "next/router";
import SearchLayout from "../../components/Layouts/searchLayout";
import styles from "../../styles/Search.module.css";
import { MenuButtonWide, Search, X } from "react-bootstrap-icons";
import { motion } from "framer-motion";
import { GetServerSideProps } from "next";
import axios from "axios";
import Link from "next/link";

import TD4_SETTINGS, { WEB_URL } from "../../app/config";

const group_param = (group: number | null) => {
  if (group !== null) {
    return `&group=${group}`;
  }
  return "";
};

const topics_param = (topics: number[]) => {
  let params = "";
  for (let i in topics) {
    params += `&topics=${topics[i]}`;
  }
  return params;
};

// const Send = async (
//   search_terms: string,
//   group: number | null,
//   topics: number[]
// ) => {
//   // Chức năng tìm kiếm khóa học.
//   // Ví dụ:
//   // Từ khóa là "python", trong group 1, và liên quan đến 2 chủ đề 1, 2 <[1, 2]>
//   // api/search/?terms=python&group=1&topics=1&topics=2
//   // -----------------
//   // Từ khóa là "javascript", và không quan tâm mấy cái sau.
//   // api/search/?terms=javascript
//   // -----------------
//   // Chỉ tìm theo group, trường hợp dưới đây là tìm tất cả các course trong group 1
//   // (mà Phúc design như w3 thì chắc xổ ra thoi và có lẽ k cần thứ này )
//   // api/search/?terms=&group=1 (1) hoặc api/search/?group=1 (2)
//   // ............^^^^^^
//   // không có từ khóa thì để trống nghĩa là để yên "terms=" (1) hoặc xóa luôn (2)
//   // -----------------
//   // Theo các topic khác nhau: ví dụ dưới đây là có 3 topic lần lượt là 1, 3, 4
//   // Hay [1, 3, 4]
//   // Giả sử tìm khóa học có liên quan đến chủ đề như (lập trình, cấu trúc dữ liệu và giải thuật, python)
//   // Cái này chỉ là thử nghiệm thôi, nhưng ưu điểm là lọc gọn hơn, sát yêu cầu hơn.
//   // api/search/?topics=1&topics=2&topics=3
//   // ======= Happy End =======
//   const url =
//     `api/search/?terms=${search_terms}` +
//     group_param(group) +
//     topics_param(topics);

//   const response: AxiosResponse<Course[]> = await axios.get(url);
//   return response.data;
// };

const bannerSearchVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.2,
    },
  },
};

const title = {
  hidden: {
    opacity: 0,
    y: -20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.4,
      type: "spring",
    },
  },
};

const SearchPage = ({ courses }: { courses: any }) => {
  const router = useRouter();
  const [search_terms, set_search_terms] = useState<string>("");
  const [courseGroup, setCourseGroup] = useState<Array<any>>([]);
  const [courseTopic, setCourseTopic] = useState<Array<any>>([]);
  const [topicListName, setTopicListName] = useState<Array<any>>([]);

  const [group, set_group] = React.useState<number | null>(null); // Ví dụ trường hợp này là group 2
  const [topics, set_topics] = React.useState<number[]>([]); // ví dụ trường hợp này có 2 topics liên quan (1 và 2)

  useEffect(() => {
    const fetchGroup = async () => {
      const res = await courseApi.getGroupCourse();
      const resCourse = await axios.get(WEB_URL + "/api/course/");
      //console.log(resCourse.data);
      const resTopic = await courseApi.getTopicCourse();
      setCourseGroup(res.data.map(({ gr_courses, ...newObject }) => newObject));
      setCourseTopic(
        resTopic.data.map(({ tp_courses, ...newObject }) => newObject)
      );
    };
    fetchGroup();
  }, []);
  const handleAddTopic = (topic: any) => {
    const found = topicListName.some((oj) => oj.id === topic.id);
    if (!found) {
      set_topics([...topics, topic.id]);
      setTopicListName([...topicListName, topic]);
    }
  };
  const handleRemoveTopic = (topic: any) => {
    const [...newTopic] = topicListName;
    const [...newTopicID] = topics;
    const index = newTopic.indexOf(topic);
    const indexID = newTopicID.indexOf(topic.id);
    if (index > -1) {
      newTopic.splice(index, 1);
    }
    if (indexID > -1) {
      newTopicID.splice(index, 1);
    }
    setTopicListName(newTopic);
    set_topics(newTopicID);
  };
  const handleClearAll = () => {
    set_group(null);
    set_topics([]);
    setTopicListName([]);
  };
  const Submit = (
    search_terms: string,
    group: number | null,
    topics: number[]
  ) => {
    // Send(search_terms, group, topics)
    //   .then((data) => console.log(data))
    //   .catch((err) => console.log(err));
    // router.push(`/?router=${search_terms}&group=${group}&${
    //   topics.map((topic)=>{
    //     return(`topic=${topic}`)
    //   })
    // }`)
    const topicUrl = topics_param(topics);
    const groupUrl = group_param(group);
    const url = `/search/id?router=${search_terms}${groupUrl}${topicUrl}`;
    router.push(url);
  };

  const checkEnter = (e: any) => {
    if (e.key === "Enter" && e.currentTarget.value !== "") {
      const topicUrl = topics_param(topics);
      const groupUrl = group_param(group);
      const url = `/search/id?terms=${search_terms}${groupUrl}${topicUrl}`;
      router.push(url);
    }
  };

  const handleSubmit = () => {
    const topicUrl = topics_param(topics);
    const groupUrl = group_param(group);
    const url = `/search/id?terms=${search_terms}${groupUrl}${topicUrl}`;
    router.push(url);
  };
  return (
    <SearchLayout>
      <Fragment>
        <Head>
          <title>Tìm kiếm | {TD4_SETTINGS.title}</title>
          <meta name="description" content="Tìm kiếm khóa học" />
          <link rel="icon" href="/favicon.ico" />
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.14.0/devicon.min.css"
          ></link>
        </Head>

        <motion.div
          className={styles.bannerSearch}
          variants={bannerSearchVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className={`${styles.container_search} container`}
            variants={title}
            initial="hidden"
            animate="visible"
          >
            <h1 className={styles.title}>Tìm kiếm khóa học</h1>
            <InputGroup size="lg" className={styles.input_group}>
              <input
                type="search"
                placeholder="Tìm kiếm ..."
                className={styles.input_text}
                aria-label="Search"
                list="courseName"
                onChange={(e) => set_search_terms(e.currentTarget.value)}
                onKeyPress={checkEnter}
              />
              <InputGroup.Text
                className={styles.input_icon}
                onClick={handleSubmit}
              >
                <Search />
              </InputGroup.Text>
            </InputGroup>
            <div className={styles.group_course}>
              {courseGroup.map((radio, index) => {
                return (
                  <ButtonGroup
                    key={index}
                    id={radio.id}
                    className={styles.button_group}
                  >
                    {group === radio.id && (
                      <Button
                        className={styles.button_group_cancel}
                        onClick={() => set_group(null)}
                      >
                        <X />
                      </Button>
                    )}
                    <button
                      className={styles.button_group_name}
                      onClick={() => set_group(radio.id)}
                    >
                      {radio.name}
                    </button>
                  </ButtonGroup>
                );
              })}
              {(group || topics.length !== 0) && (
                <button
                  className={styles.button_clear}
                  onClick={handleClearAll}
                >
                  Xóa tất cả
                </button>
              )}
            </div>
            <Dropdown className="mt-3">
              <Dropdown.Toggle className={styles.dropdown_topic}>
                Chủ đề
              </Dropdown.Toggle>

              <Dropdown.Menu style={{ maxHeight: '200px', overflowY: 'scroll' }}>
                {courseTopic.map((topic, index) => {
                  return (
                    <Dropdown.Item
                      key={index}
                      onClick={() => handleAddTopic(topic)}
                    >
                      {topic.name}
                    </Dropdown.Item>
                  );
                })}
              </Dropdown.Menu>
            </Dropdown>

            <ListGroup horizontal>
              {topicListName.map((topic) => {
                return (
                  <ButtonGroup key={topic.id} className={styles.button_group}>
                    <button
                      className={styles.button_group_cancel}
                      onClick={() => handleRemoveTopic(topic)}
                    >
                      <X />
                    </button>
                    <button className={styles.button_group_name}>
                      {topic.name}
                    </button>
                  </ButtonGroup>
                );
              })}
            </ListGroup>
          </motion.div>
        </motion.div>
        <Container className="mt-5">
          <h1 className={styles.result_title}>
            <MenuButtonWide /> Khóa học tìm thấy
          </h1>
          <div className="d-flex flex-wrap justify-content-center">
            {courses?.map((course: any) => {
              return (
                <Card key={course.id} className={styles.card}>
                  <Card.Body className={styles.card_body}>
                    <Card.Text>
                      <i
                        className={`${styles.card_icon} ${course.icon} colored`}
                      />
                    </Card.Text>
                    <Card.Title className="mb-4">
                      {course.name.toUpperCase()}
                    </Card.Title>
                    <Card.Text>
                      <Link href={`/khoahoc/${course.slug}`}>
                        <a className={styles.card_button}>Học ngay</a>
                      </Link>
                    </Card.Text>
                  </Card.Body>
                </Card>
              );
            })}
          </div>
        </Container>
      </Fragment>
    </SearchLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await axios.get(`http://nginx/api/course/`);
  const data = await res.data;
  return {
    props: {
      courses: data,
    },
  };
};

export default SearchPage;
