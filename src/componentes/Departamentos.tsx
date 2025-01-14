import React, { useState } from 'react';
// import Empleados from './Empleados';

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

interface PropsDepartamento {
    empleados: Empleado[]
    departamentos: Departamento[];
    setDepartamentos: React.Dispatch<React.SetStateAction<Departamento[]>>;
}

const Departamentos: React.FC<PropsDepartamento> = ({ empleados, departamentos, setDepartamentos }) => {
    const [nombre, setNombre] = useState<string>('');
    const [departamentoId, setDepartamentoId] = useState<number | null>(null);

    const agregarDepartamento = () => {
        if (nombre.trim()) {
            if (departamentoId !== null) {
                // Actualizar departamento existente
                const departamentosActualizados = departamentos.map((departamento) =>
                    departamento.id === departamentoId ? { ...departamento, nombre } : departamento
                );
                setDepartamentos(departamentosActualizados);
            } else {
                // Agregar nuevo departamento
                const nuevoId = departamentos.length > 0 ? Math.max(...departamentos.map(d => d.id)) + 1 : 1;
                const nuevoDepartamento: Departamento = {
                    id: nuevoId,
                    nombre,
                };
                setDepartamentos([...departamentos, nuevoDepartamento]);
            }
            setNombre('');
            setDepartamentoId(null);
        } else {
            alert('El nombre es requerido');
        }
    };

    const eliminarDepartamento = (id: number) => {
        // Verificar si algún empleado tiene asignado el departamento a eliminar
        const empleadoConDepartamento = empleados.find((empleado: Empleado) => empleado.idDepartamento === id);
        if (empleadoConDepartamento) {
            alert('No se puede eliminar el departamento porque tiene un empleado asignado');
        } else {
            // Confirmar eliminación
            const confirmar = window.confirm('¿Estás seguro de que deseas eliminar este departamento?');
            if (confirmar) {
                const departamentosFiltrados = departamentos.filter((departamento) => departamento.id !== id);
                setDepartamentos(departamentosFiltrados);
            }
        }
    };

    const actualizarDepartamento = (id: number) => {
        const departamentoActualizado = departamentos.find((departamento) => departamento.id === id);
        if (departamentoActualizado) {
            setNombre(departamentoActualizado.nombre);
            setDepartamentoId(id);
        }
    };

    
    return (
        <div>
            <h1>Gestión de Departamentos</h1>
            <div className="formulario">
                <input
                    type="text"
                    placeholder="Nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />
                <button onClick={agregarDepartamento}>
                    {departamentoId !== null ? 'Actualizar' : 'Guardar'}
                </button>
            </div>

            <h2>Lista de Departamentos</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {departamentos.map((departamento) => (
                        <tr key={departamento.id}>
                            <td>{departamento.id}</td>
                            <td>{departamento.nombre}</td>
                            <td>
                                <button onClick={() => actualizarDepartamento(departamento.id)}>Actualizar</button>
                                <button onClick={() => eliminarDepartamento(departamento.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Departamentos;
