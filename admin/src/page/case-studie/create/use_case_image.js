import axios from 'axios'
import React, { useState } from 'react'
import { Button, Form, Image, Modal } from 'react-bootstrap'
import { TfiPlus } from 'react-icons/tfi'
const UseCaseImage = ({ setPageType, id }) => {
    const [priview, setPriview] = useState()
    const initForm = {
        heading: '',
        desc: '',
        icon: '',
    }
    const [formData, setFormData] = useState(initForm)
    const handleChange = (event) => {
        const { name, value, files } = event?.target

        if (name === 'desc') {
            if (value?.length <= 350) {
                setFormData({
                    ...formData,
                    [name]: value
                })
            } else {
                setFormData({
                    ...formData,
                    [name]: value.slice(0, 350)
                })
            }
        }

        if (name === 'heading') {
            if (value?.length <= 100) {
                setFormData({
                    ...formData,
                    [name]: value
                })
            } else {
                setFormData({
                    ...formData,
                    [name]: value.slice(0, 100)
                })
            }
        }

        if (name === 'icon') {
            setFormData({
                ...formData,
                [name]: files[0]
            })
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
        submitData.append("desc", formData?.desc)
        submitData.append("id", id)
        submitData.append("formType", "use_case_image")
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
                        <Form.Label>Heading</Form.Label>
                        <Form.Control type="text" placeholder="Techkilla" autoFocus name='heading' value={formData?.heading} onChange={handleChange} />
                        {formData?.heading?.length}/100
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1" >
                        <Form.Label>Description</Form.Label>
                        <Form.Control onChange={handleChange} name='desc' value={formData.desc} as="textarea" rows={3} />
                        {formData?.desc?.length}/350
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

export default UseCaseImage
