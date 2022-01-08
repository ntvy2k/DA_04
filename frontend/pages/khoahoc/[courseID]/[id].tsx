import React, { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import courseApi from "../../api/courseApi";
import { GetServerSideProps } from "next";
import ContentChapter from "../../../components/ContentChapter";
import { ContentList } from "../../../moduleType";
import HomeLayout from "../../../components/Layouts/homeLayout";
import BarCourse from "../../../components/BarCourse";
import HeaderCourse from "../../../components/HeaderCourse";
import Head from "next/head";
import TD4_SETTINGS from "../../../app/config";

interface url {
  courseID: number | string;
  chapterID: number;
  lessonID: number | string;
}

function ChapterID({ data }: { data: any }) {
  const router = useRouter();
  const { courseID, lesson } = router.query;
  const [dataContent, setDataContent] = useState<Array<ContentList | null>>([
    null,
  ]);
  const [url, setUrl] = useState<url | null>(null);
  useEffect(() => {
    setDataContent([null]);
  }, [courseID]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await courseApi.getContentList(
        url?.courseID,
        url?.chapterID,
        url?.lessonID
      );
      setDataContent(response.data);
    };
    if (url != null) {
      fetchData();
    }
  }, [url]);

  return (
    <HomeLayout>
      <Fragment>
        <Head>
          <title>
            {`${courseID}`} | {TD4_SETTINGS.title}
          </title>
        </Head>
        <div className="container" style={{ minHeight: "80vh" }}>
          <HeaderCourse current={courseID} />
          <div className="row mt-4">
            <div className="col-4 col-lg-2 col-md-3">
              <BarCourse courseName={courseID} current={lesson} />
            </div>
            <div className="col-8 col-lg-10 col-md-9">
              {data != [] ? (
                <ContentChapter data={data}></ContentChapter>
              ) : null}
            </div>
          </div>
        </div>
      </Fragment>
    </HomeLayout>
  );
}

// export const getStaticPaths: GetStaticPaths = async () => {
//     const response = await fetch("http://nginx/api/course/")
//     const data: Array<CourseList> = await response.json()
//     const paths = data.map((course: CourseList) => ({
//         params: {
//             courseID: course.slug,
//         },
//     }));
//     return {
//         paths,
//         fallback: false,
//     };
// };

// export const getStaticProps: GetStaticProps = async ({ params }) => {
//     const response = await fetch(`http://nginx/api/course/${params?.courseID}/`)
//     const course: Course = await response.json()
//     return {
//         props: {
//             course,
//         },
//     };
// };

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { courseID, chapter, lesson } = context.query;
  const res = await fetch(
    `http://nginx/api/course/${courseID}/chapter/${chapter}/lesson/${lesson}/content/`
  );
  const data = await res.json();
  return {
    props: {
      data: data,
    },
  };
};

export default ChapterID;
