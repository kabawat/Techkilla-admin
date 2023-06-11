import React from 'react'
import { useState } from 'react'
import NewWork from './add'
import ReadWork from './read'

const RecentWork = () => {
    const [isAddWork, setIsAddWork] = useState(false)
    return (
        <>
            <div className="header">
                <div className="curd-btn-group px-4">
                    <button className={!isAddWork ? "btn btn-secondary mx-2" : 'btn btn-outline-secondary mx-2'}
                        onClick={() => setIsAddWork(false)}>
                        Recent Works
                    </button>
                    <button className={isAddWork ? "btn btn-secondary mx-2" : 'btn btn-outline-secondary mx-2'}
                        onClick={() => setIsAddWork(true)}>
                        Add Work
                    </button>
                </div>
            </div>
            <div className='page-container'>
                <div className="pageInner">
                    {
                        isAddWork ? <NewWork setIsAddWork={setIsAddWork} /> : <ReadWork setIsAddWork={setIsAddWork} />
                    }
                </div>
            </div>
        </>
    )
}

export default RecentWork
