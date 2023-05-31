import axios from 'axios'
import React, { useState } from 'react'
import { Button, Form, Image, Modal } from 'react-bootstrap'
import { TfiPlus } from 'react-icons/tfi'
const Benefits = ({ setPageType, id, benefits_heading }) => {
    const [priview, setPriview] = useState()
    const initForm = {
        benefits_heading: benefits_heading ? benefits_heading : '',
        heading: '',
        desc: '',
        icon: '',
    }
    const [formData, setFormData] = useState(initForm)
    const handleChange = (event) => {
        const { name, value, files } = event?.target
        if (name === 'heading') {
            if (value?.length <= 60) {
                setFormData({
                    ...formData,
                    [name]: value
                })
            } else {
                setFormData({
                    ...formData,
                    [name]: value?.slice(0, 60)
                })
            }
        } else if (name === 'desc') {
            if (value?.length <= 120) {
                setFormData({
                    ...formData,
                    [name]: value
                })
            } else {
                setFormData({
                    ...formData,
                    [name]: value?.slice(0, 120)
                })
            }
        } else {
            setFormData({
                ...formData,
                [name]: files ? files[0] : value
            })
        }
        if (files) {
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
        submitData.append("icon", formData?.icon)
        submitData.append("heading", formData?.heading)
        submitData.append("benefits_heading", formData?.benefits_heading)
        submitData.append("desc", formData?.desc)
        submitData.append("id", id)
        submitData.append("formType", "benefits")
        axios.put('http://localhost:2917/case_studie', submitData).then(res => {
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
                <Modal.Title>Case Studie</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Main Section Heading</Form.Label>
                        <Form.Control type="text" placeholder="Techkilla" autoFocus name='benefits_heading' value={formData?.benefits_heading} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Heading</Form.Label>
                        <Form.Control type="text" placeholder="Techkilla" autoFocus name='heading' value={formData?.heading} onChange={handleChange} />
                        {formData?.heading?.length}/60
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1" >
                        <Form.Label>Description</Form.Label>
                        <Form.Control onChange={handleChange} name='desc' value={formData.desc} as="textarea" rows={3} />
                        {formData?.desc?.length}/120
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <div className='mt-3 mb-2'>Use Case Icon <b>size:100x100</b></div>
                        <Form.Control type="file" placeholder="Techkilla" name='icon' style={{ display: 'none' }} id='cover_bg' onChange={handleChange} />
                        <Form.Label htmlFor='cover_bg' className='d-linine-block icon_box' >
                            {
                                priview ? <Image src={priview} /> : <div className="icon_select">
                                    <TfiPlus />
                                </div>
                            }
                        </Form.Label>
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

export default Benefits
