//import  from "react";
import React, { useState } from "react";
import { Form, FloatingLabel, Button, Row, Col, Spinner, Modal } from 'react-bootstrap';

import type { RecipeDetails, RecipeProduct } from "../../interfaces/dataTypes.ts";
import { redirect, useLoaderData, useNavigate, useSubmit, useNavigation } from "react-router-dom";
import { createRecipe, fetchOneRecipe, updateRecipe } from "../../api/index.ts";
import ProductsSelector from "../Products/ProductsSelector.tsx";
import ProductsList from "./ProductsListInForm.tsx";

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

    const navigate = useNavigate()
    const navigation = useNavigation()

    const data = useLoaderData() as RecipeDetails

    const [recipe, setRecipe] = useState<RecipeDetails>(data || { name: "", description: "", cooking_order: "", recipe_type_id: 0 })
    const [products, setProducts] = useState<RecipeProduct[]>([])
    const [show, setShow] = useState<boolean>(false)
    const [errorShow, setErrorShow] = useState<boolean>(false)

    const submit = useSubmit()

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();


        form.checkValidity()
        if (recipe.name && recipe.description && recipe.cooking_order && recipe.recipe_type_id && recipe.recipe_type_id > 0 && products.length > 0) {
            /* @ts-ignore */
            submit(recipe, { method: "POST", replace: true })
        }
        else {
            event.stopPropagation()
            setErrorShow(true)
        }

    }

    const onBack = () => {
        navigate(-1)
    }

    return (
        <>
            <div className="container-sm p-3 rounded border bg-body-tertiary" style={{ backgroundColor: "#ffffff" }}>
                <p className="h3">Add new Recipe</p>
                <Form noValidate onSubmit={handleSubmit} >
                    <FloatingLabel controlId="Name" label="Recipe Name" className="mb-3">
                        <Form.Control type="text" placeholder="" autoComplete="off" required value={recipe.name} onInput={(e: React.ChangeEvent<HTMLInputElement>) => { setRecipe({ ...recipe, name: e.target.value }) }} />
                        <Form.Control.Feedback type="invalid">Name for recipe is necesary</Form.Control.Feedback>
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
                    <FloatingLabel controlId="Description" label="Recipe Description" className="mb-3">
                        <Form.Control as="textarea" placeholder=""
                            style={{ height: '100px' }} required value={recipe.description} onInput={(e: React.ChangeEvent<HTMLInputElement>) => { setRecipe({ ...recipe, description: e.target.value }) }} />
                        <Form.Control.Feedback type="invalid">Input short description of recipe</Form.Control.Feedback>
                    </FloatingLabel>
                    <p className="h5">Products:</p>
                    <Row className="mb-3">
                        <Col xs={12} md={8} className="pe-md-0 mb-md-0 mb-3" style={{ maxHeight: 500, overflow: 'auto' }}>
                            <ProductsList selectedProducts={products} setSelectedProducts={setProducts} />
                        </Col>
                        <Col xs={12} md={4} className="ps-md-0">
                            <Button className="d-block d-md-none w-100" onClick={() => setShow(true)}>Add Products</Button>
                            <div className="d-md-block d-none">
                                <ProductsSelector selectedProducts={products} setSelectedProducts={setProducts} style={{ maxHeight: 500 }} />
                            </div>
                        </Col>
                    </Row>
                    <FloatingLabel controlId="Cooking_Order" label="Cooking Order" className="mb-3">
                        <Form.Control as="textarea" placeholder=""
                            style={{ height: '100px' }} required value={recipe.cooking_order} onInput={(e: React.ChangeEvent<HTMLInputElement>) => { setRecipe({ ...recipe, cooking_order: e.target.value }) }} />
                        <Form.Control.Feedback type="invalid">Specify Cooking order</Form.Control.Feedback>
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
            </div>
            <Modal show={show}>
                <Modal.Header>Add products to recipe</Modal.Header>
                <Modal.Body>
                    <ProductsSelector selectedProducts={products} setSelectedProducts={setProducts} style={{ maxHeight: 500 }} />
                </Modal.Body>
                <Modal.Footer>
                    <Button className="w-100" onClick={() => setShow(false)}>Confirm</Button>
                </Modal.Footer>
            </Modal>
            <Modal show={errorShow} onHide={() => setErrorShow(false)} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>Can't create product</Modal.Header>
                <Modal.Body>Something is missing, make sure you input everything
                    <br/>Probably you missed one of next inputs:
                    {!!!recipe.name && <><br/>{'- Recipe Name'}</>}
                    {!!!recipe.description && <><br/>{'- Recipe Description'}</>}
                    {!!!recipe.cooking_order && <><br/>{'- Cooking Order'}</>}
                    {!!!(recipe.recipe_type_id && recipe.recipe_type_id > 0) && <><br/>{'- Recipe Type'}</>}
                    {!!!(products.length > 0) && <><br/>{'- List of Products'}</>}
                </Modal.Body>
                <Modal.Footer>
                    <Button className="w-100" onClick={() => setErrorShow(false)}>Okay</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
//{navigation.state === 'submitting' ? <Spinner/> : 'Submit'}

export default MyForm;