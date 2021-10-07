import React, { ReactElement, useEffect, useState } from "react";
import { useRouter } from "next/router";
import courseApi from "../api/courseApi";
import { GetStaticPaths, GetStaticProps } from "next";
import ContentChapter from "../../components/ContentChapter";
import { ChapterList, ContentList, Course, CourseList } from "../../moduleType";
import Link from 'next/link'
import HomeLayout from "../../components/Layouts/homeLayout";
import BarCourse from "../../components/BarCourse";

interface url {
  courseID: number,
  chapterID: number,
  lessonID: number,
}

function CourseID({ course }: { course: Course }) {
  const router = useRouter();
  const { courseID } = router.query;
  const [chapterID, setChapterID] = useState<number>(1);
  const [dataContent, setDataContent] = useState<Array<ContentList | null>>([null])
  const [url, setUrl] = useState<url | null>(null)

  useEffect(() => {
    setDataContent([null])
  }, [courseID])

  useEffect(() => {
    const fetchData = async () => {
      const response = await courseApi.getContentList(url?.courseID, url?.chapterID, url?.lessonID)
      setDataContent(response.data)
    }
    if (url != null) {
      fetchData()
    }
  }, [url])

  function handleClick(idChapter: number, idLesson: number) {
    const indexUrl = {
      courseID: Number(courseID),
      chapterID: idChapter,
      lessonID: idLesson,
    }
    setUrl(indexUrl)
  }

  return (
    <>
      <div>
        <p>This is course: {courseID}</p>
        <BarCourse course={course} handleClick={handleClick} />

        {dataContent != null ? (
          <ContentChapter data={dataContent}></ContentChapter>
        ) : null}
      </div>
    </>
  );
}

CourseID.getLayout = HomeLayout

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch("http://nginx/api/course/")
  const data: Array<CourseList> = await response.json()
  const paths = data.map((course: CourseList) => ({
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
  const response = await fetch(`http://nginx/api/course/${params?.courseID}/`)
  const course: Course = await response.json()
  return {
    props: {
      course,
    },
  };
};



export default CourseID;
