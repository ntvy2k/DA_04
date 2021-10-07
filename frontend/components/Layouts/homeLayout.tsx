import React, { ReactElement, useEffect, useState } from 'react';
import { Course, CourseList } from '../../moduleType';
import courseApi from '../../pages/api/courseApi';
import HeaderCourse from '../HeaderCourse';

export default function HomeLayout(page: ReactElement) {
    const [data, setData] = useState<Array<CourseList>>([])
    useEffect(() => {
        const fetchData = async () => {
            const reponse = await courseApi.getAll()
            setData(reponse.data)
        }
        fetchData()
    }, [])
    return (
        <>
            <HeaderCourse data={data} />
            {page}
        </>
    );
}