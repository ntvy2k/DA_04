import React, { useEffect, useState } from 'react';
import HomeLayout from '../../../components/Layouts/homeLayout';
import UserLayout from '../../../components/Layouts/userLayout';
import courseApi from '../../api/courseApi';
import styles from '../../../styles/AddCourse.module.css'
import { Formik, Form, FastField } from 'formik';
import SelectField from '../../../components/CustomFields/SelectField';
import CheckBoxField from '../../../components/CustomFields/CheckBoxField';
import * as Yup from 'yup'
import InputField from '../../../components/CustomFields/InputField';
import { useRouter } from 'next/router';

function AddCourse() {
    const router = useRouter()
    const [courseGroup, setCourseGroup] = useState<Array<any>>([])
    const [courseTopic, setCourseTopic] = useState<Array<any>>([])
    const [icons, setIcons] = useState<Array<any>>([])

    const inititalValues = {
        group: '',
        topics: [],
        icon: '',
        name: '',
    }

    const validationSchema = Yup.object().shape({
        group: Yup.string().required('This field is required'),
        topics: Yup.array().min(1, 'Need as least one'),
        icon: Yup.string().required('This field is required'),
        name: Yup.string().required('This field is required')
    })

    useEffect(() => {
        const fetchGroup = async () => {
            const res = await courseApi.getGroupCourse()
            setCourseGroup(res.data.map(({ name, id }) => {
                return ({
                    "value": id,
                    "name": name,
                })
            }
            ))
            const resTopic = await courseApi.getTopicCourse()
            const resIcon = await courseApi.getListIcon()
            setCourseTopic(resTopic.data.map(({ id, name }) => {
                return ({
                    "name": name,
                    "value": id,
                })
            }))
            setIcons(resIcon.data.map(({ name, nontation }) => {
                return ({
                    "name": name,
                    "value": nontation
                })
            }))
        }
        fetchGroup()
    }, [])
    return (
        <HomeLayout>
            <UserLayout>
                <div className={styles.main}>
                    <Formik
                        initialValues={inititalValues}
                        validationSchema={validationSchema}
                        onSubmit={(value) => {
                            const config = {
                                headers: { Authorization: `Token ${localStorage.getItem("key")}` },
                            };
                            courseApi.postCourse(value, config)
                            router.push('/user')
                        }}
                    >
                        {formikProps => {
                            return (
                                <Form>
                                    {courseGroup.length !== 0 &&
                                        <FastField
                                            name='group'
                                            component={SelectField}

                                            label='Chọn nhóm khóa học'
                                            options={courseGroup}
                                            labelOptions='Chọn một nhóm'
                                        />
                                    }
                                    {courseTopic.length !== 0 &&
                                        <FastField
                                            name='topics'
                                            component={CheckBoxField}

                                            label='Chọn các chủ đề'
                                            options={courseTopic}
                                        />
                                    }
                                    {icons.length !== 0 &&
                                        <FastField
                                            name='icon'
                                            component={SelectField}

                                            label='Chọn icon cho khóa học'
                                            options={icons}
                                            labelOptions='Chọn một icon'
                                        />
                                    }
                                    <FastField
                                        name='name'
                                        component={InputField}

                                        label='Tên khóa học'
                                        type='text'
                                        placeholder='Nhập khóa học...'
                                    />
                                    <button className={`${styles.button_group} mt-4`} type='submit'>Thêm khóa học</button>
                                </Form>
                            )
                        }}
                    </Formik>
                </div>
            </UserLayout>
        </HomeLayout>
    );
}

export default AddCourse;