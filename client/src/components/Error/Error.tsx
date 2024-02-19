import React, { FC } from "react";
import { Button, Container } from "react-bootstrap";
import { useRouteError, useNavigate } from "react-router-dom";



const ErrorPage: FC = () => {
    const navigate = useNavigate();
    const error = useRouteError();
    console.error(error);
    return (
        <Container className="border p-3 mt-4 rounded" style={{ background: "#ffffffaf" }}>
            <div className="text-center">
                <h1>Oops!</h1>
                <p>Sorry, an unexpected error has occurred.</p>
                <p>
                    {/*@ts-ignore*/}
                    <i>{error.statusText || error.message}</i>
                </p>
                <Button onClick={() => navigate('/')}>Go Home!</Button>
            </div>
        </Container>
    )
}
export default ErrorPage;