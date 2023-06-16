/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import useProyecto from '../hooks/useProyecto'
import { formatearFecha } from '../helpers/formatearFecha';
import useAdmin from '../hooks/useAdmin';

function ListadoTareas({tarea}) {
    const {descripcion,nombre,prioridad,fechaEntrega,estado,_id}=tarea;
    const{handleUpdateTask,handleModalEliminarTarea,completeTask}=useProyecto();
  const admin=useAdmin();
    /*const setModalUpdate=()=>{
        handleUpdateTask(tarea);   
    }*/

  return (
    <>
    <div className='border-b p-5 flex justify-between items-center'>
      <div className=' flex flex-col items-start'>
      <p className=' mb-2 text-xl'>{nombre}
      </p>
      <p className='mb-2 text-sm text-gray-500 uppercase'>{descripcion}
      </p>
      <p className='mb-2 text-xl'>{formatearFecha(fechaEntrega)}
      </p>
      <p className='mb-2 text-xl text-gray-500'>Prioridad:{' '}{prioridad}
      </p>
      {estado && <p className='text-xs bg-green-500 uppercase p-1 rounded-lg text-white font-bold'>Completada por: {tarea.completeBy.nombre}</p>}
 
      
      </div>

    <div className='flex flex-col md:flex-row gap-2'>
    {admin && (    
    <button
        className='bg-indigo-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg'
        onClick={()=>handleUpdateTask(tarea)}
        >Editar</button>
        )}

                <button
                className={`${estado?'bg-sky-600':'bg-gray-600'} px-4 py-3 text-white uppercase font-bold text-sm rounded-lg`}
                onClick={()=>completeTask(_id)}
                >{estado?'Completa':'Incompleta'}</button>

        {admin && (
        <button
        onClick={()=>handleModalEliminarTarea(tarea)}
        className='bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg'
        >Eliminar</button>
        )}
    </div>

    </div>
    
    </>
  )
}

export default ListadoTareas