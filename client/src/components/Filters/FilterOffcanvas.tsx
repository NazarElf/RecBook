import React, { useEffect, useState } from "react";
import { useFetcher, useSearchParams } from "react-router-dom";
import { Button, Offcanvas, Accordion, Container, ListGroup, ToggleButton, ToggleButtonGroup, Badge } from "react-bootstrap";

import type { Product, RecipeType } from "../../interfaces/dataTypes.ts";

import './Offcanvas.css'
import ProductsSelector from "./ProductsSelector.tsx";

const FilterOffcanvas = () => {

    const [show, setShow] = useState<boolean>(false)
    const [selectedProducts, setSelectedProducts] = useState<Array<Product>>([])
    const [recipeTypes, setRecipeTypes] = useState<Array<RecipeType>>([])
    const [selectedRecipeTypes, setSelectedRecipeTypes] = useState<RecipeType[]>([])
    const [productIds, setProductIds] = useState<number[]>([]) //used to send to selector ids of fetched products
    const [isFiltered, setIsFiltered] = useState<Boolean>(false)

    const [searchParams, setSearchParams] = useSearchParams()

    const fetcher = useFetcher()
    useEffect(() => {
        if (fetcher.state === 'idle' && !fetcher.data) {
            fetcher.load('/products')
        }
        if (fetcher.data) {
            setRecipeTypes(fetcher.data.recipeTypes)
        }
    }, [fetcher])

    useEffect(() => {
        selectedRecipeTypesChanged(searchParams.get('types')?.split(',').filter(Number).map(Number) || [])
        let pdi = searchParams.get('products')?.split(',').filter(Number).map(Number) || []
        setProductIds(pdi)
    }, [recipeTypes, searchParams])

    useEffect(() => {
        if (!isFiltered) {
            applyFilters()
        }
        setIsFiltered(true)
    }, [selectedProducts, selectedRecipeTypes])

    const removeProduct = (product: Product) => (e) => {
        setSelectedProducts(selectedProducts.filter(element => element !== product))
    }

    const removeRecipeType = (recipeType: RecipeType) => (e) => {
        setSelectedRecipeTypes(selectedRecipeTypes.filter(type => type !== recipeType))
    }

    const selectedRecipeTypesChanged = (gr) => {
        setSelectedRecipeTypes(recipeTypes.filter(type => gr.includes(type.id)))
    }

    const clearFilters = () => {
        setSelectedProducts([])
        setSelectedRecipeTypes([])
        setIsFiltered(false)
    }

    function createFilter() {
        let productsString = selectedProducts.map(product => product.product_id).join(',')
        let typesString = selectedRecipeTypes.map(type => type.id).join(',')
        let filters: any = {}
        if (productsString) filters.products = productsString
        if (typesString) filters.types = typesString
        return filters
    }

    const applyFilters = () => {
        setSearchParams(createFilter())
        setShow(false)
    }

    return (
        <>
            <Button onClick={() => setShow(true)}>Filter</Button>
            <Offcanvas show={show} placement="end" >
                <Offcanvas.Header closeButton onHide={() => setShow(false)}>
                    <div className="d-flex gap-2">
                        <Button onClick={applyFilters}>Set Filter</Button>
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
                            <Accordion.Body className="p-0 py-3">
                                <ProductsSelector selectedProducts={selectedProducts} setSelectedProducts={setSelectedProducts} productIds={productIds} />
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