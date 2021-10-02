import Head from "next/head";
import React, { useState } from "react";
import { useRouter } from "next/router";
import courseApi from "../api/courseApi";
import { GetStaticPaths, GetStaticProps } from "next";
import ContentChapter from "../../components/ContentChapter";
import { Chapter, Course } from "../../moduleType";
import { AxiosResponse } from "axios";

function CourseID({ chapterList }: { chapterList: Array<Chapter> }) {
  const router = useRouter();
  const { courseID } = router.query;
  const [chapterID, setChapterID] = useState<number>(1);

  function handleClick(id: number) {
    setChapterID(id);
  }

  return (
    <>
      <Head>
        <title>Course {courseID}</title>
        <meta name="description" content="Adudududu" />
      </Head>
      <div>
        <p>This is course: {courseID}</p>
        <ul>
          {chapterList.map(({ id, name }) => {
            return (
              <li key={id} onClick={() => handleClick(id)}>
                {name}
              </li>
            );
          })}
        </ul>
        {Object.keys(chapterList).length != 0 ? (
          <ContentChapter id={chapterID}></ContentChapter>
        ) : null}
      </div>
    </>
  );
}
export const getStaticPaths: GetStaticPaths = async () => {
  const response: AxiosResponse<Array<Course>> = await courseApi.getAll();
  const data = response.data
  const paths = data.map((course: Course) => ({
    params: {
      courseID: course.id.toString(),
    },
  }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const response = await courseApi.getListChapter(`${params?.courseID}`);
  const chapterList = response.data;
  return {
    props: {
      chapterList,
    },
  };
};

export default CourseID;
