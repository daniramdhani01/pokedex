import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import MasterLayout from '../components/MasterLayout'
import HomePage from '../pages/Home'
import PokemonLibrary from '../pages/PokemonLibrary'
import Profile from '../pages/Profile'

function PrivateRoutes() {
  return (
      <Routes>
        <Route element={<MasterLayout/>}>
          <Route path='auth/*' element={<Navigate to='/home' />} />
          <Route path='/home' element={<HomePage/>} />
          <Route path='/pokemon-library' element={<PokemonLibrary/>} />
          <Route path='/profile' element={<Profile/>} />
        </Route>
      </Routes>
  )
}

export default PrivateRoutes