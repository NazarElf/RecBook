import React, { FC } from "react";
import { Button, Form, ListGroup } from "react-bootstrap";

import type { RecipeProduct } from "../../interfaces/dataTypes";

export type ProductsListProps = {
    selectedProducts: RecipeProduct[]
    setSelectedProducts: React.Dispatch<React.SetStateAction<RecipeProduct[]>>
}

const ProductsList: FC<ProductsListProps> = ({ selectedProducts, setSelectedProducts }) => {


    return (
        <ListGroup>
            {selectedProducts.map(product =>
                <ListGroup.Item key={product.id}>
                    <div className="d-flex gap-3 align-items-stretch align-items-md-center justify-content-between m-2 flex-column flex-sm-row">
                        <span className="align-self-center">{product.name}</span>
                        <div className="d-flex gap-3 align-items-center fustify-content-end">
                            <div className="vr d-none d-sm-block"/>
                            <Form.Control type="text" size="sm" className="flex-grow-1 flex-shrink-1 w-sm-auto" placeholder="Quantity" maxLength={15}/>
                            <Button size="sm" variant="danger" onClick={() => setSelectedProducts(selectedProducts.filter(p => p !== product))}><i className="bi bi-trash-fill"></i></Button>
                        </div>
                    </div>
                </ListGroup.Item>)}
        </ListGroup>
    )

}

export default ProductsList;