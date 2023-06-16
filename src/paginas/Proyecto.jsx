/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Link, Route, useParams } from 'react-router-dom'
import clienteAxios from '../config/clienteAxios';
import useProyecto from '../hooks/useProyecto';
import FormularioProyecto from '../components/FormularioProyecto';
import ModalFormularioTarea from '../components/ModalFormularioTarea';
import ListadoTareas from '../components/ListadoTareas';
import ModalEliminarTarea from '../components/ModalEliminarTarea';
import Alert from '../components/Alert';
import Colaborador from '../components/Colaborador';
import ModalEliminarColaborador from '../components/ModalEliminarColaborador';
import useAdmin from '../hooks/useAdmin';
import { io } from 'socket.io-client';

let socket;
function Proyecto() {

 
    const params=useParams();
    const{id}=params;
    const{obtenerProyecto,proyecto,cargando,edit,setEdit,handleModalFormularioTarea,getTasks,modalEliminarTarea,alerta,handleModalEliminarColaborador}=useProyecto();
    const {nombre,descripcion}=proyecto;
    
    const [modal,setModal]=useState(false);
    const admin=useAdmin();
    useEffect(()=>{
       
       obtenerProyecto(id);

       getTasks(id);

        
    },[]);


    useEffect(()=>{
        socket=io(import.meta.env.VITE_BACKEND_URL);

        socket.emit('abrir proyecto',proyecto);
    },[]);

    console.log("PROYECTO COMPLETADO: ",proyecto);
    const handleEdit=()=>{
        console.log("Editando...");
        setEdit(!edit);
    }
    const {msg}=alerta
    return (
        
        cargando?'Loading...':
        <div>
        <div className='flex justify-between'>
        <h1 className='font-black text-4xl '>{ nombre}</h1>

            {admin && (
        <div className='flex items-center gap-2 text-gray-400 hover:text-black'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 cursor-pointer">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
            <Link to={`/proyectos/editar/${params.id}`}
            className='uppercase font-bold'
            >Editar</Link>
        </div>
        )}
        
        

        </div>
        {admin && (
        <button 
        onClick={handleModalFormularioTarea}
        type='button'
        className='text-sm px-5 mt-5 py-3 w-full md:w-auto rounded-lg uppercase font-bold bg-sky-400 text-white text-center
        flex gap-5 items-center justify-center
        '
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
            className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        Nueva Tarea
        </button>
        )}
        <ModalFormularioTarea
        modal={modal}
        setModal={setModal}
        />
        <ModalEliminarTarea/>
        <ModalEliminarColaborador
    modal={modal}
    setModal={setModal}
    >
    </ModalEliminarColaborador>
        <p className='font-bold text-xl mt-10'>Tareas del proyecto</p>
        {msg && <Alert alerta={alerta}/>}
        {proyecto.tareas?.length ? <div className='p-10 bg-white rounded-lg mt-10 shadow-xl'>
            {proyecto.tareas?.map(t=>(
                <ListadoTareas
                key={t._id}
                tarea={t}
                />
            ))}
            
        </div>:<p className='text-center my-5 p-10'>NO hay tareas por mostrar</p>}

        <div className='flex items-center justify-between mt-10'>
            
            <p className='font-bold text-xl '>Colaboradores</p>
            
            <Link to={`/proyectos/nuevo-colaborador/${proyecto._id}`}
            className=' text-gray-400 cursor-pointer hover:text-black uppercase font-bold'
            >
            Añadir
            </Link>
        </div>
                <div className='bg-white shadow-lg mt-10 rounded-lg'>
                    {proyecto.colaboradores?.length ?
                    proyecto.colaboradores?.map(c=>(
                        <Colaborador
                            key={c._id}
                            colaborador={c}
                        />
                    )):<p className='text-center my-5 p-10'>No hay colaboradores en este proyecto</p>
                    }
                </div>


        </div>
  
  )
    
}

export default Proyecto