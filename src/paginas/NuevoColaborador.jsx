/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import FormularioColaborador from '../components/FormularioColaborador'
import useProyecto from '../hooks/useProyecto'
import { useParams, useSearchParams } from 'react-router-dom';
import Alert from '../components/Alert';


function NuevoColaborador() {
    
    const{obtenerProyecto,proyecto,cargando,colaborador,agregarColaborador,alerta}=useProyecto();

    const params=useParams();
    useEffect(()=>{
        obtenerProyecto(params.id);
    },[]);
    if(!proyecto._id){
        return <Alert alerta={alerta}/>;
    }
    return (
    <div>
        <h1 className='text-4xl font-black'>Añadir Colaborador (a) al proyecto de <span className='text-sky-600 mt-3'>{proyecto.nombre}</span></h1>

        <div className='mt-10 flex justify-center'>
            <FormularioColaborador/>
        </div>
        {cargando ? 'cargando...':colaborador?._id &&(
            <div className='flex justify-center mt-10'>
                <div className='bg-white py-10 px-5 md:w-1/2 rounded-lg shadow'>
                    <h2 className='text-center mb-10 text-2xl font-bold'>Resultado:</h2>
                    <div className='flex justify-between items-center '>
                        <p className='text-2xl font-bold'>{colaborador?.nombre}</p>
                        <button className='p-3 bg-slate-500 rounded-lg text-sm text-white font-bold uppercase
                        md:px-1 py-2 
                        '
                        type='button'
                        onClick={(e)=>agregarColaborador({email:colaborador.email})}
                        >Agregar al proyecto</button>
                    </div>
                </div>
            </div>
        )}
    </div>
  )
}

export default NuevoColaborador