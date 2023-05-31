import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { BsPlusLg } from 'react-icons/bs'
const NewWork = ({ setIsAddWork }) => {
    const [cardImage, setCardImage] = useState({
        thumbnail: '',
        logo: '',
    })
    const initform = {
        thumbnail: '',
        logo: '',
        url: '',
        heading: ''
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
        axios.post('http://localhost:2917/work', submitData).then(res => {
            setformData(initform)
            setCardImage({
                thumbnail: '',
                logo: '',
            })
            setIsAddWork(false)
        }).catch(error => {
            console.log(error)
        })
    }
    return (
        <Container>
            <h3>Add Recent Work</h3>
            <form onSubmit={handleSubmit}>
                <Row className='pt-2 justify-content-center'>
                    <Col lg={6} xl={6} md={6} sm={12} xm={12} className='pt-4'>
                        <div className='ception text-center'>Select Card Image <b>( size : 640x546)</b> </div>
                        <div className="work_inner d-flex justify-content-center">
                            <input type="file" id='cardImage' name='thumbnail' accept='image/*' onChange={handleChange} />
                            <label htmlFor='cardImage' className='thumbnail'>
                                {
                                    cardImage?.thumbnail ? <img src={cardImage?.thumbnail} alt="" /> : <BsPlusLg />
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
                                    cardImage?.logo ? <img src={cardImage?.logo} alt="" /> : <BsPlusLg />
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
    )
}

export default NewWork
