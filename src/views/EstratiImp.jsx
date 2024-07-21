import React, { useEffect } from 'react'
import Header from '../components/Header'
import { usevalue, useState } from 'react'
import clienteAxios from '../axios-client';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';


export default function EstratiImp() {
    const token = localStorage.getItem('AUTH_TOKEN')
    const {id} = useParams()
    const [errores, setErrores] = useState(null)
    const [expediente, setExpediente] = useState([])
    const [paciente, setPaciente] = useState([])

    if(id) {
        useEffect(() => {
            clienteAxios.get(`/api/estratificacion/${id}`,{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            .then(({data}) => {
                setExpediente(data)

                return clienteAxios.get(`/api/pacientes/${data.paciente_id}`,{headers:{Authorization: `Bearer ${token}`}})
            })
            .then(({data}) => {
                setPaciente(data);
            })
            .catch(error => {
                throw Error('Error en las solicitudes:', error);
            });
        }, [])
    }

    const onSubmit = (e) => {
        e.preventDefault()
            try {
                clienteAxios.get(`/api/estratificacion/imprimir/${expediente.id}`, { 
                    responseType: 'arraybuffer',
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


  return (
    <>
    <Header titulo ="Imprimir Estratificación"/>
    <div className="">
    <div className=" mt-5 px-5 py-10 grid lg:grid-cols-3 grid-cols-1 gap-2" >
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
                        onChange={ev => setPaciente({...paciente,genero: ev.target.value})}
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
                        <option value="masculino">Masculino</option>
                        <option value="femenino">Femenino</option>
                        <option value="otro">Otro</option>
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
        </div>
            <form action="" onSubmit={onSubmit}>
                        <div className='grid lg:grid-cols-4 grid-cols-1 mt-5 px-5 py-10 gap-2'>
                            <div className="mb-4">
                                <label
                                    htmlFor="rhc_1_fecha"
                                    className="text-slate-800"
                                >
                                    1vez RHC:
                                </label>
                                <input
                                    type="date"
                                    id="rhc_1_fecha"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="rhc_1_fecha"
                                    value={expediente.primeravez_rhc}
                                    disabled
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="pe_fecha"
                                    className="text-slate-800"
                                >
                                    PE:
                                </label>
                                <input
                                    type="date"
                                    id="pe_fecha"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="pe_fecha"
                                    value={expediente.pe_fecha}
                                    disabled
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="estratificacion"
                                    className="text-slate-800"
                                >
                                    Estratificacion:
                                </label>
                                <input
                                    type="date"
                                    id="estratificacion"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="estratificacion"
                                    value={expediente.estrati_fecha}
                                    disabled
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="c_isquemia"
                                    className="text-slate-800"
                                >
                                    C. Isquémica:
                                </label>
                                <select id="c_isquemia" name="c_isquemia" className='mt-2 w-full p-3' value={expediente.c_isquemia} disabled>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="im"
                                    className="text-slate-800"
                                >
                                    IM:
                                </label>
                                <select id="im" name="im" className='mt-2 w-full p-3' value={expediente.im===1?"true":"false"} disabled>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="ima"
                                    className="text-slate-800"
                                >
                                    IMA:
                                </label>
                                <select id="ima" name="ima" className='mt-2 w-full p-3' value={expediente.ima===1?"true":"false"} disabled>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="imas"
                                    className="text-slate-800"
                                >
                                    IMAS:
                                </label>
                                <select id="imas" name="imas" className='mt-2 w-full p-3' value={expediente.imas===1?"true":"false"} disabled>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="imaa"
                                    className="text-slate-800"
                                >
                                    IMAA:
                                </label>
                                <select id="imaa" name="imaa" className='mt-2 w-full p-3' value={expediente.imaa===1?"true":"false"} disabled>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="imal"
                                    className="text-slate-800"
                                >
                                    IMAL:
                                </label>
                                <select id="imaa" name="imaa" className='mt-2 w-full p-3' value={expediente.imal===1?"true":"false"} disabled>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="imae"
                                    className="text-slate-800"
                                >
                                    IMAE:
                                </label>
                                <select id="imae" name="imae" className='mt-2 w-full p-3' value={expediente.imae===1?"true":"false"} disabled>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="im_inf"
                                    className="text-slate-800"
                                >
                                    IMInf:
                                </label>
                                <select id="im_inf" name="im_inf" className='mt-2 w-full p-3' value={expediente.iminf===1?"true":"false"} disabled>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="impi"
                                    className="text-slate-800"
                                >
                                    IMPI:
                                </label>
                                <select id="impi" name="impi" className='mt-2 w-full p-3' value={expediente.impi===1?"true":"false"} disabled>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="impi_vd"
                                    className="text-slate-800"
                                >
                                    IMPI+VD:
                                </label>
                                <select id="impi_vd" name="impi_vd" className='mt-2 w-full p-3' value={expediente.impi_vd===1?"true":"false"} disabled>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="imlat"
                                    className="text-slate-800"
                                >
                                    IMLat:
                                </label>
                                <select id="imlat" name="imlat" className='mt-2 w-full p-3' value={expediente.imlat===1?"true":"false"} disabled>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="imsesst"
                                    className="text-slate-800"
                                >
                                    IMSESST:
                                </label>
                                <select id="imsesst" name="imsesst" className='mt-2 w-full p-3' value={expediente.imsesst===1?"true":"false"} disabled>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="imcomplicado"
                                    className="text-slate-800"
                                >
                                    IMComplicado:
                                </label>
                                <select id="imcomplicado" name="imcomplicado" className='mt-2 w-full p-3' value={expediente.imComplicado===1?"true":"false"} disabled>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="valvular"
                                    className="text-slate-800"
                                >
                                    Valvular:
                                </label>
                                <select id="valvular" name="valvular" className='mt-2 w-full p-3' value={expediente.valvular} disabled>
                                    <option value="ao_l">Ao(I)</option>
                                    <option value="ao_est">Ao(Est)</option>
                                    <option value="mitr_l">Mitr(I)</option>
                                    <option value="mitr_est">Mitr(Est)</option>
                                    <option value="pulm_l">Pulm(I)</option>
                                    <option value="pulm_est">Pulm(Est)</option>
                                    <option value="tric_l">Tric(I)</option>
                                    <option value="tric_est">Tric(Est)</option>
                                    <option value="otro">Otro</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="otro"
                                    className="text-slate-800"
                                >
                                    otro:
                                </label>
                                <select id="otro" name="otro" className='mt-2 w-full p-3' value={expediente.otro===1?"true":"false"} disabled>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="mcd"
                                    className="text-slate-800"
                                >
                                    MCD:
                                </label>
                                <select id="mcd" name="mcd" className='mt-2 w-full p-3' value={expediente.mcd===1?"true":"false"} disabled>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="icc"
                                    className="text-slate-800"
                                >
                                    ICC:
                                </label>
                                <select id="icc" name="icc" className='mt-2 w-full p-3' value={expediente.icc===1?"true":"false"} disabled>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="reanimacion"
                                    className="text-slate-800"
                                >
                                    Reanimacion:
                                </label>
                                <select id="reanimacion" name="reanimacion" className='mt-2 w-full p-3' value={expediente.reanimacion_cardio===1?"true":"false"} disabled>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="fallaEntrenar"
                                    className="text-slate-800"
                                >
                                    Falla para entrenar:
                                </label>
                                <select id="fallaEntrenar" name="fallaEntrenar" className='mt-2 w-full p-3' value={expediente.falla_entrenar===1?"true":"false"} disabled>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="tabaquismo"
                                    className="text-slate-800"
                                >
                                    Tabaquismo:
                                </label>
                                <select id="tabaquismo" name="tabaquismo" className='mt-2 w-full p-3' value={expediente.tabaquismo===1?"true":"false"} disabled>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="dislipidemia"
                                    className="text-slate-800"
                                >
                                    Dislipidemia:
                                </label>
                                <select id="dislipidemia" name="dislipidemia" className='mt-2 w-full p-3' value={expediente.dislipidemia===1?"true":"false"} disabled>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="dm"
                                    className="text-slate-800"
                                >
                                    DM:
                                </label>
                                <select id="dm" name="dm" className='mt-2 w-full p-3' value={expediente.dm===1?"true":"false"} disabled>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="has"
                                    className="text-slate-800"
                                >
                                    HAS:
                                </label>
                                <select id="has" name="has" className='mt-2 w-full p-3' value={expediente.has===1?"true":"false"} disabled>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="obesidad"
                                    className="text-slate-800"
                                >
                                    Obesidad:
                                </label>
                                <select id="obesidad" name="obesidad" className='mt-2 w-full p-3' value={expediente.obesidad===1?"true":"false"} disabled>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="estres"
                                    className="text-slate-800"
                                >
                                    Estrés:
                                </label>
                                <select id="estres" name="estres" className='mt-2 w-full p-3' value={expediente.estres===1?"true":"false"} disabled>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="sedentarismo"
                                    className="text-slate-800"
                                >
                                    Sedentarismo:
                                </label>
                                <select id="sedentarismo" name="sedentarismo" className='mt-2 w-full p-3' value={expediente.sedentarismo===1?"true":"false"} disabled>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="otro_factor"
                                    className="text-slate-800"
                                >
                                    Otro Factor:
                                </label>
                                <select id="otro_factor" name="otro_factor" className='mt-2 w-full p-3' value={expediente.riesgo_otro===1?"true":"false"}disabled>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="depresion"
                                    className="text-slate-800"
                                >
                                    Depresión:
                                </label>
                                <select id="depresion" name="depresion" className='mt-2 w-full p-3' value={expediente.depresion===1?"true":"false"} disabled>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="ansiedad"
                                    className="text-slate-800"
                                >
                                    Ansiedad:
                                </label>
                                <select id="ansiedad" name="ansiedad" className='mt-2 w-full p-3' value={expediente.ansiedad===1?"true":"false"} disabled>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="sintomatologia"
                                    className="text-slate-800"
                                >
                                    Sintomatología:
                                </label>
                                <select id="sintomatologia" name="sintomatologia" className='mt-2 w-full p-3' value={expediente.sintomatologia} disabled>
                                    <option value="bajo">Bajo</option>
                                    <option value="medio">Medio</option>
                                    <option value="alto">Alto</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="puntuacionAtp"
                                    className="text-slate-800"
                                >
                                    Puntuación ATP2000:
                                </label>
                                <input
                                    type="number"
                                    id="puntuacionAtp"
                                    step="0.01"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="puntuacionAtp"
                                    value={expediente.puntuacion_atp2000}
                                    disabled
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="heartScore"
                                    className="text-slate-800"
                                >
                                    Heart Score:
                                </label>
                                <input
                                    type="number"
                                    id="heartScore"
                                    step="0.01"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="heartScore"
                                    value={expediente.heart_score}
                                    disabled
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="colTotal"
                                    className="text-slate-800"
                                >
                                    Col Total:
                                </label>
                                <input
                                    type="number"
                                    id="colTotal"
                                    step="0.01"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="colTotal"
                                    value={expediente.col_total}
                                    disabled
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="ldl"
                                    className="text-slate-800"
                                >
                                    LDL:
                                </label>
                                <input
                                    type="number"
                                    id="ldl"
                                    step="0.01"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="ldl"
                                    value={expediente.ldl}
                                    disabled
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="hdl"
                                    className="text-slate-800"
                                >
                                    HDL:
                                </label>
                                <input
                                    type="number"
                                    id="hdl"
                                    step="0.01"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="hdl"
                                    value={expediente.hdl}
                                    disabled
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="tg"
                                    className="text-slate-800"
                                >
                                    Tg:
                                </label>
                                <input
                                    type="number"
                                    id="tg"
                                    step="0.01"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="tg"
                                    value={expediente.tg}
                                    disabled
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="fevi"
                                    className="text-slate-800"
                                >
                                    FEVI:
                                </label>
                                <input
                                    type="number"
                                    id="fevi"
                                    step="0.01"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="fevi"
                                    value={expediente.fevi}
                                    disabled
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="pcr"
                                    className="text-slate-800"
                                >
                                    PCR:
                                </label>
                                <input
                                    type="number"
                                    id="pcr"
                                    step="0.01"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="pcr"
                                    value={expediente.pcr}
                                    disabled
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="enfCoronaria"
                                    className="text-slate-800"
                                >
                                    Enf Coronaria:
                                </label>
                                <select id="enfCoronaria" name="enfCoronaria" className='mt-2 w-full p-3' value={expediente.enf_coronaria} disabled>
                                    <option value="bajo">Bajo</option>
                                    <option value="medio">Medio</option>
                                    <option value="alto">Alto</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="isquemia"
                                    className="text-slate-800"
                                >
                                    Insquemia MN:
                                </label>
                                <select id="isquemia" name="isquemia" className='mt-2 w-full p-3' value={expediente.isquemia} disabled>
                                    <option value="bajo">Bajo</option>
                                    <option value="medio">Medio</option>
                                    <option value="alto">Alto</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="holter"
                                    className="text-slate-800"
                                >
                                    Holter:
                                </label>
                                <select id="holter" name="holter" className='mt-2 w-full p-3' value={expediente.holter} disabled>
                                    <option value="bajo">Bajo</option>
                                    <option value="medio">Medio</option>
                                    <option value="alto">Alto</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="capacidadPe"
                                    className="text-slate-800"
                                >
                                    Capacidad para PE:
                                </label>
                                <select id="capacidadPe" name="capacidadPe" className='mt-2 w-full p-3' value={expediente.pe_capacidad===1?"true":"false"} disabled>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="fc_basal"
                                    className="text-slate-800"
                                >
                                    FC Basal:
                                </label>
                                <input
                                    type="number"
                                    id="fc_basal"
                                    step="0.01"
                                    className="mt-2 w-full p-3 bg-gray-50 "
                                    name="fc_basal"
                                    value={expediente.fc_basal}
                                    disabled
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="fc_max"
                                    className="text-slate-800"
                                >
                                    FC Max:
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    id="fc_max"
                                    className="mt-2 w-full p-3 bg-gray-50 "
                                    name="fc_max"
                                    value={expediente.fc_maxima}
                                    disabled
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="fc_borg_12"
                                    className="text-slate-800"
                                >
                                    FC Borg 12:
                                </label>
                                <input
                                    type="number"
                                    id="fc_borg_12"
                                    className="mt-2 w-full p-3 bg-gray-50 "
                                    name="fc_borg_12"
                                    step="0.01"
                                    value={expediente.fc_borg_12}
                                    disabled
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="dp_borg_12"
                                    className="text-slate-800"
                                >
                                    DP Borg 12:
                                </label>
                                <input
                                    type="number"
                                    id="dp_borg_12"
                                    step="0.01"
                                    className="mt-2 w-full p-3 bg-gray-50 "
                                    name="dp_borg_12"
                                    value={expediente.dp_borg_12}
                                    disabled
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="mets_borg_12"
                                    className="text-slate-800"
                                >
                                    Mets Borg 12:
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    id="mets_borg_12"
                                    className="mt-2 w-full p-3 bg-gray-50 "
                                    name="mets_borg_12"
                                    value={expediente.mets_borg_12}
                                    disabled
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="carga_maxima"
                                    className="text-slate-800"
                                >
                                    Carga Max (banda):
                                </label>
                                <input
                                    type="number"
                                    id="carga_maxima"
                                    step="0.01"
                                    className="mt-2 w-full p-3 bg-gray-50 "
                                    name="carga_maxima"
                                    value={expediente.carga_max_bnda}
                                    disabled
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="tolerancia_esfuerzo"
                                    className="text-slate-800"
                                >
                                    Tolerencia Máxima al esfuerzo:
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    id="tolerancia_esfuerzo"
                                    className="mt-2 w-full p-3 bg-gray-50 "
                                    name="tolerancia_esfuerzo"
                                    value={expediente.tolerancia_max_esfuerzo}
                                    disabled
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="respuestaPre"
                                    className="text-slate-800"
                                >
                                    Respuesta presora:
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    id="respuestaPre"
                                    className="mt-2 w-full p-3 bg-gray-50 "
                                    name="respuestaPre"
                                    value={expediente.respuesta_presora}
                                    disabled
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="indiceTa"
                                    className="text-slate-800"
                                >
                                    Indice TA:
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    id="indiceTa"
                                    className="mt-2 w-full p-3 bg-gray-50 "
                                    name="indiceTa"
                                    value={expediente.indice_ta_esf}
                                    disabled
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="porcentajeFC"
                                    className="text-slate-800"
                                >
                                    & de la FC predicha:
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    id="porcentajeFC"
                                    className="mt-2 w-full p-3 bg-gray-50 "
                                    name="porcentajeFC"
                                    value={expediente.porc_fc_pre_alcanzado}
                                    disabled
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="cronotr"
                                    className="text-slate-800"
                                >
                                    R. Cronotr:
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    id="cronotr"
                                    className="mt-2 w-full p-3 bg-gray-50 "
                                    name="cronotr"
                                    value={expediente.r_cronotr}
                                    disabled
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="poderCardiaco"
                                    className="text-slate-800"
                                >
                                    Poder cardiaco:
                                </label>
                                <input
                                    type="number"
                                    id="poderCardiaco"
                                    step="0.01"
                                    className="mt-2 w-full p-3 bg-gray-50 "
                                    name="poderCardiaco"
                                    value={expediente.poder_cardiaco}
                                    disabled
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="recuperacionTas"
                                    className="text-slate-800"
                                >
                                    Recuperacion TAS:
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    id="recuperacionTas"
                                    className="mt-2 w-full p-3 bg-gray-50 "
                                    name="recuperacionTas"
                                    value={expediente.recuperacion_tas}
                                    disabled
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="recuperacionFc"
                                    className="text-slate-800"
                                >
                                    Recuperacion FC:
                                </label>
                                <input
                                    type="number"
                                    id="recuperacionFc"
                                    step="0.01"
                                    className="mt-2 w-full p-3 bg-gray-50 "
                                    name="recuperacionFc"
                                    value={expediente.recuperacion_fc}
                                    disabled
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="duke"
                                    className="text-slate-800"
                                >
                                    Duke:
                                </label>
                                <input
                                    type="number"
                                    id="duke"
                                    step="0.01"
                                    className="mt-2 w-full p-3 bg-gray-50 "
                                    name="duke"
                                    value={expediente.duke}
                                    disabled
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="veteranos"
                                    className="text-slate-800"
                                >
                                    Veteranos:
                                </label>
                                <input
                                    type="number"
                                    id="veteranos"
                                    step="0.01"
                                    className="mt-2 w-full p-3 bg-gray-50 "
                                    name="veteranos"
                                    value={expediente.veteranos}
                                    disabled
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="ectopiaVen"
                                    className="text-slate-800"
                                >
                                    Ectopia ventricular frecuente:
                                </label>
                                <select id="ectopiaVen" name="ectopiaVen" className='mt-2 w-full p-3' value={expediente.ectopia_ventricular===1?"true":"false"} disabled>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="umbraIsque"
                                    className="text-slate-800"
                                >
                                    Umbral isquémico:
                                </label>
                                <select id="umbraIsque" name="umbraIsque" className='mt-2 w-full p-3' value={expediente.umbral_isquemico===1?"true":"false"} disabled>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="supradesnivel"
                                    className="text-slate-800"
                                >
                                    Supradesnivel ST:
                                </label>
                                <select id="supradesnivel" name="supradesnivel" className='mt-2 w-full p-3' value={expediente.supranivel_st===1?"true":"false"} disabled>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="infra135"
                                    className="text-slate-800"
                                >
                                    InfraST &gt;  2mm:
                                </label>
                                <select id="infra135" name="infra135" className='mt-2 w-full p-3' value={expediente.infra_st_mayor2_135} disabled>
                                    <option value="false">No</option>
                                    <option value="m_135">mayor 135 lpm</option>
                                    <option value="me_135">menor 135 lpm</option>
                                </select>
                            </div>

                            <div className="mb-4">
                                <label
                                    htmlFor="infra5"
                                    className="text-slate-800"
                                >
                                    InfraST &gt;  2mm:
                                </label>
                                <select id="infra5" name="infra5" className='mt-2 w-full p-3' value={expediente.infra_st_mayor2_5mets} disabled>
                                    <option value="false">No</option>
                                    <option value="m_5">mayor 5 mets</option>
                                    <option value="me_5">menor 5 mets</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="riesgoGlobal"
                                    className="text-slate-800"
                                >
                                    Riesgo global:
                                </label>
                                <select id="riesgoGlobal" name="riesgoGlobal" className='mt-2 w-full p-3' value={expediente.riesgo_global} disabled>
                                    <option value="bajo">Bajo</option>
                                    <option value="medio">Medio</option>
                                    <option value="alto">Alto</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="grupo"
                                    className="text-slate-800"
                                >
                                    Grupo:
                                </label>
                                <select id="grupo" name="grupo" className='mt-2 w-full p-3' value={expediente.grupo} disabled>
                                    <option value="a">A</option>
                                    <option value="b">B</option>
                                    <option value="c">C</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="semanas"
                                    className="text-slate-800"
                                >
                                    Semanas:
                                </label>
                                <select id="semanas" name="semanas" className='mt-2 w-full p-3' value={expediente.semanas} disabled>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="4">4</option>
                                    <option value="6">6</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="borg"
                                    className="text-slate-800"
                                >
                                    Borg:
                                </label>
                                <select id="borg" name="borg" className='mt-2 w-full p-3' value={expediente.borg} disabled>
                                    <option value="8">8</option>
                                    <option value="10">10</option>
                                    <option value="12">12</option>
                                    <option value="14">14</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="fcDiana"
                                    className="text-slate-800"
                                >
                                    Fc Diana:
                                </label>
                                <select id="fcDiana" name="fcDiana" className='mt-2 w-full p-3' value={expediente.fc_diana_str} disabled>
                                    <option value="Bo">Bo</option>
                                    <option value="K">K</option>
                                    <option value="BI">BI</option>
                                    <option value="N">N</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="dpDiana"
                                    className="text-slate-800"
                                >
                                    Dp Diana:
                                </label>
                                <input
                                    type="number"
                                    id="dpDiana"
                                    step="0.01"
                                    className="mt-2 w-full p-3 bg-gray-50 "
                                    name="dpDiana"
                                    value={expediente.dp_diana}
                                    disabled
                                />
                            </div>
                            <div className="mb-4 col-start-1 lg:col-end-5">
                                <label
                                    htmlFor="comentarios"
                                    className="text-slate-800"
                                >
                                    Comentarios:
                                </label>
                                <input
                                    type="text"
                                    id="comentarios"
                                    className="mt-2 w-full p-3 bg-gray-50 "
                                    name="comentarios"
                                    value={expediente.comentarios}
                                    disabled
                                />
                            </div>
                            


                        </div>
                        <div className='flex justify-end'>
                            <input
                                type="submit"
                                value="Imprimir"
                                className="bg-blue-500 hover:bg-blue-600 text-white m-5 p-3 uppercase font-bold cursor-pointer"
                            />
                              <Link className="bg-red-500 hover:bg-red-600 text-white m-5 p-3 uppercase font-bold cursor-pointer" to="/dashboard"> Cancelar</Link>
                    </div>
            </form>
        </div>
    </>
  )
}
