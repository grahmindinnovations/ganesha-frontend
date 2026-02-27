import React from 'react'

import Login from '../pages/Login'
import { Routes, Route } from 'react-router-dom'
function Routers() {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Login />} />
        </Routes>
    </div>
  )
}

export default Routers
