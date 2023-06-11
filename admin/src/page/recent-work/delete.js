import axios from 'axios'
import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import BaseURL from '../../domain'
const Delete = ({ isDelete, setIsDelete, work }) => {

    function deleteHandle() {
        axios.delete(`${BaseURL}/work?id=${work?._id}`).then(res => {
            setIsDelete(false)
        }).catch(error => {
            console.log(error)
        })
    }
    return (
        <Modal
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={isDelete}
            onHide={() => setIsDelete(false)}>
            <Modal.Body>
                <h4 className='text-center my-4'>Are You Want To Delete <span className='text-danger'>{work?.heading}</span></h4>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => setIsDelete(false)}>Cancel</Button>
                <Button variant="danger" onClick={deleteHandle}>Delete 1</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default Delete
