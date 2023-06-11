import React, { useState } from 'react'
import { Button, Col, Form, Image, Modal, Row } from 'react-bootstrap'
import { TfiPlus } from 'react-icons/tfi'
import BaseURL from '../../../domain'
import axios from "axios";
const CardInfo = ({ setPageType }) => {
    const [priview_card, setPriview_card] = useState()
    const initForm = {
        main_heading: '',
        cart_them: "",
        desc: '',
        video_link: ''

    }

    const [formData, setFormData] = useState(initForm)
    const [isCheck, setIsCheck] = useState(false)

    const handleChange = (event) => {
        const { name, value, files } = event?.target
        if (name === 'main_heading') {
            if (value.length <= 25) {
                setFormData({
                    ...formData,
                    [name]: value
                })
            } else {
                setFormData({
                    ...formData,
                    [name]: value.slice(0, 25)
                })
            }
        } else if (name === 'desc') {
            if (value.length <= 130) {
                setFormData({
                    ...formData,
                    [name]: value
                })
            } else {
                setFormData({
                    ...formData,
                    [name]: value.slice(0, 130)
                })
            }
        } else {
            setFormData({
                ...formData,
                [name]: files ? files[0] : value
            })
        }
        if (name === 'cart_them') {
            const reader = new FileReader();
            reader.readAsDataURL(files[0]);
            reader.onload = function () {
                const base64String = reader.result;
                setPriview_card(base64String)
            };
            event.target.value = ''
        }

    }

    const handleSubmit = () => {
        const submitData = new FormData()
        submitData.append("cart_them", formData?.cart_them)
        submitData.append("main_heading", formData?.main_heading)
        submitData.append("desc", formData?.desc)
        if (isCheck) {
            submitData.append("video_link", formData?.video_link)
        }
        axios.post(`${BaseURL}/case_studie_insert`, submitData).then(res => {
            setFormData(initForm)
            setPageType('')
        }).catch(error => {
            console.log(error)
        })
    }
    return (
        <Modal show={true} onHide={() => setPageType('')} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>Case Studie Card</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Row>
                        <Col xxl={8} xl={8} lg={8} md={12} sm={12} xs={12}>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <label htmlFor='main_heading' className='py-2'>Heading</label>
                                <input className='form-control' type="text" id='main_heading' placeholder="Techkilla" autoFocus name='main_heading' onChange={handleChange} value={formData?.main_heading} />
                                {formData.main_heading?.length}/25
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1" >
                                <Form.Label>Description</Form.Label>
                                <Form.Control onChange={handleChange} name='desc' value={formData.desc} as="textarea" rows={3} />
                                {formData.desc?.length}/130
                            </Form.Group>
                            <Form.Check type={'checkbox'} id="video_link" label="Video Link" onClick={() => setIsCheck(!isCheck)} />
                            {
                                isCheck && <Form.Group className="mb-3 mt-2" controlId="exampleForm.ControlInput1">
                                    <input className='form-control' type="text" id='video_link' placeholder="Techkilla" autoFocus name='video_link' onChange={handleChange} value={formData?.video_link} />
                                </Form.Group>
                            }

                        </Col>
                        <Col xxl={4} xl={4} lg={4} md={12} sm={12} xs={12}>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <div className='mt-3 mb-2'>Card Image <b>size:480x548</b></div>
                                <input type="file" placeholder="Techkilla" style={{ display: 'none' }} id='cart_them' name='cart_them' accept='image/*' onChange={handleChange} />
                                <label htmlFor='cart_them' className='card_page'>
                                    {priview_card ? <Image src={priview_card} /> : <div className="cover_select"><TfiPlus /></div>}
                                </label>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>

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

export default CardInfo
