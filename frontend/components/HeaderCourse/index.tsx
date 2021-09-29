import React from "react";
// import PropTypes from "prop-types";
import styles from "../../styles/HeaderCourse.module.css";
import Link from "next/link";

// HeaderCourse.propTypes = {
//   data: PropTypes.array,
// };

interface Course {
  name: string;
  author: string;
  id: number;
  created_at: string;
  last_modified: string;
}

export type { Course };

// Can replace with
// type CourseList = Array<Course>
// const HeaderCourse: React.FC<{ data: CourseList }> = ({ data }) => {}

const HeaderCourse: React.FC<{ data: Array<Course> }> = ({ data }) => {
  return (
    <div>
      <ul className={styles.header}>
        {data.map((course) => {
          return (
            <li key={course.id} className={styles.header_course}>
              <Link href={`/${course.name}`} key={course.id}>
                {course.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default HeaderCourse;
