import React, { useState, useEffect, FC } from "react";
import { Container, Form, ListGroup } from "react-bootstrap";
import type { Product, RecipeProduct } from "../../interfaces/dataTypes";
import { useFetcher } from "react-router-dom";


interface ProductsGroup {
    name?: string,
    products: Array<Product>
}

interface ProductsSelectorProps {
    selectedProducts: Array<Product | RecipeProduct>
    setSelectedProducts: React.Dispatch<React.SetStateAction<Array<Product | RecipeProduct>>>
    productIds?: number[]
    style?: React.CSSProperties
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

const ProductsSelector: FC<ProductsSelectorProps> = ({ selectedProducts, setSelectedProducts, productIds = [], style }) => {
    const [value, setValue] = useState<string>("")
    const [allProducts, setAllProducts] = useState<Array<Product>>([])
    const [productsGroupedList, setProductsGroupedList] = useState<Array<ProductsGroup>>([])


    const fetcher = useFetcher()
    useEffect(() => {
        if (fetcher.state === 'idle' && !fetcher.data) {
            fetcher.load('/products')
        }
        if (fetcher.data && !allProducts.length) {
            setAllProducts(fetcher.data.products)
            setProductsGroupedList(groupBy(fetcher.data.products))
        }
    }, [fetcher, productIds, allProducts])


    const toggleProduct = (prod_id?: number) => () => {
        if (!prod_id) return
        if (selectedProducts.find(sp => sp.id === prod_id)) {
            setSelectedProducts(selectedProducts.filter(sp => sp.id !== prod_id))
            return
        }
        let productToAdd = allProducts.find(prod => prod.id === prod_id);
        if (productToAdd) setSelectedProducts([...selectedProducts, productToAdd])
    }

    return (
        <Container fluid className="my-1 pt-1 d-flex flex-column gap-2 justify-content-between" style={style}>
            <Form.Control
                placeholder="Type to filter..."
                onChange={(e) => setValue(e.target.value)}
                value={value} />
            <div className="py-2 overflow-auto mh-100">
                {productsGroupedList.filter(prodGroup => prodGroup.products.find(product => product.name?.toLowerCase().startsWith(value.toLowerCase()))).map(prodGroup =>
                    <div key={prodGroup.name}>
                        <h6 className="fw-bold text-center mt-2">{prodGroup.name}</h6>
                        <ListGroup>
                            {prodGroup.products.filter(prod => prod.name?.toLowerCase().startsWith(value.toLowerCase())).map(prod =>
                                <ListGroup.Item id={prod.name} key={prod.id} className="d-flex gap-2" as="label">
                                    <input className="form-check-input flex-shrink-0" type="checkbox" value={prod.id} checked={!!selectedProducts.find(sp => sp.id === prod.id)} onChange={toggleProduct(prod.id)} />
                                    {prod.name}
                                </ListGroup.Item>)}
                        </ListGroup>
                    </div>)}
            </div>
        </Container>
    )
}

export default ProductsSelector;