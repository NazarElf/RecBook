import React, { FC } from 'react'
import { Modal, Button } from 'react-bootstrap'

interface PropType {
    show: boolean,
    handleClose: () => void,
    handleRemove: () => void
}

const RecipeRemoveModal: FC<PropType> = ({ show, handleClose, handleRemove }) => {
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