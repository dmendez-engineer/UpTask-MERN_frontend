/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import FormularioProyecto from '../components/FormularioProyecto'
import useProyecto from '../hooks/useProyecto'

function NuevoProyecto() {
  const{edit,setEdit,setProyecto}=useProyecto();
  useEffect(()=>{
    setProyecto({});
    setEdit(false);
  },[]);
  return (
    <div>
     <h1 className='text-4xl font-black'>Nuevo Proyecto</h1>

     <div className='mt-10 flex justify-center'>
       <FormularioProyecto/>
     </div>
    
    </div>
  )
}

export default NuevoProyecto