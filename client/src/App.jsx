import React, {useEffect} from "react";
import { Navbar, Nav, Container, NavDropdown, Button, Offcanvas, Col, Row } from 'react-bootstrap';
import Recipes from "./components/Recipes/Recipes";
import Form from "./components/Form/Form";
import useRecipesStore from "./stores/recipes";


//import {getRecipes} from './actions/recipes'
//import AppHeader from "./components/NavBar/AppHeader";

const App = () => {
    const fetchAllRecipes = useRecipesStore(state => state.fetchAllRecipes)
    useEffect(() =>{
        fetchAllRecipes()
    }, [])
    return (
        <>
            <Navbar expand="md" className="bg-body-tertiary">
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
                    <Navbar.Offcanvas id="navbarScroll" responsive="md" style={{width:"100%"}}>
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
                                <Nav.Link href="#action1">Home</Nav.Link>
                                <Nav.Link href="#action2">Placeholder</Nav.Link>
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
                                <Nav.Link href="#" disabled>
                                    Placeholder
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
            <Container className="border mt-sm-4 rounded" style={{background: "#ffffffaf"}}>
            <Row>
                <Col sm={12} lg={8} xxl={7} className="order-last order-lg-first"><Recipes/></Col>
                <Col sm={12} lg={4} className="offset-md-0 offset-xxl-1"><Form/></Col>
            </Row>
            </Container>
        </>
    )
}

export default App;