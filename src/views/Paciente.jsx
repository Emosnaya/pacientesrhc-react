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
import ModalExpediente from '../components/ModalExpediente';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

export default function Paciente() {
    const token = localStorage.getItem('AUTH_TOKEN')
    const {id} = useParams()
    const [errores, setErrores] = useState(null)
    const navigate = useNavigate()
    const [esfuerzo, setEsfuerzo] = useState([])
    const [estratificacion, setEstratificacion] = useState([])
    const [clinicos, setClinicos] = useState([])
    const [reportes, setReportes] = useState([])
    const [nutricional, setNutricional] = useState([])
    const [psicologico, setPsicologico] = useState([])
    const [fisiologico,setFisiologico] = useState([])
    const [search, setSearch] = useState("")
    const [modal, setModal] = useState(false)



    const fetcher = () => clienteAxios(`/api/esfuerzos/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(function (response) {
            setEsfuerzo(response.data.data)
        })

    const { data, error, isLoading } = useSWR(`/api/esfuerzos/${id}`, fetcher)

    const fetcherestrati = () => clienteAxios(`/api/estratificaciones/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(function (response) {
            setEstratificacion(response.data.data)
        })

    const expedientesMed = esfuerzo.concat(estratificacion);

    const { dataest, errorest, isLoadingest } = useSWR(`/api/estratificaciones/${id}`, fetcherestrati)

    const fetcherclinico = () => clienteAxios(`/api/clinicos/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(function (response) {
            setClinicos(response.data.data)
        })

    const expedientesInt = expedientesMed.concat(clinicos);

    const { dataecli, errorcli, isLoadingcli } = useSWR(`/api/clinicos/${id}`, fetcherclinico)

    const fetcherReporte = () => clienteAxios.get(`/api/reportes/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(function (response) {
            setReportes(response.data.data)
        })

        const expedientesRep = expedientesInt.concat(reportes);    

    const { dataerep, errorrep, isLoadingrep } = useSWR(`/api/reportes/${id}`, fetcherReporte)

    const fetcherNutricional = () => clienteAxios.get(`/api/nutricional/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(function (response) {
            setNutricional(response.data.data)
        })

        const expedientesNutri = expedientesRep.concat(nutricional);    

    const { datanutri, errornutri, isLoadingNutri} = useSWR(`/api/nutricional/${id}`, fetcherNutricional)


    const fetcherPsico = () => clienteAxios.get(`/api/psicologico/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(function (response) {
            setPsicologico(response.data.data)
        })

        const expedientesPsico = expedientesNutri.concat(psicologico);    

    const { dataPsico, errorPsico, isLoadingPsico} = useSWR(`/api/psicologico/${id}`, fetcherPsico)

    const fetcherNotasFisiologicas = () => clienteAxios.get(`/api/fisio/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(response => {
        setFisiologico(response.data);
    });

    const expedientes = expedientesPsico.concat(fisiologico)
    
    const { dataNotas, errorNotas, isLoadingNotas } = useSWR(`/api/fisio/${id}`, fetcherNotasFisiologicas);

    const [paciente, setPaciente] = useState({
        id:null,
        nombre: '',
        apellidoPat: '',
        apellidoMat: '',
        telefono: '',
        email: '',
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

    const onDelete = expediente => {
        Swal.fire({
          title: "¿Quieres borrarlo?",
          text: "No podras revertir este cambio",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Eliminar",
          cancelButtonText: "Cancelar"
        }).then((result) => {
          if (result.isConfirmed) {
            const esfuerzo = `/api/esfu/${expediente.id}`;
            const estrati = `/api/estra/${expediente.id}`;
            const clinico = `/api/clini/${expediente.id}`;
            const reporte = `/api/final/${expediente.id}`;
            const psicologico = `/api/psicolo/${expediente.id}`;
            const nutricional = `/api/nutriolo/${expediente.id}`;
            const fisio = `/api/fisio/${expediente.id}`;

            const url = expediente.tipo_exp === 1 ? esfuerzo : 
            expediente.tipo_exp === 2 ? estrati : 
            expediente.tipo_exp === 3? clinico :  
            expediente.tipo_exp === 5? psicologico:  
            expediente.tipo_exp === 6? nutricional: 
            expediente.tipo_exp === 7? fisio: reporte ;
            
        try {
          clienteAxios.delete(url,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }).then( function (response) {
          setTimeout(function() {
            window.location.reload();
          }, 1500);
          Swal.fire({
            title: "Elimnado!",
            text: "Eliminado con éxito",
            icon: "success",
            timer: 1500
          });})
          } catch (error) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Ocurrio un error!",
            });
          }
          }
        });
      }

    
    
    const imprimirExpediente = expediente => {

        const esfuerzo = `/api/esfuerzo/imprimir/${expediente.id}`;
        const estrati = `/api/estratificacion/imprimir/${expediente.id}`;
        const clinico = `/api/clinico/imprimir/${expediente.id}`;
        const reporte = `/api/reporte/imprimir/${expediente.id}`;
        const nutricional = `/api/nutri/imprimir/${expediente.id}`;
        const psicologico = `/api/psico/imprimir/${expediente.id}`;
        const url = expediente.tipo_exp === 1 ? esfuerzo : expediente.tipo_exp === 2 ? estrati : expediente.tipo_exp === 3? clinico: expediente.tipo_exp === 5? psicologico: expediente.tipo_exp === 6? nutricional: reporte;

            try {
                clienteAxios.get(url, { 
                  responseType: 'arraybuffer' ,
                  headers:{
                  Authorization: `Bearer ${token}`
              }}).then(function (response) {
                    
                    const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
                    const url = URL.createObjectURL(pdfBlob);
                    window.open(url);
                  })
            } catch (error) {
                setErrores(Object.values(error.response.data.errors) )
            }

    }

    const imprimirPdf = expediente => {
        try {
            clienteAxios.get(`/api/fisio/${expediente.id}/imprimir`, { 
              responseType: 'arraybuffer' ,
              headers:{
              Authorization: `Bearer ${token}`
          }}).then(function (response) {
                
                const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
                const url = URL.createObjectURL(pdfBlob);
                window.open(url);
              })
        } catch (error) {
            setErrores(Object.values(error.response.data.errors) )
        }

    }

    const handleRedirect = id => {
        navigate(`/paciente/edit/${id}`)
    }

    const handleCompare = id => {
        navigate(`/compare/${id}`)
    }
    const handleClickModal= () => {
        setModal(!modal)
      }
    
  return (
    <>
    <Header titulo ={`Paciente : ${paciente.nombre} ${paciente.apellidoPat}`}/>
    <div>
              <div className='flex justify-between'>
                  <h1 className='text-2xl md:text-xl font-bold mt-4'>Información General</h1>
                  <button className="bg-yellow-500 hover:bg-yellow-600 text-white mb-5 p-3 uppercase font-bold cursor-pointer rounded-lg"
                            onClick={ev => handleRedirect(paciente.id)}>
                        Editar
                  </button>
              </div>
        <div className=" mt-5 px-5 py-10">
            <form action="" className='grid lg:grid-cols-3 grid-cols-1 gap-2'>
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
                        disabled
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
                        disabled
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
                        disabled
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
                        disabled
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
                        disabled
                    />
                </div>
                <div className="mb-4">
                    <label 
                    htmlFor="email"
                    className="text-slate-800"
                    >
                        Correo:
                    </label>
                    <input 
                        type="email"
                        id="email"
                        className="mt-2 w-full p-3 bg-gray-50" 
                        name="email"
                        value={paciente.email}
                        disabled
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
                        disabled
                    />
                </div>

                <div className="mb-4">
                <label 
                    htmlFor="genero"
                    className="text-slate-800"
                    >
                        Género:
                    </label>
                    <select id="genero" name="genero" className='mt-2 w-full p-3' value={paciente.genero}  disabled>
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
                    <select id="estadoCivil" name="estadoCivil" className='mt-2 w-full p-3' value={paciente.estadoCivil} disabled>
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
                        disabled
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
                        disabled
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
                        disabled
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
                        disabled
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
                        disabled
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
                        disabled
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
                        disabled
                    />
                </div>
            </form>
        </div>
        <div className='flex justify-between'>
                  <h1 className='text-2xl md:text-xl font-bold mt-4'>Expedientes</h1>
                  <div className='flex gap-2 '>
                  <button className="bg-purple-500 hover:bg-purple-600 text-white mb-5 p-3 uppercase font-bold cursor-pointer rounded-lg"
                            onClick={ev => handleCompare(paciente.id)}>
                        Comparar expedientes
                  </button>
                  <button className="bg-blue-500 hover:bg-blue-600 text-white mb-5 p-3 uppercase font-bold cursor-pointer rounded-lg"
                            onClick={()=> handleClickModal()}>
                        Nuevo Expediente
                  </button>
                  </div>
        </div>
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
                          <td className="border-b-2 border-gray-200 py-4">{(expediente.id)}</td>
                          <td className="border-b-2 border-gray-200">{(() => {
                            if (expediente.tipo_exp === 1) {return 'Prueba de esfuerzo';} 
                            else if(expediente.tipo_exp === 2) {return 'Estratificación';}
                            else if(expediente.tipo_exp === 3) {return'Expediente Clínico'}
                            else if(expediente.tipo_exp === 5) {return'Nota Psicológica'}
                            else if(expediente.tipo_exp === 6) {return'Nota Nutricional'}
                            else if(expediente.tipo_exp === 7) {return'Nota Fisiológica'}
                            else {return 'Reporte Final'}})()}</td>
                          <td className="border-b-2 border-gray-200">{(expediente.tipo_exp===1 || expediente.tipo_exp===3)?expediente.fecha:(expediente.tipo_exp===2)?expediente.estrati_fecha: new Date(expediente.created_at).toISOString().split("T")[0]}</td>
                          <td className="flex items-center justify-between border-b-2 border-gray-200 py-5">
                          {(() => {
                            if (expediente.tipo_exp === 1) {return <Link to={'/prueba/'+ expediente.id}> <FaEdit className="action-icon edit hover:text-yellow-400" /></Link>;} 
                            else if(expediente.tipo_exp === 2) {return <Link to={'/estrati/'+ expediente.id}> <FaEdit className="action-icon edit hover:text-yellow-400" /></Link>;}
                            else if(expediente.tipo_exp === 3) {return <Link to={'/clinico/'+ expediente.id}> <FaEdit className="action-icon edit hover:text-yellow-400" /></Link>} 
                            else if(expediente.tipo_exp === 4) {return <FaEdit className="text-white" /> }
                            else if(expediente.tipo_exp === 5) {return <Link to={'/psico/'+ expediente.id}> <FaEdit className="action-icon edit hover:text-yellow-400" /></Link>}
                            else if(expediente.tipo_exp === 6) {return <Link to={'/nutri/'+ expediente.id}> <FaEdit className="action-icon edit hover:text-yellow-400" /></Link>}
                            else if(expediente.tipo_exp === 7) {return <FaEdit className="text-white" /> }
                            })()}
                            {(() => {
                            if (expediente.tipo_exp === 7) {return <FaEye className='hover:text-purple-400' onClick={ev => imprimirPdf(expediente)}/>} 
                            else {return  <FaEye className='hover:text-purple-400' onClick={ev => imprimirExpediente(expediente)}/>}
                            })()}
                          {(() => {
                            if (expediente.tipo_exp === 1) {return <Link to={'/prueba/imprimir/'+ expediente.id}> <FaPrint className="action-icon edit hover:text-blue-400" /></Link>;} 
                            else if(expediente.tipo_exp === 2) {return <Link to={'/estrati/imprimir/'+ expediente.id}> <FaPrint className="action-icon edit hover:text-blue-400" /></Link>;}
                            else if(expediente.tipo_exp === 3) {return <Link to={'/clinico/imprimir/'+ expediente.id}> <FaPrint className="action-icon edit hover:text-blue-400" /></Link>}
                            else if(expediente.tipo_exp === 4) {return <FaPrint className="action-icon edit hover:text-blue-400" onClick={ev => imprimirExpediente(expediente)} /> }
                            else if(expediente.tipo_exp === 5) {return <Link to={'/psico/imprimir/'+ expediente.id}> <FaPrint className="action-icon edit hover:text-blue-400" /></Link>}
                            else if(expediente.tipo_exp === 6) {return <Link to={'/nutri/imprimir/'+ expediente.id}> <FaPrint className="action-icon edit hover:text-blue-400" /></Link>}
                            else if(expediente.tipo_exp === 7) {return <FaPrint className="action-icon edit hover:text-blue-400" onClick={ev => imprimirPdf(expediente)} />}
                            })()}
                            <a onClick={ev => onDelete(expediente)} > <FaRegTrashCan className="action-icon delete hover:text-red-700" /> </a>
                          </td>
                      </tr>
                  ))}
              </tbody>
          </table>
          {(() => {if (expedientes === null || expedientes.length==0) {return <h2 className='text-center mt-5 font-semibold'>No hay expedientes para este paciente.</h2>}})()}
        </div>
    </div>
    {modal && 
    (
        <Modal open={modal} onClose={handleClickModal}>
            <ModalExpediente paciente={paciente}/>
        </Modal>
    )}
    </>
  )
}
