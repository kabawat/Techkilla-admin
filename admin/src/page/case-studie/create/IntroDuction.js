import React, { useState } from 'react'
import { Button, Col, Form, Image, Modal, Row } from 'react-bootstrap'
import { TfiPlus } from 'react-icons/tfi'
import axios from "axios";
import BaseURL from '../../../domain'
const IntroDuction = ({ setPageType, id }) => {
    const [priview, setPriview] = useState()
    const initForm = {
        heading: '',
        cover: '',
        id: id
    }
    const [formData, setFormData] = useState(initForm)
    const handleChange = (event) => {
        const { name, value, files } = event?.target
        if (name === 'heading') {
            if (value.length <= 50) {
                setFormData({
                    ...formData,
                    [name]: value
                })
            } else {
                setFormData({
                    ...formData,
                    [name]: value.slice(0, 50)
                })
            }
        } else {
            setFormData({
                ...formData,
                [name]: files[0]
            })
        }

        if (name === 'cover') {
            const reader = new FileReader();
            reader.readAsDataURL(files[0]);
            reader.onload = function () {
                const base64String = reader.result;
                setPriview(base64String)
            };
            event.target.value = ''
        }
    }

    const handleSubmit = () => {
        const submitData = new FormData()
        submitData.append("id", formData?.id)
        submitData.append("cover_page", formData?.cover)
        submitData.append("heading", formData?.heading)
        submitData.append("formType", 'case-studie-info')
        axios.put(`${BaseURL}/case_studie_update`, submitData).then(res => {
            setPriview('')
            setFormData(initForm)
            setPageType('')
        }).catch(error => {
            console.log(error)
        })
    }
    return (
        <Modal show={true} onHide={() => setPageType('')} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>Introduction of Case Studie</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <label htmlFor='heading' className='py-2'>Heading</label>
                        <input className='form-control' type="text" max={35} id='heading' placeholder="Techkilla" autoFocus name='heading' onChange={handleChange} value={formData?.heading} />
                        {formData.heading?.length}/50
                    </Form.Group>
                    <Row>
                        <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={12}>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <div className='mt-3 mb-2'>Cover Page <b>size:1945x1080</b></div>
                                <input type="file" placeholder="Techkilla" style={{ display: 'none' }} id='cover_bg' name='cover' accept='image/*' onChange={handleChange} />
                                <label htmlFor='cover_bg' className='d-block cover_bg'>
                                    {
                                        priview ? <Image src={priview} /> : <div className="cover_select"><TfiPlus /></div>
                                    }
                                </label>
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" type='button' onClick={() => setPageType('')}>
                    Close
                </Button>
                <Button variant="primary" type='button' onClick={handleSubmit}>
                    Submit
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default IntroDuction
