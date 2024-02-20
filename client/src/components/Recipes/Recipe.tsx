import React, { FC } from "react";
import { Button, Card, Dropdown } from "react-bootstrap";

import { CustomToggle } from '../CustomComponents.jsx'
import useRecipesStore from "../../stores/recipes.ts";
import './recipe.css'

import type { Recipe } from "../../interfaces/dataTypes.ts";
import { useNavigate } from "react-router-dom";

export interface RecipeProps {
    recipe: Recipe
}

const RecipeCard: FC<RecipeProps> = ({ recipe }) => {
    console.log(recipe)
    const type: string | undefined = (() => {
        switch (recipe.recipe_type_id) {
            case 1: return "Desserts"
            case 2: return "Starters"
            case 3: return "Snacks"
            case 4: return "Main courses"
            case 5: return "Drinks"
            default: return undefined
        }
    })()

    const removeRecipe = useRecipesStore(state => state.removeRecipe)

    const onClick = () => {
        if (recipe.id)
            removeRecipe(recipe.id)
    }

    const navigate = useNavigate()

    return (
        <Card style={{cursor: 'pointer'}} onClick={() => navigate(`/recipes/${recipe.id}`)}>
            <Card.Body>
                <Card.Title className="d-flex justify-content-between align-items-center">
                    {recipe.name}
                    <Dropdown align={{ xs: 'start' }}>
                        <Dropdown.Toggle as={CustomToggle} id="dropdown-basic">
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="dropdown-animate">
                            <Dropdown.Item as={Button}><i className="bi bi-pencil"></i>{' '}Modify</Dropdown.Item>
                            <Dropdown.Item as={Button} onClick={onClick} className="btn-outline-danger text-danger danger-active"><i className="bi bi-trash"></i>{' '}Remove</Dropdown.Item>
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

export default RecipeCard;