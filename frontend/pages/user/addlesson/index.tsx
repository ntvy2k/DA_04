import { FastField, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import HomeLayout from '../../../components/Layouts/homeLayout';
import UserLayout from '../../../components/Layouts/userLayout';
import * as Yup from 'yup'
import courseApi from '../../api/courseApi';
import { store } from '../../../app/store';
import SelectField from '../../../components/CustomFields/SelectField';
import InputField from '../../../components/CustomFields/InputField';
import styles from '../../../styles/AddChapter.module.css'
import { useRouter } from 'next/router';

function AddLesson() {
    const router = useRouter()
    const [optionsCourse, setOptionsCourse] = useState<Array<any>>([])
    const [optionsChapter, setOptionsChapter] = useState<Array<any>>([])
    const [selectedCourse, setSelectedCourse] = useState<any>()
    const initialValues = {
        course: '',
        chapter: '',
        lesson: '',
    }
    const validationSchema = Yup.object().shape({
        course: Yup.string().required('This field is required'),
        chapter: Yup.string().required('This field is required'),
        lesson: Yup.string().required('This field is required'),
    })
    useEffect(() => {
        const fetch = async () => {
            const resCourse = await courseApi.getAll()
            const mydata = resCourse.data.filter(data => data.author === store.getState().auth.userName)
            setOptionsCourse(mydata.map(({ name, slug }) => {
                return ({
                    "name": name,
                    "value": slug
                })
            }))
        }
        fetch()
    }, [])
    useEffect(() => {
        const fetch = async () => {
            const resChapter = await courseApi.getListChapter(selectedCourse)
            setOptionsChapter(resChapter.data.map(({ name, id }) => {
                return ({
                    "name": name,
                    "value": id
                })
            }))
        }
        selectedCourse !== '' && fetch()
    }, [selectedCourse])
    console.log(optionsChapter)
    return (
        <HomeLayout>
            <UserLayout>
                <div>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={({ chapter, course, lesson }) => {
                            const config = {
                                headers: { Authorization: `Token ${localStorage.getItem("key")}` },
                            };
                            const value = {
                                "name": lesson,
                                "chapter": chapter,
                            }
                            courseApi.postLesson(value, course, chapter, config)
                            router.push('/user')
                        }}
                    >
                        {formikProps => {
                            const { values, errors, touched } = formikProps
                            values.course && setSelectedCourse(values.course)
                            return (
                                <Form>
                                    {optionsCourse.length !== 0 &&
                                        <FastField
                                            name='course'
                                            component={SelectField}

                                            label='Chọn khóa học'
                                            options={optionsCourse}
                                            labelOptions='Chọn một khóa học'
                                        />
                                    }
                                    {optionsChapter.length !== 0 &&
                                        <FastField
                                            name='chapter'
                                            component={SelectField}

                                            label='Chọn chương'
                                            options={optionsChapter}
                                            labelOptions='Chọn một chương'
                                        />
                                    }
                                    {values.chapter !== '' &&
                                        <FastField
                                            name='lesson'
                                            component={InputField}

                                            type='text'
                                            label='Nhập tên bài học'
                                            placeholder='Nhập...'
                                        />
                                    }
                                    <button
                                        className={styles.button}
                                        type='submit'
                                    >Thêm vào</button>
                                </Form>
                            )
                        }}
                    </Formik>
                </div>
            </UserLayout>
        </HomeLayout>
    );
}

export default AddLesson;