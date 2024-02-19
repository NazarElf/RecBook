import React from "react";
import Recipe from "./Recipe.tsx";
import { Col, Row, Button, Container, Spinner } from "react-bootstrap";
import useRecipesStore from "../../stores/recipes.ts";
import { useNavigate } from "react-router-dom";

const Recipes = () => {
    //const recipes = useSelector((state) => state.recipes)
    const recipes = useRecipesStore((state) => state.recipes)
    const navigate = useNavigate()

    return (
        <Container className="my-3">
            <Button variant="primary" onClick={() => navigate('/recipes/create')}><i className="bi bi-plus"> </i>Create recipe</Button>
            <Row xs={1} md={2} xl={3} className="g-3 mt-3" direction="horizontal">
                {!recipes.length ? <Col><Spinner animation="border" variant="primary" /> </Col> :
                    recipes.map((recipe, idx) => (
                        <Col key={recipe.id} className="animate-in" style={{ animationDelay: `${0.05 * idx /*% 20*/}s` }}>
                            <Recipe recipe={recipe} />
                        </Col>
                    ))
                }
            </Row>
        </Container>
    )
}

export default Recipes;