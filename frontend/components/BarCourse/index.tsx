import React, { Fragment } from 'react';
import { Course } from '../../moduleType';
import Link from 'next/link'

interface barCourse {
    course: Course
    handleClick: Function
}

function BarCourse(props: barCourse) {
    const { course, handleClick } = props
    function click(chapterID: number, lessonID: number) {
        handleClick(chapterID, lessonID)
    }
    return (
        <>
            {course.chapters.map(({ id, name, lessons }) => {
                const chapterID = id
                return (
                    <div key={id}>
                        <h3>{name}</h3>
                        <ul>
                            {lessons.map(({ id, name }) => {
                                return (
                                    <li key={id} onClick={() => click(chapterID, id)}>
                                        {name}
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                )
            })}
        </>
    );
}

export default BarCourse;