import { FastField, Form, Formik } from 'formik';
import React from 'react';
import InputField from '../../../../components/CustomFields/InputField';
import HomeLayout from '../../../../components/Layouts/homeLayout';
import ProfileLayout from '../../../../components/Layouts/profileLayout';
import UserLayout from '../../../../components/Layouts/userLayout';
import * as Yup from 'yup'
import userApi from '../../../api/userApi';
import styles from '../../../../styles/ChangeProfile.module.css'

function ChangePass() {
    const initialValues = {
        old_password: '',
        new_password: '',
        confirmPass: '',
    }
    const validationSchema = Yup.object().shape({
        old_password: Yup.string().required('This field is required'),
        new_password: Yup.string().required('This field is required').
            matches(
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
            ),
        confirmPass: Yup.string().
            oneOf([Yup.ref('new_password'), null], 'Passwords must match'),
    })
    return (
        <HomeLayout>
            <UserLayout>
                <ProfileLayout>
                    <div className={styles.container}>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={async ({ confirmPass, ...values }) => {
                                await userApi.changePass(values, {
                                    headers: { Authorization: `Token ${localStorage.getItem("key")}` },
                                }).then((res) => {
                                    console.log(res.data)
                                }).catch(err => console.log(err))
                            }}
                        >
                            {formiksProps => {
                                return (
                                    <Form>
                                        <FastField
                                            name='old_password'
                                            component={InputField}

                                            type='password'
                                            label='Nhập mật khẩu cũ'
                                            placeholder='Nhập...'
                                        />
                                        <FastField
                                            name='new_password'
                                            component={InputField}

                                            type='password'
                                            label='Nhập mật khẩu mới'
                                            placeholder='Nhập...'
                                        />
                                        <FastField
                                            name='confirmPass'
                                            component={InputField}

                                            type='password'
                                            label='Xác nhận lại mật khẩu mới'
                                            placeholder='Nhập...'
                                        />
                                        <button type='submit' className={styles.button}>Đổi mật khẩu</button>
                                    </Form>
                                )
                            }}
                        </Formik>
                    </div>
                </ProfileLayout>
            </UserLayout>
        </HomeLayout>

    );
}

export default ChangePass;