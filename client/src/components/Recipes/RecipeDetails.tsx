import React, { useEffect, useRef, useState } from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom'
import * as api from '../../api/index.ts'
import type { RecipeDetails as Details } from '../../interfaces/dataTypes.ts'
import { Col, Row, Button, Container, Spinner, Figure } from "react-bootstrap";


export async function loader({ params }) {
    const { data } = await api.fetchOneRecipe(Number(params.id))
    return { recipe: data };
}

const RecipeDetails = () => {

    const { recipe } = useLoaderData() as { recipe: Details }
    const navigate = useNavigate()
    const text = useRef<HTMLHeadingElement>(null)
    const img = useRef<HTMLImageElement>(null)
    const [width, setWidth] = useState<number | undefined>(0)
    const [loaded, setLoaded] = useState<boolean | undefined>(false)
    
    useEffect(() => {
        setWidth(text.current?.offsetWidth)
    }, [loaded])

    if (recipe)
        return (
            <Container className="border mt-sm-4 rounded" style={{ background: "#ffffffaf" }}>
                <Button variant="outline-dark" className='mt-3' style={{position: 'absolute'}} onClick={() => navigate(-1)}><i className="bi bi-arrow-left"></i></Button>
                <Row className=' p-3 align-items-center'>
                    <Col xs={12} md={7}>
                        <div className='d-flex flex-column align-items-center justify-content-center  p-3'>
                            <div style={{ width: (width || 0) * 0.7, height: 5, backgroundColor: 'black' }} />
                            <h1 className='pt-3 mb-0' ref={text}>{recipe.name}</h1>
                            <p className='pt-0 fst-italic fw-light'>{recipe.recipe_type}</p>
                            <div style={{ width: (width || 0) * 0.7, height: 5, backgroundColor: 'black' }} />
                        </div>
                    </Col>
                    <Col xs={12} md={5}>
                        <Figure style={{width: '100%'}}>
                            <div className='border rounded d-flex img-fluid' style={{
                                    visibility: loaded? 'collapse' : 'visible',
                                    position: loaded ? 'absolute' : 'relative',
                                    height:300,
                                    background: 'darkgray',
                                    alignItems: 'center',
                                    justifyContent: 'center'}}>
                                <Spinner></Spinner>
                            </div>
                            <Figure.Image src='holder.js/500x300' ref={img} thumbnail fluid style={{ objectFit: 'cover', visibility: loaded ? 'visible' : 'collapse' }} onLoad={() => setLoaded(true)}/>
                            {recipe.user_created_id && <Figure.Caption style={{ textAlign: 'right' }}>Created by: Placeholder</Figure.Caption>}
                        </Figure>
                    </Col>
                </Row>
                <Row className='p-3'>
                    <Col>{recipe.description}</Col>
                </Row>
                <Row className='border border-4 rounded rounded-3 m-0 p-3 border-warning-subtle' style={{ backgroundImage: 'linear-gradient(darkred, rgb(108, 0, 0))', }}>

                </Row>
                <Row className='p-3'>
                    <Col>
                        {recipe.cooking_order}
                    </Col>
                </Row>
            </Container>
        )
    return (<div>Recipe not found</div>)
}

export default RecipeDetails;