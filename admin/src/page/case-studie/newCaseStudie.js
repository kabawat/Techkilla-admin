import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Modal, Row } from 'react-bootstrap'
import IntroDuction from './create/IntroDuction'
import IntroDuctionTwo from './create/IntroTwo'
import axios from 'axios'
import { FaCheckCircle } from 'react-icons/fa'
import UseCaseInOrder from './create/use_case_in_order'
import UseCaseImage from './create/use_case_image'
import KeyHighlights from './create/KeyHighlights'
import ReletedProject from './create/reletedProject'
import Benefits from './create/benefits'
import CardInfo from './create/cardInfo'
import BaseURL from '../../domain'
const NewCaseStudie = ({ setIsAddWork }) => {
    const [pageType, setPageType] = useState('')
    const [draf, setDraf] = useState({})
    const [isPublish, setIsPublish] = useState(false)
    useEffect(() => {
        axios.get(`${BaseURL}/case_studie_draf`).then((res) => {
            setDraf(res?.data?.data)
        }).catch(error => {
            console.log(error)
        })
    }, [pageType])

    const handlePublish = () => {
        axios.post(`${BaseURL}/case_studie_publish`, { status: true, id: draf._id }).then(res => {
            setIsAddWork(false)
        }).catch(error => {
            console.log(error)
        })
    }
    return (
        <>
            {
                draf?._id && <Container>
                    <Button onClick={() => setIsPublish(true)}>Publish</Button>
                </Container>
            }
            <Modal
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={isPublish}
                onHide={() => setIsPublish(false)}>
                <Modal.Body>
                    <h4 className='text-center my-4'>Are You Want To Publish <span className='text-danger'>{draf?.heading}</span></h4>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="dark" onClick={() => setIsPublish(false)}>Cancel</Button>
                    <Button variant="primary" onClick={handlePublish}>Publish</Button>
                </Modal.Footer>
            </Modal>
            <Container>
                <Row>
                    {/* Introduction of Case Studie */}
                    <Col xxl={6} className='my-2'>
                        <div className='pageSectionInner'>
                            <div className='d-flex align-items-center'>
                                <div className="count">1</div>
                                <div className="title">Card Information</div>
                            </div>
                            <div className='d-flex align-items-center'>
                                {
                                    (draf?.main_heading) ? <div className='text-success px-2 pb-2'>
                                        <FaCheckCircle />
                                    </div> : <button className='btn btn-primary' onClick={() => setPageType('cardInfo')}>
                                        Add
                                    </button>
                                }
                            </div>
                        </div>
                    </Col>
                    {/* Introduction of Case Studie */}
                    <Col xxl={6} className='my-2'>
                        <div className='pageSectionInner'>
                            <div className='d-flex align-items-center'>
                                <div className="count">1</div>
                                <div className="title">Introduction of Case Studie</div>
                            </div>
                            <div className='d-flex align-items-center'>
                                {
                                    (draf?.heading && draf?.cover_page) ? <div className='text-success px-2 pb-2'>
                                        <FaCheckCircle />
                                    </div> : <button className='btn btn-primary' onClick={() => setPageType('intro')}>
                                        Add
                                    </button>
                                }
                            </div>
                        </div>
                    </Col>

                    {/* Case Studie Artical */}
                    <Col xxl={6} className='my-2'>
                        <div className='pageSectionInner'>
                            <div className='d-flex align-items-center'>
                                <div className="count">2</div>
                                <div className="title">Case Studie Artical</div>
                            </div>
                            <div className='d-flex align-items-center'>
                                {
                                    draf?.case_studie?.length ? <>
                                        <div className='text-success px-2 pb-2'>
                                            <FaCheckCircle />
                                        </div>
                                        <div className="count_length">
                                            {draf?.case_studie?.length}
                                        </div>
                                        <button className='btn btn-primary mx-3' onClick={() => setPageType('intro_two')}>add more</button>
                                    </> : <button className='btn btn-primary' disabled={draf?._id ? false : true} onClick={() => setPageType(draf?._id ? 'intro_two' : '')}>Add</button>
                                }
                            </div>
                        </div>
                    </Col>

                    {/* use_case_oder */}
                    <Col xxl={6} className='my-2'>
                        <div className='pageSectionInner'>
                            <div className='d-flex align-items-center'>
                                <div className="count">3</div>
                                <div className="title">Use Case in Oder format</div>
                            </div>
                            <div className='d-flex align-items-center'>
                                {
                                    draf?.use_case_oder?.length ? <>
                                        <div className='text-success px-2 pb-2'>
                                            <FaCheckCircle />
                                        </div>
                                        <div className="count_length">
                                            {draf?.use_case_oder?.length}
                                        </div>
                                        <button className='btn btn-primary mx-3' onClick={() => setPageType('use_case')}>add more</button>
                                    </> : <button className='btn btn-primary' disabled={draf?._id ? false : true} onClick={() => setPageType(draf?._id ? 'use_case' : '')}>Add</button>
                                }
                            </div>
                        </div>
                    </Col>

                    {/* Use Case in Oder format */}
                    <Col xxl={6} className='my-2'>
                        <div className='pageSectionInner'>
                            <div className='d-flex align-items-center'>
                                <div className="count">4</div>
                                <div className="title">Use Case in Image format</div>
                            </div>
                            <div className='d-flex align-items-center'>
                                {
                                    draf?.use_case_image?.length ? <>
                                        <div className='text-success px-2 pb-2'>
                                            <FaCheckCircle />
                                        </div>
                                        <div className="count_length">
                                            {draf?.use_case_image?.length}
                                        </div>
                                        <button className='btn btn-primary mx-3' onClick={() => setPageType('use_case_image')}>add more</button>
                                    </> : <button className='btn btn-primary' disabled={draf?._id ? false : true} onClick={() => setPageType(draf?._id ? 'use_case_image' : '')}>Add</button>
                                }
                            </div>
                        </div>
                    </Col>

                    {/* Use Case in Oder format */}
                    <Col xxl={6} className='my-2'>
                        <div className='pageSectionInner'>
                            <div className='d-flex align-items-center'>
                                <div className="count">5</div>
                                <div className="title">Case Studie Key Highlights</div>
                            </div>
                            <div className='d-flex align-items-center'>
                                {
                                    draf?.KeyHighlights?.length ? <>
                                        <div className='text-success px-2 pb-2'>
                                            <FaCheckCircle />
                                        </div>
                                        <div className="count_length">
                                            {draf?.KeyHighlights?.length}
                                        </div>
                                        <button className='btn btn-primary mx-3' onClick={() => setPageType('Highlights')}>add more</button>
                                    </> : <button className='btn btn-primary' disabled={draf?._id ? false : true} onClick={() => setPageType(draf?._id ? 'Highlights' : '')}>Add</button>
                                }
                            </div>
                        </div>
                    </Col>

                    {/* Releted project*/}
                    <Col xxl={6} className='my-2'>
                        <div className='pageSectionInner'>
                            <div className='d-flex align-items-center'>
                                <div className="count">6</div>
                                <div className="title">Releted Projects</div>
                            </div>
                            <div className='d-flex align-items-center'>
                                {
                                    draf?.releted_project?.length ? <>
                                        <div className='text-success px-2 pb-2'>
                                            <FaCheckCircle />
                                        </div>
                                        <div className="count_length">
                                            {draf?.releted_project?.length}
                                        </div>
                                        <button className='btn btn-primary mx-3' onClick={() => setPageType('releted_project')}>add more</button>
                                    </> : <button className='btn btn-primary' disabled={draf?._id ? false : true} onClick={() => setPageType(draf?._id ? 'releted_project' : '')}>Add</button>
                                }
                            </div>
                        </div>
                    </Col>

                    {/* Case Studie Benefits*/}
                    <Col xxl={6} className='my-2'>
                        <div className='pageSectionInner'>
                            <div className='d-flex align-items-center'>
                                <div className="count">7</div>
                                <div className="title">Case Studie Benefits</div>
                            </div>
                            <div className='d-flex align-items-center'>
                                {
                                    draf?.benefits?.length ? <>
                                        <div className='text-success px-2 pb-2'>
                                            <FaCheckCircle />
                                        </div>
                                        <div className="count_length">
                                            {draf?.benefits?.length}
                                        </div>
                                        <button className='btn btn-primary mx-3' onClick={() => setPageType('benefits')}>add more</button>
                                    </> : <button className='btn btn-primary' disabled={draf?._id ? false : true} onClick={() => setPageType(draf?._id ? 'benefits' : '')}>Add</button>
                                }
                            </div>
                        </div>
                    </Col>

                </Row>
            </Container >
            {/*  main Card Info */}
            {pageType === "cardInfo" && <CardInfo setPageType={setPageType} id={draf?._id} />}
            {/* Introduction of Case Studie */}
            {pageType === "intro" && <IntroDuction setPageType={setPageType} id={draf?._id} />}
            {/* Case Studie Artical */}
            {pageType === "intro_two" && <IntroDuctionTwo setPageType={setPageType} id={draf?._id} />}
            {/* Use Case in Oder */}
            {pageType === "use_case" && <UseCaseInOrder setPageType={setPageType} id={draf?._id} />}
            {/* Use Case in image */}
            {pageType === "use_case_image" && <UseCaseImage setPageType={setPageType} id={draf?._id} />}
            {/* Case Studie Key Highlights */}
            {pageType === "Highlights" && <KeyHighlights setPageType={setPageType} id={draf?._id} />}
            {/*  Releted project */}
            {pageType === "releted_project" && <ReletedProject setPageType={setPageType} id={draf?._id} />}
            {/*  Releted project */}
            {pageType === "benefits" && <Benefits setPageType={setPageType} id={draf?._id} benefits_heading={draf?.benefits_heading} />}

        </>
    )
}

export default NewCaseStudie
