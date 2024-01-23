import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../components/Home'
import Chart from '../components/Chart'

const Routers = () => {
  return (
    <>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chart/:id" element={<Chart />} />
        </Routes>
    </>
  )
}

export default Routers
