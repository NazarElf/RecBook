import React, { useEffect } from "react";
import { Container, Col, Row } from 'react-bootstrap';

import Recipes from "./components/Recipes/Recipes.tsx";
import Form from "./components/Form/Form.tsx";
import useRecipesStore from "./stores/recipes.ts";

const App = () => {
    const fetchAllRecipes = useRecipesStore(state => state.fetchAllRecipes)
    useEffect(() => {
        fetchAllRecipes()
    }, [])
    return (
        <Container className="border mt-sm-4 rounded" style={{ background: "#ffffffaf" }}>
            <Recipes />
        </Container>
    )
}

export default App;