import React from 'react';
import PropTypes from 'prop-types';
import styles from "../../styles/HeaderCourse.module.css"
import Link from "next/link"

HeaderCourse.propTypes = {
    data: PropTypes.array
};

interface course {
    name: string,
    author: string,
    id: number,
    created_at: string,
    last_modified: string
}

function HeaderCourse(props: any) {
    const { data } = props;
    return (
        <div>
            <ul className={styles.header}>
                {data.map((course: course) => {
                    return <li
                        key={course.id}
                        className={styles.header_course}>
                        <Link
                            href={`/${course.name}`}
                            key={course.id}
                        >
                            {course.name}
                        </Link>
                    </li>
                })}
            </ul>
        </div>
    );
}

export default HeaderCourse;