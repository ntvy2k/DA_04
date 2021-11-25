import React, { useEffect, useState } from 'react';
import HomeLayout from '../../../components/Layouts/homeLayout';
import exerciseApi from '../../api/exerciseApi';
import styles from '../../../styles/Exercise.module.css'
import { FastField, Form, Formik } from 'formik';
import InputField from '../../../components/CustomFields/InputField';
import SelectField from '../../../components/CustomFields/SelectField';
import CheckBoxField from '../../../components/CustomFields/CheckBoxField';
import { NodePlus, Pencil, PlusSquare, QuestionSquare } from 'react-bootstrap-icons';
import Link from 'next/link'
import { Modal, Button } from 'react-bootstrap';

function Question() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [config, setConfig] = useState<any>()
    const [exercises, setExercises] = useState<any>()
    const [user, setUser] = useState<any>([])
    const [idEdit, setIdEdit] = useState<any>()

    const initialValues = {
        name: '',
        co_creator: [],
    }
    const [initialValueEdit, setInitialValueEdit] = useState<any>({
        name: '',
        co_creator: [],
    })

    useEffect(() => {
        setConfig({ headers: { Authorization: `Token ${localStorage.getItem("key")}` } })
    }, [])
    useEffect(() => {
        const fetch = async () => {
            const res = await exerciseApi.getExercise(config)
            const resUser = await exerciseApi.getUser(config)
            const arrayUser = resUser.data.map(({ id, username }: { id: any, username: any }) => {
                return ({
                    "name": username,
                    "value": id
                })
            })
            setExercises(res.data)
            setUser(arrayUser)
        }
        config && fetch()
    }, [config])
    const handleEditExercise = (exercise: any) => {
        setIdEdit(exercise.id)
        setInitialValueEdit({
            name: exercise.name,
            co_creator: exercise.co_creator.map((e: any) => e.toString()),
        })
        handleShow()
    }
    return (
        <HomeLayout>
            <div className={`container ${styles.wrapper}`}>
                <Modal
                    show={show}
                    onHide={handleClose}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header className='bg-success' closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">Sửa câu hỏi</Modal.Title>
                    </Modal.Header>
                    <Formik
                        enableReinitialize
                        initialValues={initialValueEdit}
                        onSubmit={async (value) => {
                            exerciseApi.updateExercise(value, idEdit, config)
                            const res = await exerciseApi.getExercise(config)
                            setExercises(res.data)
                            handleClose()
                        }}
                    >
                        {formikProps => {
                            return (
                                <Form>
                                    <Modal.Body className='bg-secondary border-0'>
                                        <FastField
                                            name='name'
                                            component={InputField}

                                            type='text'
                                            label='Tên câu hỏi'
                                            placeholder='Nhập...'
                                        />
                                        {user.length !== 0 &&
                                            <FastField
                                                name='co_creator'
                                                component={CheckBoxField}

                                                label='Chọn mấy thằng làm chung'
                                                options={user}
                                            />}
                                    </Modal.Body>
                                    <Modal.Footer className='bg-success border-0'>
                                        <Button variant="secondary" onClick={handleClose}>
                                            Close
                                        </Button>
                                        <Button
                                            type='submit'
                                            variant="primary"
                                        >Lưu thay đổi</Button>
                                    </Modal.Footer>
                                </Form>
                            )
                        }}
                    </Formik>

                </Modal>
                <div className="row">
                    <div className="col">
                        <h3 className={styles.title}>
                            <NodePlus className={`${styles.iconTitle} ${styles.iconAdd}`} />
                            Thêm mới bài tập</h3>
                        <Formik
                            initialValues={initialValues}
                            onSubmit={async (value, { resetForm }) => {
                                exerciseApi.postExercise(value, config)
                                const res = await exerciseApi.getExercise(config)
                                setExercises(res.data)
                                resetForm()
                            }}
                        >
                            {formikProps => {
                                return (
                                    <Form>
                                        <FastField
                                            name='name'
                                            component={InputField}

                                            type='text'
                                            label='Tên câu hỏi :'
                                            placeholder='Nhập...'
                                        />
                                        {user.length !== 0 &&
                                            <FastField
                                                name='co_creator'
                                                component={CheckBoxField}

                                                label='Chọn mấy thằng làm chung :'
                                                options={user}
                                            />}
                                        <button
                                            type='submit'
                                            className={styles.button}
                                        >Thêm câu hỏi</button>
                                    </Form>
                                )
                            }}
                        </Formik>
                    </div>
                    <div className="col">
                        <h3 className={styles.title}>
                            <QuestionSquare className={`${styles.iconTitle} ${styles.iconQuestion}`} />
                            Bài tập của bạn</h3>
                        <ul>
                            {exercises && exercises.map((exercise: any) => {
                                return (
                                    <li key={exercise.id} className={styles.question}>
                                        <p className={styles.questionName}>{exercise.name}</p>
                                        <div className={styles.questionModified}>
                                            <Link href={`/user/exercise/${exercise.id}/`}>
                                                <a>
                                                    <PlusSquare className={styles.questionModifiedIcon} />
                                                </a>
                                            </Link>
                                            <div onClick={() => handleEditExercise(exercise)}>
                                                <Pencil className={styles.questionModifiedIcon} />
                                            </div>
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </HomeLayout>
    );
}

export default Question;