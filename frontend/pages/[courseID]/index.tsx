import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import courseApi from "../api/courseApi";
import { GetStaticPaths, GetStaticProps } from "next";
import ContentChapter from "../../components/ContentChapter";
import { ContentList, Course, CourseList } from "../../moduleType";
import HomeLayout from "../../components/Layouts/homeLayout";
import BarCourse from "../../components/BarCourse";
import HeaderCourse from "../../components/HeaderCourse";

interface url {
  courseID: number | string,
  chapterID: number,
  lessonID: number | string,
}

function CourseID({ course }: { course: Course }) {
  const router = useRouter();
  const { courseID } = router.query;
  const [data, setData] = useState<Array<CourseList>>([])
  const [dataContent, setDataContent] = useState<Array<ContentList | null>>([null])
  const [url, setUrl] = useState<url | null>(null)
  useEffect(() => {
    const fetch = async () => {
      const res = await courseApi.getAll()
      setData(res.data)
    }
    fetch()
  }, [])

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

  function handleClick(idChapter: number, idLesson: number | string) {
    const indexUrl = {
      courseID: `${courseID}`,
      chapterID: idChapter,
      lessonID: idLesson,
    }
    setUrl(indexUrl)
  }

  return (
    <>
      <HeaderCourse data={data} />
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
      courseID: course.slug,
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
