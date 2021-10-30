import React, { useEffect, useState } from 'react';
import { AddPlayGround, AddText } from '../../../components/Content';
import { dataContent } from '../../../moduleType';
import courseApi from '../../../pages/api/courseApi'
import styles from '../../../styles/AddContent.module.css'
import { ExclamationCircle, XSquareFill } from 'react-bootstrap-icons';
import { store } from '../../../app/store';
import { useRouter } from 'next/router';


function AddContent() {
    const router = useRouter()
    const [content, setContent] = useState<Array<JSX.Element>>([])
    const [numChild, setNumChild] = useState<number>(0)
    const [submitContent, setSubmitContent] = useState<Array<any>>([])
    const [data, setData] = useState<dataContent>()
    const handleOnChangeValue = (value: dataContent) => {
        setData(value)
    }
    const handleCloseComponent = (index: number) => {
        const newContent = [...content]
        newContent.splice(index, 1)
        setContent(newContent)
        submitContent.splice(index, 1)
    }
    useEffect(() => {
        if (data != undefined) {
            const checkValue = submitContent.some((content) => {
                return content.id == data.id
            })
            // const checkValue = submitContent.findIndex(obj => obj.id == data.id)
            if (checkValue) {
                submitContent.map((content) => {
                    if (content.id === data.id) {
                        content.value = data.value
                    }
                })
            } else {
                setSubmitContent([...submitContent, data])
            }
        }
    }, [data])

    function handleSubmit() {
        const config = {
            headers: { Authorization: `Token ${localStorage.getItem("key")}` },
        };
        submitContent.map(async ({ id, ...newObject }) => {
            const value = {
                lesson: router.query.lessonid,
                title: "test",
                content: newObject
            }
            courseApi.postContent(value, router.query.editcourse, router.query.chapterid, router.query.lessonid, config)
        })
        router.push('/user/mycourse')
    }
    function handleClick(type: 'text' | 'playGroundWithRunCode') {
        switch (type) {
            case 'text': {
                setContent([...content,
                <AddText
                    id={numChild}
                    onSubmit={handleOnChangeValue}
                />])
                break
            }
            case 'playGroundWithRunCode': {
                setContent([...content,
                <AddPlayGround
                    id={numChild}
                    button={true}
                    onSubmit={handleOnChangeValue}
                />])
                break
            }
        }
        setNumChild(numChild + 1)
    }

    return (
        <div className={styles.content}>
            {/* <div className='d-flex align-items-center mb-3'>
                {courseUser.length !== 0 ? (
                    <div>
                        <p>Chọn khóa học</p>
                        <select className={styles.select} onChange={(e) => { setCurrentCourse(e.target.value) }}>
                            {courseUser.map(({ name, slug }) => {
                                return (
                                    <option key={slug} value={slug}>{name}</option>
                                )
                            })}
                        </select>
                    </div>
                ) : (
                    <div className={styles.text_alert}>
                        Mày chưa có khóa học nào hết
                        <ExclamationCircle className='ms-1' />
                    </div>
                )}
                {chapter.length !== 0 ? (
                    <div className='ms-5'>
                        <p>Chọn chương</p>
                        <select className={styles.select} onChange={(e) => { setCurrentChapter(e.target.value) }}>
                            {chapter.map(({ id, name }) => {
                                return (
                                    <option key={id} value={id}>{name}</option>
                                )
                            })}
                        </select>
                    </div>
                ) : (
                    <div className={styles.text_alert}>
                        Khóa học này không có chapter
                        <ExclamationCircle className='ms-1' />
                    </div>
                )}
                {lesson.length !== 0 ? (
                    <div className='ms-5'>
                        <p>Chọn bài học</p>
                        <select className={styles.select} onChange={(e) => { setCurrentLesson(e.target.value) }}>
                            {lesson.map(({ id, name }) => {
                                return (
                                    <option key={id} value={id}>{name}</option>
                                )
                            })}
                        </select>
                    </div>
                ) : (
                    <div className={styles.text_alert}>
                        Chapter này không có lesson
                        <ExclamationCircle className='ms-1' />
                    </div>
                )}
            </div> */}
            <div>
                <div className='mb-3'>
                    <button className={styles.button} onClick={() => handleClick('text')}>Add text</button>
                    <button className={styles.button} onClick={() => handleClick('playGroundWithRunCode')}> Add PlayGround</button>
                </div>
                {content.map((x, index) => {
                    return <div className='mb-3' key={index} >
                        <button className={styles.button_close} onClick={() => handleCloseComponent(index)} ><XSquareFill className='text-danger fs-5' /></button>
                        {x}
                    </div>
                }
                )}
                <button className={styles.button} onClick={() => handleSubmit()} >Submit</button>
            </div>
        </div >
    );
}
export default AddContent