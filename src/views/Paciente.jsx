import React, { useEffect } from 'react'
import Header from '../components/Header'
import { useRef, useState } from 'react'
import { FaRegTrashCan ,FaPrint } from "react-icons/fa6";
import { FaEye, FaEdit  } from "react-icons/fa";
import clienteAxios from '../axios-client';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import useSWR from 'swr';

export default function Paciente() {
    const token = localStorage.getItem('AUTH_TOKEN')
    const {id} = useParams()
    const [errores, setErrores] = useState(null)
    const navigate = useNavigate()
    const [esfuerzo, setEsfuerzo] = useState([])
    const [estratificacion, setEstratificacion] = useState([])
    const [clinicos, setClinicos] = useState([])
    const [search, setSearch] = useState("")


    const fetcher = () => clienteAxios(`/api/esfuerzos/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }).then(function (response) {
          setEsfuerzo(response.data.data)
        })
      
        const {data, error, isLoading} = useSWR(`/api/esfuerzos/${id}`, fetcher)

        const fetcherestrati = () => clienteAxios(`/api/estratificaciones/${id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }).then(function (response) {
              setEstratificacion(response.data.data)
            })
          
            const expedientesMed = esfuerzo.concat(estratificacion);
          
            const {dataest, errorest, isLoadingest} = useSWR(`/api/estratificaciones/${id}`, fetcherestrati)

            const fetcherclinico = () => clienteAxios(`/api/clinicos/${id}`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`
                  }
                }).then(function (response) {
                  setClinicos(response.data.data)
                })
              
                const expedientes = expedientesMed.concat(clinicos);
              
                const {dataecli, errorcli, isLoadingcli} = useSWR(`/api/clinicos/${id}`, fetcherclinico)
                
  let results = []
  const searcher = (e) => {
    setSearch(e.target.value)
  }

  if(!search){
    results =  expedientes;
  }else{
    results = expedientes.filter((dato) =>{
      return Object.values(dato).some(value =>
        typeof value === 'string' && value.toLowerCase().includes(search.toLowerCase()));
    }
    )
  }        

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
        <h1 className='text-2xl md:text-xl font-bold mt-4'>Editar Información</h1>
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
                        onChange={ev => setPaciente({...paciente,genero: ev.target.value})}
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
        <h1 className='text-2xl md:text-xl font-bold mt-4'>Expedientes</h1>
        <div className=" mt-5 md:p-5">
          <table className="table md:w-full border-separate lg:border-collapse w-full">
              <thead className="">
                  <tr >
                      <th className="border-b-2 border-gray-200">ID</th>
                      <th className="border-b-2 border-gray-200">Tipo de expediente</th>
                      <th className="border-b-2 border-gray-200">Fecha</th>
                      <th className="border-b-2 border-gray-200">Acciones</th>
                  </tr>
              </thead>
              <tbody className="">
                  {expedientes.map((expediente) => (
                      <tr key={expediente.id} className="text-center md:text-xl ">
                          <td className="border-b-2 border-gray-200 py-4">{(expediente.numPrueba)?expediente.numPrueba:expediente.id}</td>
                          <td className="border-b-2 border-gray-200">{(() => {if (expediente.tipo_exp === 1) {return 'Prueba de esfuerzo';} else if(expediente.tipo_exp === 2) {return 'Estratificación';}else {return'Expediente Clínico'}})()}</td>
                          <td className="border-b-2 border-gray-200">{(expediente.fecha)?expediente.fecha:expediente.estrati_fecha}</td>
                          <td className="flex items-center justify-between border-b-2 border-gray-200 py-5">
                          {(() => {if (expediente.tipo_exp === 1) {return <Link to={'/prueba/'+ expediente.id}> <FaEdit className="action-icon edit hover:text-yellow-400" /></Link>;} else if(expediente.tipo_exp === 2) {return <Link to={'/estrati/'+ expediente.id}> <FaEdit className="action-icon edit hover:text-yellow-400" /></Link>;}else {return <Link to={'/clinico/'+ expediente.id}> <FaEdit className="action-icon edit hover:text-yellow-400" /></Link>}})()}
                          {(() => {if (expediente.tipo_exp === 1) {return <Link to={'/prueba/imprimir/'+ expediente.id}> <FaPrint className="action-icon edit hover:text-yellow-400" /></Link>;} else if(expediente.tipo_exp === 2) {return <Link to={'/estrati/imprimir/'+ expediente.id}> <FaPrint className="action-icon edit hover:text-yellow-400" /></Link>;}else {return <Link to={'/clinico/imprimir/'+ expediente.id}> <FaPrint className="action-icon edit hover:text-yellow-400" /></Link>}})()}
                            <a onClick={ev => onDelete(expediente)} > <FaRegTrashCan className="action-icon delete hover:text-red-700" /> </a>
                          </td>
                      </tr>
                  ))}
              </tbody>
          </table>
          {(() => {if (expedientes === null || expedientes.length==0) {return <h2 className='text-center mt-5 font-semibold'>No hay expedientes para este paciente.</h2>}})()}
        </div>
    </div>
    </>
  )
}
