import axios from 'axios'
import React, { useState } from 'react'
import { Button, Form, Image, Modal } from 'react-bootstrap'
import { TfiPlus } from 'react-icons/tfi'
const ReletedProject = ({ setPageType, id }) => {
    const [priview, setPriview] = useState()
    const initForm = {
        heading: '',
        url: '',
        thumbnail: '',
    }
    const [formData, setFormData] = useState(initForm)
    const handleChange = (event) => {
        const { name, value, files } = event?.target
        setFormData({
            ...formData,
            [name]: files ? files[0] : value
        })
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
        submitData.append("thumbnail", formData?.thumbnail)
        submitData.append("heading", formData?.heading)
        submitData.append("url", formData?.url)
        submitData.append("id", id)
        submitData.append("formType", "releted_project")
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
                <Modal.Title>Releted Projects</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Heading</Form.Label>
                        <Form.Control type="text" placeholder="Techkilla" autoFocus name='heading' value={formData?.heading} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1" >
                        <Form.Label>Project URL</Form.Label>
                        <Form.Control type="text" placeholder="www.techkilla.com" onChange={handleChange} name='url' value={formData?.url} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <div className='mt-3 mb-2'>Use Case Icon <b>size:660x440</b></div>
                        <Form.Control type="file" placeholder="www.techkilla.com" name='thumbnail' style={{ display: 'none' }} id='cover_bg' onChange={handleChange} />
                        <Form.Label htmlFor='cover_bg' className='d-block cover_bg' >
                            {
                                priview ? <Image src={priview} /> : <div className="cover_select">
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

export default ReletedProject
