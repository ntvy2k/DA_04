import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { Fragment, useCallback, useEffect, useState } from 'react';
import HomeLayout from '../../../../../components/Layouts/homeLayout';
import PHP from '../../../../../components/RunCode/PHP';
import courseApi from '../../../../api/courseApi';
import "suneditor/dist/css/suneditor.min.css";
import { dataContent } from '../../../../../moduleType';
import AddText, { AddPlayGround } from '../../../../../components/Content';
import styles from '../../../../../styles/AddContent.module.css'
import { ChevronDoubleRight, PencilSquare, XSquareFill } from 'react-bootstrap-icons';
import Link from 'next/link'
import Head from 'next/head'
import Python from '../../../../../components/RunCode/Python';
import Java from '../../../../../components/RunCode/Java';
import JavaScipt from '../../../../../components/RunCode/JavaScript';

const SunEditor = dynamic(() => import("suneditor-react"), {
    ssr: false,
})

function AddContentPage() {
    const redirecRouter = useRouter()
    const router = useRouter().query
    const [data, setData] = useState<Array<any>>([])
    const [oldData, setOldData] = useState<Array<any>>([])
    // const [showButtonAdd, setShowButtonAdd] = useState<string>('')
    const [valueChange, setValueChange] = useState<any>()
    useEffect(() => {
        const { editcourse, chapterid, lessonid } = router
        const fetch = async () => {
            const res = await courseApi.getMyContent(editcourse, chapterid, lessonid, { headers: { Authorization: `Token ${localStorage.getItem("key")}` } })
            const contentData = res.data.map(({ id, content }: { id: any, content: any }) => {
                return { id, ...content }
            })
            setOldData(contentData)
        }
        fetch()
    }, [])
    useEffect(() => {
        if (valueChange) {
            const newData = [...data]
            newData[valueChange.id] = valueChange
            setData(newData)
        }
    }, [valueChange])
    // console.log(valueSubmit)
    const handleChange = useCallback((valueContent: dataContent) => {
        // const newValue = [...value]
        // newValue[valueContent.id] = valueContent
        // setValue(newValue)
        setValueChange(valueContent)
    }, [])
    const handleAdd = (type: 'text' | 'playGroundWithRunCode') => {
        switch (type) {
            case 'text': {
                setData([...data, { type: 'text', value: '' }])
                // setShowButtonAdd('text')
                break
            }
            case 'playGroundWithRunCode': {
                setData([...data, { type: 'playground', value: '', button: true, language: 'javascript' }])
                // setShowButtonAdd('playGround')
                break
            }
        }
    }
    const handleClose = (index: any) => {
        // setData(data.splice(index, 1))
        // setValueSubmit(valueSubmit.splice(index, 1))
        // setData(prev => prev.splice(index, 1))
        const newData = [...data]
        newData.splice(index, 1)
        setData(newData)
    }
    const handleEdit = (index: any) => {
        const url = `/user/mycourse/${router.editcourse}/addcontent?lessonid=${router.lessonid}&chapterid=${router.chapterid}/${index}`
        redirecRouter.push(url)
    }
    const handleSubmit = () => {
        const config = {
            headers: { Authorization: `Token ${localStorage.getItem("key")}` },
        };
        data.map(async ({ id, ...newObject }) => {
            const value = {
                lesson: router.lessonid,
                title: "test",
                content: newObject
            }
            courseApi.postContent(value, router.editcourse, router.chapterid, router.lessonid, config)
        })
        redirecRouter.push(`/user/mycourse/${router.editcourse}`)
    }
    return (
        <HomeLayout>
            <Fragment>
                <Head>
                    <title>Thêm nội dung {`${router?.editcourse}`} | NháiW3school</title>
                </Head>
                <div className={`container ${styles.wrapper}`}>
                    {/* <AddContent></AddContent> */}
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
                            <a className='text-reset text-decoration-none' onClick={() => redirecRouter.back()}>
                                <h4 className={styles.text}>Thêm chương</h4>
                            </a>
                        </Link>
                        <ChevronDoubleRight className={styles.text_icon} />
                        <Link href={redirecRouter.asPath}>
                            <a className='text-reset text-decoration-none'>
                                <h4 className={styles.text}>Thêm nội dung</h4>
                            </a>
                        </Link>
                    </div>
                    <div className={`mb-3 ${styles.sticky}`} >
                        <button
                            className={`${styles.button}`}
                            onClick={() => handleAdd('text')}>Add text</button>
                        <button
                            className={`${styles.button}`}
                            onClick={() => handleAdd('playGroundWithRunCode')}> Add PlayGround</button>
                    </div>
                    {oldData.map((content, index) => {
                        switch (content?.type) {
                            case 'text': {
                                return (
                                    <div key={index}>
                                        <Link
                                            href={{
                                                pathname: '/user/mycourse/[editcourse]/[addcontent]/[contentid]',
                                                query: {
                                                    editcourse: router.editcourse,
                                                    addcontent: `addcontent`,
                                                    contentid: content.id,
                                                    lessonid: `${router.lessonid}`,
                                                    chapterid: `${router.chapterid}`
                                                }
                                            }}
                                        >
                                            <a className={styles.button_close}>
                                                <PencilSquare className='text-warning fs-5' />
                                            </a>
                                        </Link>
                                        {/* <button className={styles.button_close} onClick={() => handleEdit(index)}>
                                        <PencilSquare className='text-warning fs-5' />
                                    </button> */}
                                        <SunEditor
                                            setContents={content.value}
                                            hideToolbar={true}
                                            disable={true}
                                            height="100%"
                                        />
                                    </div>)
                            }
                            case 'playground': {
                                switch (content.language) {
                                    case 'css':
                                    case 'javascript':
                                    case 'html': {
                                        return (
                                            <div key={content.id}>
                                                <Link
                                                    href={{
                                                        pathname: '/user/mycourse/[editcourse]/[addcontent]/[contentid]',
                                                        query: {
                                                            editcourse: router.editcourse,
                                                            addcontent: `addcontent`,
                                                            contentid: content.id,
                                                            lessonid: `${router.lessonid}`,
                                                            chapterid: `${router.chapterid}`
                                                        }
                                                    }}
                                                >
                                                    <a className={styles.button_close}>
                                                        <PencilSquare className='text-warning fs-5' />
                                                    </a>
                                                </Link>
                                                <JavaScipt
                                                    value={content.value}
                                                    button={content.button}
                                                    theme={content.themeVS}
                                                />
                                            </div>
                                        )
                                    }
                                    case 'php': {
                                        return (
                                            <div key={content.id}>
                                                <Link
                                                    href={{
                                                        pathname: '/user/mycourse/[editcourse]/[addcontent]/[contentid]',
                                                        query: {
                                                            editcourse: router.editcourse,
                                                            addcontent: `addcontent`,
                                                            contentid: content.id,
                                                            lessonid: `${router.lessonid}`,
                                                            chapterid: `${router.chapterid}`
                                                        }
                                                    }}
                                                >
                                                    <a className={styles.button_close}>
                                                        <PencilSquare className='text-warning fs-5' />
                                                    </a>
                                                </Link>
                                                <PHP
                                                    value={content.value}
                                                    button={content.button}
                                                    theme={content.themeVS}
                                                />
                                            </div>
                                        )
                                    }
                                    case 'java': {
                                        return (
                                            <div key={content.id}>
                                                <Link
                                                    href={{
                                                        pathname: '/user/mycourse/[editcourse]/[addcontent]/[contentid]',
                                                        query: {
                                                            editcourse: router.editcourse,
                                                            addcontent: `addcontent`,
                                                            contentid: content.id,
                                                            lessonid: `${router.lessonid}`,
                                                            chapterid: `${router.chapterid}`
                                                        }
                                                    }}
                                                >
                                                    <a className={styles.button_close}>
                                                        <PencilSquare className='text-warning fs-5' />
                                                    </a>
                                                </Link>
                                                <Java
                                                    value={content.value}
                                                    button={content.button}
                                                    theme={content.themeVS}
                                                />
                                            </div>
                                        )
                                    }
                                    case 'python': {
                                        return (
                                            <div key={content.id}>
                                                <Link
                                                    href={{
                                                        pathname: '/user/mycourse/[editcourse]/[addcontent]/[contentid]',
                                                        query: {
                                                            editcourse: router.editcourse,
                                                            addcontent: `addcontent`,
                                                            contentid: content.id,
                                                            lessonid: `${router.lessonid}`,
                                                            chapterid: `${router.chapterid}`
                                                        }
                                                    }}
                                                >
                                                    <a className={styles.button_close}>
                                                        <PencilSquare className='text-warning fs-5' />
                                                    </a>
                                                </Link>
                                                <Python
                                                    value={content.value}
                                                    button={content.button}
                                                    theme={content.themeVS}
                                                />
                                            </div>
                                        )
                                    }
                                }
                            }
                        }
                    })}
                    {data.map((content, index) => {
                        switch (content?.type) {
                            case 'text': {
                                return (
                                    <div className='mb-3' key={index} >
                                        <button className={styles.button_close} onClick={() => handleClose(index)} ><XSquareFill className='text-danger fs-5' /></button>
                                        <AddText
                                            key={index}
                                            id={index}
                                            value={content.value}
                                            onSubmit={handleChange}
                                        />
                                    </div>
                                )
                            }
                            case 'playground': {
                                return (
                                    <div className='mb-3' key={index} >
                                        <button className={styles.button_close} onClick={() => handleClose(index)} ><XSquareFill className='text-danger fs-5' /></button>
                                        <AddPlayGround
                                            key={index}
                                            id={index}
                                            currentButton={content.button}
                                            currentLanguage={content.language}
                                            currentThemeVS={content.themeVS}
                                            onSubmit={handleChange}
                                            currentValue={content.value}
                                        />
                                    </div>
                                )
                            }
                        }
                    })}
                    <button className={styles.button} onClick={() => handleSubmit()} >Submit</button>
                </div>
            </Fragment>
        </HomeLayout>
    );
}

export default AddContentPage;