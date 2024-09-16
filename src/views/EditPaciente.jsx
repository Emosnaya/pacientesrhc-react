import React, { useEffect } from 'react'
import Header from '../components/Header'
import { useRef, useState } from 'react'
import clienteAxios from '../axios-client';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import useSWR from 'swr';

export default function EditPaciente() {
    const token = localStorage.getItem('AUTH_TOKEN')
    const {id} = useParams()
    const [errores, setErrores] = useState(null)
    
    const [paciente, setPaciente] = useState({
        id:null,
        nombre: '',
        apellidoPat: '',
        apellidoMat: '',
        telefono: '',
        fechaNacimiento: '',
        genero: '',
        estadoCivil: '',
        profesion: '',
        registro: '',
        domicilio: '',
        talla: '',
        peso: '',
        cintura: '',
        diagnostico: '',
        medicamentos: ''
    })


    if(id) {
        useEffect(() => {
            clienteAxios.get(`/api/pacientes/${id}`,{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            .then(({data}) => {
                setPaciente(data)
            })
            .catch(error => {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Ocurrió un error!",
              });
            });
        }, [])
    }

    const onSubmit = (e) => {
        e.preventDefault()
        Swal.fire({
            title: "¿Quieres Actualizar?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Actualizar",
            cancelButtonText: "Cancelar"
          }).then((result) => {
            if (result.isConfirmed) {
                try {
                    clienteAxios.put(`/api/pacientes/${paciente.id}`, paciente,{
                        headers:{
                            Authorization: `Bearer ${token}`
                        }
                    }).then(({data}) => {
                        setTimeout(function() {
                            // Redireccionar a una página específica
                            window.location.href = '/dashboard';
                        }, 2000);
                        Swal.fire({
                            title: "Actualizado!",
                            text: "El paciente fue actualizado",
                            icon: "success",
                            timer: 1500
                          });
                    })
                } catch (error) {
                    setErrores(Object.values(error.response.data.errors) )
                }
            }
          });
    }
  return (
    <>
    <Header titulo ={`Paciente : ${paciente.nombre} ${paciente.apellidoPat}`}/>
    <div>
        <h1 className='text-2xl md:text-xl font-bold mt-4'>Información General</h1>      
        <div className=" mt-5 px-5 py-10">
            <form action="" className='grid lg:grid-cols-3 grid-cols-1 gap-2' onSubmit={onSubmit}>
            {errores ? errores.map((error, i) => <Alerta key={i}>{error}</Alerta>)  : null }
            <div className="mb-4">
                    <label 
                    htmlFor="registro"
                    className="text-slate-800"
                    >
                        Registro*:
                    </label>
                    <input 
                        
                        type="text"
                        id="registro"
                        className="mt-2 w-full p-3 bg-gray-50" 
                        name="registro"
                        placeholder="Registro*"
                        value={paciente.registro}
                        onChange={ev => setPaciente({...paciente,registro: ev.target.value})}
                    />
                </div>
                <div className="mb-4">
                    <label 
                    htmlFor="nombre"
                    className="text-slate-800"
                    >
                        Nombre*:
                    </label>
                    <input 
                        type="text"
                        id="nombre"
                        className="mt-2 w-full p-3 bg-gray-50" 
                        name="nombre"
                        placeholder="Nombre*"
                        value={paciente.nombre}
                        onChange={ev => setPaciente({...paciente,nombre: ev.target.value})}
                    />
                </div>
                <div className="mb-4">
                    <label 
                    htmlFor="apellidoPat"
                    className="text-slate-800"
                    >
                        Apellido Paterno*:
                    </label>
                    <input 
                        type="text"
                        id="apellidoPat"
                        className="mt-2 w-full p-3 bg-gray-50" 
                        name="apellidoPat"
                        placeholder="Apellido Paterno*"
                        value={paciente.apellidoPat}
                        onChange={ev => setPaciente({...paciente,apellidoPat: ev.target.value})}
                    />
                </div>
                <div className="mb-4">
                    <label 
                    htmlFor="apellidoMat"
                    className="text-slate-800"
                    >
                        Apellido Materno:
                    </label>
                    <input 
                        type="text"
                        id="apellidoMat"
                        className="mt-2 w-full p-3 bg-gray-50" 
                        name="apellidoMat"
                        placeholder="Apellido Materno"
                        value={paciente.apellidoMat}
                        onChange={ev => setPaciente({...paciente,apellidoMat: ev.target.value})}
                    />
                </div>
                <div className="mb-4">
                    <label 
                    htmlFor="telefono"
                    className="text-slate-800"
                    >
                        Teléfono:
                    </label>
                    <input 
                        type="tel"
                        id="telefono"
                        className="mt-2 w-full p-3 bg-gray-50" 
                        name="telefono"
                        placeholder="telefono"
                        value={paciente.telefono}
                        onChange={ev => setPaciente({...paciente,telefono: ev.target.value})}
                    />
                </div>
                <div className="mb-4">
                    <label 
                    htmlFor="fechaNacimiento"
                    className="text-slate-800"
                    >
                        Fecha de Nacimiento:
                    </label>
                    <input 
                        type="date"
                        id="fechaNacimiento"
                        className="mt-2 w-full p-3 bg-gray-50" 
                        name="fechaNacimiento"
                        value={paciente.fechaNacimiento}
                        onChange={ev => setPaciente({...paciente,genero: ev.target.value})}
                    />
                </div>

                <div className="mb-4">
                <label 
                    htmlFor="genero"
                    className="text-slate-800"
                    >
                        Género:
                    </label>
                    <select id="genero" name="genero" className='mt-2 w-full p-3' value={paciente.genero} onChange={ev => setPaciente({...paciente,genero: ev.target.value})}>
                        <option value="masculino">Hombre</option>
                        <option value="femenino">Mujer</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label 
                    htmlFor="estadoCivil"
                    className="text-slate-800"
                    >
                        Estado Civil:
                    </label>
                    <select id="estadoCivil" name="estadoCivil" className='mt-2 w-full p-3' value={paciente.estadoCivil} onChange={ev => setPaciente({...paciente,estadoCivil: ev.target.value})}>
                        <option value="soltero">Soltero/a</option>
                        <option value="casado">Casado/a</option>
                        <option value="viudo">Viudo/a</option>
                        <option value="divorciado">Divorciado/a</option>
                        <option value="concubinato">Concubinato</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label 
                    htmlFor="profesion"
                    className="text-slate-800"
                    >
                        Profesión:
                    </label>
                    <input 
                        type="text"
                        id="profesion"
                        className="mt-2 w-full p-3 bg-gray-50" 
                        name="profesion"
                        value={paciente.profesion}
                        onChange={ev => setPaciente({...paciente,profesion: ev.target.value})}
                    />
                </div>
                <div className="mb-4">
                    <label 
                    htmlFor="domicilio"
                    className="text-slate-800"
                    >
                        Domicilio:
                    </label>
                    <input 
                        type="text"
                        id="domicilio"
                        className="mt-2 w-full p-3 bg-gray-50" 
                        name="domicilio"
                        value={paciente.domicilio}
                        onChange={ev => setPaciente({...paciente,domicilio: ev.target.value})}
                    />
                </div>
    
                <div className="mb-4">
                    <label 
                    htmlFor="talla"
                    className="text-slate-800"
                    >
                        Talla:
                    </label>
                    <input 
                        type="numeric"
                        id="talla"
                        className="mt-2 w-full p-3 bg-gray-50" 
                        name="talla"
                        value={paciente.talla}
                        onChange={ev => setPaciente({...paciente,talla: ev.target.value})}
                    />
                </div>
                <div className="mb-4">
                    <label 
                    htmlFor="peso"
                    className="text-slate-800"
                    >
                        Peso:
                    </label>
                    <input 
                        type="numeric"
                        id="peso"
                        className="mt-2 w-full p-3 bg-gray-50" 
                        name="peso"
                        value={paciente.peso}
                        onChange={ev => setPaciente({...paciente,peso: ev.target.value})}
                    />
                </div>
                <div className="mb-4">
                    <label 
                    htmlFor="cintura"
                    className="text-slate-800"
                    >
                        Cintura:
                    </label>
                    <input 
                        type="numeric"
                        id="cintura"
                        className="mt-2 w-full p-3 bg-gray-50" 
                        name="cintura"
                        value={paciente.cintura}
                        onChange={ev => setPaciente({...paciente,cintura: ev.target.value})}
                    />
                </div>
                <div className="mb-4">
                    <label 
                    htmlFor="diagnostico"
                    className="text-slate-800"
                    >
                        Diagnostico:
                    </label>
                    <input 
                        type="text"
                        id="diagnostico"
                        className="mt-2 w-full p-3 bg-gray-50" 
                        name="diagnostico"
                        value={paciente.diagnostico}
                        onChange={ev => setPaciente({...paciente,diagnostico: ev.target.value})}
                    />
                </div>
                <div className="mb-4">
                    <label 
                    htmlFor="medicamentos"
                    className="text-slate-800"
                    >
                        Medicamentos:
                    </label>
                    <input 
                        type="text"
                        id="medicamentos"
                        className="mt-2 w-full p-3 bg-gray-50" 
                        name="medicamentos"
                        value={paciente.medicamentos}
                        onChange={ev => setPaciente({...paciente,medicamentos: ev.target.value})}
                    />
                </div>
                <input 
                    type="submit" 
                    value="Guardar"
                    className="bg-green-500 hover:bg-green-600 lg:col-start-2 text-white  m-5 p-3 uppercase font-bold cursor-pointer"
                />
                <Link className="bg-red-500 hover:bg-red-600 text-white m-5 text-center p-3 uppercase font-bold cursor-pointer" to="/dashboard"> Cancelar</Link>
            </form>
        </div>
    </div>
    </>
  )
}
