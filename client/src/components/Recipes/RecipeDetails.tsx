import React, { useEffect, useRef, useState } from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom'
import * as api from '../../api/index.ts'
import type { RecipeDetails as Details } from '../../interfaces/dataTypes.ts'
import { Col, Row, Button, Container, Spinner, Figure, ButtonGroup, ButtonToolbar } from "react-bootstrap";
import RecipeRemoveModal from './RecipeRemoveModal.tsx';

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
    const [show, setShow] = useState<boolean>(false)

    const avatar = `https://placekitten.com/g/${400 + Math.round(Math.random() * 200 - 100)}/${400 + Math.round(Math.random() * 200 - 100)}`

    useEffect(() => {
        setWidth(text.current?.offsetWidth)
    }, [loaded])


    const onRemoveClick = () => {
        setShow(true)
    }
    const onModifyClick = () => {
        navigate(`/recipes/${recipe.id}/modify`)
    }



    return (
        <>
            <Container className="border mt-sm-4 rounded" style={{ background: "#ffffffaf" }}>
                <ButtonToolbar className='justify-content-between mt-3 mx-3'>
                    <Button variant="outline-dark" onClick={() => navigate(-1)} size='sm'><i className="bi bi-arrow-left">{' '}Go Back</i></Button>
                    <ButtonGroup size='sm'>
                        <Button variant='outline-secondary' onClick={onModifyClick}><i className="bi bi-pencil"></i>{' '}Modify</Button>
                        <Button variant='outline-danger' onClick={onRemoveClick}><i className="bi bi-trash"></i>{' '}Remove</Button>
                    </ButtonGroup>
                </ButtonToolbar>
                <Row className=' p-3 align-items-center'>
                    <Col xs={12} md={7}>
                        <div className='d-flex flex-column align-items-center justify-content-center  p-3'>
                            <div style={{ width: (width || 0) * 0.7, height: 3, backgroundColor: 'black' }} />
                            <h1 className='pt-3 mb-0' ref={text} style={{ textAlign: 'center' }}>{recipe.name}</h1>
                            <p className='pt-0 fst-italic fw-light'>{recipe.recipe_type}</p>
                            <div style={{ width: (width || 0) * 0.7, height: 3, backgroundColor: 'black' }} />
                        </div>
                    </Col>
                    <Col xs={12} md={5}>
                        <Figure style={{ width: '100%' }}>
                            <div className='border rounded d-flex img-fluid' style={{
                                visibility: loaded ? 'collapse' : 'visible',
                                position: loaded ? 'absolute' : 'relative',
                                height: 300,
                                background: 'darkgray',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Spinner></Spinner>
                            </div>
                            <Figure.Image src={avatar} ref={img} thumbnail fluid style={{ objectFit: 'cover', visibility: loaded ? 'visible' : 'collapse', position: loaded ? 'relative' : 'absolute', width:'100%' }} onLoad={() => setLoaded(true)} />
                            {recipe.user_created_id && <Figure.Caption style={{ textAlign: 'right' }}>Created by: Placeholder</Figure.Caption>}
                        </Figure>
                    </Col>
                </Row>
                <Row className='p-3'>
                    <Col>{recipe.description}</Col>
                </Row>
                <Row className='rounded rounded-3 m-0 p-3 text-light' style={{ backgroundImage: 'linear-gradient(0.25turn, #7b6271, #56454f)' }}>
                    <Col>
                        {'some text'}<br />{'some text'}
                    </Col>
                </Row>
                <Row className='p-3'>
                    <Col>
                        {recipe.cooking_order}
                    </Col>
                </Row>
            </Container>
            <RecipeRemoveModal show={show} setShow={setShow} id={recipe.id} />
        </>
    )
}

export default RecipeDetails;