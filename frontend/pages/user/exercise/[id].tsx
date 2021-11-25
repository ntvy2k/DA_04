import { FastField, Field, FieldArray, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Nav } from 'react-bootstrap';
import { Pencil, PlusSquare, Trash, X, XLg } from 'react-bootstrap-icons';
import InputFieldQuiz from '../../../components/CustomFields/InputFieldQuiz';
import InputOption from '../../../components/CustomFields/InputOption';
import HomeLayout from '../../../components/Layouts/homeLayout';
import styles from '../../../styles/AddQuizz.module.css'
import AddQuizImage from '../../../public/AddQuiz.png'
import Image from 'next/image'


function AddQuizz() {
    const [config, setConfig] = useState<any>()

    useEffect(() => {
        setConfig({ headers: { Authorization: `Token ${localStorage.getItem("key")}` } })
    }, [])

    const initialValues = {
        nameQuestion: '',
        options: [{
            statement: '',
            explain: '',
            is_right: false
        }],
    }
    return (
        <HomeLayout>
            <div className='container'>
                <div className={styles.nav}>
                    <div className={styles.navItem}>
                        <p className={styles.name}>Q1</p>
                        <div className='d-flex align-items-center'>
                            <button className={styles.button}><Pencil /></button>
                            <button className={styles.button}><XLg /></button>
                        </div>
                    </div>
                    <div>
                        <PlusSquare className={styles.navAdd} />
                    </div>
                </div>
                <div className='row'>
                    <div className='col'>
                        <div className='mt-3'>
                            <Formik
                                initialValues={initialValues}
                                onSubmit={(values) => {
                                    console.log(values)
                                }}
                            >
                                {({ values }) => {
                                    return (
                                        <Form>
                                            <FastField
                                                name='nameQuestion'
                                                component={InputFieldQuiz}

                                                type="text"
                                                label="Câu hỏi"
                                                placeholder="Thêm câu hỏi ở đây"
                                            />
                                            <FieldArray name="options">
                                                {({ insert, remove, push }) => (
                                                    <div>
                                                        {values.options.length > 0 &&
                                                            values.options.map((option, index) => (
                                                                <div key={index} className='d-flex align-items-center mb-3'>
                                                                    <Field type="checkbox" name={`options.${index}.is_right`} />
                                                                    <div className={`${styles.option} ${option.is_right && styles.active}`}>
                                                                        <p className={styles.optionName}>
                                                                            {String.fromCharCode(97 + index).toUpperCase()}
                                                                        </p>
                                                                        <Trash
                                                                            className={styles.optionDelete}
                                                                            onClick={() => remove(index)}
                                                                        />
                                                                    </div>
                                                                    <div className='flex-fill'>
                                                                        <div className={styles.text}>
                                                                            <label
                                                                                htmlFor={`options.${index}.statement`}
                                                                                className={styles.formLabel}
                                                                            >Lựa chọn</label>
                                                                            <Field
                                                                                name={`options.${index}.statement`}
                                                                                placeholder="Thêm đáp án ở đây"
                                                                                type="text"
                                                                                className={styles.input}
                                                                            />
                                                                        </div>
                                                                        <div className={styles.text}>
                                                                            <label
                                                                                htmlFor={`options.${index}.statement`}
                                                                                className={styles.formLabel}
                                                                            >Giải thích</label>
                                                                            <Field
                                                                                name={`options.${index}.explain`}
                                                                                placeholder="Giải thích đáp án ở đây"
                                                                                type="text"
                                                                                className={styles.input}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        <button
                                                            type='button'
                                                            className={styles.addOption}
                                                            onClick={() => push({
                                                                statement: '',
                                                                explain: '',
                                                                is_right: false
                                                            })}
                                                        >Thêm lựa chọn</button>
                                                    </div>
                                                )}
                                            </FieldArray>

                                            <button className={`${styles.addOption} mt-3`} type='submit'>Lưu</button>
                                        </Form>
                                    )
                                }}
                            </Formik>
                        </div>
                    </div>
                    <div className='col'>
                        <Image
                            src={AddQuizImage}
                            width={700}
                            height={500}
                        />
                    </div>
                </div>

            </div>
        </HomeLayout>
    );
}

export default AddQuizz;