import React, { useEffect, useState } from "react";
import { useFetcher, useSearchParams } from "react-router-dom";
import { Button, Offcanvas, Accordion, Container, ListGroup, Badge } from "react-bootstrap";
import { XButton } from "../CustomComponents.tsx";

import type { Product, RecipeType } from "../../interfaces/dataTypes.ts";

import './Offcanvas.css'
import ProductsSelector from "../Products/ProductsSelector.tsx";

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
        let productsString = selectedProducts.map(product => product.id).join(',')
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

    const toggleType = (type_id) => () => {
        if (selectedRecipeTypes.find(srt => srt.id === type_id)) {
            setSelectedRecipeTypes(selectedRecipeTypes.filter(srt => srt.id !== type_id))
            return
        }
        let typeToAdd = recipeTypes.find(type => type.id === type_id);
        if (typeToAdd) setSelectedRecipeTypes([...selectedRecipeTypes, typeToAdd])
    }

    return (
        <>
            <Button onClick={() => setShow(true)}><i className="bi bi-funnel-fill" />{' '}Filter</Button>
            <Offcanvas show={show} placement="end" >
                <Offcanvas.Header closeButton onHide={() => setShow(false)}>
                    <div className="d-flex gap-2">
                        <Button onClick={applyFilters}>Set Filter</Button>
                        <Button variant="outline-primary" onClick={clearFilters}>Clear Filters</Button>
                    </div>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div className="d-flex flex-wrap gap-2 pb-3">
                        {selectedProducts.map(product => <Badge className="d-flex p-2 align-items-center" bg="primary-subtle" text="primary-emphasis" pill key={product.id}><span className="px-1">{product.name}</span><XButton onClick={removeProduct(product)} /></Badge>)}
                        {selectedRecipeTypes.map(type => <Badge className="d-flex p-2 align-items-center" bg="primary-subtle" text="primary-emphasis" pill key={type.id}><span className="px-1">{type.name}</span><XButton onClick={removeRecipeType(type)} /></Badge>)}
                    </div>
                    <Accordion flush>
                        <Accordion.Item eventKey="0" >
                            <Accordion.Header>Products</Accordion.Header>
                            <Accordion.Body className="p-0 py-3">
                                <ProductsSelector selectedProducts={selectedProducts} setSelectedProducts={setSelectedProducts} productIds={productIds} style={{maxHeight: 450}} />
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>Recipe Type</Accordion.Header>
                            <Accordion.Body className="p-0 py-3">
                                <Container fluid className="overflow-auto" style={{ maxHeight: 450 }}>
                                    <ListGroup>

                                        {recipeTypes.map(type =>
                                            <ListGroup.Item key={type.id} className="d-flex gap-2" as="label">
                                                <input className="form-check-input flex-shrink-0" type="checkbox" value={type.id} checked={!!selectedRecipeTypes.find(srt => srt.id === type.id)} onChange={toggleType(type.id)} />
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