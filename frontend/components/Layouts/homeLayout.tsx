import React, { ReactElement, useEffect, useState } from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { CircleHalf, Search } from 'react-bootstrap-icons';
import { Course, CourseList } from '../../moduleType';
import courseApi from '../../pages/api/courseApi';
import HeaderCourse from '../HeaderCourse';
import Link from 'next/link'

export default function HomeLayout(page: ReactElement) {
    const [data, setData] = useState<Array<CourseList>>([])
    useEffect(() => {
        const fetchData = async () => {
            const reponse = await courseApi.getAll()
            setData(reponse.data)
        }
        fetchData()
    }, [])
    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand><Link href="/">DA-4</Link></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <NavDropdown title="Tutorials" id="basic-nav-dropdown">
                                <NavDropdown.Item>Chờ Vỹ xong cái api</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Nav>
                            <Navbar.Text> <CircleHalf /> </Navbar.Text>
                            <Navbar.Text> <Search /> </Navbar.Text>
                            <Navbar.Text><Link href="/login">Login</Link></Navbar.Text>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <HeaderCourse data={data} />
            {page}
        </>
    );
}