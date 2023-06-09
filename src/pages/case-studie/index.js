import NewCaseStudie from '@/components/case-studie/newCaseStudie'
import ShowCaseStudie from '@/components/case-studie/page'
import React, { useState } from 'react'

const CaseStudies = ({ BaseURL  }) => {
    const [isAddWork, setIsAddWork] = useState(false)
    return (
        <>
            <div className="header">
                <div className="curd-btn-group px-4">
                    <button className={!isAddWork ? "btn btn-secondary mx-2" : 'btn btn-outline-secondary mx-2'}
                        onClick={() => setIsAddWork(false)}>
                        Case Studies
                    </button>
                    <button className={isAddWork ? "btn btn-secondary mx-2" : 'btn btn-outline-secondary mx-2'}
                        onClick={() => setIsAddWork(true)}>
                        Add Case Studies
                    </button>
                </div>
            </div>
            <div className='page-container'>
                <div className="pageInner">
                    {
                        isAddWork ? <NewCaseStudie BaseURL ={BaseURL } setIsAddWork={setIsAddWork} /> : <ShowCaseStudie BaseURL ={BaseURL } setIsAddWork={setIsAddWork} />
                    }
                </div>
            </div>
        </>
    )
}

export default CaseStudies
export const getServerSideProps = async () => {
    return {
        props: {
            BaseURL : process.env.BaseURL 
        }
    }
}