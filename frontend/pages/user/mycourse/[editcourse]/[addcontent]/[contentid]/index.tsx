import { useRouter } from 'next/router';
import React, { Fragment, useCallback, useEffect, useState } from 'react';
import SearchLayout from '../../../../../../components/Layouts/searchLayout';
import styles from '../../../../../../styles/AddContent.module.css'
import courseApi from '../../../../../api/courseApi';
import AddText, { AddPlayGround } from '../../../../../../components/Content';
import Head from 'next/head'
import Link from 'next/link'
import { ChevronDoubleRight } from 'react-bootstrap-icons';

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
            <Fragment>
                <Head>
                    <title>Sửa nội dung | NháiW3school</title>
                </Head>
                <div className={`container ${styles.wrapper} mt-5`}>
                    <div className='d-flex align-items-center mb-3'>
                        <Link href='/user'>
                            <a className='text-reset text-decoration-none'>
                                <h4 className={styles.text}>Bảng điều khiển</h4>
                            </a>
                        </Link>
                        <ChevronDoubleRight className={styles.text_icon} />
                        <Link href='/user/mycourse'>
                            <a className='text-reset text-decoration-none'>
                                <h4 className={styles.text}>Các khóa học của tôi</h4>
                            </a>
                        </Link>
                        <ChevronDoubleRight className={styles.text_icon} />
                        <Link href='/user/mycourse'>
                            <a className='text-reset text-decoration-none' onClick={() => router.back()}>
                                <h4 className={styles.text}>Sửa nội dung</h4>
                            </a>
                        </Link>
                    </div>
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
                                currentButton={data.content.button}
                                currentLanguage={data.content.language}
                                currentThemeVS={data.content.themeVS}
                                onSubmit={handleChange}
                            />
                        ))
                    }
                    {dataChange && <button className={`${styles.button} mt-3`} onClick={() => handleSubmit()} >Submit</button>}
                    <button className={`${styles.button} mt-3`} onClick={() => handleDelete()} >Delete</button>
                </div>
            </Fragment>
        </SearchLayout>
    );
}

export default AddContent;