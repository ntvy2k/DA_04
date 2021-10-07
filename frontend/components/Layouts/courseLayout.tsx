import { useRouter } from 'next/router';
import React, { ReactElement, useEffect, useState } from 'react';
import { Course, CourseList } from '../../moduleType';
import courseApi from '../../pages/api/courseApi';
import HeaderCourse from '../HeaderCourse';

export default function CourseLayout(page: ReactElement) {
    const router = useRouter();
    const [data, setData] = useState<Array<CourseList>>([]);
    useEffect(() => {
        const fetchData = async () => {
            const reponse = await courseApi.getAll()
            setData(reponse.data)
        }
        fetchData()
        console.log(router)
    }, [])
    return (
        <>
            <HeaderCourse data={data} />
            {/* <ul>{listChapter.map(({ name, id }) => {
                return (
                    <li key={id}>{name}</li>
                )
            })}</ul> */}
            {page}
        </>
    );
}