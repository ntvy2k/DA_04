import React, { useState } from 'react';
import { Carousel, Col, Container, Row, Table } from 'react-bootstrap';
import Teaching from '../public/teaching.png'
import styles from '../styles/ThuyetTrinh.module.css'
import { Award, Bicycle, BookmarkHeart, Cast, EmojiAngry, EmojiSmile, HandThumbsDown, HandThumbsUp, Translate, Tree, Wallet } from 'react-bootstrap-icons';
import Image from 'next/image'
import Head from 'next/head'
import test from '../public/main-before.jpg'
import kientruc from '../public/kientruc.png'
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

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Báo cáo thị trường Top Dev',
        },
    },
};

export const optionsLanguage = {
    plugins: {
        title: {
            display: true,
            text: 'Tỉ lệ ngôn ngữ sử dụng cho hệ thống',
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

function ThuyetTrinh() {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex: any, e: any) => {
        setIndex(selectedIndex);
    };

    return (
        <Container style={{ backgroundColor: 'white' }} fluid>
            <Head>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.14.0/devicon.min.css" />
            </Head>
            <Container>
                <section className={styles.section}>
                    <Row className='align-items-center'>
                        <Col className={styles.headerTitle}>
                            XÂY DỰNG WEBSITE HỌC LẬP TRÌNH
                        </Col>
                        <Col>
                            <Image
                                src={Teaching}
                                width={500}
                                height={500}
                            />
                        </Col>
                    </Row>
                </section>
                <section className={styles.section}>
                    <div className={styles.ourTeamTitle}>Thành viên nhóm</div>
                    <div className={styles.ourTeam}>
                        <div className={styles.card}>
                            <div className={styles.image}>
                                <Image
                                    src={test}
                                    layout='fill'
                                    className={styles.imageMain}
                                ></Image>
                                <Bicycle className={styles.imageIcon} />
                            </div>
                            <div className='text-center mt-3'>Nguyễn Thế Vỹ</div>
                            <div className='text-center'>AT1508xx</div>
                        </div>
                        <div className={styles.card}>
                            <div className={styles.image}>
                                <Image
                                    src={test}
                                    layout='fill'
                                    className={styles.imageMain}
                                ></Image>
                                <Tree className={styles.imageIcon} />
                            </div>
                            <div className='text-center mt-3'>Võ Trọng Phúc</div>
                            <div className='text-center'>AT150838</div>
                        </div>
                        <div className={styles.card}>
                            <div className={styles.image}>
                                <Image
                                    src={test}
                                    layout='fill'
                                    className={styles.imageMain}
                                ></Image>
                                <Translate className={styles.imageIcon} />
                            </div>
                            <div className='text-center mt-3'>Võ Tấn Sang</div>
                            <div className='text-center'>AT1508xx</div>
                        </div>
                    </div>
                </section>
                <section className={styles.section}>
                    <div className='fs-1 text-center'>Thực trạng hiện nay</div>
                    <Line options={options} data={data} />
                    <p>Website học lập trình được xây dựng nhằm giúp người học có thể dễ dàng tìm kiếm khóa học, phân loại kiến thức dựa theo nhu cầu về kỹ năng, học phí.​</p>
                </section>
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
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th className='d-flex align-items-center bg-success'><EmojiSmile /> Ưu điểm</th>
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
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th className='d-flex align-items-center bg-danger'><EmojiAngry /> Khuyết điểm</th>
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
            </Container>
        </Container>
    );
}

export default ThuyetTrinh;