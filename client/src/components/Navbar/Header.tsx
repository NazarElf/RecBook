import React, { FC, useState } from "react"
import { Navbar, Container, Offcanvas, Button, Nav, NavDropdown } from "react-bootstrap"
import { useNavigate, Outlet } from "react-router-dom"

const Header: FC = () => {
    const navigate = useNavigate()
    const [expanded, setExpanded] = useState(false)
    return (
        <>
            <Navbar key="md" expand="md" className="bg-body-tertiary" onToggle={() => setExpanded(state => !state)} expanded={expanded}>
                <Container fluid>
                    <Navbar.Brand>
                        <img
                            src="/RecBook.svg" // Replace with your logo path
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
                                    src="/RecBook.svg" // Replace with your logo path
                                    alt="Logo"
                                    width="30"
                                    height="30"
                                    className="d-inline-block align-top"
                                />{' '}RecBook
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className="me-auto my-2 my-md-0">
                                <Nav.Link onClick={() => {navigate('/'); setExpanded(false) }}>Home</Nav.Link>
                                <Nav.Link onClick={() => {navigate('/recipes'); setExpanded(false)}}>Recipes</Nav.Link>
                                <NavDropdown title="Placeholder" id="navbarScrollingDropdown">
                                    <NavDropdown.Item href="#action3">Placeholder action</NavDropdown.Item>
                                    <NavDropdown.Item href="#action4">
                                        Placeholder action 2
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="#action5">
                                        Placeholder action 3
                                    </NavDropdown.Item>
                                </NavDropdown>
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