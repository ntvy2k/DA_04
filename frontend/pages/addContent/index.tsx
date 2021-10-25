import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { AddPlayGround, AddText } from '../../components/Content';
import { dataContent } from '../../moduleType';
import axiosServer from '../api/axiosServer';
import courseApi from '../api/courseApi';
import styles from '../../styles/AddContent.module.css'
import { ExclamationCircle, XSquare, XSquareFill } from 'react-bootstrap-icons';
import { useAppDispatch } from '../../app/hooks';
import { fetch_user } from '../../features/auth';
import { store } from '../../app/store';
import { useRouter } from 'next/router';


function AddContent() {
    const router = useRouter()
    const [content, setContent] = useState<Array<JSX.Element>>([])
    const [numChild, setNumChild] = useState<number>(0)
    const [submitContent, setSubmitContent] = useState<Array<any>>([])
    const [data, setData] = useState<dataContent>()

    const [courseUser, setCourseUser] = useState<Array<any>>([])
    const [chapter, setChapter] = useState<Array<any>>([])
    const [lesson, setLesson] = useState<Array<any>>([])

    const [currentCourse, setCurrentCourse] = useState<any>()
    const [currentChapter, setCurrentChapter] = useState<any>()
    const [currentLesson, setCurrentLesson] = useState<any>()
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
        const fetchCourseData = async () => {
            const res = await courseApi.getAll()
            const profile = store.getState().auth.user
            const userName = `${profile?.last_name} ${profile?.first_name}`
            const myCourse = res.data.filter(course => course.author === userName)
            setCourseUser(myCourse)
                ; (myCourse.length != 0) ? setCurrentCourse(myCourse[0].slug) : null
        }
        fetchCourseData()
    }, [])
    useEffect(() => {
        const fetchChapter = async () => {
            const res = await courseApi.getListChapter(currentCourse)
            setChapter(res.data)
                ; (res.data.length != 0) ? setCurrentChapter(res.data[0].id) : setCurrentChapter(null)
        }
        fetchChapter()
    }, [currentCourse])
    useEffect(() => {
        const fetchLesson = async () => {
            const res = await courseApi.getListLesson(currentCourse, currentChapter)
            setLesson(res.data)
                ; (res.data.length != 0) ? setCurrentLesson(res.data[0].id) : setCurrentLesson(null)
        }
        if (currentChapter) { fetchLesson() }
        else {
            setCurrentLesson(null)
            setLesson([])
        }
    }, [currentChapter])
    useEffect(() => {
        if (data != undefined) {
            const checkValue = submitContent.some((content) => {
                return content.id == data.id
            })
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
                lesson: currentLesson,
                title: "test",
                content: newObject
            }
            courseApi.postContent(value, currentCourse, currentChapter, currentLesson, config)
        })
        router.push('/user')

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
            <div className='d-flex align-items-center mb-3'>
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
            </div>
            {currentLesson ? (
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
            ) : null}
        </div >
    );
}
export default AddContent