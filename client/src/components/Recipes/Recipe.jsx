import React from "react";
import { Card, Button } from "react-bootstrap";

import './recipe.css'

const Recipe = ({ recipe }) => {
    console.log(recipe)
    const type = (() => {
        switch (recipe.typeID) {
            case 1: return "Desserts"
            case 2: return "Starters"
            case 3: return "Snacks"
            case 4: return "Main courses"
            case 5: return "Drinks"
            default: return false
        }
    })()
    return (
        <Card >
            <Card.Body>
                <Card.Title className="d-flex justify-content-between align-items-center">
                    {recipe.name}
                    <button><i class="bi bi-three-dots"></i></button>
                </Card.Title>
                <Card.Subtitle className="font-weight-light">{type}</Card.Subtitle>
                <Card.Text>
                    {recipe.description}
                </Card.Text>
                <Button size="sm" variant="outline-danger"><i className="bi bi-trash"></i></Button>
            </Card.Body>
        </Card>
    )
}

export default Recipe;