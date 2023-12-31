/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';


function RutaProtegida() {
    const {auth,cargando}=useAuth();

    if(cargando){
        
    }


    return (
    <div>
        {auth._id ? (
          <div className='bg-gray-100 '>
            <Header/>

            <div className='md:flex md:min-h-screen'>
              <Sidebar/>

              <main className='p-10 flex-1'>
                <Outlet/>
              </main>

            </div>
          </div>
        ) : <Navigate to="/"/>}
  
    </div>
  )
}

export default RutaProtegida