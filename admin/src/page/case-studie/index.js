import React, { useState } from 'react'
import ShowCaseStudie from './page'
import NewCaseStudie from './newCaseStudie'

const CaseStudies = () => {
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
                        isAddWork ? <NewCaseStudie setIsAddWork={setIsAddWork} /> : <ShowCaseStudie setIsAddWork={setIsAddWork} />
                    }
                </div>
            </div>
        </>
    )
}

export default CaseStudies
