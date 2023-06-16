/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-undef */
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import AuthLayout from './layouts/AuthLayout'
import Login from './paginas/Login'
import Registrar from './paginas/Registrar'
import OlvidePassword from './paginas/OlvidePassword'
import NuevoPassword from './paginas/NuevoPassword'
import ConfirmarCuenta from './paginas/ConfirmarCuenta'
import { AuthProvider } from './context/AuthProvider'
import RutaProtegida from './layouts/RutaProtegida'
import Proyectos from './paginas/Proyectos'
import NuevoProyecto from './paginas/NuevoProyecto'
import { ProyectoProvider } from './context/ProyectoContext'
import Proyecto from './paginas/Proyecto'
import EditarProyecto from './paginas/EditarProyecto'
import NuevoColaborador from './paginas/NuevoColaborador'




function App() {

  return (
   <BrowserRouter>
    <AuthProvider>
     <ProyectoProvider>
      <Routes>
        <Route path="/" element={<AuthLayout/>}>
            <Route index element={<Login/>}/>
            <Route path="registrar" element={<Registrar/>}/>
            <Route path="olvide-password" element={<OlvidePassword/>}/>
            <Route path="olvide-password/:token" element={<NuevoPassword/>}/>
            <Route path="confirmar/:id" element={<ConfirmarCuenta/>}/>
        </Route>
        
        <Route path='/proyectos' element={<RutaProtegida/>}>
          <Route index element={<Proyectos />}/>
          <Route path='crear-proyecto' element={<NuevoProyecto/>}/>

          <Route path=':id' element={<Proyecto/>}/>
          <Route path='editar/:id' element={<EditarProyecto/>}/>
          <Route path='nuevo-colaborador/:id' element={<NuevoColaborador/>}/>
        </Route>
      
        </Routes>
      </ProyectoProvider>
    </AuthProvider>
   </BrowserRouter>
  )
}

export default App
