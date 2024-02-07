import React from "react";
import { Navbar, Nav, Container, NavDropdown, Button } from 'react-bootstrap';


const App = () => {
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container fluid>
                <Navbar.Brand href="#">
                    <img
                        src="/logo512.png" // Replace with your logo path
                        alt="Logo"
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />Navbar scroll
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
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
                    <Container className="d-flex justify-content-end">
                        <Button>Sign In</Button>
                        <Button variant="outline-secondary">Register</Button>
                    </Container>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default App;