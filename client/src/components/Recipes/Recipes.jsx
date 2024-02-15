import React from "react";
import { useSelector } from "react-redux";
import Recipe from "./Recipe";
import { Col, Row, Button, Container } from "react-bootstrap";

const Recipes = () => {
    const recipes = useSelector((state) => state.recipes)

    return (
        <Container className="m-3">
        <Button variant="primary"><i className="bi bi-plus"> </i>Create recipe</Button>
            <Row xs={1} md={2} xl={3} className="g-3 mt-3" direction="horizontal">
                {recipes.map((recipe) => (
                    <Col key={recipe.id}>
                        <Recipe recipe={recipe} />
                    </Col>
                ))}</Row>
        </Container>
    )
}

export default Recipes;