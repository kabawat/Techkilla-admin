import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { Col, Container, Modal, Row } from 'react-bootstrap'
import { BsPlusLg } from 'react-icons/bs'
const Edit = ({ setIsEdit, isEdit, editData }) => {
    const [cardImage, setCardImage] = useState({
        thumbnail: '',
        logo: '',
    })
    const initform = {
        thumbnail: '',
        logo: '',
        url: editData.url,
        heading: editData.heading,
        id: editData?.id
    }
    const [formData, setformData] = useState(initform)
    const handleChange = (event) => {
        const { name, files, value } = event.target
        if (files) {
            const file = files[0];
            setformData({
                ...formData,
                [name]: file
            })
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
                const base64String = reader.result;
                setCardImage(
                    {
                        ...cardImage,
                        [name]: base64String
                    }
                )
            };
            event.target.value = ''
        } else {
            setformData({
                ...formData,
                [name]: value
            })
        }
    }

    function handleSubmit(event) {
        event.preventDefault()
        const submitData = new FormData()
        submitData.append("heading", formData?.heading)
        submitData.append("url", formData?.url)
        submitData.append("logo", formData?.logo)
        submitData.append("thumbnail", formData?.thumbnail)
        submitData.append("id", formData?.id)
        axios.put(`/api/recent-work/update`, submitData).then(res => {
            setformData(initform)
            setIsEdit(false)
            setCardImage({
                thumbnail: '',
                logo: '',
            })
        }).catch(error => {
            console.log(error)
        })
    }
    return (
        <Modal show={isEdit} size="lg" onHide={() => setIsEdit(false)}>
            <Modal.Header closeButton>
                <Modal.Title><h3>Current Recent Work</h3></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container className='pb-4'>
                    <form onSubmit={handleSubmit}>
                        <Row className='pt-2 justify-content-center'>
                            <Col lg={6} xl={6} md={6} sm={12} xm={12} className='pt-4'>
                                <div className='ception text-center'>Select Card Image <b>( size : 640x546)</b> </div>
                                <div className="work_inner d-flex justify-content-center">
                                    <input type="file" id='cardImage' name='thumbnail' accept='image/*' onChange={handleChange} />
                                    <label htmlFor='cardImage' className='thumbnail'>
                                        {
                                            cardImage?.thumbnail ? <img src={cardImage?.thumbnail} alt="" /> : editData ? <img src={editData?.thumbnail} alt="" /> : <BsPlusLg />
                                        }
                                    </label>
                                </div>
                            </Col>
                            <Col lg={6} xl={6} md={6} sm={12} xm={12} className='pt-4'>
                                <div className='ception text-center'>Select Card Logo  <b>(size : 100x100)</b> </div>
                                <div className="work_inner d-flex justify-content-center">
                                    <input type="file" id='cardlogo' name='logo' accept='image/*' onChange={handleChange} />
                                    <label htmlFor='cardlogo' className='thumbnail'>
                                        {
                                            cardImage?.logo ? <img src={cardImage?.logo} alt="" /> : editData ? <img src={editData?.logo} alt="" /> : <BsPlusLg />
                                        }
                                    </label>
                                </div>
                            </Col>
                            <Col lg={12} xl={12} md={12} sm={12} xm={12} className='mt-4'>
                                <div className="form-group px-5">
                                    <label className='py-2' htmlFor="heading">Recent Work Heading</label>
                                    <input type="text" className="form-control" name='heading' value={formData?.heading} onChange={handleChange} id="heading" placeholder="Post Heading" />
                                </div>
                            </Col>
                            <Col lg={12} xl={12} md={12} sm={12} xm={12} className='mt-4'>
                                <div className="form-group px-5">
                                    <label className='py-2' htmlFor="url">Recent Work URL</label>
                                    <input type="text" className="form-control" name='url' value={formData?.url} onChange={handleChange} id="url" placeholder="Post URL" />
                                </div>
                            </Col>
                        </Row>
                        <Row className='justify-content-center '>
                            <Col className='justify-content-center mt-5 d-flex'>
                                <button className='btn btn-primary'>Add Recent work</button>
                            </Col>
                        </Row>
                    </form>
                </Container>
            </Modal.Body>
        </Modal>
    )
}

export default Edit
