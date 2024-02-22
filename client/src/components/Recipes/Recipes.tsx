import React from "react";
import { default as RecipeElement } from "./Recipe.tsx";
import { Col, Row, Button, Container, Spinner } from "react-bootstrap";
import { useLoaderData, useNavigate } from "react-router-dom";
import * as api from '../../api/index.ts'

import type { Recipe } from "../../interfaces/dataTypes.ts";

export async function loader() {
    const { data: recipes } = await api.fetchRecipes()
    return { recipes };
}



const Recipes = () => {
    const { recipes } = useLoaderData() as { recipes: Recipe[] }
    const navigate = useNavigate()

    return (
        <Container className="border mt-sm-4 rounded" style={{ background: "#ffffffaf" }}>
            <Container className="my-3">
                <Button variant="primary" onClick={() => navigate('/recipes/create')}><i className="bi bi-plus"> </i>Create recipe</Button>
                <Row xs={1} md={2} xl={3} className="g-3 mt-3" direction="horizontal">
                    {!recipes.length ? <Col><Spinner animation="border" variant="primary" /> </Col> :
                        recipes.map((recipe, idx) => (
                            <Col key={recipe.id} className="animate-in" style={{ animationDelay: `${0.05 * idx /*% 20*/}s` }}>
                                <RecipeElement recipe={recipe} />
                            </Col>
                        ))
                    }
                </Row>
            </Container>
        </Container>
    )
}

export default Recipes;