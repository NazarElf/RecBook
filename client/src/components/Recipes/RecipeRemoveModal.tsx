import React, { FC } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { useSubmit } from 'react-router-dom'

interface PropType {
    show: boolean,
    id?: number
    setShow: React.Dispatch<React.SetStateAction<boolean>>,
}

const RecipeRemoveModal: FC<PropType> = ({ show, id, setShow }) => {
    const submit = useSubmit()
    const handleClose = () => setShow(false)
    const handleRemove = () => {
        let a = `/recipes/${id}/delete`
        submit(null, { method: "delete", action: a })
    }
    return (
        <Modal show={show}>
            <Modal.Header>
                Remove Confirmation
            </Modal.Header>
            <Modal.Body>Do you really want to remove this item? This action cannot be undone!</Modal.Body>
            <Modal.Footer>
                <Button variant='outline-primary' onClick={handleClose}>Go Back</Button>
                <Button variant='danger' onClick={handleRemove}>Delete</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default RecipeRemoveModal