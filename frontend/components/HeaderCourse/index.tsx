import React from "react";
// import PropTypes from "prop-types";
import styles from "../../styles/HeaderCourse.module.css";
import Link from "next/link";
import { Course } from "../../moduleType/course"

// HeaderCourse.propTypes = {
//   data: PropTypes.array,
// };

// Can replace with
// type CourseList = Array<Course>
// const HeaderCourse: React.FC<{ data: CourseList }> = ({ data }) => {}

function HeaderCourse({ data }: { data: Array<Course> }) {
  return (
    <div>
      <ul className={styles.header}>
        {data.map(({ id, name }) => {
          return (
            <li key={id} className={styles.header_course}>
              <Link href={`/${id}`} key={id}>
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
