import React, { useEffect, useState } from "react";
import styles from "../../styles/HeaderCourse.module.css";
import Link from "next/link";
import { Course, CourseList } from "../../moduleType";
import courseApi from "../../pages/api/courseApi";
import { HouseFill } from "react-bootstrap-icons";

function HeaderCourse({ current }: { current: any }) {
  const [data, setData] = useState<Array<CourseList>>([])
  useEffect(() => {
    const fetch = async () => {
      const res = await courseApi.getAll()
      setData(res.data)
    }
    fetch()
  }, [])
  return (
    <ul className={styles.header}>
      <li className={styles.header_course}>
        <Link href={`/`}>
          <a className={styles.header_link_home}><HouseFill /></a>
        </Link>
      </li>
      {data.map(({ id, name, slug }) => {
        const active = (slug === current) ? true : false
        return (
          <li key={id} className={`${styles.header_course} ${active ? styles.active : ''}`}>
            <Link href={`/khoahoc/${slug}`} key={id}>
              <a className={styles.header_link}>{name}</a>
            </Link>
          </li>
        );
      })}
    </ul >
  );
};


export default HeaderCourse;
