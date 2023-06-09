import React, { useEffect, useState } from 'react'
import { Col, Container, Modal, Row } from 'react-bootstrap'
import { TbEdit } from 'react-icons/tb'
import { AiFillDelete, AiOutlineExclamationCircle } from 'react-icons/ai'
import axios from 'axios'
import Edit from './edit'
import Delete from './delete'
const ReadWork = ({ BaseURL }) => {
    const [work, setWork] = useState([])
    const [Read, setRead] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [isDelete, setIsDelete] = useState(false)

    useEffect(() => {
        axios.get(`${BaseURL}/api/recent-work`).then((res) => {
            setWork(res?.data)
        }).catch(error => {
            console.log(error)
        })
    }, [isEdit, isDelete])



    // edit work 
    const initData = {
        thumbnail: '',
        logo: '',
        heading: '',
        url: '',
    }
    const [formData, setformData] = useState(initData)
    const handleRead = (payload) => {
        const data = {
            heading: payload?.heading,
            url: payload.url,
            logo: payload?.logo,
            thumbnail: payload?.thumbnail,
        }
        setRead(true)
        setformData(data)
    }

    const editHandle = (payload) => {
        const data = {
            heading: payload?.heading,
            url: payload.url,
            logo: payload?.logo,
            thumbnail: payload?.thumbnail,
            id: payload?._id
        }
        setIsEdit(true)
        setformData(data)
    }

    const handleDelete = async (payload) => {
        setformData(payload)
        setIsDelete(true)
    }
    return (
        <Container>
            {
                work?.data?.length ? <table className="table">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">No.</th>
                            <th scope="col">Recent Work</th>
                            <th scope="col">Thumbnail</th>
                            <th scope="col">Logo</th>
                            <th scope="col" >Acion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            work?.data?.map((curWork, keys) => (
                                <tr key={keys}>
                                    <th scope="row">{keys + 1}</th>
                                    <td>{curWork?.heading}</td>
                                    <td className='work-table-recent-img'>
                                        <img src={curWork?.thumbnail} alt="" />
                                    </td>
                                    <td className='work-table-recent-img'>
                                        <img src={curWork?.logo} alt="" />
                                    </td>
                                    <td>
                                        <button className='table-action-btn' onClick={() => {
                                            editHandle(curWork)
                                        }}>
                                            <TbEdit />
                                        </button>
                                        <button className='table-action-btn' onClick={() => { handleDelete(curWork) }}><AiFillDelete /></button>
                                        <button className='table-action-btn' onClick={() => handleRead(curWork)}><AiOutlineExclamationCircle /></button>
                                    </td>
                                </tr>
                            ))
                        }

                    </tbody>
                </table> : <div className='d-flex'>
                    No Recent Work Found
                </div>
            }

            {isEdit && <Edit setIsEdit={setIsEdit} isEdit={isEdit} editData={formData} />}
            {isDelete && <Delete setIsDelete={setIsDelete} isDelete={isDelete} work={formData} />}

            <Modal show={Read} size="lg" onHide={() => setRead(false)}>
                <Modal.Header closeButton>
                    <Modal.Title><h3>Current Recent Work</h3></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container className='pb-4'>
                        <div>
                            <Row className='pt-2 justify-content-center'>
                                <Col lg={6} xl={6} md={6} sm={12} xm={12} className='pt-4'>
                                    <div className='ception text-center'>Card thumbnail</div>
                                    <div className="work_inner d-flex justify-content-center">
                                        <div className='thumbnail'>
                                            <img src={formData?.thumbnail} alt="" />
                                        </div>
                                    </div>
                                </Col>
                                <Col lg={6} xl={6} md={6} sm={12} xm={12} className='pt-4'>
                                    <div className='ception text-center'>Card Logo </div>
                                    <div className="work_inner d-flex justify-content-center">
                                        <label htmlFor='cardlogo' className='thumbnail'>
                                            <img src={formData?.logo} />
                                        </label>
                                    </div>
                                </Col>
                                <Col lg={12} xl={12} md={12} sm={12} xm={12} className='mt-4'>
                                    <div className="form-group px-5">
                                        <label className='py-2' htmlFor="heading">Recent Work Heading</label>
                                        <input type="text" className="form-control" name='heading' value={formData?.heading} disabled />
                                    </div>
                                </Col>
                                <Col lg={12} xl={12} md={12} sm={12} xm={12} className='mt-1'>
                                    <div className="form-group px-5">
                                        <label className='py-2' htmlFor="url">Recent Work URL</label>
                                        <input type="text" className="form-control" name='url' value={formData?.url} disabled />
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Container>
                </Modal.Body>
            </Modal>
        </Container>
    )
}

export default ReadWork
