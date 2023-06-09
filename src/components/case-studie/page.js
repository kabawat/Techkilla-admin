import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Container, Modal } from 'react-bootstrap';
import { useRouter } from 'next/router';
import Link from 'next/link';

const ShowCaseStudie = () => {
    const router = useRouter();
    const [useStudie, setUseStudie] = useState([]);
    const [isDelete, setIsDelete] = useState(false);
    const [curCase, setCurCase] = useState();

    useEffect(() => {
        axios
            .get(`/api/case-studie/`)
            .then((res) => {
                setUseStudie(res.data?.data);
            })
            .catch((error) => {
                setUseStudie([]);
            });
    }, [isDelete]);

    const handleCaseStudie = (payload) => {
        router.push('/case-studie', undefined, { shallow: true, state: payload?._id });
    };

    const deleteHandle = () => {
        axios
            .put(`/api/case-studie/delete`, { id: curCase?._id })
            .then((res) => {
                setCurCase();
                setIsDelete(false);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <Container className="py-2">
            {useStudie?.map((curItem, keys) => {
                return (
                    <div className="pageSectionInner my-2" key={keys}>
                        <div className="d-flex align-items-center">
                            <div className="count">{keys + 1}</div>
                            <div className="title">{curItem?.heading}</div>
                        </div>
                        <div className="d-flex align-items-center">
                            <Link className="btn btn-success mx-2" href={`/case-studie:${curItem?._id}`}>
                                Show
                            </Link>
                            <button
                                className="btn btn-danger"
                                onClick={() => {
                                    setIsDelete(true);
                                    setCurCase(curItem);
                                }} >Delete </button>
                        </div>
                    </div>
                );
            })}
            <Modal aria-labelledby="contained-modal-title-vcenter" centered show={isDelete} onHide={() => setIsDelete(false)}>
                <Modal.Body>
                    <h4 className="text-center my-4">
                        Are You Want To Delete <br /> <span className="text-danger">{curCase?.heading}?</span>
                    </h4>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setIsDelete(false)}>Cancel</Button>
                    <Button variant="danger" onClick={deleteHandle}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default ShowCaseStudie;
