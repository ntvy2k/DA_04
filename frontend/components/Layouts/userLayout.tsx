import React, { ReactElement, useEffect, useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { fetch_user } from '../../features/auth';
import styles from '../../styles/User.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router';
import { motion } from 'framer-motion'

const profileVariants = {
    hidden: {
        opacity: 0,
        y: 30
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: 'spring',
            delay: 0.2
        }
    }
}

const barVariants = {
    hidden: {
        opacity: 0,
        x: -20
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            type: 'spring',
            delay: 0.4
        }
    }
}

const contentVariants = {
    hidden: {
        opacity: 0,
        x: 30
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            type: 'spring',
            delay: 0.6
        }
    }
}

function UserLayout({ children }: { children: ReactElement }) {
    const router = useRouter().pathname
    const dispatch = useAppDispatch()
    const [profile, setProFile] = useState<any>({})

    useEffect(() => {
        const local_token = localStorage.getItem("key");
        const token = local_token == null ? "" : local_token;
        dispatch(fetch_user(token))
            .unwrap()
            .then((res) => setProFile(res))
            .catch((err) => console.log("err", err));
    }, [dispatch]);
    return (
        <div className="container">
            <motion.div
                className={styles.profile}
                variants={profileVariants}
                initial='hidden'
                animate='visible'
            >
                <div>
                    <h1>{`${profile.first_name} ${profile.last_name}`}</h1>
                    <p>{profile.email}</p>
                </div>
                <div>
                    <button className={styles.profile_button}>Đăng xuất</button>
                </div>
            </motion.div>
            <div className='row mt-4'>
                <motion.div
                    className={`col-2 ${styles.bar}`}
                    variants={barVariants}
                    initial='hidden'
                    animate='visible'
                >
                    <p className={styles.bar_button}>Đổi mật khẩu</p>
                    <Link href='/user/addcontent'>
                        <a className={`${styles.bar_button} ${router === '/user/addcontent' ? styles.active : null}`}>Thêm nội dung</a>
                    </Link>
                    <Link href='/user/addcourse'>
                        <a className={`${styles.bar_button} ${router === '/user/addcourse' ? styles.active : null}`}>Thêm khóa học</a>
                    </Link>
                    <Link href='/user/addchapter'>
                        <a className={`${styles.bar_button} ${router === '/user/addchapter' ? styles.active : null}`}>Thêm chương</a>
                    </Link>
                    <Link href='/user/addlesson'>
                        <a className={`${styles.bar_button} ${router === '/user/addlesson' ? styles.active : null}`}>Thêm bài học</a>
                    </Link>
                </motion.div>
                <motion.div
                    className={`col-10 ${styles.content}`}
                    variants={contentVariants}
                    initial='hidden'
                    animate='visible'
                >
                    {children}
                </motion.div>
            </div>
        </div>
    );
}

export default UserLayout;