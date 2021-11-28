import { ErrorMessage, FastField, Field, FieldArray, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Pencil, PlusSquare, Trash, XLg } from 'react-bootstrap-icons';
import InputFieldQuiz from '../../../components/CustomFields/InputFieldQuiz';
import HomeLayout from '../../../components/Layouts/homeLayout';
import styles from '../../../styles/AddQuizz.module.css'
import AddQuizImage from '../../../public/AddQuiz.png'
import Image from 'next/image'
import exerciseApi from '../../api/exerciseApi';
import { useRouter } from 'next/router';
import * as Yup from 'yup'


function AddQuizz() {
    const router = useRouter()
    const [config, setConfig] = useState<any>()
    const [editQuizz, setEditQuizz] = useState<any>()
    const [editQuestion, setEditQuestion] = useState<any>()
    const [quizzs, setQuizzs] = useState<Array<any>>([])
    const [currentQuizz, setCurrentQuizz] = useState<any>()
    const [currentQuestion, setCurrentQuestion] = useState<any>()
    const [questions, setQuestions] = useState<Array<any>>([])
    const [options, setOptions] = useState<Array<any>>([])
    const [initialValues, setInitialValues] = useState<any>({
        nameQuestion: '',
        options: [{
            statement: '',
            explain: '',
            is_right: false
        }],
    })
    const validateSchema = Yup.object().shape({
        nameQuestion: Yup.string().required('Câu hỏi khum được để trống'),
        options: Yup.array().min(2, 'Phải có ít nhất 2 đáp án')
            .of(
                Yup.object().shape({
                    statement: Yup.string().required('Đáp án khum được để trống'),
                })
            )
            .test('test', 'Phải có ít nhất 1 đáp án đúng', (options: any) => {
                return options?.some((option: any) => option.is_right)
            })
    })

    useEffect(() => {
        setConfig({ headers: { Authorization: `Token ${localStorage.getItem("key")}` } })
    }, [])

    useEffect(() => {
        const fetch = async () => {
            const resQuiz = await exerciseApi.getQuiz(config)
            setQuizzs(resQuiz.data.filter((x: any) => x.exercise == router.query.id))
        }
        config && fetch()
    }, [config, router])
    useEffect(() => {
        if (quizzs.length > 0) {
            setCurrentQuizz(quizzs[0].id)
        }
    }, [quizzs])
    useEffect(() => {
        const fetch = async () => {
            const resQuizDetail = await exerciseApi.getQuestion(currentQuizz, config)
            setQuestions(resQuizDetail.data)
        }
        currentQuizz && fetch()
    }, [currentQuizz])
    useEffect(() => {
        if (questions.length > 0) {
            setCurrentQuestion(questions[0].id)
        }
    }, [questions])
    useEffect(() => {
        const fetch = async () => {
            const resQuestion = await exerciseApi.getQuestionById(currentQuizz, currentQuestion, config)
            const resOption = await exerciseApi.getOption(currentQuizz, currentQuestion, config)
            setOptions(resOption.data)
            const newOption = resOption.data.map(({ id, ...newObject }: { id: any }) => newObject)
            setInitialValues({
                nameQuestion: resQuestion.data.statement,
                options: newOption
            })
        }
        currentQuestion && fetch()
    }, [currentQuestion])
    const handleEditQuestion = (questionId: any, event: any) => {
        event.stopPropagation()
        setEditQuestion(questionId)
    }
    const handleEditQuizz = (quizzId: any, event: any) => {
        event.stopPropagation()
        setEditQuizz(quizzId)
    }

    const handleUpdateQuizz = async (quizzId: any, event: any) => {
        const value = {
            "title": event.target.value,
            "exercise": Number(router.query.id)
        }
        await exerciseApi.updateQuizz(value, quizzId, config)
        setEditQuizz(undefined)
        const resQuiz = await exerciseApi.getQuiz(config)
        setQuizzs(resQuiz.data.filter((x: any) => x.exercise == router.query.id))
    }

    const handleUpdateQuestion = async (questionId: any, event: any) => {
        const value = {
            "statement": event.target.value,
        }
        await exerciseApi.updateQuestion(value, currentQuizz, questionId, config)
        setEditQuestion(undefined)
        const resQuizDetail = await exerciseApi.getQuestion(currentQuizz, config)
        setQuestions(resQuizDetail.data)
    }

    const handleAddQuiz = async () => {
        const value = {
            "title": 'default',
            "exercise": Number(router.query.id)
        }
        await exerciseApi.postQuizz(value, config)
        const resQuiz = await exerciseApi.getQuiz(config)
        setQuizzs(resQuiz.data.filter((x: any) => x.exercise == router.query.id))
    }
    const handleAddQuestion = async () => {
        const value = {
            "statement": 'default',
        }
        await exerciseApi.postQuestion(value, currentQuizz, config)
        const resQuizDetail = await exerciseApi.getQuestion(currentQuizz, config)
        setQuestions(resQuizDetail.data)
    }
    const handleDeleteQuizz = async (id: any, event: any) => {
        event.stopPropagation()
        await exerciseApi.deleteQuizz(id, config)
        const resQuiz = await exerciseApi.getQuiz(config)
        setQuizzs(resQuiz.data.filter((x: any) => x.exercise == router.query.id))
        console.log(id)
    }
    const handleDeleteQuestion = async (id: any, event: any) => {
        event.stopPropagation()
        await exerciseApi.deleteQuestion(currentQuizz, id, config)
        const resQuizDetail = await exerciseApi.getQuestion(currentQuizz, config)
        setQuestions(resQuizDetail.data)
    }
    const handlePulish = async () => {
        await exerciseApi.confirmQuestion(currentQuizz, currentQuestion, config).then(() => console.log('done'))
        await exerciseApi.pulishQuestion(currentQuizz, currentQuestion, config).then(() => console.log('done'))
    }
    return (
        <HomeLayout>
            <div className='container'>
                <div className={styles.nav}>
                    {quizzs.map((quizz) => {
                        return (
                            <div key={quizz.id} className={`${styles.navItem} ${currentQuizz == quizz.id && styles.active}`}>
                                {editQuizz === quizz.id ?
                                    <input
                                        type='text'
                                        defaultValue={quizz.title}
                                        onBlur={(e) => handleUpdateQuizz(quizz.id, e)}
                                        autoFocus={true}
                                        contentEditable
                                        className={styles.input}
                                    /> :
                                    <div
                                        className={styles.navLink}
                                        onClick={() => setCurrentQuizz(quizz.id)}
                                    >
                                        <p className={styles.name}>{quizz.title}</p>
                                        <div className='d-flex align-items-center'>
                                            <button
                                                type='button'
                                                className={styles.button}
                                                onClick={(e) => handleEditQuizz(quizz.id, e)}
                                            ><Pencil /></button>
                                            <button
                                                className={styles.button}
                                                onClick={(e) => handleDeleteQuizz(quizz.id, e)}
                                            ><XLg /></button>
                                        </div>
                                    </div>
                                }
                            </div>
                        )
                    })}
                    <div>
                        <PlusSquare
                            className={styles.navAdd}
                            onClick={handleAddQuiz}
                        />
                    </div>
                </div>
                <div className={styles.nav}>
                    {questions.map((question, index) => {
                        return (
                            <div key={question.id} className={`${styles.navItem} ${currentQuestion == question.id && styles.active}`}>
                                {editQuestion === question.id ?
                                    <input
                                        type='text'
                                        defaultValue={question.statement}
                                        onBlur={(e) => handleUpdateQuestion(question.id, e)}
                                        autoFocus={true}
                                        contentEditable
                                        className={styles.input}
                                    /> :
                                    <div
                                        className={styles.navLink}
                                        onClick={() => setCurrentQuestion(question.id)}
                                    >
                                        <p className={styles.name}>{`Câu ${index + 1}`}</p>
                                        <div className='d-flex align-items-center'>
                                            <button
                                                type='button'
                                                className={styles.button}
                                                onClick={(e) => handleEditQuestion(question.id, e)}
                                            ><Pencil /></button>
                                            <button
                                                className={styles.button}
                                                onClick={(e) => handleDeleteQuestion(question.id, e)}
                                            ><XLg /></button>
                                        </div>
                                    </div>
                                }
                            </div>
                        )
                    })}
                    <div>
                        <PlusSquare
                            className={styles.navAdd}
                            onClick={handleAddQuestion}
                        />
                    </div>
                </div>
                <div className='row align-items-center'>
                    <div className='col'>
                        <div className='mt-3'>
                            <Formik
                                enableReinitialize
                                initialValues={initialValues}
                                validationSchema={validateSchema}
                                onSubmit={async (values) => {
                                    const length = values.options.length - initialValues.options.length
                                    await exerciseApi.updateQuestion(
                                        {
                                            statement: values.nameQuestion
                                        }, currentQuizz, currentQuestion, config
                                    )
                                    console.log(length)
                                    console.log('value:' + values.options.length)
                                    console.log('initial:' + initialValues.options.length)
                                    if (length > 0) {
                                        console.log('lon hon 0')
                                        for (let i = 0; i < initialValues.options.length; i++) {
                                            await exerciseApi.updateOption(values.options[i], currentQuizz, currentQuestion, options[i].id, config)
                                        }
                                        for (let i = initialValues.options.length; i < values.options.length; i++) {
                                            await exerciseApi.postOption(values.options[i], currentQuizz, currentQuestion, config)
                                        }
                                    } else if (length < 0) {
                                        console.log('nho hon 0')
                                        for (let i = 0; i < values.options.length; i++) {
                                            await exerciseApi.updateOption(values.options[i], currentQuizz, currentQuestion, options[i].id, config)
                                        }
                                        for (let i = values.options.length; i < initialValues.options.length; i++) {
                                            await exerciseApi.deleteOption(currentQuizz, currentQuestion, options[i].id, config)
                                        }
                                    } else {
                                        console.log('bang 0')
                                        for (let i = 0; i < initialValues.options.length; i++) {
                                            await exerciseApi.updateOption(values.options[i], currentQuizz, currentQuestion, options[i].id, config)
                                        }
                                    }
                                }}
                            >
                                {({ values, errors }) => {
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
                                                {({ remove, push }) => (
                                                    <div>
                                                        {values.options.length > 0 &&
                                                            values.options.map((option: any, index: any) => (
                                                                <div key={index} className={styles.options}>
                                                                    <Field
                                                                        type="checkbox"
                                                                        name={`options.${index}.is_right`}
                                                                        className={styles.checkbox}
                                                                    />
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
                                                                            <div>
                                                                                <Field
                                                                                    name={`options.${index}.statement`}
                                                                                    placeholder="Thêm đáp án ở đây"
                                                                                    type="text"
                                                                                    className={styles.input}
                                                                                />
                                                                                <ErrorMessage
                                                                                    name={`options.${index}.statement`}
                                                                                    component='div'
                                                                                    className={styles.errorMess}
                                                                                />
                                                                            </div>
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
                                                        >Thêm đáp án</button>
                                                    </div>

                                                )}
                                            </FieldArray>
                                            {typeof errors.options === 'string' ?
                                                <ErrorMessage
                                                    name={`options`}
                                                    component='div'
                                                    className={styles.errorMess}
                                                /> : null}
                                            <div className={`d-flex justify-content-around mt-3`}>
                                                <button className={`${styles.addOption}`} type='submit'>Lưu</button>
                                                {Object.keys(errors).length === 0 &&
                                                    <button
                                                        className={`${styles.addOption}`}
                                                        type='button'
                                                        onClick={handlePulish}
                                                    >Pulish</button>
                                                }
                                            </div>
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