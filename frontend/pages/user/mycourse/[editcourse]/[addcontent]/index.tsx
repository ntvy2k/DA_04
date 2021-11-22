import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import HomeLayout from '../../../../../components/Layouts/homeLayout';
import PHP from '../../../../../components/RunCode/PHP';
import courseApi from '../../../../api/courseApi';
import "suneditor/dist/css/suneditor.min.css";
import { dataContent } from '../../../../../moduleType';
import AddText, { AddPlayGround } from '../../../../../components/Content';
import styles from '../../../../../styles/AddContent.module.css'
import { PencilSquare, XSquareFill } from 'react-bootstrap-icons';
import Link from 'next/link'

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
    console.log(oldData)
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
    console.log(oldData)
    return (
        <HomeLayout>
            <div className={`container ${styles.wrapper}`}>
                {/* <AddContent></AddContent> */}
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
                                    <PHP
                                        value={content.value}
                                        button={content.button}
                                    />
                                </div>
                            )
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
                                        button={content.button}
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
        </HomeLayout>
    );
}

export default AddContentPage;