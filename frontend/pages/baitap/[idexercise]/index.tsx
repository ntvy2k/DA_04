import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import exerciseClient from '../../api/exerciseClient';
import styles from '../../../styles/ClientExercise.module.css'
import Link from 'next/link'
import HomeLayout from '../../../components/Layouts/homeLayout';
import Head from 'next/head'
import TD4_SETTINGS from '../../../app/config';

function ExerciseId() {
    const router = useRouter()
    const [titleExercise, setTitleExercise] = useState<string>('')
    const { idexercise } = router.query
    const [exercises, setExercises] = useState<Array<any>>([])
    const [quizzs, setQuizzs] = useState<Array<any>>([])
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
            setTitleExercise(resQuizz.data.name)
        }
        idexercise && fetch()
    }, [idexercise])
    return (
        <HomeLayout>
            <div>
                <Head>
                    <title>{titleExercise} | {TD4_SETTINGS.title}</title>
                </Head>
                <div className={`container ${styles.wrapper}`}>
                    <div className={`${styles.navHead}`}>
                        {exercises.map(exercise => {
                            return (
                                <div
                                    key={exercise.id}
                                    className={`${styles.navItem} ${idexercise == exercise.id && styles.active}`}
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
                                        className={`${styles.navItem} m-0`}
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
                    </div>
                </div>
            </div>
        </HomeLayout>
    );
}

export default ExerciseId;