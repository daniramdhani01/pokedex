import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from '../moduls/Auth';
import Login from '../pages/Auth/Login';
import PrivateRoutes from './PrivateRoutes';

function AppRoutes() {
  const { currentUser } = useAuth();
  return (
    <BrowserRouter>
        <Routes>
          {currentUser ? 
            <>
              {/* <Route index element={<Navigate to="/home" />} /> */}
              <Route path="/*" element={<PrivateRoutes />} />
            </>
            :
            <>
              <Route path='/auth' element={<Login/>} />
              <Route path='*' element={<Navigate to={'/auth'}/>} />
            </>
          }
        </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes