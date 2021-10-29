import React, { Fragment } from 'react';
import HomeLayout from '../../components/Layouts/homeLayout';
import UserLayout from '../../components/Layouts/userLayout';
import UserImages from '../../public/User.json'
import Lottie from 'react-lottie';
import { Card } from 'react-bootstrap';
import styles from '../../styles/User.module.css'
import { Book, PersonBadge } from 'react-bootstrap-icons';
import Link from 'next/link'

function User() {
    const UserOptions = {
        loop: true,
        autoplay: true,
        animationData: UserImages,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };
    return (
        <HomeLayout>
            <UserLayout>
                <Fragment>
                    {/* <h1 className='text-center'>Chọn cái gì đó ở bên trái đê bro</h1>
                    <Lottie options={UserOptions} height={400} width={400}></Lottie> */}
                    <div className='col-6 col-md-4 col-lg-3 text-center'>
                        <Card className={`${styles.card} ${styles.card_profile}`}>
                            <Card.Body>
                                <Card.Text><PersonBadge className={`${styles.card_icon} ${styles.card_icon_profile}`} /></Card.Text>
                                <Card.Title>Hồ sơ</Card.Title>
                                <Card.Text>
                                    Chỉnh sửa hồ sơ cá nhân, đổi mật khẩu.
                                </Card.Text>
                                <Card.Text className='mt-4'>
                                    <Link href='/user/profile'>
                                        <a className={styles.card_button}>
                                            Xem
                                        </a>
                                    </Link>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className='col-6 col-md-4 col-lg-3 text-center'>
                        <Card className={`${styles.card} ${styles.card_course}`}>
                            <Card.Body>
                                <Card.Text><Book className={`${styles.card_icon} ${styles.card_icon_course}`} /></Card.Text>
                                <Card.Title>Khóa học</Card.Title>
                                <Card.Text>
                                    Thêm, sửa, xóa, xem khóa học của bạn.
                                </Card.Text>
                                <Card.Text className='mt-4'>
                                    <Link href='/user/mycourse'>
                                        <a className={styles.card_button}>
                                            Xem
                                        </a>
                                    </Link>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                </Fragment>
            </UserLayout>
        </HomeLayout>
    );
}

export default User;