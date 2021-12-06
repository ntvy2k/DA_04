import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import SearchLayout from '../../../../../../components/Layouts/searchLayout';
import styles from '../../../../../../styles/AddContent.module.css'
import courseApi from '../../../../../api/courseApi';
import AddText, { AddPlayGround } from '../../../../../../components/Content';

function AddContent() {
    const router = useRouter()
    const { editcourse, lessonid, chapterid, contentid } = router.query
    const [data, setData] = useState<any>()
    const [dataChange, setDataChange] = useState<any>()
    useEffect(() => {
        const config = {
            headers: { Authorization: `Token ${localStorage.getItem("key")}` },
        };
        const fetch = async () => {
            const res = await courseApi.getMyContentById(editcourse, chapterid, lessonid, contentid, config)
            setData(res.data)
        }
        fetch()
    }, [])
    const handleChange = useCallback((valueChange: any) => {
        setDataChange(valueChange)
    }, [])
    const handleSubmit = () => {
        const config = {
            headers: { Authorization: `Token ${localStorage.getItem("key")}` },
        };
        if (dataChange) {
            const { id, ...newObject } = dataChange
            const newData = {
                lesson: lessonid,
                title: 'test',
                content: newObject
            }
            courseApi.updateContent(newData, editcourse, chapterid, lessonid, contentid, config)
            router.push(`/user/mycourse/${editcourse}/addcontent?chapterid=${chapterid}&lessonid=${lessonid}`)
        }
    }
    const handleDelete = () => {
        const config = {
            headers: { Authorization: `Token ${localStorage.getItem("key")}` },
        };
        courseApi.deleteContent(editcourse, chapterid, lessonid, contentid, config)
        router.push(`/user/mycourse/${editcourse}/addcontent?chapterid=${chapterid}&lessonid=${lessonid}`)
    }
    return (
        <SearchLayout>
            <div className={`container ${styles.wrapper} mt-5`}>
                {
                    data && (data.content.type === 'text' ? (
                        <AddText
                            id={data.id}
                            value={data.content.value}
                            onSubmit={handleChange}
                        />
                    ) : (
                        <AddPlayGround
                            id={data.id}
                            currentValue={data.content.value}
                            button={data.content.button}
                            onSubmit={handleChange}
                        />
                    ))
                }
                {dataChange && <button className={`${styles.button} mt-3`} onClick={() => handleSubmit()} >Submit</button>}
                <button className={`${styles.button} mt-3`} onClick={() => handleDelete()} >Delete</button>
            </div>
        </SearchLayout>
    );
}

export default AddContent;