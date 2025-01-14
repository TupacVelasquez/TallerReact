import React, { useEffect, useState } from 'react'
import GestionUsuarios from './componentes/GestionUsuarios'
import { Route,BrowserRouter as Router, Routes} from 'react-router-dom'
import Navbar from './componentes/Navbar'
import Departamentos from './componentes/Departamentos'
import Inicio from './componentes/Inicio'
import Empleados from './componentes/Empleados'

interface Departamento {
  id: number;
  nombre: string;
}

interface Empleado {
  id: number;
  nombre: string;
  apellido: string;
  idDepartamento: number;
}

const App: React.FC = () => {

  const [departamentos, setDepartamentos] = useState<Departamento[]>([]);
  const [empleados, setEmpleados] = useState<Empleado[]>([]);

  //Leer los datos del Local Storage al cargar la aplicación
useEffect (()=>{
  const storedDepartamentos = localStorage.getItem("departamentos");
  const storedEmpleados = localStorage.getItem("empleados");

    if(storedDepartamentos){
      setDepartamentos(JSON.parse(storedDepartamentos));
    }

    if(storedEmpleados){
      setEmpleados(JSON.parse(storedEmpleados));
    }

},[])

useEffect (() => {
  localStorage.setItem("departamentos", JSON.stringify(departamentos))
},[departamentos])

useEffect (() => {
  localStorage.setItem("empleados", JSON.stringify(empleados))
},[empleados])

  return (
    <Router>
      <Navbar />
      <div>
        <Routes>
          <Route path = '/' element = {<Inicio/>}/>
          <Route path = '/usuarios' element = {<GestionUsuarios/>}/>
          <Route path = '/departamentos' element = {<Departamentos empleados={empleados} departamentos={departamentos} setDepartamentos={setDepartamentos}/>}/>
          <Route path = '/empleados' element = {<Empleados empleados={empleados} departamentos={departamentos} setEmpleados={setEmpleados}/>}/> 
        </Routes>
      </div>
    </Router>
  )
}

export default App
