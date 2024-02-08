import React from "react";
import { Navbar, Nav, Container, NavDropdown, Button, Offcanvas, Col, Row } from 'react-bootstrap';
import Recipes from "./components/Recipes/Recipes";
import Form from "./components/Form/Form";
//import AppHeader from "./components/NavBar/AppHeader";


const App = () => {
    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container fluid>
                    <Navbar.Brand href="#">
                        <img
                            src="/RecBook.svg" // Replace with your logo path
                            alt="Logo"
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />{' '}RecBook
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Offcanvas id="navbarScroll">
                        <Offcanvas.Header>
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
                            <Nav className="me-auto my-2 my-lg-0">
                                <Nav.Link href="#action1">Home</Nav.Link>
                                <Nav.Link href="#action2">Link</Nav.Link>
                                <NavDropdown title="Link" id="navbarScrollingDropdown">
                                    <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                                    <NavDropdown.Item href="#action4">
                                        Another action
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="#action5">
                                        Something else here
                                    </NavDropdown.Item>
                                </NavDropdown>
                                <Nav.Link href="#" disabled>
                                    Link
                                </Nav.Link>
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
            </Navbar>
            <Container className="border mt-sm-4">
            <Row fluid>
                <Col sm={12} lg={8} className="order-sm-last order-lg-first"><Recipes/></Col>
                <Col sm={12} lg={3} className="offset-lg-1"><Form/></Col>
            </Row>
            </Container>
        </>
    )
}

export default App;