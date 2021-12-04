import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import exerciseClient from '../../api/exerciseClient';
import styles from '../../../styles/ClientExercise.module.css'
import Link from 'next/link'
import HomeLayout from '../../../components/Layouts/homeLayout';
import { Field, Form, Formik } from 'formik';
import { ArrowCounterclockwise, Check2Circle, ChevronLeft, ChevronRight, XCircle } from 'react-bootstrap-icons';
import * as Yup from 'yup'

function Question() {
    const router = useRouter()
    const { idexercise, id } = router.query
    const [exercises, setExercises] = useState<Array<any>>([])
    const [quizzs, setQuizzs] = useState<Array<any>>([])
    const [currentQuizz, setCurrentQuizz] = useState<any>()
    const [questions, setQuestions] = useState<Array<any>>([])
    const [currentQuestion, setCurrentQuestion] = useState<any>()
    const [process, setProcess] = useState<Array<any>>([])
    const [yourAnswer, setYourAwser] = useState<any>(undefined)
    const [showSumary, setShowSumary] = useState<boolean>(false)
    const [initialValue, setInitialValue] = useState<any>({
        genus: currentQuestion?.genus == 'one',
        options: undefined
    })
    const validateShema = Yup.object().shape({
        genus: Yup.boolean(),
        options: Yup.mixed()
            .when('genus', {
                is: true,
                then: Yup.string().required('Bạn phải chọn đáp án.'),
                otherwise: Yup.array().min(1, 'Phải chọn ít nhất 1 đáp án')
            })
    })
    useEffect(() => {
        const fetch = async () => {
            const resExercise = await exerciseClient.getExercise()
            setExercises(resExercise.data)
        }
        fetch()
    }, [])
    useEffect(() => {
        const fetch = async () => {
            const resQuizz = await exerciseClient.getQuiz(idexercise)
            setQuizzs(resQuizz.data.quizzes)
        }
        idexercise && fetch()
    }, [idexercise])
    useEffect(() => {
        quizzs && setCurrentQuizz(quizzs.find(quizz => quizz.id == id))
    }, [quizzs, id])
    useEffect(() => {
        const createNewQuizz = () => {
            setQuestions(currentQuizz.questions)
            setProcess([])
            setYourAwser(undefined)
            setInitialValue({
                genus: currentQuestion?.genus == 'one',
                options: undefined
            })
            setShowSumary(false)
        }
        currentQuizz && createNewQuizz()
    }, [currentQuizz])
    useEffect(() => {
        questions.length > 0 ? setCurrentQuestion(questions[0]) : setCurrentQuestion(undefined)
    }, [questions])
    useEffect(() => {
        if (process.some(p => p.id == currentQuestion?.id)) {
            switch (currentQuestion?.genus) {
                case 'one':
                    setInitialValue({
                        genus: true,
                        options: process[currentQuestion.id]?.value.options
                    })
                    break
                case 'mul':
                    setInitialValue({
                        genus: false,
                        options: process[currentQuestion.id]?.value.options
                    })
                    break
            }
        } else {
            switch (currentQuestion?.genus) {
                case 'one':
                    setInitialValue({
                        genus: true,
                        options: ''
                    })
                    break
                case 'mul':
                    setInitialValue({
                        genus: false,
                        options: []
                    })
                    break
            }
        }
        setYourAwser(process.find(p => p.id === currentQuestion?.id))
    }, [currentQuestion])

    const handleNextQuestion = (resetForm: any) => {
        setCurrentQuestion(questions[questions.indexOf(currentQuestion) + 1])
        resetForm()
    }
    const handlePrevQuestion = (resetForm: any) => {
        setCurrentQuestion(questions[questions.indexOf(currentQuestion) - 1])
        resetForm()
    }
    const handleSumary = () => {
        setShowSumary(true)
    }
    const handleReset = (resetForm: any) => {
        setProcess([])
        setYourAwser(undefined)
        setInitialValue({
            genus: currentQuestion?.genus == 'one',
            options: undefined
        })
        resetForm()
    }
    return (
        <HomeLayout>
            <div>
                <div className={`container ${styles.wrapper}`}>
                    <div className={`${styles.navHead}`}>
                        {exercises.map(exercise => {
                            return (
                                <div
                                    key={exercise.id}
                                    className={`
                                        ${styles.navItem} 
                                        ${idexercise == exercise.id && styles.active}
                                        `}
                                >
                                    <Link href={{
                                        pathname: '/baitap/[idexercise]',
                                        query: { idexercise: exercise.id }
                                    }}>
                                        <a className={styles.navLink}>{exercise.name}</a>
                                    </Link></div>
                            )
                        })}
                    </div>
                    <div className='d-flex mt-4'>
                        <div className={`${styles.navBar}`}>
                            {quizzs.map(quizz => {
                                return (
                                    <div
                                        key={quizz.id}
                                        className={`${styles.navItem} ${id == quizz.id && styles.active} m-0 `}
                                    >
                                        <Link href={{
                                            pathname: '/baitap/[idexercise]/[id]',
                                            query: {
                                                idexercise: idexercise,
                                                id: quizz.id
                                            }
                                        }}>
                                            <a className={styles.navLink}>{quizz.title}</a>
                                        </Link>
                                    </div>
                                )
                            })}
                        </div>

                        {!showSumary ?
                            (currentQuestion &&
                                <div className={styles.question}>
                                    <div className={styles.statement}>
                                        <h5 className={`${styles.number} ${yourAnswer?.is_answer_right ? 'bg-success' : 'bg-danger'}`}>{questions.indexOf(currentQuestion) + 1}
                                            <span className={styles.status}>{yourAnswer?.is_answer_right ? <Check2Circle /> : <XCircle />}</span>
                                        </h5>
                                        {currentQuestion.statement}
                                    </div>
                                    <Formik
                                        enableReinitialize
                                        initialValues={initialValue}
                                        validationSchema={validateShema}
                                        onSubmit={async (value) => {
                                            if (value.genus) {
                                                await exerciseClient.submitAnswer(idexercise, currentQuestion.id, `&options=${value.options}`)
                                                    .then((res) => {
                                                        setYourAwser(res.data)
                                                        setProcess(prev => [...prev, {
                                                            id: currentQuestion.id,
                                                            value,
                                                            ...res.data
                                                        }])
                                                    })
                                            } else {
                                                const list = value.options.reduce((sum: any, option: any) => sum + `&options=${option}`, '')
                                                await exerciseClient.submitAnswer(idexercise, currentQuestion.id, list)
                                                    .then((res) => {
                                                        setYourAwser(res.data)
                                                        setProcess(prev => [...prev, {
                                                            id: currentQuestion.id,
                                                            value,
                                                            ...res.data
                                                        }])
                                                    })
                                            }
                                        }}
                                    >
                                        {({ values, errors, resetForm }) =>
                                        (
                                            <Form>
                                                <div className={styles.option}>
                                                    {currentQuestion.options.map((option: any, index: any) => {
                                                        return (
                                                            <label
                                                                key={index}
                                                                className={`
                                    ${styles.item} 
                                    ${currentQuestion.genus === 'one' ?
                                                                        (values.options == option.id && styles.hover) :
                                                                        (values.options?.includes(option.id.toString()) && styles.hover)}
                                    ${yourAnswer && !yourAnswer.is_answer_right && (yourAnswer.value?.options == option.id || yourAnswer.value?.options.includes(option.id.toString())) && styles.incorrect}
                                    ${yourAnswer && yourAnswer.answers[index]?.is_right && styles.correct}
                                        `}
                                                            >
                                                                <div className='d-flex align-self-start align-items-center'>
                                                                    <Field
                                                                        type={currentQuestion.genus === 'one' ? 'radio' : 'checkbox'}
                                                                        name="options"
                                                                        value={option.id.toString()}
                                                                        className={styles.name}
                                                                        disabled={process.some(p => p.id == currentQuestion.id)}
                                                                    />
                                                                    {`${String.fromCharCode(97 + index).toUpperCase()})  ${option.statement}`}
                                                                </div>
                                                                {yourAnswer && yourAnswer.answers[index]?.is_right &&
                                                                    <div className={styles.explain}>
                                                                        {yourAnswer.answers[index]?.explain}
                                                                    </div>}
                                                            </label>
                                                        )
                                                    })}
                                                    {errors && <div className='text-danger'>{errors.options}</div>}
                                                </div>
                                                <div className={styles.function}>
                                                    <button
                                                        type='reset'
                                                        className={styles.button}
                                                        onClick={() => handleReset(resetForm)}
                                                    >Làm lại bài tập <ArrowCounterclockwise /></button>
                                                    <div className='d-flex align-items-center'>
                                                        <button
                                                            type='button'
                                                            className={`${styles.next} ${questions.indexOf(currentQuestion) === 0 && styles.disable}`}
                                                            onClick={() => handlePrevQuestion(resetForm)}
                                                        ><ChevronLeft /></button>
                                                        <div className={styles.process}>
                                                            <div>{`Question ${questions.indexOf(currentQuestion) + 1} of ${questions.length}`}</div>
                                                            <div>{process.length} attempt</div>
                                                        </div>
                                                        {questions.length !== questions.indexOf(currentQuestion) + 1 ?
                                                            <button
                                                                type='button'
                                                                className={styles.next}
                                                                onClick={() => handleNextQuestion(resetForm)}
                                                            ><ChevronRight /></button> :
                                                            <button
                                                                type='button'
                                                                className={styles.next}
                                                                onClick={() => handleSumary()}
                                                            ><Check2Circle /></button>
                                                        }
                                                    </div>
                                                    <button
                                                        type="submit"
                                                        className={styles.button}
                                                        disabled={process.some(p => p.id == currentQuestion.id)}
                                                    >Nộp</button>
                                                </div>
                                            </Form>
                                        )
                                        }
                                    </Formik>
                                </div>
                            )
                            :
                            <div className={styles.sumary}>
                                <h3 className={styles.title}>Kết quả</h3>
                                <div>
                                    <div className={`${styles.item} ${styles.correct}`}>Số câu đúng <span>{process.reduce((sum: any, item: any) => sum + (item.is_answer_right ? 1 : 0), 0)}</span></div>
                                    <div className={`${styles.item} ${styles.incorrect}`}>Số câu sai <span>{process.reduce((sum: any, item: any) => sum + (item.is_answer_right ? 0 : 1), 0)}</span></div>
                                    <div className={`${styles.item} ${styles.notDone}`}>Số câu chưa trả lời <span>{questions.length - process.length}</span></div>
                                </div>
                                <button
                                    type="button"
                                    className={styles.button}
                                    onClick={() => setShowSumary(false)}
                                >Tiếp tục trả lời</button>
                            </div>}
                    </div>
                </div>
            </div>
        </HomeLayout>
    );
}

export default Question;