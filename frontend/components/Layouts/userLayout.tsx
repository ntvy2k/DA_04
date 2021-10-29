import React, { ReactElement, useEffect, useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { fetch_user } from '../../features/auth';
import styles from '../../styles/UserLayout.module.css'
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
            <div className='row mt-4 justify-content-center'>

                {children}
            </div>
        </div>
    );
}

export default UserLayout;