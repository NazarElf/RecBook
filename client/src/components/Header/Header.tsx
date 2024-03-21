import React, { FC, useState } from "react"
import { Navbar, Container, Offcanvas, Button, Nav } from "react-bootstrap"
import { useNavigate, Outlet, useLocation } from "react-router-dom"

const Header: FC = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const [expanded, setExpanded] = useState(false)
    return (
        <>
            <Navbar key="md" expand="md" className="bg-body-tertiary" onToggle={() => setExpanded(state => !state)} expanded={expanded}>
                <Container fluid>
                    <Navbar.Brand onClick={() => { navigate('/'); setExpanded(false) }}>
                        <img
                            src="/RecBook.svg"
                            alt="Logo"
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />{' '}RecBook
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navOffCanvas" />
                    <Navbar.Offcanvas id="navOffCanvas" responsive="md" style={{ width: "100%" }}>
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title>
                                <img
                                    src="/RecBook.svg"
                                    alt="Logo"
                                    width="30"
                                    height="30"
                                    className="d-inline-block align-top"
                                />{' '}RecBook
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav variant="underline" className="me-auto my-2 my-md-0">
                                <Nav.Link active={location.pathname === '/'} onClick={() => { navigate('/'); setExpanded(false) }}>Home</Nav.Link>
                                <Nav.Link active={location.pathname === '/recipes'} onClick={() => { navigate('/recipes'); setExpanded(false) }}>Recipes</Nav.Link>
                            </Nav>
                            <Nav className="gap-2">
                                <Button>
                                    Sign In
                                </Button>
                                <Button variant="outline-primary">
                                    Register
                                </Button>
                            </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar >
            <Outlet />
        </>
    )
}

export default Header;