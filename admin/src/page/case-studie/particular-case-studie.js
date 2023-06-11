import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { MdDelete } from 'react-icons/md'
import axios from 'axios'
import { Col, Container, Row } from 'react-bootstrap'
import { TbEdit } from 'react-icons/tb'
import BaseURL from '../../domain'
const ParticularCaseStudie = () => {
    const localtion = useLocation()
    const [caseStudieData, setCaseStudieData] = useState({})
    useEffect(() => {
        axios.get(`${BaseURL}/particular_case_studie/${localtion?.state}`).then(res => {
            setCaseStudieData(res?.data?.data)
        }).catch(error => {
            setCaseStudieData({})
        })
    }, [localtion])
    return (
        <>
            <div className="header">
                <div className="curd-btn-group px-4">
                    /particular-case-studie
                </div>
            </div>
            <div className='page-container'>
                <div className="pageInner">
                    <Container>
                        {
                            (caseStudieData?.heading && caseStudieData?.cover_page) && <>
                                <h5 className='d-flex align-items-center'> <span className="count bg-dark text-light">1</span>  <span className='px-2'>Introduction Section</span></h5>
                                <Row>
                                    <Col >
                                        <div className='pageSectionInner'>
                                            <div className='d-flex align-items-center'>
                                                <div className="count">1</div>
                                                <div className="title">{caseStudieData?.heading}</div>
                                            </div>
                                            <div className='d-flex align-items-center'>
                                                <button className='btn'><TbEdit /></button>
                                                <button className='btn'><MdDelete /></button>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </>
                        }
                        {
                            (caseStudieData?.case_studie) && <>
                                <h5 className='d-flex align-items-center mt-4'> <span className="count bg-dark text-light">2</span>  <span className='px-2'>case studie</span></h5>
                                <Row>
                                    {
                                        caseStudieData?.case_studie?.map((item, keys) => {
                                            return <Col xxl={6} xl={6} lg={6} md={12} sm={12} className='my-2'>
                                                <div className='pageSectionInner' key={keys}>
                                                    <div className='d-flex align-items-center'>
                                                        <div className="count">{keys + 1}</div>
                                                        <div className="title">{item?.heading}</div>
                                                    </div>
                                                    <div className='d-flex align-items-center'>
                                                        <button className='btn'><TbEdit /></button>
                                                        <button className='btn'><MdDelete /></button>
                                                    </div>
                                                </div>
                                            </Col>
                                        })
                                    }
                                </Row>
                            </>
                        }
                        {
                            (caseStudieData?.use_case_image) && <>
                                <h5 className='d-flex align-items-center mt-4'> <span className="count bg-dark text-light">3</span>  <span className='px-2'>Use Case with Image</span></h5>
                                <Row>
                                    {
                                        caseStudieData?.use_case_image?.map((item, keys) => {
                                            return <Col xxl={6} xl={6} lg={6} md={12} sm={12} className='my-2'>
                                                <div className='pageSectionInner' key={keys}>
                                                    <div className='d-flex align-items-center'>
                                                        <div className="count">{keys + 1}</div>
                                                        <div className="title">{item?.heading}</div>
                                                    </div>
                                                    <div className='d-flex align-items-center'>
                                                        <button className='btn'><TbEdit /></button>
                                                        <button className='btn'><MdDelete /></button>
                                                    </div>
                                                </div>
                                            </Col>
                                        })
                                    }
                                </Row>
                            </>
                        }
                        {
                            (caseStudieData?.use_case_oder) && <>
                                <h5 className='d-flex align-items-center mt-4'> <span className="count bg-dark text-light">4</span>  <span className='px-2'>Use Case with Order</span></h5>
                                <Row>
                                    {
                                        caseStudieData?.use_case_oder?.map((item, keys) => {
                                            return <Col xxl={6} xl={6} lg={6} md={12} sm={12} className='my-2'>
                                                <div className='pageSectionInner' key={keys}>
                                                    <div className='d-flex align-items-center'>
                                                        <div className="count">{keys + 1}</div>
                                                        <div className="title">{item}</div>
                                                    </div>
                                                    <div className='d-flex align-items-center'>
                                                        <button className='btn'><TbEdit /></button>
                                                        <button className='btn'><MdDelete /></button>
                                                    </div>
                                                </div>
                                            </Col>
                                        })
                                    }
                                </Row>
                            </>
                        }
                        {
                            (caseStudieData?.benefits) && <>
                                <h5 className='d-flex align-items-center mt-4'> <span className="count bg-dark text-light">5</span>  <span className='px-2'>Use Case with Image</span></h5>
                                <Row>
                                    {
                                        caseStudieData?.benefits?.map((item, keys) => {
                                            return <Col xxl={6} xl={6} lg={6} md={12} sm={12} className='my-2'>
                                                <div className='pageSectionInner' key={keys}>
                                                    <div className='d-flex align-items-center'>
                                                        <div className="count">{keys + 1}</div>
                                                        <div className="title">{item?.heading}</div>
                                                    </div>
                                                    <div className='d-flex align-items-center'>
                                                        <button className='btn'><TbEdit /></button>
                                                        <button className='btn'><MdDelete /></button>
                                                    </div>
                                                </div>
                                            </Col>
                                        })
                                    }
                                </Row>
                            </>
                        }
                        {
                            (caseStudieData?.KeyHighlights) && <>
                                <h5 className='d-flex align-items-center mt-4'> <span className="count bg-dark text-light">6</span>  <span className='px-2'>Key Highlights</span></h5>
                                <Row>
                                    {
                                        caseStudieData?.KeyHighlights?.map((item, keys) => {
                                            return <Col xxl={6} xl={6} lg={6} md={12} sm={12} className='my-2'>
                                                <div className='pageSectionInner' key={keys}>
                                                    <div className='d-flex align-items-center'>
                                                        <div className="count">{keys + 1}</div>
                                                        <div className="title">{item?.heading}</div>
                                                    </div>
                                                    <div className='d-flex align-items-center'>
                                                        <button className='btn'><TbEdit /></button>
                                                        <button className='btn'><MdDelete /></button>
                                                    </div>
                                                </div>
                                            </Col>
                                        })
                                    }
                                </Row>
                            </>
                        }
                        {
                            (caseStudieData?.releted_project) && <>
                                <h5 className='d-flex align-items-center mt-4'> <span className="count bg-dark text-light">7</span>  <span className='px-2'>Releted Project</span></h5>
                                <Row>
                                    {
                                        caseStudieData?.releted_project?.map((item, keys) => {
                                            return <Col xxl={6} xl={6} lg={6} md={12} sm={12} className='my-2'>
                                                <div className='pageSectionInner' key={keys}>
                                                    <div className='d-flex align-items-center'>
                                                        <div className="count">{keys + 1}</div>
                                                        <div className="title">{item?.heading}</div>
                                                    </div>
                                                    <div className='d-flex align-items-center'>
                                                        <button className='btn'><TbEdit /></button>
                                                        <button className='btn'><MdDelete /></button>
                                                    </div>
                                                </div>
                                            </Col>
                                        })
                                    }
                                </Row>
                            </>
                        }
                    </Container>
                </div>
            </div>
        </>
    )
}

export default ParticularCaseStudie