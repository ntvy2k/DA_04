import React, { Fragment, ReactElement, useEffect, useState } from 'react';
import { Button, Container, Form, FormControl, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { CircleHalf, Search } from 'react-bootstrap-icons';
import { GroupCourse } from '../../moduleType';
import courseApi from '../../pages/api/courseApi';
import Link from 'next/link'
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetch_user, logout, set_not_authenticated } from '../../features/auth';
import { store } from '../../app/store';
import { useRouter } from 'next/router';

export default function HomeLayout({ children }: { children: ReactElement }) {
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
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand><Link href="/">DA-4</Link></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <NavDropdown title="Tutorials" id="basic-nav-dropdown">
                                {dataGroup.map((groupCourse, index) => {
                                    return (
                                        <Fragment key={index}>
                                            {index !== 0 && <NavDropdown.Divider />}
                                            <NavDropdown.ItemText key={groupCourse.id} ><h3>{groupCourse.name}</h3></NavDropdown.ItemText>
                                            {groupCourse.gr_courses.map((course, index) => {
                                                return (
                                                    <NavDropdown.Item key={index}><Link href={`${course.slug}`}>{course.name}</Link></NavDropdown.Item>
                                                )
                                            })}
                                        </Fragment>
                                    )
                                })}
                            </NavDropdown>
                        </Nav>
                        <Nav>
                            <Form className="d-flex" onSubmit={e => { e.preventDefault(); }}>
                                <FormControl
                                    type="search"
                                    placeholder="Search"
                                    className="mr-2"
                                    aria-label="Search"
                                    list="courseName"
                                    onChange={(e) => setValueSearch(e.currentTarget.value)}
                                    onKeyPress={checkEnter}
                                />
                                <datalist id="courseName">
                                    {courseName.map((name, index) => {
                                        return (
                                            <option key={index} value={name}></option>
                                        )
                                    })}
                                </datalist>
                                <Button variant="outline-success" onClick={() => console.log(valueSearch)}><Search /></Button>
                            </Form>
                        </Nav>
                        <Nav>
                            <Navbar.Text> <CircleHalf /> </Navbar.Text>

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
            {children}
        </>
    );
}