/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import { Link } from 'react-router-dom'

function ListadoProyectos({proyecto}) {
  const {nombre,_id,cliente}=proyecto;
  return (
    
    <div className='border-b p-5 flex'>
      <p className='flex-1'>{nombre}
      <span className='text-sm text-gray-500 uppercase'>{' '}{cliente}</span>
      </p>

      <Link to={`${_id}`}
      className='text-gray-600 hover:text-gray-800 transition-colors uppercase font-bold '
      > See Project</Link>
    </div>

    /*<div className='flex justify-between bg-white p-5 mt-10 shadow-2xl rounded-lg'>
        <div>
          <h1 className='text-4xl font-bold'>Project Name: {nombre}</h1>
          <p className='mt-5 text-xl'>Description: {proyecto.nombre}</p>
          <p className='mt-5 text-xl'>Date: {proyecto.nombre}</p>
          <p className='mt-5 text-xl'>Customer: {proyecto.nombre}</p>
          
        </div>
        <div><button className='p-3 bg-sky-600 text-white uppercase rounded-lg font-bold'>See more detail</button></div>
       
  </div>*/
  )
}

export default ListadoProyectos