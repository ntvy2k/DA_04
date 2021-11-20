import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import HomeLayout from '../../../../components/Layouts/homeLayout';
import PHP from '../../../../components/RunCode/PHP';
import courseApi from '../../../api/courseApi';
import "suneditor/dist/css/suneditor.min.css";
import { dataContent } from '../../../../moduleType';
import AddText, { AddPlayGround } from '../../../../components/Content';
import styles from '../../../../styles/AddContent.module.css'
import { XSquareFill } from 'react-bootstrap-icons';

const SunEditor = dynamic(() => import("suneditor-react"), {
    ssr: false,
})

function AddContentPage() {
    const router = useRouter().query
    const [data, setData] = useState<Array<any>>([])
    const [valueChange, setValueChange] = useState<any>()
    useEffect(() => {
        const { editcourse, chapterid, lessonid } = router
        const fetch = async () => {
            const res = await courseApi.getMyContent(editcourse, chapterid, lessonid, { headers: { Authorization: `Token ${localStorage.getItem("key")}` } })
            const contentData = res.data.map(({ content }: { content: any }) => {
                return content
            })
            setData(contentData)
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
                break
            }
            case 'playGroundWithRunCode': {
                setData([...data, { type: 'playground', value: '', button: true, language: 'javascript' }])
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
        console.log(newData)
    }
    console.log(data)
    return (
        <HomeLayout>
            <div className='container'>
                {/* <AddContent></AddContent> */}
                <div className={`mb-3 ${styles.sticky}`} >
                    <button className={styles.button} onClick={() => handleAdd('text')}>Add text</button>
                    <button className={styles.button} onClick={() => handleAdd('playGroundWithRunCode')}> Add PlayGround</button>
                </div>
                {data.map((content, index) => {
                    switch (content?.type) {
                        case 'text': {
                            return (
                                <div className='mb-3' key={index} >
                                    <button className={styles.button_close} onClick={() => handleClose(index)} ><XSquareFill className='text-danger fs-5' /></button>
                                    <AddText key={index} id={index} value={content.value} onSubmit={handleChange} />
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
            </div>
        </HomeLayout>
    );
}

export default AddContentPage;