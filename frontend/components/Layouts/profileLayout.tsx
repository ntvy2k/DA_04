import React, { ReactElement } from 'react';
import { motion } from 'framer-motion'
import { useRouter } from 'next/router';
import styles from '../../styles/ProfileLayout.module.css'
import Link from 'next/link'
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

function ProfileLayout({ children }: { children: ReactElement }) {
    const router = useRouter().pathname
    return (
        <div className='row'>
            <motion.div
                className={`col-4 col-lg-2 col-md-3`}
                variants={barVariants}
                initial='hidden'
                animate='visible'
            >
                <div className={styles.bar}>
                    <Link href='/user/profile/changepass'>
                        <a className={`${styles.bar_button} ${router === '/user/profile/changepass' ? styles.active : null}`}>Đổi mật khẩu</a>
                    </Link>
                    <Link href='/user/profile/changeprofile'>
                        <a className={`${styles.bar_button} ${router === '/user/profile/changeprofile' ? styles.active : null}`}>Đổi thông tin</a>
                    </Link>
                </div>

                {/* <Link href='/user/addcourse'>
                    <a className={`${styles.bar_button} ${router === '/user/addcourse' ? styles.active : null}`}>Thêm khóa học</a>
                </Link>
                <Link href='/user/addchapter'>
                    <a className={`${styles.bar_button} ${router === '/user/addchapter' ? styles.active : null}`}>Thêm chương</a>
                </Link>
                <Link href='/user/addlesson'>
                    <a className={`${styles.bar_button} ${router === '/user/addlesson' ? styles.active : null}`}>Thêm bài học</a>
                </Link> */}
            </motion.div>
            <motion.div
                className={`col-8 col-lg-10 col-md-9 ${styles.content}`}
                variants={contentVariants}
                initial='hidden'
                animate='visible'
            >
                {children}
            </motion.div>
        </div>
    );
}

export default ProfileLayout;