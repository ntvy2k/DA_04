import React, { useEffect, useState } from 'react';
import HomeLayout from '../../../components/Layouts/homeLayout';
import UserLayout from '../../../components/Layouts/userLayout';
import InputField from '../../../components/CustomFields/InputField';
import { FastField, Form, Formik } from 'formik';
import * as Yup from 'yup'
import styles from '../../../styles/AddChapter.module.css'
import SelectField from '../../../components/CustomFields/SelectField';
import courseApi from '../../api/courseApi';
import { store } from '../../../app/store';
import { useRouter } from 'next/router';

function AddChapter() {
    const router = useRouter()
    const [options, setOptions] = useState<any>()
    const initialValues = {
        name: '',
        course: '',
    }
    const validationSchema = Yup.object().shape({
        name: Yup.string().required('This field is required'),
        course: Yup.string().required('This field is required'),
    })
    useEffect(() => {
        const fetch = async () => {
            const res = await courseApi.getAll()
            const mydata = res.data.filter(data => data.author === store.getState().auth.userName)
            const data = mydata.map(({ name, id }) => {
                return ({
                    "value": id,
                    "name": name
                })
            })
            setOptions(data)
        }
        fetch()
    }, [])
    return (
        <HomeLayout>
            <UserLayout>
                <div className={styles.container}>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={(value) => {
                            const config = {
                                headers: { Authorization: `Token ${localStorage.getItem("key")}` },
                            };
                            const find = async () => {
                                const res = await courseApi.getAll()
                                const data = res.data.find(data => data.id == value.course)
                                courseApi.postChapter(value, data?.slug, config)
                            }
                            find()
                            router.push('/user')
                        }}
                    >
                        {formikProps => {
                            const { values, errors, touched } = formikProps
                            return (
                                <Form>
                                    {options &&
                                        <FastField
                                            name='course'
                                            component={SelectField}

                                            label='Chọn khóa học'
                                            options={options}
                                            labelOptions='Chọn một khóa học'
                                        />}
                                    <FastField
                                        name="name"
                                        component={InputField}

                                        type="text"
                                        label="Nhập tên chương"
                                        placeholder="Nhập..."
                                    />
                                    <button
                                        type='submit'
                                        className={styles.button}
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

export default AddChapter;