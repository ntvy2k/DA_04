import React, { Fragment, useEffect, useState } from 'react';
import { Course } from '../../moduleType';
import Link from 'next/link'
import styles from '../../styles/BarCourse.module.css'
import courseApi from '../../pages/api/courseApi';
import axios from 'axios';

function BarCourse({ courseName, current }: { courseName: any, current: any }) {
    const [data, setData] = useState<Course>()
    useEffect(() => {
        const fetch = async () => {
            const response = await axios.get(`/api/course/${courseName}/`)
            const course: Course = response.data
            setData(course)
        }
        courseName && fetch()
    }, [courseName])
    return (
        <div className={styles.barCourse}>
            {data?.chapters.map(({ id, name, lessons }) => {
                const chapterID = id
                return (
                    <div key={id}>
                        <h5 className='ps-2'>{name}</h5>
                        <ul className={styles.listChapter}>
                            {lessons.map(({ id, name }) => {
                                const active = (id === current) ? true : false
                                return (
                                    <li
                                        key={id}
                                        className={`${styles.link} ${active ? styles.active : ''}`}
                                    >
                                        <Link href={`/${courseName}/id?chapter=${chapterID}&lesson=${id}`}>
                                            <a className='text-decoration-none text-reset'>{name}</a>
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                )
            })}
        </div>
    );
}

export default BarCourse;