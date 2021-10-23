import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import courseApi from "../api/courseApi";
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
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

function CourseID() {
  const router = useRouter();
  const { courseID } = router.query;
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

  function handleClick(idChapter: number, idLesson: number | string) {
    const indexUrl = {
      courseID: `${courseID}`,
      chapterID: idChapter,
      lessonID: idLesson,
    }
    setUrl(indexUrl)
  }

  return (
    <HomeLayout>
      <div className="container">
        <HeaderCourse current={courseID} />
        <div className="row mt-4">
          <div className="col-2">
            <BarCourse courseName={courseID} current={null} />
          </div>
          <div className="col-10">
            {dataContent != null ? (
              <ContentChapter data={dataContent}></ContentChapter>
            ) : null}
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const res = await fetch(`http://nginx/api/course/1/chapter/1/lesson/1/content/`)
//   const data = await res.json()
//   return {
//     props: {
//       data: data
//     }
//   }
// }



export default CourseID;
