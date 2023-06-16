/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import useProyecto from '../hooks/useProyecto'
import Alert from './Alert'
import { useParams } from 'react-router-dom'

const PRIORIDAD=["Baja","Media","Alta"]

const ModalFormularioTarea = ({modal,setModal}) => {
 
    const [nombre,setNombre]=useState('');
    const [descripcion,setDescripcion]=useState('');
    const [prioridad,setPrioridad]=useState('');
    const [fecha,setFecha]=useState('');
    const[id,setId]=useState(null);
    const {modalFormularioTarea,handleModalFormularioTarea,handleSubmitTarea,alerta,mostrarAlerta,proyecto,tarea}=useProyecto();
    const params=useParams();

    useEffect(()=>{
        if(tarea?._id!==undefined){
            
            setNombre(tarea.nombre);
            setDescripcion(tarea.descripcion);
            setPrioridad(tarea.prioridad);
            setFecha(tarea.fechaEntrega.split('T')[0]);
            setId(tarea._id);
           
        }else{
            //alert("Entra");
            setId(null);
            setNombre('');
            setDescripcion('');
            setPrioridad('');
            setFecha('');
        }
    },[tarea]);
   
    const handleSubmit=async (e)=>{
        e.preventDefault();
       
        if([nombre,descripcion,prioridad,fecha].includes('')){
            mostrarAlerta({
                msg:'Todos los campos son obligatorios',
                error:true
            });
          
            return;
        }
            const tarea={
                id:id,
                nombre:nombre,
                descripcion:descripcion,
                prioridad:prioridad,
                fechaEntrega:fecha,
                proyecto:proyecto._id
                
            }
           
       await handleSubmitTarea(tarea);
        setId('');
        setNombre('');
        setDescripcion('');
        setPrioridad('');
        setFecha('');
       // setNombre('');
    }
    const {msg}=alerta;
    return (
        <Transition.Root show={modalFormularioTarea===true} as={Fragment}>
            <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={handleModalFormularioTarea }>
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay 
                            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" 
                        />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                        &#8203;
                    </span>

                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">


                            <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                                <button
                                    type="button"
                                    className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    onClick={handleModalFormularioTarea  }
                                >
                                <span className="sr-only">Cerrar</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>


                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                    <Dialog.Title as="h3" className="text-lg leading-6 font-bold text-gray-900">
                                        {id? 'Actualizar Tarea': 'Crear tarea'}
                                    </Dialog.Title>
                                    {msg && <Alert alerta={alerta}/>}
                                    <form className='my-10' onSubmit={handleSubmit}>
                                            
                                            <div className='mb-5'>
                                                <label
                                                className='text-gray-700 uppercase font-bold text-sm'
                                                >Fecha de entrega</label>
                                                <input
                                                type="date"
                                                className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                                                placeholder='Nombre de la tarea'
                                                value={fecha}
                                                onChange={(e)=>setFecha(e.target.value)}
                                                />
                                            </div>
                                            <div className='mb-5'>
                                                <label
                                                className='text-gray-700 uppercase font-bold text-sm'
                                                >Nombre Tarea</label>
                                                <input
                                                type="text"
                                                className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                                                placeholder='Nombre de la tarea'
                                                value={nombre}
                                                onChange={(e)=>setNombre(e.target.value)}
                                                />
                                            </div>
                                            <div className='mb-5'>
                                                <label
                                                className='text-gray-700 uppercase font-bold text-sm'
                                                >Descripcion Tarea</label>
                                                <textarea
                                                type="text"
                                                className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                                                placeholder='Descripcion de la tarea'
                                                value={descripcion}
                                                onChange={(e)=>setDescripcion(e.target.value)}
                                                />
                                            </div>
                                            <div className='mb-5'>
                                                <label
                                                className='text-gray-700 uppercase font-bold text-sm'
                                                >Prioridad Tarea</label>
                                                <select
                                                className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                                                value={prioridad}
                                                onChange={(e)=>setPrioridad(e.target.value)}
                                                >
                                                    <option value="">Seleccionar</option>
                                                    {PRIORIDAD.map(p=>(
                                                        <option 
                                                        key={p}
                                                        value={p}>{p}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <input type="submit" value={id?'Guardar cambios tarea': 'Crear Tarea'} 
                                            className='py-3 px-2 mt-5 bg-sky-600 font-bold text-white text-center
                                            rounded-sm
                                            w-full cursor-pointer'
                                            />
                                    </form>
                                </div>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default ModalFormularioTarea