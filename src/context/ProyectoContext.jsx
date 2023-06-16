/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-empty */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { createContext, useContext, useEffect, useState } from "react";
import clienteAxios from "../config/clienteAxios";
import Alert from "../components/Alert";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ProyectoContext=createContext();

const ProyectoProvider= ({children})=>{
    
    const [proyectos,setProyectos]=useState([]);
    const[alerta,setAlerta]=useState({});
    const navigate=useNavigate();
    const[proyecto,setProyecto]=useState({});
    const[cargando,setCargando]=useState(false);
    const[edit,setEdit]=useState(false);
    const[modalFormularioTarea,setModalFormularioTarea]=useState(false);
    const[tareas,setTareas]=useState([]);
    const[tarea,setTarea]=useState({});
    const [modalEliminarTarea,setModalEliminarTarea]=useState(false);
    const[modalEliminarColaborador,setModalEliminarColaborador]=useState(false);
    const[colaborador,setColaborador]=useState({});
    const[buscador,setModaBuscador]=useState(false);
  
    const {auth}=useAuth();

    useEffect(()=>{
      
        const getProjects=async()=>{
          try{
            const token=localStorage.getItem('token');
            if(!token){
              return;
            }
            const config={
              headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${token}`
              }
            };
            const{data}=await clienteAxios("/proyectos",config);
            setProyectos(data);
           
        }catch(err){
          console.log("ERROR GET PROJECTS: ",err);
        }
          
        }

        getProjects();   

    },[auth]);

    const mostrarAlerta=(alerta)=>{
      setAlerta(alerta);

      setTimeout(() => {
        setAlerta({})
      }, 5000);
      
    }
   
    const submitProyecto=async(proyecto)=>{

      const token=localStorage.getItem('token');
      if(!token){
        return;
      }
      const config={
        headers:{
          "Content-Type":"application/json",
          Authorization:`Bearer ${token}` 
        }
        
      }

      if(proyecto.id){
        await updateProject(proyecto,config);
      }else{
        await createProject(proyecto,config);
      }

        setTimeout(() => {
          setAlerta({}); 
          navigate("/proyectos");
        }, 2500);
        

    }

    const updateProject=async(proyecto,config)=>{
      
      try {
        const {data}=await clienteAxios.put(`/proyectos/${proyecto.id}`,proyecto,config);
        const proyectosActualizados=proyectos.map(p=>p._id===data._id ? data : p);
        setProyectos(proyectosActualizados);

      setAlerta({
        msg:"The Project has been updated",
        error:false
      });
      } catch (error) {
          console.log("ERROR IN THE UPDATE",error);
      }
      
    }
    const createProject=async(proyecto,config)=>{
      
      try {
        const {data}=await clienteAxios.post("/proyectos",proyecto,config);
        console.log("PROEJCT that will be created: ",proyecto);
      setProyectos([...proyectos,data]);
      setAlerta({
        msg:"The Project has been created",
        error:false
      });
      } catch (error) {
        console.log("ERROR IN THE Creation",error);
      }
      
    }
    const obtenerProyecto=async(id)=>{
      setCargando(true);
        try {
          const token=localStorage.getItem('token');
          if(!token){
            return;
          }
          const config={
            headers:{
              "Content-Type":"application/json",
              Authorization:`Bearer ${token}`
            }
          }
          const {data}=await clienteAxios.get(`/proyectos/${id}`,config);
          setProyecto(data);
          setAlerta({});
         

        } catch (error) {
          navigate('/proyectos');
          console.log("Error; ",error);
          setTimeout(() => {
              setAlerta({});
          }, 2000);
        }finally{
          setCargando(false);
        }
    }

    const deleteProject=async (id)=>{
      //console.log("Deleteing project #: "+id);
      const token=localStorage.getItem('token');
      if(!token){
        return;
      }
      const config={
        headers:{
          "Content-Type":"application/json",
          Authorization:`Bearer ${token}`
        }
      };

      try {
          //eliminar-colaborador
          const {data}=await clienteAxios.delete(`/proyectos/${id}`,config);
 
          const proyectosActualizados=proyectos.filter(p=>p._id!==id);

          setProyectos(proyectosActualizados);

          setTimeout(() => {
            setAlerta({}); 
            navigate("/proyectos");
          }, 2500);

          setAlerta({
            msg:data.msg,
            error:false
          });
      } catch (error) {
        console.log("Deleteing Error: ",error);
      }
      
    }

    const getTasks=async ( id)=>{
      const token=localStorage.getItem('token');  
      if(!token){
        return;
      }
      const config={
          headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
          }
        }
        try {

          const {data}=await clienteAxios.get(`/tareas/${id}`,config);
          
          setTareas(data);

        } catch (error) {
          console.log("Error: ",error);
        }
    
    }
    const getTask=async (id)=>{
      const token=localStorage.getItem('token');
      if(!token){
        return;
      }
      const config={
        headers:{
          "Content-Type":"application/json",
          Authorization:`Bearer ${token}`
        }
      }
      try {
        const {data}=await clienteAxios.get()
      } catch (error) {
        
      }
    }


    const handleModalFormularioTarea=()=>{
      setTarea({});
      setModalFormularioTarea(!modalFormularioTarea);
    }
    const handleModalEliminarColaborador=(colaboradorx)=>{
    
      setColaborador(colaboradorx);
      
      setModalEliminarColaborador(!modalEliminarColaborador);
    }
    const handleModalEliminarTarea=async (tareaSelected)=>{
      setTarea(tareaSelected);
      setModalEliminarTarea(!modalEliminarTarea);


    }
    const handleUpdateTask=  (SelectedTask)=>{
      setTarea(SelectedTask);
      setModalFormularioTarea(!modalFormularioTarea);
    }
    const eliminarTarea=async()=>{
      
      
      const token=localStorage.getItem('token');
      if(!token){
        return;
      }
      const config={
        headers:{
          "Content-Type":"application/json",
          Authorization:`Bearer ${token}`
        }
      }
      
      try {
        const {data}=await clienteAxios.delete(`/tareas/${tarea._id}`,config);
        setAlerta({
          msg:data.msg,
          error:false
        });
        
       const proyectoActualizado={...proyecto};
       proyectoActualizado.tareas=proyecto.tareas.filter(p=>p._id!==tarea._id);
      
       
       setProyecto(proyectoActualizado);

       
       setTarea({});
       setModalEliminarTarea(false);
       setTimeout(() => {
        setAlerta({});
       }, 1000);

       } catch (error) {
        console.log("ERROR al agregar TAREAS: ",error);
       }

       
    }
    const handleSubmitTarea= async (tarea)=>{
      


      const token=localStorage.getItem('token');
      if(!token){
        return;
      }
      const config={
        headers:{
          "Content-Type":"application/json",
          Authorization:`Bearer ${token}`
        }
      }
        if(tarea?.id){
          await saveChanges(tarea,config);
        }else{
          await createTask(tarea,config);
        }
     

    }
    const saveChanges=async (tarea,config)=>{
      try {
        const {data}=await clienteAxios.put(`/tareas/${tarea.id}`,tarea,config);

        
       const proyectoActualizado={...proyecto};

       proyectoActualizado.tareas=proyectoActualizado.tareas.map(t=>t._id===data._id?data:t);
       
       setProyecto(proyectoActualizado);
       setModalFormularioTarea(false);
       setAlerta({});
       setModalFormularioTarea(false);

       } catch (error) {
        console.log("ERROR al agregar TAREAS: ",error);
       }
    }
    const createTask=async (tarea,config)=>{
      try {
        const {data}=await clienteAxios.post("/tareas",tarea,config);

        mostrarAlerta({
        });
       // setTareas([...tareas,data]);
       //setModalFormularioTarea(false);
       const proyectoActualizado={...proyecto};
       proyectoActualizado.tareas=[...proyecto.tareas,data];
       setProyecto(proyectoActualizado);
       setModalFormularioTarea(false);
       } catch (error) {
        console.log("ERROR al agregar TAREAS: ",error);
       }
    }
    const submitColaborador=async (email)=>{
        const token=localStorage.getItem('token');
       setCargando(true);
        if(!token){
          return;
        }
       
      const config={
        headers:{
          "Content-Type":"application/json",
          Authorization:`Bearer ${token}`
        }
      }
      try {
          const {data}=await clienteAxios.post("/proyectos/colaborador",{email},config);
         setColaborador(data);
         
          setAlerta({});

      } catch (error) {
        console.log("Error: ",error);
        setAlerta({
          msg:error.response.data.msg,
          error:true
        });
      }finally{
        setCargando(false);
      }

    } 
    const agregarColaborador=async(email)=>{
      
      const token=localStorage.getItem('token');
      if(!token){
        return;
      }
      const config={
        headers:{
          "Content-Type":"application/json",
          Authorization:`Bearer ${token}`
        }
      }
      try{
        
        const {data}=await clienteAxios.post(`/proyectos/colaborador/${proyecto._id}`,email,config);
        
        setAlerta({
          msg:data.msg,
          error:false
        });
        setColaborador({});
        setTimeout(() => {
            setAlerta({});
        }, 1500);
        

      } catch (error) {
        console.log("Agregar :",error);
        
        setAlerta({
          msg:error.response.data.msg,
          error:true
        });
        
      }
    }
    const eliminarColaborador=async (id)=>{
      const token=localStorage.getItem('token');
      if(!token){
        return;
      }
      const config={
        headers:{
          "Content-Type":"application/json",
          Authorization:`Bearer ${token}`
        }
      }

      try {
        const{data}=await clienteAxios.post(`/proyectos/eliminar-colaborador/${id}`,{id:colaborador._id},config);
          setAlerta({
            msg:data.msg,
            error:false
          });
        setColaborador({});
        setTimeout(() => {
          setAlerta({});
      }, 1500);
        const proyectoActualizado={...proyecto};
        proyectoActualizado.colaboradores=proyectoActualizado.colaboradores.filter(c=>c._id!==colaborador._id);

        setProyecto(proyectoActualizado);
        setModalEliminarColaborador(false);

      } catch (error) {
       console.log("Error:",error); 
      }
    }
    const completeTask=async(id)=>{
      const token=localStorage.getItem('token');
      if(!token){
        return;
      }
      const config={
        headers:{
          "Content-Type":"application/json",
          Authorization:`Bearer ${token}`
        }
      }
      try{
        const {data}=await clienteAxios.post(`/tareas/estado/${id}`,{},config);
        const proyectoActualizado={...proyecto};

        proyectoActualizado.tareas=proyectoActualizado.tareas.map(t=>t._id===data._id?data:t);
        setProyecto(proyectoActualizado);
        setTarea({});
        setAlerta({});
      }catch(err){
        console.log("Error:",err);
      }
    }
    const handleBuscador=()=>{
      setModaBuscador(!buscador);
    }
    const cerrarSesionProyectos=()=>{
      setProyectos([]);
      setProyecto({});  
      setAlerta({});
      
    }
    return(
      <ProyectoContext.Provider
      value={{
        proyectos:proyectos,
        mostrarAlerta:mostrarAlerta,
        alerta:alerta,
        submitProyecto:submitProyecto,
        obtenerProyecto:obtenerProyecto,
        proyecto:proyecto,
        setProyecto:setProyecto,
        cargando:cargando,
        setCargando:setCargando,
        edit:edit,
        setEdit:setEdit,
        deleteProject:deleteProject,
        modalFormularioTarea:modalFormularioTarea,
        handleModalFormularioTarea:handleModalFormularioTarea,
        handleSubmitTarea:handleSubmitTarea,
        getTasks:getTasks,
        tareas:tareas,
        tarea:tarea,
        handleUpdateTask:handleUpdateTask,
        handleModalEliminarTarea:handleModalEliminarTarea,
        modalEliminarTarea:modalEliminarTarea,
        eliminarTarea:eliminarTarea,
        submitColaborador:submitColaborador,
        colaborador:colaborador,
        agregarColaborador:agregarColaborador,
        modalEliminarColaborador:modalEliminarColaborador,
        handleModalEliminarColaborador:handleModalEliminarColaborador,
        eliminarColaborador:eliminarColaborador,
        completeTask:completeTask,
        handleBuscador:handleBuscador,
        buscador:buscador,
        cerrarSesionProyectos:cerrarSesionProyectos
      }}
      >
      {children}
      </ProyectoContext.Provider>
    )
}
export {
    ProyectoProvider
}
export default ProyectoContext