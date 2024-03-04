import React, { useEffect, useState } from "react";
import { fetchAllProducts, fetchRecipeTypes } from "../../api/index.ts";
import { useFetcher } from "react-router-dom";
import { Button, Offcanvas, Accordion, Container, ListGroup, ToggleButton, ToggleButtonGroup, Badge, Form } from "react-bootstrap";

import type { Product, RecipeType } from "../../interfaces/dataTypes.ts";

import './Offcanvas.css'

export async function loader() {
    const { data: products } = await fetchAllProducts()
    const { data: recipeTypes } = await fetchRecipeTypes()
    return { products, recipeTypes }
}

interface ProductsGroup {
    name: string,
    products: Array<Product>
}

var groupBy = function (xs: Array<Product>) {
    var res: Array<ProductsGroup> = []

    xs.forEach((product) => {
        var group = res.find(gr => gr.name === product.type_name)
        if (group) {
            group.products.push(product)
        }
        else {
            res.push({ name: product.type_name, products: [product] })
        }
    })

    return res;
};

const FilterOffcanvas = () => {

    const [show, setShow] = useState<boolean>(false)
    const [allProducts, setAllProducts] = useState<Array<Product>>([])
    const [selectedProducts, setSelectedProducts] = useState<Array<Product>>([])
    const [productsGroupedList, setProductsGroupedList] = useState<Array<ProductsGroup>>([])
    const [recipeTypes, setRecipeTypes] = useState<Array<RecipeType>>([])
    const [selectedRecipeTypes, setSelectedRecipeTypes] = useState<RecipeType[]>([])

    const [value, setValue] = useState<string>("")



    const fetcher = useFetcher()
    useEffect(() => {
        if (fetcher.state === 'idle' && !fetcher.data) {
            fetcher.load('/products')
        }
        if (fetcher.data) {
            setAllProducts(fetcher.data.products)
            setProductsGroupedList(groupBy(fetcher.data.products))
            setRecipeTypes(fetcher.data.recipeTypes)
        }
    }, [fetcher])

    const removeProduct = (product: Product) => (e) => {
        setSelectedProducts(selectedProducts.filter(element => element !== product))
    }

    const removeRecipeType = (recipeType: RecipeType) => (e) => {
        setSelectedRecipeTypes(selectedRecipeTypes.filter(type => type !== recipeType))
    }

    const selectedProductsChanged = (gr) => {
        setSelectedProducts(allProducts.filter(product => gr.includes(product.product_id)))
    }

    const selectedRecipeTypesChanged = (gr) => {
        setSelectedRecipeTypes(recipeTypes.filter(type => gr.includes(type.id)))
    }

    const clearFilters = () => {
        setSelectedProducts([])
        setSelectedRecipeTypes([])
        setValue("")
    }

    return (
        <>
            <Button onClick={() => setShow(true)}>Filter</Button>
            <Offcanvas show={show} placement="end" >
                <Offcanvas.Header closeButton onHide={() => setShow(false)}>
                    <div className="d-flex gap-2">
                        <Button>Set Filter</Button>
                        <Button variant="outline-primary" onClick={clearFilters}>Clear Filters</Button>
                    </div>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div className="d-flex flex-wrap column-gap-2">
                        {selectedProducts.map(product => <h5 key={product.product_id}><Badge bg="secondary" pill>{product.name}{' '}<i style={{ cursor: "pointer" }} onClick={removeProduct(product)} className="bi bi-x-lg close-icon"></i></Badge></h5>)}
                        {selectedRecipeTypes.map(type => <h5 key={type.id}><Badge bg="secondary" pill>{type.name}{' '}<i style={{ cursor: "pointer" }} onClick={removeRecipeType(type)} className="bi bi-x-lg close-icon"></i></Badge></h5>)}
                    </div>
                    <Accordion flush>
                        <Accordion.Item eventKey="0" >
                            <Accordion.Header>Products</Accordion.Header>
                            <Accordion.Body className="p-0 py-3" onExited={() => setValue("")}>
                                <Container fluid className="overflow-auto" style={{ maxHeight: 500 }}>
                                    <Form.Control
                                        className="my-2"
                                        placeholder="Type to filter..."
                                        onChange={(e) => setValue(e.target.value)}
                                        value={value} />
                                    {productsGroupedList.filter(prodGroup => prodGroup.products.find(product => product.name.toLowerCase().startsWith(value.toLowerCase()))).map(prodGroup =>
                                        <div key={prodGroup.name}>
                                            <h6 className="fw-bold text-center mt-2">{prodGroup.name}</h6>
                                            <ListGroup as={ToggleButtonGroup} type="checkbox" vertical variant="light" onChange={selectedProductsChanged} value={selectedProducts.map(elem => elem.product_id)} className="rounded-0">
                                                {prodGroup.products.filter(prod => prod.name.toLowerCase().startsWith(value.toLowerCase())).map(prod =>
                                                    <ListGroup.Item as={ToggleButton} value={prod.product_id} id={prod.name} key={prod.product_id} variant="light" className="rounded-0 btn-light">
                                                        {prod.name}
                                                    </ListGroup.Item>)}
                                            </ListGroup>
                                        </div>)}
                                </Container>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>Recipe Type</Accordion.Header>
                            <Accordion.Body className="p-0 py-3">
                                <Container fluid className="overflow-auto" style={{ maxHeight: 500 }}>
                                    <ListGroup as={ToggleButtonGroup} type="checkbox" vertical variant="light" onChange={selectedRecipeTypesChanged} value={selectedRecipeTypes.map(type => type.id)} className="rounded-0">
                                        {recipeTypes.map(type =>
                                            <ListGroup.Item as={ToggleButton} value={type.id || 0} id={type.name} key={type.id} variant="light" className="rounded-0 btn-light">
                                                {type.name}
                                            </ListGroup.Item>
                                        )}
                                    </ListGroup>
                                </Container>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Offcanvas.Body>
            </Offcanvas>
        </>)
}

export default FilterOffcanvas;