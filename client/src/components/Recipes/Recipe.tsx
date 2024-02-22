import React, { FC } from "react";
import { Button, Card, Dropdown } from "react-bootstrap";

import { CustomToggle } from '../CustomComponents.jsx'
import './recipe.css'

import type { Recipe } from "../../interfaces/dataTypes.ts";
import { useNavigate, useSubmit } from "react-router-dom";

export interface RecipeProps {
    recipe: Recipe
}

const RecipeCard: FC<RecipeProps> = ({ recipe }) => {

    const submit = useSubmit()

    console.log(recipe)

    const onRemoveClick = () => {
        let a = `/recipes/${recipe.id}/delete`
        submit(null, {method: "delete", action: a})
    }
    const onModifyClick = () =>
    {
        navigate(`/recipes/${recipe.id}/modify`)
    }

    const navigate = useNavigate()

    return (
        <Card style={{cursor: 'pointer'}} onClick={() => navigate(`/recipes/${recipe.id}`)} className="recipe-card">
            <Card.Body>
                <Card.Title className="d-flex justify-content-between align-items-center">
                    {recipe.name}
                    <Dropdown align={{ xs: 'start' }} onClick={(e) => e.stopPropagation()}>
                        <Dropdown.Toggle as={CustomToggle} id="dropdown-basic">
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="dropdown-animate">
                            <Dropdown.Item as={Button} onClick={onModifyClick}><i className="bi bi-pencil"></i>{' '}Modify</Dropdown.Item>
                            <Dropdown.Item as={Button} onClick={onRemoveClick} className="btn-outline-danger text-danger danger-active"><i className="bi bi-trash"></i>{' '}Remove</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Card.Title>
                <Card.Subtitle className="fst-italic ">{recipe.recipe_type}</Card.Subtitle>
                <Card.Text>
                    {recipe.description}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default RecipeCard;