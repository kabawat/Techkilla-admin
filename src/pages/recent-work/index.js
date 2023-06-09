import NewWork from '@/components/recent-work/add'
import ReadWork from '@/components/recent-work/read'
import React from 'react'
import { useState } from 'react'
import { Container } from 'react-bootstrap'

const RecentWork = ({ BaseURL }) => {
    const [isAddWork, setIsAddWork] = useState(false)
    return (
        <>
            <div className="header">
                <Container>
                    <div className="curd-btn-group">
                        <button className={!isAddWork ? "btn btn-secondary" : 'btn btn-outline-secondary'}
                            onClick={() => setIsAddWork(false)}>
                            Recent Works
                        </button>
                        <button className={isAddWork ? "btn btn-secondary mx-2" : 'btn btn-outline-secondary mx-2'}
                            onClick={() => setIsAddWork(true)}>
                            Add Work
                        </button>
                    </div>
                </Container>
            </div>
            <div className='page-container'>
                <div className="pageInner">
                    {
                        isAddWork ? <NewWork setIsAddWork={setIsAddWork} BaseURL={BaseURL} /> : <ReadWork setIsAddWork={setIsAddWork} BaseURL={BaseURL} />
                    }
                </div>
            </div>
        </>
    )
}

export default RecentWork
export const getServerSideProps = async () => {
    return {
        props: {
            BaseURL: process.env.BaseURL
        }
    }
}