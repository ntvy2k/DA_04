import React from "react";
// import PropTypes from "prop-types";
import styles from "../../styles/HeaderCourse.module.css";
import Link from "next/link";
import { Course } from "../../moduleType";
import { GetServerSideProps } from "next";
import { AxiosResponse } from "axios";
import courseApi from "../../pages/api/courseApi";

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
