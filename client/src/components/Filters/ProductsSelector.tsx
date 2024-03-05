import React, { useState, useEffect, FC } from "react";
import { Container, Form, ListGroup, ToggleButtonGroup, ToggleButton } from "react-bootstrap";
import type { Product } from "../../interfaces/dataTypes";
import { useFetcher } from "react-router-dom";


interface ProductsGroup {
    name: string,
    products: Array<Product>
}

interface ProductsSelectorProps{
    selectedProducts: Product[]
    setSelectedProducts: React.Dispatch<React.SetStateAction<Product[]>>
    productIds?: number[]
}

function groupBy(xs: Array<Product>) {
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

const ProductsSelector :FC<ProductsSelectorProps> = ({selectedProducts, setSelectedProducts, productIds}) => {
    const [value, setValue] = useState<string>("")
    const [allProducts, setAllProducts] = useState<Array<Product>>([])
    const [productsGroupedList, setProductsGroupedList] = useState<Array<ProductsGroup>>([])

    const selectedProductsChanged = (gr) => {
        setSelectedProducts(allProducts.filter(product => gr.includes(product.product_id)))
    }

    const fetcher = useFetcher()
    useEffect(() => {
        if (fetcher.state === 'idle' && !fetcher.data) {
            fetcher.load('/products')
        }
        if (fetcher.data) {
            setAllProducts(fetcher.data.products)
            setProductsGroupedList(groupBy(fetcher.data.products))
        }
    }, [fetcher, productIds])
    useEffect(() =>
    {
        
        selectedProductsChanged(productIds)
    }, [allProducts])

    return (
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
    )
}

export default ProductsSelector;