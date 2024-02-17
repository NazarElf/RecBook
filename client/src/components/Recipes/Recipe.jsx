import React from "react";
import { Button, Card, Dropdown } from "react-bootstrap";

import {CustomToggle} from  '../CustomComponents'
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
                    <Dropdown align={{xs:'start'}}>
                        <Dropdown.Toggle as={CustomToggle} id="dropdown-basic">
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="dropdown-animate">
                            <Dropdown.Item as={Button}><i className="bi bi-pencil"></i>{' '}Modify</Dropdown.Item>
                            <Dropdown.Item as={Button} className="btn-outline-danger text-danger danger-active"><i className="bi bi-trash"></i>{' '}Remove</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Card.Title>
                <Card.Subtitle className="font-weight-light">{type}</Card.Subtitle>
                <Card.Text>
                    {recipe.description}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Recipe;