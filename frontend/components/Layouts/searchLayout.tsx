import React, { ReactElement, useEffect, useState } from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { GroupCourse } from '../../moduleType';
import courseApi from '../../pages/api/courseApi';
import Link from 'next/link'
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetch_user, logout, set_not_authenticated } from '../../features/auth';
import { useRouter } from 'next/router';
import styles from '../../styles/SearchLayout.module.css'
import { Discord, Facebook, Instagram } from 'react-bootstrap-icons';
import { motion } from "framer-motion"

const navBarVariants = {
    hidden: {
        opacity: 0,
        y: -20,
    },
    visible: {
        opacity: 1,
        y: 0,
        trasition: {
            type: 'spring'
        }
    }
}

const variants = {
    hidden: { opacity: 0, x: -200, y: 0 },
    enter: {
        opacity: 1,
        x: 0,
        y: 0,
        transition: {
            type: 'linear'
        }
    },
    exit: { opacity: 0, x: 0, y: -100 },
}

export default function SearchLayout({ children }: { children: ReactElement }) {
    const router = useRouter()
    const dispatch = useAppDispatch();
    const user = useAppSelector(
        (state) =>
            state.auth
    );
    const [dataGroup, setDataGroup] = useState<Array<GroupCourse>>([])
    const [courseName, setCourseName] = useState<Array<string>>([])
    const [valueSearch, setValueSearch] = useState<string>('')
    useEffect(() => {
        const fetchData = async () => {
            const res = await courseApi.getGroupCourse()
            const response = await courseApi.getAll()
            setDataGroup(res.data)
            setCourseName(response.data.map(x => x.name))
        }
        fetchData()
    }, [])
    useEffect(() => {
        const local_token = localStorage.getItem("key");
        const token = local_token == null ? "" : local_token;
        dispatch(fetch_user(token))
            .unwrap()
            .then((res) => console.log("res", res))
            .catch((err) => console.log("err", err));
    }, [dispatch]);
    const handleLogout = () => {
        const token = localStorage.getItem("key");
        if (token !== null) {
            logout(token).then(() => {
                localStorage.removeItem("key");
                dispatch(set_not_authenticated());
            });
        }
    };
    const checkEnter = (e: any) => {
        if (e.key === 'Enter') {
            router.push(`/search/id?terms=${e.currentTarget.value}`)
        }
    }
    return (
        <motion.main
            variants={variants} // Pass the variant object into Framer Motion 
            initial="hidden" // Set the initial state to variants.hidden
            animate="enter" // Animated state to variants.enter
            exit="exit" // Exit state (used later) to variants.exit
        >
            <motion.div
                className="container"
                variants={navBarVariants}
                initial="hidden"
                animate="visible"
            >
                <div className={styles.image}></div>
                <Navbar className={styles.text} expand="lg">
                    <Container>
                        <Navbar.Brand ><Link href="/">
                            <div className={styles.brand}>
                                <h3 className="text-primary fw-bolder">Nhái</h3>
                                <h3 className="text-dark fw-bolder">W3school</h3>
                            </div>
                        </Link></Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                            <Nav className="ms-3">
                                {user.is_authenticated ? (
                                    <NavDropdown title={user.user?.username} id="user">
                                        <NavDropdown.Item onClick={() => handleLogout()}>
                                            Logout
                                        </NavDropdown.Item>
                                    </NavDropdown>

                                ) : (
                                    <Navbar.Text><Link href="/login">Login</Link></Navbar.Text>
                                )}
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </motion.div>
            {children}
            <Container className="mt-5 d-flex flex-column align-items-center pb-5">
                <hr />
                <h1>Liên hệ với chúng tôi</h1>
                <div className="d-flex mb-4">
                    <a className="fs-1 text-dark"><Facebook /></a>
                    <a className="fs-1 text-dark ms-3"><Instagram /></a>
                    <a className="fs-1 text-dark ms-3"><Discord /></a>
                </div>
                <div className="d-flex">
                    <p>Info</p>
                    <p className="ms-3">Support</p>
                    <p className="ms-3">Marketing</p>
                </div>
                <div className="d-flex">
                    <p>Điều khoản sử dụng</p>
                    <p className="ms-3">Chính sách bảo mật</p>
                </div>
                <p className="text-secondary">@ copyright đề án tốt nghiệp 4</p>
            </Container>
        </motion.main>
    );
}