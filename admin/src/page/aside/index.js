import React from 'react'
import { useState } from 'react'
import { GrWorkshop } from 'react-icons/gr'
import { MdOutlineCases } from 'react-icons/md'
import { NavLink } from 'react-router-dom'
const Aside = () => {
    const [path, setPath] = useState(window.location.pathname)
    const pathHeandle = () => {
        setPath(window.location.pathname)
    }
    return (
        <>
            <div className="aside_logo">
                <img src='/logoBlack.png' />
            </div>
            <div className="aside_list_menu">
                <div className={path === "/recent-work" ? "aside_list active" : "aside_list"} onClick={pathHeandle} >
                    <span className='one'></span>
                    <NavLink className='link' to='/recent-work'><span><GrWorkshop /></span> <span>Recent Work</span></NavLink>
                    <span className='two'></span>
                </div>
                <div className={(path === "/case-studies" || path === "/particular-case-studie") ? "aside_list active" : "aside_list"} onClick={pathHeandle} >
                    <span className='one'></span>
                    <NavLink className='link' to='/case-studies'><span><MdOutlineCases /></span> <span>Case Studies</span></NavLink>
                    <span className='two'></span>
                </div>
            </div>
        </>
    )
}

export default Aside
