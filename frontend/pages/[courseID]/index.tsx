import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { Chapter, Course } from '../../moduleType/course';
import courseApi from '../api/courseApi';
import { GetStaticPaths, GetStaticProps } from 'next';
import Link from "next/link"
import ContentChapter from '../../components/ContentChapter';

// Courses.propTypes = {

// };


function Courses({ chapterList }: { chapterList: Array<Chapter> }) {
    const router = useRouter()
    const { courseID } = router.query
    const [chapterID, setChapterID] = useState<number>()
    console.log(chapterList)

    function handleClick(id: number) {
        setChapterID(id)
    }

    return (
        <div>
            <p>This is course: {courseID}</p>
            <ul>
                {chapterList.map(({ id, name }) => {
                    return <li
                        key={id}
                        onClick={() => handleClick(id)}
                    >
                        {name}
                    </li>
                })}
            </ul>
            <ContentChapter id={chapterID}></ContentChapter>
        </div>
    );
}
export const getStaticPaths: GetStaticPaths = async () => {
    const responses = await courseApi.getAll()
    const data = responses.data
    const paths = data.map((course: Course) => ({
        params: {
            courseID: course.id.toString(),
        }
    }))
    return {
        paths,
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async (params: any) => {
    const response = await courseApi.getListChapter(Number(params.courseID))
    const chapterList = response.data
    return {
        props: {
            chapterList
        }
    }
}

export default Courses;