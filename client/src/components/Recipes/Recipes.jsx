import React from "react";
import Recipe from "./Recipe";
import { Col, Row, Button, Container, Spinner } from "react-bootstrap";
import useRecipesStore from "../../stores/recipes";

const Recipes = () => {
    //const recipes = useSelector((state) => state.recipes)
    const recipes = useRecipesStore((state) => state.recipes)

    return (
        <Container className="my-3">
            <Button variant="primary"><i className="bi bi-plus"> </i>Create recipe</Button>
            <Row xs={1} md={2} xl={3} className="g-3 mt-3" direction="horizontal">
                {!recipes.length ? <Col><Spinner animation="border" variant="primary" /> </Col> :
                    recipes.map((recipe, idx) => (
                        <Col key={recipe.id} className="animate-in" style={{ animationDelay: `${0.1 * idx /*% 20*/}s` }}>
                            <Recipe recipe={recipe} />
                        </Col>
                    ))
                }
            </Row>
        </Container>
    )
}

export default Recipes;