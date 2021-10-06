// Just Experimental
import { GetStaticProps } from "next";
import Head from "next/head";
import type { Course } from "../moduleType";
import React from "react";
import axios from "axios";

type Text = {
  type: "text";
  context: string;
};

// Playground Zone
type EditorTheme = "vs-dark" | "light";

// Co cai complier nao thi them cai do vo thoi
type ProgrammingLanguage = "python" | "javascript" | "php";

type PlayGroundContext = {
  button: true | false;
  theme: EditorTheme;
  language: ProgrammingLanguage;
  default_value: string;
};

type PlayGround = {
  type: "playground";
  context: PlayGroundContext;
};
// End Playground Zone

type Content = {
  // "/api/course/{course_id}/chapter/{chapter_id}/lesson/{lesson_id}/content/"
  lesson: number; // Lesson's ID                            ^^^^^^^
  title: string;
  content: Text | PlayGround;
};
// ========Init Text Content=============

const default_text: Text = {
  type: "text",
  context: "<div>Hello World</div>",
};

const init_text_content: Content = {
  // "/api/course/1/chapter/1/lesson/2/content/"
  lesson: 2, //                     ^^
  title: "mycontent",
  content: default_text,
};

// =========Init Playground Content========

const default_pg_context: PlayGroundContext = {
  button: false,
  theme: "vs-dark",
  language: "python",
  default_value: 'print("Hello World")',
};

const default_playground: PlayGround = {
  type: "playground",
  context: default_pg_context,
};

const init_playground_content: Content = {
  // "/api/course/1/chapter/1/lesson/2/content/"
  lesson: 2, //                      ^
  title: "my play ground content",
  content: default_playground,
};

// ==========Init Data============
const initData = [init_text_content, init_playground_content];

// ==========Send Data=============

// client(not nextjs) -> server (nginx) -> backend-api
const send_content = async (content: Content) => {
  const url = "/api/course/1/chapter/4/lesson/1/content/";
  const response = await axios.post(url, content);
  const data = await response.data;
  console.log("data submit:", data);
  return data;
};

// ==============================

// Ke cai nay di
const CourseElement = ({ course }: { course: Course }) => {
  return (
    <div>
      <p>{course.id}</p>
      <p>{course.name}</p>
      <p>{course.author}</p>
    </div>
  );
};

const Experimental = ({ data }: { data: Array<Course> }) => {
  const [big_content, set_big_content] = React.useState<Array<Content>>([]);

  React.useEffect(() => {
    set_big_content(initData);
  }, []);

  const handleSubmit = () => {
    for (let i = 0; i < big_content.length; i = i + 1) {
      send_content(big_content[i]);
    }
  };

  return (
    <div>
      <Head>
        <title>Experimental</title>
        <meta name="description" content="Just test" />
      </Head>
      <div>
        {data.map((c) => (
          <CourseElement key={c.id} course={c} />
        ))}
      </div>

      <button type="button" onClick={() => handleSubmit()}>
        JustTest
      </button>
    </div>
  );
};

//server render...
// nextjs -> nginx -> backend-api
export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch("http://nginx/api/course/");
  const data: Array<Course> = await res.json();
  return { props: { data } };
};

export default Experimental;
