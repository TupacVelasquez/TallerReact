import React, { useState } from 'react';

interface Empleado {
  id: number;
  nombre: string;
  apellido: string;
  idDepartamento: number;
}

interface Departamento {
  id: number;
  nombre: string;
}

interface EmpleadosProps {
  departamentos: Departamento[];
  empleados: Empleado[];
  setEmpleados: React.Dispatch<React.SetStateAction<Empleado[]>>;
}

const Empleados: React.FC<EmpleadosProps> = ({ departamentos, empleados, setEmpleados }) => {

  const [nombre, setNombre] = useState<string>('');
  const [apellido, setApellido] = useState<string>('');
  const [idDepartamento, setIdDepartamento] = useState<number>(0);
  const [empleadoId, setEmpleadoId] = useState<number | null>(null);

  const agregarOActualizarEmpleado = () => {
    if (!nombre.trim() || !apellido.trim() || idDepartamento === 0) {
      alert("Por favor complete todos los campos.");
      return;
    }

    if (empleadoId !== null) {
      const empleadosActualizados = empleados.map((empleado) =>
        empleado.id === empleadoId
          ? { ...empleado, nombre, apellido, idDepartamento }
          : empleado
      );
      setEmpleados(empleadosActualizados);
    } else {

      const nuevoId = empleados.length > 0 ? Math.max(...empleados.map(d => d.id)) + 1 : 1;

      const nuevoEmpleado: Empleado = {
        id: nuevoId,
        nombre,
        apellido,
        idDepartamento,
      };
      setEmpleados([...empleados, nuevoEmpleado]);
    }

    setNombre('');
    setApellido('');
    setIdDepartamento(0);
    setEmpleadoId(null);
  };

  const eliminarEmpleado = (id: number) => {

    const confirmar = window.confirm('¿Esta seguro que quiere eliminar al empleado?')

    if(confirmar){
      const empleadosFiltrados = empleados.filter((empleado) => empleado.id !== id);
      setEmpleados(empleadosFiltrados);
    }
    
  };

  const actualizarEmpleado = (id: number) => {
    const empleado = empleados.find((emp) => emp.id === id);
    if (empleado) {
      setNombre(empleado.nombre);
      setApellido(empleado.apellido);
      setIdDepartamento(empleado.idDepartamento);
      setEmpleadoId(id);
    }
  };

  const obtenerNombreDepartamento = (id: number) => {
    const departamento = departamentos.find((dept) => dept.id === id);
    return departamento ? departamento.nombre : 'Desconocido';
  };

  return (
    <div>
      <h1>Empleados</h1>
      <input
        type="text"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder="Nombre del empleado"
      />
      <input
        type="text"
        value={apellido}
        onChange={(e) => setApellido(e.target.value)}
        placeholder="Apellido del empleado"
      />
      <select
        value={idDepartamento}
        onChange={(e) => setIdDepartamento(parseInt(e.target.value))}
      >
        <option value={0}>Seleccione su departamento</option>
        {departamentos.map((departamento) => (
          <option key={departamento.id} value={departamento.id}>
            {departamento.nombre}
          </option>
        ))}
      </select>
      <button onClick={agregarOActualizarEmpleado}>
        {empleadoId !== null ? 'Actualizar' : 'Agregar'}
      </button>

      <h2>Lista de Empleados</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Departamento</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {empleados.map((empleado) => (
            <tr key={empleado.id}>
              <td>{empleado.id}</td>
              <td>{empleado.nombre}</td>
              <td>{empleado.apellido}</td>
              <td>{obtenerNombreDepartamento(empleado.idDepartamento)}</td>
              <td>
                <button onClick={() => actualizarEmpleado(empleado.id)}>Actualizar</button>
                <button onClick={() => eliminarEmpleado(empleado.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Empleados;
