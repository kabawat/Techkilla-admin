import React from 'react'
import Aside from './page/aside'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import RecentWork from './page/recent-work'
import CaseStudies from './page/case-studie'
import ParticularCaseStudie from './page/case-studie/particular-case-studie'
const App = () => {
  return (
    <div className='main_container'>
      <div className="main_container_inner">
        <BrowserRouter>
          <div className="aside">
            <Aside />
          </div>
          <div className="main">
            <Routes>
              <Route path='/recent-work' element={<RecentWork />} />
              <Route path='/case-studies' element={<CaseStudies />} />
              <Route path='/particular-case-studie' element={<ParticularCaseStudie />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </div>
  )
}

export default App
