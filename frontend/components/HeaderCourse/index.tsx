import React from "react";
import styles from "../../styles/HeaderCourse.module.css";
import Link from "next/link";
import { Course, CourseList } from "../../moduleType";

function HeaderCourse({ data }: { data: Array<CourseList> }) {
  return (
    <div>
      <ul className={styles.header}>
        {data.map(({ id, name, slug }) => {
          return (
            <li key={id} className={styles.header_course}>
              <Link href={`/${slug}`} key={id}>
                {name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};


export default HeaderCourse;
