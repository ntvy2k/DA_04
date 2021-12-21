import React, { Fragment, useState } from 'react';
import { Carousel, Col, Container, Row, Table } from 'react-bootstrap';
import Teaching from '../public/teaching.png'
import Stock from '../public/stock-market.png'
import styles from '../styles/ThuyetTrinh.module.css'
import { Award, Bicycle, BookmarkHeart, Cast, EmojiAngry, EmojiSmile, HandThumbsDown, HandThumbsUp, Translate, Tree, Wallet } from 'react-bootstrap-icons';
import Image from 'next/image'
import Head from 'next/head'
import test from '../public/main-before.jpg'
import { motion, useAnimation } from 'framer-motion'
import Link from 'next/link'

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';
import { Line, Pie } from 'react-chartjs-2';
import { InView } from 'react-intersection-observer';

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
            labels: {
                color: '#ffffff',
            }
        },
        title: {
            display: true,
            text: 'Báo cáo thị trường Top Dev',
            color: '#ffffff',
        },
    },
    scales: {
        y: {
            ticks: {
                color: 'white',
            }
        },
        x: {
            ticks: {
                color: 'white',
            }
        }
    }
};

export const optionsLanguage = {
    plugins: {
        title: {
            display: true,
            text: 'Tỉ lệ ngôn ngữ sử dụng cho hệ thống',
            color: '#ffffff',
        },
        legend: {
            labels: {
                color: '#ffffff',
            }
        },
    }
}

const labels = ['2019', '2020', '2021', '2022(Dự kiến)'];

export const data = {
    labels,
    datasets: [
        {
            label: 'Cần',
            data: [350000, 400000, 500000, 530000],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
            label: 'Đang có',
            data: [270000, 300000, 310000, 380000],
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
            color: '#ffffff',
        },
    ],
};

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

export const rateLanguage = {
    labels: ['TypeScript', 'Python', 'CSS', 'DockerFile', 'Shell', 'JavaScript'],
    datasets: [
        {
            label: 'Duwx lieu',
            data: [71, 19.7, 8.8, 0.3, 0.1, 0.1],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
        },
    ],
};

const fromTopVariant = {
    hidden: {
        scale: 0,
        y: -100,
        opacity: 0,
    },
    visible: {
        scale: 1,
        y: 0,
        opacity: 1,
        transition: {
            delay: 0.5,
            type: 'spring'
        }
    }
}

const fromLeftVariant = {
    hidden: {
        opacity: 0,
        x: -30
    },
    visible: {
        opacity: 1,
        x: 0,
    }
}

const fromRightVariant = {
    hidden: {
        opacity: 0,
        x: 50
    },
    visible: {
        opacity: 1,
        x: 0,
    }
}

const opacityVariant = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
    }
}

function ThuyetTrinh() {
    const animation = useAnimation()
    const animation1 = useAnimation()
    const handInView = (inView: boolean) => {
        if (inView) {
            animation.start("visible")
        }
    }
    const handInView1 = (inView: boolean) => {
        if (inView) {
            animation1.start("visible")
        }
    }
    return (
        <Fragment>
            <section className={`${styles.section} ${styles.headBackground}`}>
                <motion.div
                    variants={fromTopVariant}
                    initial='hidden'
                    animate='visible'
                    className={styles.headerTitle}
                >
                    XÂY DỰNG WEBSITE HỌC LẬP TRÌNH
                </motion.div>
            </section>
            <Container style={{ backgroundColor: 'dark' }} fluid>
                <Head>
                    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.14.0/devicon.min.css" />
                </Head>

                <Container>
                    <InView
                        as="div"
                        onChange={(inView) => {
                            handInView(inView)
                        }}
                        threshold={0.4}
                    >
                        <section className={styles.section}>
                            <motion.div
                                variants={fromLeftVariant}
                                initial="hidden"
                                animate={animation}
                                transition={{ type: 'spring' }}
                                className={styles.ourTeamTitle}
                            >
                                Thành viên nhóm chúng tôi
                            </motion.div>
                            <Link href={`/aboutus`}>
                                <motion.a
                                    className={styles.ourTeamInfo}
                                    variants={fromLeftVariant}
                                    initial="hidden"
                                    animate={animation}
                                    transition={{ type: 'spring', delay: 0.2 }}
                                >Thêm thông tin</motion.a>
                            </Link>
                            <div className={styles.ourTeam}>
                                <motion.div
                                    className={styles.card}
                                    variants={fromRightVariant}
                                    initial="hidden"
                                    animate={animation}
                                    transition={{ type: 'spring', delay: 0.4 }}
                                >
                                    <div className={styles.image}>
                                        <Image
                                            src={test}
                                            layout='fill'
                                            className={styles.imageMain}
                                        ></Image>
                                        <Bicycle className={styles.imageIcon} />
                                    </div>
                                    <div className='text-center mt-3'>Nguyễn Thế Vỹ</div>
                                    <div className={styles.subtitle}>AT1508xx</div>
                                </motion.div>
                                <motion.div
                                    className={styles.card}
                                    variants={fromRightVariant}
                                    initial="hidden"
                                    animate={animation}
                                    transition={{ type: 'spring', delay: 0.6 }}
                                >
                                    <div className={styles.image}>
                                        <Image
                                            src={test}
                                            layout='fill'
                                            className={styles.imageMain}
                                        ></Image>
                                        <Tree className={styles.imageIcon} />
                                    </div>
                                    <div className='text-center mt-3'>Võ Trọng Phúc</div>
                                    <div className={styles.subtitle}>AT150838</div>
                                </motion.div>
                                <motion.div
                                    className={styles.card}
                                    variants={fromRightVariant}
                                    initial="hidden"
                                    animate={animation}
                                    transition={{ type: 'spring', delay: 0.8 }}
                                >
                                    <div className={styles.image}>
                                        <Image
                                            src={test}
                                            layout='fill'
                                            className={styles.imageMain}
                                        ></Image>
                                        <Translate className={styles.imageIcon} />
                                    </div>
                                    <div className='text-center mt-3'>Võ Tấn Sang</div>
                                    <div className={styles.subtitle}>AT1508xx</div>
                                </motion.div>
                            </div>
                        </section>
                    </InView>
                    <InView
                        as="div"
                        onChange={(inView) => {
                            handInView1(inView)
                        }}
                        threshold={0.4}
                    >
                        <motion.section
                            className={styles.section}
                            variants={opacityVariant}
                            initial="hidden"
                            animate={animation1}
                            transition={{ type: 'spring' }}
                        >
                            <div className='fs-1 text-center'>Thực trạng hiện nay</div>
                            <Line options={options} data={data} />
                            <p>Website học lập trình được xây dựng nhằm giúp người học có thể dễ dàng tìm kiếm khóa học, phân loại kiến thức dựa theo nhu cầu về kỹ năng, học phí.​</p>
                        </motion.section>
                    </InView>
                    <section className={styles.section}>
                        <div>
                            <h3 className='fs-1 text-center mb-5'>Một số website hiện có trên thị trường</h3>
                            <div className='fs-3 mb-5'>CodeGym.vn​</div>
                            <Row>
                                <Col>
                                    <Carousel variant="dark">
                                        <Carousel.Item>
                                            <img
                                                className="d-block w-100"
                                                src='/codegym1.png'
                                                alt="Second slide"
                                            />
                                        </Carousel.Item>
                                        <Carousel.Item>
                                            <img
                                                className="d-block w-100"
                                                src='/codegym2.png'
                                                alt="Second slide"
                                            />
                                        </Carousel.Item>
                                        <Carousel.Item>
                                            <img
                                                className="d-block w-100"
                                                src='/codegym3.png'
                                                alt="Second slide"
                                            />
                                        </Carousel.Item>
                                    </Carousel>
                                </Col>
                                <Col className='ms-4'>
                                    <Row>
                                        <Col>
                                            <div className={`${styles.pros} ${styles.sucess}`}><HandThumbsUp className={styles.prosIcon} /> Ưu điểm</div>
                                            <div className={styles.prosContent}><BookmarkHeart className={`${styles.icon} ${styles.sucess}`} /> Ngôn ngữ tiếng việt =&gt; dễ tiếp cận và học tập​</div>
                                            <div className={styles.prosContent}><Cast className={`${styles.icon} ${styles.sucess}`} /> Giao diện người dùng đẹp và sinh động​</div>
                                            <div className={styles.prosContent}><Award className={`${styles.icon} ${styles.sucess}`} /> Chính sách quảng bá khóa học tốt, nhiều giảng viên giàu kinh nghiệm</div>
                                        </Col>
                                        <Col className='ms-4'>
                                            <div className={`${styles.pros} ${styles.fail}`}><HandThumbsDown className={styles.prosIcon} /> Nhược điểm</div>
                                            <div className={styles.prosContent}><Wallet className={`${styles.icon} ${styles.fail}`} /> Tốn phí</div>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </div>
                    </section>
                    <section className={styles.section}>
                        <div>
                            <h3 className='fs-1 text-center mb-5'>Một số website hiện có trên thị trường</h3>
                            <div className='fs-3 mb-5'>Codecademy.com</div>
                            <Row>
                                <Col>
                                    <Carousel variant="dark">
                                        <Carousel.Item>
                                            <img
                                                className="d-block w-100"
                                                src='/codeacademy.png'
                                                alt="Second slide"
                                            />
                                        </Carousel.Item>
                                        <Carousel.Item>
                                            <img
                                                className="d-block w-100"
                                                src='/codeacademy1.png'
                                                alt="Second slide"
                                            />
                                        </Carousel.Item>
                                        <Carousel.Item>
                                            <img
                                                className="d-block w-100"
                                                src='/codeacademy2.png'
                                                alt="Second slide"
                                            />
                                        </Carousel.Item>
                                    </Carousel>
                                </Col>
                                <Col className='ms-4'>
                                    <Row>
                                        <Col>
                                            <div className={`${styles.pros} ${styles.sucess}`}><HandThumbsUp className={styles.prosIcon} /> Ưu điểm</div>
                                            <div className={styles.prosContent}><BookmarkHeart className={`${styles.icon} ${styles.sucess}`} /> Giao diện đơn giản, dễ sử dụng​</div>
                                            <div className={styles.prosContent}><Cast className={`${styles.icon} ${styles.sucess}`} /> Có đầy đủ khóa học của các ngôn ngữ lập trình phổ biến nhất hiện nay</div>
                                            <div className={styles.prosContent}><Award className={`${styles.icon} ${styles.sucess}`} /> Nhiều tài nguyên học lập trình từ lý thuyết đến thực hành​</div>
                                        </Col>
                                        <Col className='ms-4'>
                                            <div className={`${styles.pros} ${styles.fail}`}><HandThumbsDown className={styles.prosIcon} /> Nhược điểm</div>
                                            <div className={styles.prosContent}><Wallet className={`${styles.icon} ${styles.fail}`} /> Không hỗ trợ tiếng việt ​</div>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </div>
                    </section>
                    <section className={styles.section}>
                        <h3>Phân tích và thiết kế website​</h3>
                        <div>1. Sơ đồ chức năng của website​</div>
                    </section>
                    <section className={`${styles.section}`}>
                        <div className='mb-5'>2. Sơ đồ CSDL</div>
                        <img className={styles.imageCSDL} src="/sodoCSDL.png" />
                    </section>
                    <section className={styles.section}>
                        <h3 className='fs-1 text-center mb-5'>Cài đặt và triển khai​</h3>
                        <div className='fs-3 mb-5'>1. Các công nghệ xây dựng website​</div>
                        <Row>
                            <Col className={styles.tech}>
                                <i className={`devicon-nextjs-line colored ${styles.icon}`}></i>
                                <div className={styles.title}>NextJS</div>
                                <div className='text-center'>Framework dựa trên React dùng để xây xây dựng chức năng web​</div>
                            </Col>
                            <Col className={styles.tech}>
                                <i className={`devicon-bootstrap-plain colored ${styles.icon}`}></i>
                                <div className={styles.title}>Bootstrap</div>
                                <div className='text-center'>Library dùng để xây xây dựng giao diện web</div>
                            </Col>
                            <Col className={styles.tech}>
                                <i className={`devicon-django-plain colored ${styles.icon}`}></i>
                                <div className={styles.title}>DJANGO</div>
                                <div className='text-center'>Framework dùng để xây dựng web dựa trên ngôn ngữ Python​</div>
                            </Col>
                            <Col className={styles.tech}>
                                <i className={`devicon-postgresql-plain colored ${styles.icon}`}></i>
                                <div className={styles.title}>POSTGRESQL</div>
                                <div className='text-center'>Hệ quản trị CSDL của website​​</div>
                            </Col>
                        </Row>
                        <div className={styles.chartPie}><Pie data={rateLanguage} options={optionsLanguage} /></div>
                    </section>
                    <section className={styles.section}>
                        <div className='fs-3 mb-5'>2. Kiến trúc website​</div>
                        <img src="/kientruc.png" />
                    </section>
                    <section className={styles.section}>
                        <h3 className='fs-1 mb-5'>Ưu – khuyết điểm website</h3>
                        <Row>
                            <Col>
                                <Table variant='dark' striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th className='d-flex align-items-center bg-success'><EmojiSmile className='me-2' /> Ưu điểm</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Có chức năng giải câu đố và bài tập giúp người học thực hành ngay sau khi học xong lý thuyết.​</td>
                                        </tr>
                                        <tr>
                                            <td>Mỗi người dùng đều có thể tự tạo khóa học của riêng mình và cung cấp khóa học cho người dùng khác.​</td>
                                        </tr>
                                        <tr>
                                            <td>Giao diện website thân thiện, dễ sử dụng.​</td>
                                        </tr>
                                        <tr>
                                            <td>Đã thực hiện được những chức năng cơ bản nhất của một ứng dụng học lập trình.​</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Col>
                            <Col>
                                <Table variant='dark' striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th className='d-flex align-items-center bg-danger'><EmojiAngry className='me-2' /> Khuyết điểm</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Chức năng của người quản trị (admin) còn khá đơn giản.​</td>
                                        </tr>
                                        <tr>
                                            <td>Cần phát triển thêm các tiện ích cho người học (theo dõi khóa học, theo dõi tiến trình học, .v.v.).​</td>
                                        </tr>
                                        <tr>
                                            <td>Giao diện website chưa hoàn toàn tối ưu.​</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                    </section>
                    <section className={styles.section}>
                        <h3 className='fs-1 mb-5'>VII. Kết luận và hướng phát triển​</h3>
                        <div className='fs-3'>1. Kết luận​</div>
                        <Row className='align-items-center'>
                            <Col className='fs-5'>
                                <p>- Website đã có đầy đủ các chức năng cơ bản cần thiết mà nhóm đề ra từ ban đầu, qua đó cung cấp cho người dùng một kênh giao tiếp trung gian dễ dàng và thuận lợi cho việc tìm kiếm, cung cấp khóa học lập trình.</p>
                                <p>- Ứng dụng cung cấp cho người dùng chức năng tạo, sửa khóa học của mình; cơ chế tìm kiếm khóa học được lọc theo ngôn ngữ lập trình, loại khóa học.</p>
                            </Col>
                            <Col className='text-center'>
                                <Image
                                    src={Teaching}
                                    width={500}
                                    height={500}
                                ></Image>
                            </Col>
                        </Row>
                    </section>
                    <section className={styles.section}>
                        <h3 className='fs-1 mb-5'>VII. Kết luận và hướng phát triển​</h3>
                        <div className='fs-3'>2. Hướng phát triển​</div>
                        <Row className='align-items-center'>
                            <Col>
                                <Image
                                    src={Stock}
                                    width={500}
                                    height={500}
                                ></Image>
                            </Col>
                            <Col className='fs-5'>
                                <p>- Thêm tính năng theo dõi khóa học đã tham gia (bookmark).​</p>
                                <p>- Tìm hiểu thêm về deep learning, cung cấp cho website cơ chế tự học và ghi nhớ thói quen tìm kiếm của người học, từ đó có thể đưa ra các gợi ý (recommend) khóa học phù hợp giúp nâng cao tiện ích cho người học.​</p>
                                <p>- Xây dựng hệ thống cân bằng tải, giúp cải thiện hiệu suất truy cập và tăng độ ổn định, tin cậy khi truy cập vào website.​</p>
                            </Col>
                        </Row>
                    </section>
                </Container>
            </Container>
        </Fragment>
    );
}

export default ThuyetTrinh;