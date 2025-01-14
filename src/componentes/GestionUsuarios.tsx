import React, { useState } from 'react';
import './GestionUsuarios.css';

interface Usuario {
    id: number;
    nombre: string;
    email: string;
}

const GestionUsuarios: React.FC = () => {
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [nombre, setNombre] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [usuarioId, setUsuarioId] = useState<number | null>(null);

    const agregarUsuario = () => {
        if (nombre.trim() && email.trim()) {
            if (usuarioId !== null) {
                const usuariosActualizados = usuarios.map((usuario) =>
                    usuario.id === usuarioId ? { ...usuario, nombre, email } : usuario
                );
                setUsuarios(usuariosActualizados);
            } else {
                const nuevoUsuario: Usuario = {
                    id: Date.now(),
                    nombre,
                    email
                };
                setUsuarios([...usuarios, nuevoUsuario]);
            }
            setNombre('');
            setEmail('');
            setUsuarioId(null);
        } else {
            alert('Nombre y email son requeridos');
        }
    };

    const eliminarUsuario = (id: number) => {
        const usuariosFiltrados = usuarios.filter((usuario) => usuario.id !== id);
        setUsuarios(usuariosFiltrados);
    };

    const actualizarUsuario = (id: number) => {
        const usuarioActualizado = usuarios.find((usuario) => usuario.id === id);
        if (usuarioActualizado) {
            setNombre(usuarioActualizado.nombre);
            setEmail(usuarioActualizado.email);
            setUsuarioId(id);
        }
    };

    return (
        <div>
            <h1>Gestión de Usuarios</h1>
            <div className='formulario'>
                <input type='text' placeholder='Nombre' value={nombre} onChange={(e) => setNombre(e.target.value)} />
                <input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                <button onClick={agregarUsuario}>Guardar</button>
            </div>

            <h2>Lista de Usuarios</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map((usuario) => (
                        <tr key={usuario.id}>
                            <td>{usuario.id}</td>
                            <td>{usuario.nombre}</td>
                            <td>{usuario.email}</td>
                            <td>
                                <button onClick={() => actualizarUsuario(usuario.id)}>Actualizar</button>
                                <button onClick={() => eliminarUsuario(usuario.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default GestionUsuarios;
