//import  from "react";
import React, { useState } from "react";
import { Form, FloatingLabel, Button, Row, Col, Card, Container, Spinner } from 'react-bootstrap';

import type { RecipeDetails } from "../../interfaces/dataTypes.ts";
import { redirect, useLoaderData, useNavigate, useSubmit, useNavigation } from "react-router-dom";
import { createRecipe, fetchOneRecipe, updateRecipe } from "../../api/index.ts";

export async function loader({ params }) {
    const { data: recipe } = await fetchOneRecipe(params.id)
    return recipe;
}

export async function action({ request, params }) {
    const formData = await request.formData();
    const recipe: RecipeDetails = Object.fromEntries(formData)

    if (!params.id) {
        const { data: { id } } = await createRecipe(recipe)
        return redirect(`/recipes/${id}`)
    }
    await updateRecipe(params.id, recipe)
    return redirect(`/recipes/${params.id}`)
}

const MyForm = () => {
    const [validated, setValidated] = useState(false);

    const navigate = useNavigate()
    const navigation = useNavigation()

    const data = useLoaderData() as RecipeDetails

    const [recipe, setRecipe] = useState<RecipeDetails>(data || { name: "", description: "", cooking_order: "", recipe_type_id: 0 })

    const submit = useSubmit()

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();


        setValidated(true)
        form.checkValidity()
        if (recipe.name && recipe.description && recipe.cooking_order && recipe.recipe_type_id && recipe.recipe_type_id > 0) {
            /* @ts-ignore */
            submit(recipe, { method: "POST", replace: true })
        }
        else {
            event.stopPropagation()
        }

    }

    const onBack = () => {
        navigate(-1)
    }

    return (
        <Container >
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
                                <Button variant="primary" type="submit" style={{ width: "100%" }} disabled={navigation.state === 'submitting'}>
                                    {navigation.state === 'submitting' && <Spinner
                                        as='span'
                                        size="sm"
                                        role="status"
                                        aria-hidden='true'
                                    />}
                                    {navigation.state !== 'submitting' && <span>Submit</span>}
                                </Button>
                            </Col>
                            <Col>
                                <Button variant="outline-primary" style={{ width: "100%" }} onClick={onBack}>Go Back</Button>
                            </Col>
                        </Row>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    )
}
//{navigation.state === 'submitting' ? <Spinner/> : 'Submit'}

export default MyForm;