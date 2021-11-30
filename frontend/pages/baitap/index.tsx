import React, { useEffect, useState } from 'react';
import HomeLayout from '../../components/Layouts/homeLayout';
import exerciseClient from '../api/exerciseClient';
import styles from '../../styles/ClientExercise.module.css'
import Link from 'next/link'

function ExerCises() {
    const [exercises, setExercises] = useState<Array<any>>([])
    useEffect(() => {
        const fetch = async () => {
            const resExercise = await exerciseClient.getExercise()
            setExercises(resExercise.data)
        }
        fetch()
    }, [])
    return (
        <HomeLayout>
            <div className={`container ${styles.wrapper}`}>
                <div className={`${styles.navHead}`}>
                    {exercises.map(exercise => {
                        return (
                            <div
                                key={exercise.id}
                                className={styles.navItem}
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
            </div>
        </HomeLayout>
    );
}

export default ExerCises;