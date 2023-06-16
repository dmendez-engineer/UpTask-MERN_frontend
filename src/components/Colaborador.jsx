/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import useProyecto from '../hooks/useProyecto';
import ModalEliminarColaborador from './ModalEliminarColaborador';


function Colaborador({colaborador}) {
  const{nombre,email}=colaborador;
  const[modal,setModal]=useState(false);
    const {handleModalEliminarColaborador}=useProyecto();
  return (
    <div>
    
    <div className='border-b p-5 flex justify-between items-center'>
        <div>
            <p>{nombre}</p>
            <p className='text-sm text-gray-700'>{email}</p>
        </div>
        <div>
            <button className='p-3 bg-red-500 text-white font-bold uppercase rounded-lg hover:bg-red-800'
            onClick={()=>handleModalEliminarColaborador(colaborador)}
            >Eliminar</button>
        </div>
    
    </div>
    </div>
  )
}

export default Colaborador