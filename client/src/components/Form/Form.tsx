//import  from "react";
import React, { useState } from "react";
import { Form, FloatingLabel, Button, Row, Col, Card } from 'react-bootstrap';
//import { createRecipe } from "../../actions/recipes";
import useRecipesStore from "../../stores/recipes.ts";

import type { Recipe } from "../../interfaces/dataTypes.ts";

const MyForm = () => {
    const [validated, setValidated] = useState(false);

    const [recipe, setRecipe] = useState<Recipe>({ name: "", description: "", cooking_order: "", recipe_type_id: 0 })

    const createRecipe = useRecipesStore(state => state.createRecipe)

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();


        setValidated(true)
        form.checkValidity()
        console.log(recipe)
        if (recipe.name && recipe.description && recipe.cooking_order && recipe.recipe_type_id && recipe.recipe_type_id > 0) {
            var sendRecipe = recipe
            createRecipe(sendRecipe)
            onClear()
        }
        else {
            event.stopPropagation()
        }

    }

    const onClear = () => {
        setRecipe({ name: "", description: "", cooking_order: "", recipe_type_id: 0 })
        setValidated(false)
    }

    return (
        <Card className="m-3">
            <Card.Header>Add new Recipe</Card.Header>
            <Card.Body>
                <Form noValidate validated={validated} onSubmit={handleSubmit} >
                    <FloatingLabel controlId="Name" label="Recipe Name" className="mb-3">
                        <Form.Control type="text" placeholder="" autoComplete="off" required value={recipe.name} onInput={(e: React.ChangeEvent<HTMLInputElement>) => { setRecipe({ ...recipe, name: e.target.value }) }} />
                        <Form.Control.Feedback type="invalid">Name for recipe is necesary</Form.Control.Feedback>
                    </FloatingLabel>
                    <FloatingLabel controlId="Description" label="Recipe Description" className="mb-3">
                        <Form.Control as="textarea" placeholder=""
                            style={{ height: '100px' }} required value={recipe.description} onInput={(e: React.ChangeEvent<HTMLInputElement>) => { setRecipe({ ...recipe, description: e.target.value }) }} />
                        <Form.Control.Feedback type="invalid">Input short description of recipe</Form.Control.Feedback>
                    </FloatingLabel>
                    <FloatingLabel controlId="Cooking_Order" label="Cooking Order" className="mb-3">
                        <Form.Control as="textarea" placeholder=""
                            style={{ height: '100px' }} required value={recipe.cooking_order} onInput={(e: React.ChangeEvent<HTMLInputElement>) => { setRecipe({ ...recipe, cooking_order: e.target.value }) }} />
                        <Form.Control.Feedback type="invalid">Specify Cooking order</Form.Control.Feedback>
                    </FloatingLabel>
                    <FloatingLabel controlId="Recipe_Type_ID" label="Choose recipe type" className="mb-3">
                        <Form.Select required value={recipe.recipe_type_id ? recipe.recipe_type_id : ""} onInput={(e: React.ChangeEvent<HTMLSelectElement>) => { setRecipe({ ...recipe, recipe_type_id: Number(e.target.value) }) }}>
                            <option value={""}>--Select recipe type--</option>
                            <option value={1}>Desserts</option>
                            <option value={2}>Starters</option>
                            <option value={3}>Snacks</option>
                            <option value={4}>Main courses</option>
                            <option value={5}>Drinks</option>
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">Choose to what type of recipes should be this one</Form.Control.Feedback>
                    </FloatingLabel>
                    <Row >
                        <Col >
                            <Button variant="primary" type="submit" style={{ width: "100%" }}>Submit</Button>
                        </Col>
                        <Col>
                            <Button variant="outline-primary" style={{ width: "100%" }} onClick={onClear}>Clear</Button>
                        </Col>
                    </Row>
                </Form>
            </Card.Body>
        </Card>
    )
}

export default MyForm;