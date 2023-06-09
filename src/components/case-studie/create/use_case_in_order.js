import axios from 'axios'
import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
const UseCaseInOrder = ({ setPageType, id, BaseURL }) => {
    const initForm = {
        desc: '',
        id: id
    }
    const [formData, setFormData] = useState(initForm)
    const handleChange = (event) => {
        const { name, value } = event?.target
        if (value.length <= 90) {
            setFormData({
                ...formData,
                [name]: value
            })
        } else {
            setFormData({
                ...formData,
                [name]: value.slice(0, 90)
            })
        }
    }

    const handleSubmit = () => {
        const submitData = new FormData()
        submitData.append("desc", formData?.desc)
        submitData.append("id", formData?.id)
        submitData.append("formType", "use_case_order")
        axios.put(`/api/case-studie/update-draf`, submitData).then(res => {
            setFormData(initForm)
            setPageType('')
        }).catch(error => {
            console.log(error)
        })
    }
    return (
        <Modal show={true} onHide={() => setPageType('')} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>Use Case in Oder format</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1" >
                        {/* <Form.Label>Description</Form.Label> */}
                        <Form.Control onChange={handleChange} placeholder='Description' name='desc' value={formData.desc} as="textarea" rows={3} />
                        {formData?.desc?.length}/90
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setPageType('')}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default UseCaseInOrder
