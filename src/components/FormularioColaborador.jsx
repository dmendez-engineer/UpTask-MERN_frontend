/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import useProyecto from '../hooks/useProyecto';
import Alert from './Alert';

function FormularioColaborador() {
    const[email,setEmail]=useState('');
    const {mostrarAlerta,alerta,submitColaborador,colaborador}=useProyecto();


    

    const handleSubmit=(e)=>{
        e.preventDefault();

        if(email===''){
            mostrarAlerta({
                msg:'El email es obligatorio',
                error:true
            });
            return;
        }
        submitColaborador(email);
    }
    const{msg}=alerta;

  return (
        <>
        
        <form className='bg-white py-10 px-5 shadow-lg md:w-1/2 rounded-lg'
        onSubmit={handleSubmit}
        >
        {msg && <Alert alerta={alerta}/>}
            <div className='mb-5'>
            <label className='text-gray-700 uppercase font-bold text-sm'>
             Email del Colaborador:
            </label>
            <input
            id='nombre'
            type='email'
            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            placeholder='Email del usuario'
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
    
            />
            <input type='submit' value={'Buscar Colaborador'} className='p-3 mt-5 rounded-lg w-full cursor-pointer hover:bg-sky-800 bg-sky-600
             text-white font-bold uppercase transition-colors'/>
          </div>
           
        </form>
       
        </>

  )
}

export default FormularioColaborador