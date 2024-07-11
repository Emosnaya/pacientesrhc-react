import React, { useEffect } from 'react'
import Header from '../components/Header'
import { usevalue, useState } from 'react'
import clienteAxios from '../axios-client';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';


export default function ImpClinico() {
    const token = localStorage.getItem('AUTH_TOKEN')
    const {id} = useParams()
    const [errores, setErrores] = useState(null)
    const [expediente, setExpediente] = useState([])
    const [paciente, setPaciente] = useState([])

    if(id) {
        useEffect(() => {
            clienteAxios.get(`/api/clinico/${id}`,{
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
            try {
                clienteAxios.get(`/api/clinico/imprimir/${expediente.id}`, { 
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

  return (
    <>
    <Header titulo ="Imprimir Expediente Clínico"/>
    <div className="">
    <h2 className='text-3xl font-bold mt-8'>Paciente</h2>
    <div className=" px-5 py-10 grid lg:grid-cols-3 grid-cols-1 gap-2" >
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
                    <select id="genero" name="genero" className='mt-2 w-full p-3' value={paciente.genero} disabled>
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
        </div>
            <form action="" onSubmit={onSubmit}>
                        <div className='grid lg:grid-cols-4 grid-cols-1 mt-5 px-5 py-10 gap-2'>
                            <div className="mb-4">
                                <label
                                    htmlFor="fecha"
                                    className="text-slate-800"
                                >
                                    Fecha:
                                </label>
                                <input
                                    type="date"
                                    id="fecha"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="fecha"
                                    value={expediente.fecha}
                                    onChange={ev => setExpediente({...expediente,fecha: ev.target.value})}
                                    
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="fecha_1vez"
                                    className="text-slate-800"
                                >
                                    Fecha 1vez:
                                </label>
                                <input
                                    type="date"
                                    id="fecha_1vez"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="fecha_1vez"
                                    value={expediente.fecha_1vez}
                                    onChange={ev => setExpediente({...expediente,fecha_1vez: ev.target.value})}
                                    
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="hora"
                                    className="text-slate-800"
                                >
                                    Hora:
                                </label>
                                <input
                                    type="time"
                                    id="hora"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="hora"
                                    value={expediente.hora}
                                    onChange={ev => setExpediente({...expediente,hora: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="im_complicado"
                                    className="text-slate-800"
                                >
                                    IM Complicado:
                                </label>
                                <select id="im_complicado" name="im_complicado" className='mt-2 w-full p-3' value={expediente.im_complicado===1 ||expediente.im_complicado ==="true"?"true":"false"} onChange={ev => setExpediente({...expediente,im_complicado: ev.target.value})}>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="im_anterior"
                                    className="text-slate-800"
                                >
                                    IM Anterior:
                                </label>
                                <input
                                    type="date"
                                    id="im_anterior"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="im_anterior"
                                    value={expediente.imAnterior}
                                    onChange={ev => setExpediente({...expediente,imAnterior: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="im_septal"
                                    className="text-slate-800"
                                >
                                    IM Septal:
                                </label>
                                <input
                                    type="date"
                                    id="im_septal"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="im_septal"
                                    value={expediente.imSeptal}
                                    onChange={ev => setExpediente({...expediente,imSeptal: ev.target.value})}
                                    
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="im_apical"
                                    className="text-slate-800"
                                >
                                    IM Apical:
                                </label>
                                <input
                                    type="date"
                                    id="im_apical"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="im_apical"
                                    value={expediente.imApical}
                                    onChange={ev => setExpediente({...expediente,imApical: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="im_lateral"
                                    className="text-slate-800"
                                >
                                    IM Lateral:
                                </label>
                                <input
                                    type="date"
                                    id="im_lateral"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="im_lateral"
                                    value={expediente.imLateral}
                                    onChange={ev => setExpediente({...expediente,imLateral: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="im_inferior"
                                    className="text-slate-800"
                                >
                                    IM Inferior:
                                </label>
                                <input
                                    type="date"
                                    id="im_inferior"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="im_inferior"
                                    value={expediente.imInferior}
                                    onChange={ev => setExpediente({...expediente,imInferior: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="im_delvd"
                                    className="text-slate-800"
                                >
                                    IM del VD:
                                </label>
                                <input
                                    type="date"
                                    id="im_delvd"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="im_delvd"
                                    value={expediente.imdelVD}
                                    onChange={ev => setExpediente({...expediente,imdelVD: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="angina_inestbale"
                                    className="text-slate-800"
                                >
                                    Angina Inestable:
                                </label>
                                <input
                                    type="date"
                                    id="angina_inestbale"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="angina_inestbale"
                                    value={expediente.anginaInestabale}
                                    onChange={ev => setExpediente({...expediente,anginaInestabale: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="angina_estable"
                                    className="text-slate-800"
                                >
                                    Angina Estable:
                                </label>
                                <input
                                    type="date"
                                    id="angina_estable"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="angina_estable"
                                    value={expediente.anginaEstabale}
                                    onChange={ev => setExpediente({...expediente,anginaEstabale: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="choque_card"
                                    className="text-slate-800"
                                >
                                    Choque Card:
                                </label>
                                <input
                                    type="date"
                                    id="choque_card"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="choque_card"
                                    value={expediente.choque_card}
                                    onChange={ev => setExpediente({...expediente,choque_card: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="m_subita"
                                    className="text-slate-800"
                                >
                                    M. súbita:
                                </label>
                                <input
                                    type="date"
                                    id="m_subita"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="m_subita"
                                    value={expediente.m_subita}
                                    onChange={ev => setExpediente({...expediente,m_subita: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="clase_ccs"
                                    className="text-slate-800"
                                >
                                    Clase F CCS:
                                </label>
                                <select id="clase_ccs" name="clase_ccs" className='mt-2 w-full p-3'  value={expediente.clase_f_ccs===1 ||expediente.clase_f_ccs ==="true"?"true":"false"} onChange={ev => setExpediente({...expediente,clase_f_ccs: ev.target.value})} >
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="falla_cardiaca"
                                    className="text-slate-800"
                                >
                                    Falla Cardiaca:
                                </label>
                                <select id="falla_cardiaca" name="falla_cardiaca" className='mt-2 w-full p-3'  value={expediente.falla_cardiaca===1 ||expediente.falla_cardiaca ==="true"?"true":"false"} onChange={ev => setExpediente({...expediente,falla_cardiaca: ev.target.value})} >
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="sobreviviente_cpr"
                                    className="text-slate-800"
                                >
                                    Sobreviviente CPR:
                                </label>
                                <select id="sobreviviente_cpr" name="sobreviviente_cpr" className='mt-2 w-full p-3' value={expediente.sobreviviente_cpr===1 ||expediente.sobreviviente_cpr ==="true"?"true":"false"} onChange={ev => setExpediente({...expediente,sobreviviente_cpr: ev.target.value})}>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="incapacidad_entrenar"
                                    className="text-slate-800"
                                >
                                    Incapacidad Entrenar:
                                </label>
                                <select id="incapacidad_entrenar" name="incapacidad_entrenar" className='mt-2 w-full p-3' value={expediente.incapacidad_entrenar===1 ||expediente.incapacidad_entrenar ==="true"?"true":"false"} onChange={ev => setExpediente({...expediente,incapacidad_entrenar: ev.target.value})} >
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="cf_nyha"
                                    className="text-slate-800"
                                >
                                    CF NYHA:
                                </label>
                                <select id="cf_nyha" name="cf_nyha" className='mt-2 w-full p-3' value={expediente.cf_nyha===1 ||expediente.cf_nyha ==="true"?"true":"false"} onChange={ev => setExpediente({...expediente,cf_nyha: ev.target.value})} >
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="crvc"
                                    className="text-slate-800"
                                >
                                    CRVC:
                                </label>
                                <input
                                    type="date"
                                    id="crvc"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="crvc"
                                    value={expediente.crvc}
                                    onChange={ev => setExpediente({...expediente,crvc: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="crvc_hemo"
                                    className="text-slate-800"
                                >
                                    CRVC Hemoductos:
                                </label>
                                <input
                                    type="text"
                                    id="crvc_hemo"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="crvc_hemo"
                                    value={expediente.crvc_hemoductos}
                                    onChange={ev => setExpediente({...expediente,crvc_hemoductos: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="insu_art_per"
                                    className="text-slate-800"
                                >
                                    Insuficiencia Arterial Periférica:
                                </label>
                                <select id="insu_art_per" name="insu_art_per" className='mt-2 w-full p-3' value={expediente.insuficiencia_art_per===1 ||expediente.insuficiencia_art_per ==="true"?"true":"false"} onChange={ev => setExpediente({...expediente,insuficiencia_art_per: ev.target.value})}>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="v_mitral"
                                    className="text-slate-800"
                                >
                                    V. Mitral:
                                </label>
                                <select id="v_mitral" name="v_mitral" className='mt-2 w-full p-3' value={expediente.v_mitral===1 ||expediente.v_mitral ==="true"?"true":"false"} onChange={ev => setExpediente({...expediente,v_mitral: ev.target.value})}>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="v_aortica"
                                    className="text-slate-800"
                                >
                                    V. Aórtica:
                                </label>
                                <select id="v_aortica" name="v_aortica" className='mt-2 w-full p-3' value={expediente.v_aortica===1 ||expediente.v_aortica ==="true"?"true":"false"} onChange={ev => setExpediente({...expediente,v_aortica: ev.target.value})}>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="v_tricuspide"
                                    className="text-slate-800"
                                >
                                    V. Tricúspide:
                                </label>
                                <select id="v_tricuspide" name="v_tricuspide" className='mt-2 w-full p-3' value={expediente.v_tricuspide===1 ||expediente.v_tricuspide ==="true"?"true":"false"} onChange={ev => setExpediente({...expediente,v_tricuspide: ev.target.value})}>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="v_pulmonar"
                                    className="text-slate-800"
                                >
                                    V. Pulmonar:
                                </label>
                                <select id="v_pulmonar" name="v_pulmonar" className='mt-2 w-full p-3' value={expediente.v_pulmonar===1 ||expediente.v_pulmonar ==="true"?"true":"false"} onChange={ev => setExpediente({...expediente,v_pulmonar: ev.target.value})} >
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="congenitos"
                                    className="text-slate-800"
                                >
                                    Congenitos:
                                </label>
                                <select id="congenitos" name="congenitos" className='mt-2 w-full p-3' value={expediente.congenitos===1 ||expediente.congenitos ==="true"?"true":"false"} onChange={ev => setExpediente({...expediente,congenitos: ev.target.value})}>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="estratificacion"
                                    className="text-slate-800"
                                >
                                    Estratificación:
                                </label>
                                <input
                                    type="date"
                                    id="estratificacion"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="estratificacion"
                                    value={expediente.estratificacion}
                                    onChange={ev => setExpediente({...expediente,estratificacion: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="inicio_fase_2"
                                    className="text-slate-800"
                                >
                                    Inicio Fase 2:
                                </label>
                                <input
                                    type="date"
                                    id="inicio_fase_2"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="inicio_fase_2"
                                    value={expediente.inicio_fase_2}
                                    onChange={ev => setExpediente({...expediente,inicio_fase_2: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="fin_fase_2"
                                    className="text-slate-800"
                                >
                                    Fin Fase 2:
                                </label>
                                <input
                                    type="date"
                                    id="fin_fase_2"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="fin_fase_2"
                                    value={expediente.fin_fase_2}
                                    onChange={ev => setExpediente({...expediente,fin_fase_2: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="tabaquismo"
                                    className="text-slate-800"
                                >
                                    Tabaquismo:
                                </label>
                                <select id="tabaquismo" name="tabaquismo" className='mt-2 w-full p-3' value={expediente.tabaquismo===1 ||expediente.tabaquismo ==="true"?"true":"false"} onChange={ev => setExpediente({...expediente,tabaquismo: ev.target.value})}>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="cig_x_dia"
                                    className="text-slate-800"
                                >
                                    Cig por día:
                                </label>
                                <input
                                    type="number"
                                    id="cig_x_dia"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="cig_x_dia"
                                    value={expediente.cig_dia}
                                    onChange={ev => setExpediente({...expediente,cig_dia: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="cig_x_year"
                                    className="text-slate-800"
                                >
                                    Fumó por años:
                                </label>
                                <input
                                    type="number"
                                    id="cig_x_year"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="cig_x_year"
                                    value={expediente.cig_years}
                                    onChange={ev => setExpediente({...expediente,cig_years: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="abadono_cigarro"
                                    className="text-slate-800"
                                >
                                    Abandonó Cigarro:
                                </label>
                                <select id="abadono_cigarro" name="abadono_cigarro" className='mt-2 w-full p-3' value={expediente.cig_abandono===1 ||expediente.cig_abandono ==="true"?"true":"false"} onChange={ev => setExpediente({...expediente,cig_abandono: ev.target.value})}>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="abandono_year"
                                    className="text-slate-800"
                                >
                                    Años abadono:
                                </label>
                                <input
                                    type="number"
                                    id="abandono_year"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="abandono_year"
                                    value={expediente.cig_a\u00f1os_abandono}
                                    onChange={ev => setExpediente({...expediente,cig_a\u00f1os_abandono: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="hipertension_years"
                                    className="text-slate-800"
                                >
                                    Hipertensión (años):
                                </label>
                                <input
                                    type="number"
                                    id="hipertension_years"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="hipertension_years"
                                    value={expediente.hipertension_a\u00f1os}
                                    onChange={ev => setExpediente({...expediente,hipertension_a\u00f1os: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="dm_years"
                                    className="text-slate-800"
                                >
                                    DM (años):
                                </label>
                                <input
                                    type="number"
                                    id="dm_years"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="dm_years"
                                    value={expediente.dm_years}
                                    onChange={ev => setExpediente({...expediente,dm_years: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="actividad_fis"
                                    className="text-slate-800"
                                >
                                    Actividad Física:
                                </label>
                                <select id="actividad_fis" name="actividad_fis" className='mt-2 w-full p-3' value={expediente.actividad_fis===1 ||expediente.actividad_fis ==="true"?"true":"false"} onChange={ev => setExpediente({...expediente,actividad_fis: ev.target.value})}>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="tipo_actividad"
                                    className="text-slate-800"
                                >
                                    Tipo Actividad:
                                </label>
                                <input
                                    type="text"
                                    id="tipo_actividad"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="tipo_actividad"
                                    value={expediente.tipo_actividad}
                                    onChange={ev => setExpediente({...expediente,tipo_actividad: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="actividad_hsm"
                                    className="text-slate-800"
                                >
                                    Actividad HRS/Semana:
                                </label>
                                <input
                                    type="number"
                                    id="actividad_hsm"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="actividad_hsm"
                                    value={expediente.actividad_hrs_smn}
                                    onChange={ev => setExpediente({...expediente,actividad_hrs_smn: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="actividad_years"
                                    className="text-slate-800"
                                >
                                    Actividad Años:
                                </label>
                                <input
                                    type="number"
                                    id="actividad_years"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="actividad_years"
                                    value={expediente.actividad_years}
                                    onChange={ev => setExpediente({...expediente,actividad_years: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="actividad_years_abandono"
                                    className="text-slate-800"
                                >
                                    Actividad Años Abandono:
                                </label>
                                <input
                                    type="number"
                                    id="actividad_years_abandono"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="actividad_years_abandono"
                                    value={expediente.actividad_abadono_years}
                                    onChange={ev => setExpediente({...expediente,actividad_abadono_years: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="estres_years"
                                    className="text-slate-800"
                                >
                                    Estrés Años:
                                </label>
                                <input
                                    type="number"
                                    id="estres_years"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="estres_years"
                                    value={expediente.estres_years}
                                    onChange={ev => setExpediente({...expediente,estres_years: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="ansiedad_years"
                                    className="text-slate-800"
                                >
                                    Ansiedad Años:
                                </label>
                                <input
                                    type="number"
                                    id="ansiedad_years"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="ansiedad_years"
                                    value={expediente.ansiedad_years}
                                    onChange={ev => setExpediente({...expediente,ansiedad_years: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="depresion_years"
                                    className="text-slate-800"
                                >
                                    Depresion Años:
                                </label>
                                <input
                                    type="number"
                                    id="depresion_years"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="depresion_years"
                                    value={expediente.depresion_years}
                                    onChange={ev => setExpediente({...expediente,depresion_years: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="hipercolesterolemia_years"
                                    className="text-slate-800"
                                >
                                    Hipercolesterolemia Años:
                                </label>
                                <input
                                    type="number"
                                    id="hipercolesterolemia_years"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="hipercolesterolemia_years"
                                    value={expediente.hipercolesterolemia_y}
                                    onChange={ev => setExpediente({...expediente,hipercolesterolemia_y: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="hipertrigliceridemia_years"
                                    className="text-slate-800"
                                >
                                    Hipertrigliceridemia Años:
                                </label>
                                <input
                                    type="number"
                                    id="hipertrigliceridemia_years"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="hipertrigliceridemia_years"
                                    value={expediente.hipertrigliceridemia_y}
                                    onChange={ev => setExpediente({...expediente,hipertrigliceridemia_y: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="diabetes_years"
                                    className="text-slate-800"
                                >
                                    Diabetes Años:
                                </label>
                                <input
                                    type="number"
                                    id="diabetes_years"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="diabetes_years"
                                    value={expediente.diabetes_y}
                                    onChange={ev => setExpediente({...expediente,hipertrigliceridemia_y: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="tiempo_ev"
                                    className="text-slate-800"
                                >
                                    Tiempo evolución:
                                </label>
                                <input
                                    type="text"
                                    id="tiempo_ev"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="tiempo_ev"
                                    value={expediente.tiempo_evolucion}
                                    onChange={ev => setExpediente({...expediente,tiempo_evolucion: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="tratamiento"
                                    className="text-slate-800"
                                >
                                    Tratamiento:
                                </label>
                                <input
                                    type="text"
                                    id="tratamiento"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="tratamiento"
                                    value={expediente.tratamiento}
                                    onChange={ev => setExpediente({...expediente,tratamiento: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="fecha_tra"
                                    className="text-slate-800"
                                >
                                    Fecha:
                                </label>
                                <input
                                    type="date"
                                    id="fecha_tra"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="fecha_tra"
                                    value={expediente.fecha_tra}
                                    onChange={ev => setExpediente({...expediente,trafecha_tratamiento: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="betabloqueador"
                                    className="text-slate-800"
                                >
                                    Betabloqueador Nombre/dosis:
                                </label>
                                <input
                                    type="text"
                                    id="betabloqueador"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="betabloqueador"
                                    value={expediente.betabloqueador}
                                    onChange={ev => setExpediente({...expediente,betabloqueador: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="nitratos"
                                    className="text-slate-800"
                                >
                                    Nitratos Nombre/dosis:
                                </label>
                                <input
                                    type="text"
                                    id="nitratos"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="nitratos"
                                    value={expediente.nitratos}
                                    onChange={ev => setExpediente({...expediente,nitratos: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="calcioant"
                                    className="text-slate-800"
                                >
                                    Calcioant. Nombre/dosis:
                                </label>
                                <input
                                    type="text"
                                    id="calcioant"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="calcioant"
                                    value={expediente.calcioantagonista}
                                    onChange={ev => setExpediente({...expediente,calcioantagonista: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="aspirina"
                                    className="text-slate-800"
                                >
                                    Aspirina. Nombre/dosis:
                                </label>
                                <input
                                    type="text"
                                    id="aspirina"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="aspirina"
                                    value={expediente.aspirina}
                                    onChange={ev => setExpediente({...expediente,aspirina: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="anticoagulacion"
                                    className="text-slate-800"
                                >
                                    Anticoagulacion Nombre/dosis:
                                </label>
                                <input
                                    type="text"
                                    id="anticoagulacion"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="anticoagulacion"
                                    value={expediente.anticoagulacion}
                                    onChange={ev => setExpediente({...expediente,anticoagulacion: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="iecas"
                                    className="text-slate-800"
                                >
                                    IECAS Nombre/dosis:
                                </label>
                                <input
                                    type="text"
                                    id="iecas"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="iecas"
                                    value={expediente.iecas}
                                    onChange={ev => setExpediente({...expediente,iecas: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="atii"
                                    className="text-slate-800"
                                >
                                    ATII Nombre/dosis:
                                </label>
                                <input
                                    type="text"
                                    id="atii"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="atii"
                                    value={expediente.atii}
                                    onChange={ev => setExpediente({...expediente,atii: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="diureticos"
                                    className="text-slate-800"
                                >
                                    Diuréticos Nombre/dosis:
                                </label>
                                <input
                                    type="text"
                                    id="diureticos"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="diureticos"
                                    value={expediente.diureticos}
                                    onChange={ev => setExpediente({...expediente,diureticos: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="estatinas"
                                    className="text-slate-800"
                                >
                                    Estatinas Nombre/dosis:
                                </label>
                                <input
                                    type="text"
                                    id="estatinas"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="estatinas"
                                    value={expediente.estatinas}
                                    onChange={ev => setExpediente({...expediente,estatinas: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="fibratos"
                                    className="text-slate-800"
                                >
                                    Fibratos Nombre/dosis:
                                </label>
                                <input
                                    type="text"
                                    id="fibratos"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="fibratos"
                                    value={expediente.fibratos}
                                    onChange={ev => setExpediente({...expediente,fibratos: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="digoxina"
                                    className="text-slate-800"
                                >
                                    Digoxina Nombre/dosis:
                                </label>
                                <input
                                    type="text"
                                    id="digoxina"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="digoxina"
                                    value={expediente.digoxina}
                                    onChange={ev => setExpediente({...expediente,digoxina: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="antiarritmicos"
                                    className="text-slate-800"
                                >
                                    Antiarrítmicos Nombre/dosis:
                                </label>
                                <input
                                    type="text"
                                    id="antiarritmicos"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="antiarritmicos"
                                    value={expediente.antiarritmicos}
                                    onChange={ev => setExpediente({...expediente,antiarritmicos: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="otro"
                                    className="text-slate-800"
                                >
                                    Otro Nombre/dosis:
                                </label>
                                <input
                                    type="text"
                                    id="otro"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="otro"
                                    value={expediente.otros}
                                    onChange={ev => setExpediente({...expediente,otros: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="bh"
                                    className="text-slate-800"
                                >
                                    BH:
                                </label>
                                <input
                                    type="date"
                                    id="bh"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="bh"
                                    value={expediente.bh_fecha}
                                    onChange={ev => setExpediente({...expediente,bh_fecha: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="hb"
                                    className="text-slate-800"
                                >
                                    Hb:
                                </label>
                                <input
                                    type="number"
                                    id="hb"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="hb"
                                    value={expediente.hb}
                                    onChange={ev => setExpediente({...expediente,hb: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="leucos"
                                    className="text-slate-800"
                                >
                                    Leucos:
                                </label>
                                <input
                                    type="number"
                                    id="leucos"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="leucos"
                                    value={expediente.leucos}
                                    onChange={ev => setExpediente({...expediente,leucos: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="plaquetas"
                                    className="text-slate-800"
                                >
                                    Plaquetas:
                                </label>
                                <input
                                    type="number"
                                    id="plaquetas"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="plaquetas"
                                    value={expediente.plaquetas}
                                    onChange={ev => setExpediente({...expediente,plaquetas: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="qs"
                                    className="text-slate-800"
                                >
                                    QS:
                                </label>
                                <input
                                    type="date"
                                    id="qs"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="qs"
                                    value={expediente.qs}
                                    onChange={ev => setExpediente({...expediente,qs: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="glucosa"
                                    className="text-slate-800"
                                >
                                    Glucosa:
                                </label>
                                <input
                                    type="number"
                                    id="glucosa"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="glucosa"
                                    value={expediente.glucosa}
                                    onChange={ev => setExpediente({...expediente,glucosa: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="creatinina"
                                    className="text-slate-800"
                                >
                                    Creatinina:
                                </label>
                                <input
                                    type="number"
                                    id="creatinina"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="creatinina"
                                    value={expediente.creatinina}
                                    onChange={ev => setExpediente({...expediente,creatinina: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="ac_urico"
                                    className="text-slate-800"
                                >
                                    Ac. úrico:
                                </label>
                                <input
                                    type="number"
                                    id="ac_urico"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="ac_urico"
                                    value={expediente.ac_unico}
                                    onChange={ev => setExpediente({...expediente,ac_unico: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="colesterol"
                                    className="text-slate-800"
                                >
                                    Colesterol:
                                </label>
                                <input
                                    type="number"
                                    id="colesterol"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="colesterol"
                                    value={expediente.colesterol}
                                    onChange={ev => setExpediente({...expediente,colesterol: ev.target.value})}
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
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="ldl"
                                    value={expediente.ldl}
                                    onChange={ev => setExpediente({...expediente,ldl: ev.target.value})}
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
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="hdl"
                                    value={expediente.hdl}
                                    onChange={ev => setExpediente({...expediente,hdl: ev.target.value})}  
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="trigliceridos"
                                    className="text-slate-800"
                                >
                                    Triglicéridos:
                                </label>
                                <input
                                    type="number"
                                    id="trigliceridos"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="trigliceridos"
                                    value={expediente.trigliceridos}
                                    onChange={ev => setExpediente({...expediente,trigliceridos: ev.target.value})}  
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="tp"
                                    className="text-slate-800"
                                >
                                    TP:
                                </label>
                                <input
                                    type="number"
                                    id="tp"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="tp"
                                    value={expediente.tp}
                                    onChange={ev => setExpediente({...expediente,tp: ev.target.value})}  
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="inr"
                                    className="text-slate-800"
                                >
                                    INR:
                                </label>
                                <input
                                    type="number"
                                    id="inr"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="inr"
                                    value={expediente.inr}
                                    onChange={ev => setExpediente({...expediente,inr: ev.target.value})}  
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="tpt"
                                    className="text-slate-800"
                                >
                                    TPT:
                                </label>
                                <input
                                    type="number"
                                    id="tpt"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="tpt"
                                    value={expediente.tpt}
                                    onChange={ev => setExpediente({...expediente,tpt: ev.target.value})}  
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="pcras"
                                    className="text-slate-800"
                                >
                                    PCRas:
                                </label>
                                <input
                                    type="number"
                                    id="pcras"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="tppcrast"
                                    value={expediente.pcras}
                                    onChange={ev => setExpediente({...expediente,pcras: ev.target.value})}  
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="otro_lab"
                                    className="text-slate-800"
                                >
                                    Otro Lab:
                                </label>
                                <input
                                    type="number"
                                    id="otro_lab"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="otro_lab"
                                    value={expediente.otro_lab}
                                    onChange={ev => setExpediente({...expediente,otro_lab: ev.target.value})}  
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="ecg_fecha"
                                    className="text-slate-800"
                                >
                                    ECG fecha:
                                </label>
                                <input
                                    type="date"
                                    id="ecg_fecha"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="ecg_fecha"
                                    value={expediente.ecg_fecha}
                                    onChange={ev => setExpediente({...expediente,ecg_fecha: ev.target.value})}  
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="ritmo"
                                    className="text-slate-800"
                                >
                                    Ritmo:
                                </label>
                                <input
                                    type="text"
                                    id="ritmo"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="ritmo"
                                    value={expediente.ritmo}
                                    onChange={ev => setExpediente({...expediente,ritmo: ev.target.value})}   
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="r_r_mm"
                                    className="text-slate-800"
                                >
                                    R-R (mm):
                                </label>
                                <input
                                    type="number"
                                    id="r_r_mm"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="r_r_mm"
                                    value={expediente.r_r_mm}
                                    onChange={ev => setExpediente({...expediente,r_r_mm: ev.target.value})}   
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="aP"
                                    className="text-slate-800"
                                >
                                    aP:
                                </label>
                                <input
                                    type="number"
                                    id="aP"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="aP"
                                    value={expediente.aP}
                                    onChange={ev => setExpediente({...expediente,aP: ev.target.value})}   
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="aQRS"
                                    className="text-slate-800"
                                >
                                    aQRS:
                                </label>
                                <input
                                    type="number"
                                    id="aQRS"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="aQRS"
                                    value={expediente.aQRS}
                                    onChange={ev => setExpediente({...expediente,aQRS: ev.target.value})}   
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="aT"
                                    className="text-slate-800"
                                >
                                    aT:
                                </label>
                                <input
                                    type="number"
                                    id="aT"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="aT"
                                    value={expediente.aT}
                                    onChange={ev => setExpediente({...expediente,aT: ev.target.value})}   
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="duracion_qrs"
                                    className="text-slate-800"
                                >
                                    Duración QRS:
                                </label>
                                <input
                                    type="number"
                                    id="duracion_qrs"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="duracion_qrs"
                                    value={expediente.duracion_qrs}
                                    onChange={ev => setExpediente({...expediente,duracion_qrs: ev.target.value})}   
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="duracion_p"
                                    className="text-slate-800"
                                >
                                    Duración P:
                                </label>
                                <input
                                    type="number"
                                    id="duracion_p"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="duracion_p"
                                    value={expediente.duracion_p}
                                    onChange={ev => setExpediente({...expediente,duracion_p: ev.target.value})} 
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="qtm"
                                    className="text-slate-800"
                                >
                                    Qtm:
                                </label>
                                <input
                                    type="number"
                                    id="qtm"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="qtm"
                                    value={expediente.qtm}
                                    onChange={ev => setExpediente({...expediente,qtm: ev.target.value})} 
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="pr"
                                    className="text-slate-800"
                                >
                                    PR:
                                </label>
                                <input
                                    type="number"
                                    id="pr"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="pr"
                                    value={expediente.pr}
                                    onChange={ev => setExpediente({...expediente,pr: ev.target.value})} 
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="bav"
                                    className="text-slate-800"
                                >
                                    BAV (1,2,3):
                                </label>
                                <input
                                    type="number"
                                    id="bav"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="bav"
                                    value={expediente.bav}
                                    onChange={ev => setExpediente({...expediente,bav: ev.target.value})} 
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="brihh"
                                    className="text-slate-800"
                                >
                                    BRIHH:
                                </label>
                                <select id="brihh" name="brihh" className='mt-2 w-full p-3' value={expediente.brihh===1 ||expediente.brihh ==="true"?"true":"false"} onChange={ev => setExpediente({...expediente,brihh: ev.target.value})}>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="brdhh"
                                    className="text-slate-800"
                                >
                                    BRDHH:
                                </label>
                                <select id="brdhh" name="brdhh" className='mt-2 w-full p-3'  value={expediente.brdhh===1 ||expediente.brdhh ==="true"?"true":"false"} onChange={ev => setExpediente({...expediente,brdhh: ev.target.value})}>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="q_as"
                                    className="text-slate-800"
                                >
                                    Q AS:
                                </label>
                                <select id="q_as" name="q_as" className='mt-2 w-full p-3'  value={expediente.q_as===1 ||expediente.q_as ==="true"?"true":"false"} onChange={ev => setExpediente({...expediente,q_as: ev.target.value})}>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="q_inf"
                                    className="text-slate-800"
                                >
                                    Q inf:
                                </label>
                                <select id="q_inf" name="q_inf" className='mt-2 w-full p-3'  value={expediente.q_inf===1 ||expediente.q_inf ==="true"?"true":"false"} onChange={ev => setExpediente({...expediente,q_inf: ev.target.value})}>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="q_lat"
                                    className="text-slate-800"
                                >
                                    Q lat:
                                </label>
                                <select id="q_lat" name="q_lat" className='mt-2 w-full p-3'  value={expediente.q_lat===1 ||expediente.q_lat ==="true"?"true":"false"} onChange={ev => setExpediente({...expediente,q_lat: ev.target.value})}>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="otros_ecg"
                                    className="text-slate-800"
                                >
                                    Otros Ecg:
                                </label>
                                <input
                                    type="text"
                                    id="otros_ecg"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="otros_ecg"
                                    value={expediente.otros_ecg}
                                    onChange={ev => setExpediente({...expediente,otros_ecg: ev.target.value})} 
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="eco_fecha"
                                    className="text-slate-800"
                                >
                                    ECO Fecha:
                                </label>
                                <input
                                    type="date"
                                    id="eco_fecha"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="eco_fecha"
                                    value={expediente.eco_fecha}
                                    onChange={ev => setExpediente({...expediente,eco_fecha: ev.target.value})} 
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="fe_por"
                                    className="text-slate-800"
                                >
                                    FE%:
                                </label>
                                <input
                                    type="number"
                                    id="fe_por"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="fe_por"
                                    value={expediente.fe_por}
                                    onChange={ev => setExpediente({...expediente,fe_por: ev.target.value})} 
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="dd_por"
                                    className="text-slate-800"
                                >
                                    DD(mm):
                                </label>
                                <input
                                    type="number"
                                    id="dd_por"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="dd_por"
                                    value={expediente.dd_por}
                                    onChange={ev => setExpediente({...expediente,dd_por: ev.target.value})} 
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="ds_por"
                                    className="text-slate-800"
                                >
                                    DS(mm):
                                </label>
                                <input
                                    type="number"
                                    id="ds_por"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="ds_por"
                                    value={expediente.ds_por}
                                    onChange={ev => setExpediente({...expediente,ds_por: ev.target.value})} 
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="trivi_por"
                                    className="text-slate-800"
                                >
                                    TRIVI(ms):
                                </label>
                                <input
                                    type="number"
                                    id="trivi_por"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="trivi_por"
                                    value={expediente.trivi_por}
                                    onChange={ev => setExpediente({...expediente,trivi_por: ev.target.value})} 
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="rel_e_a"
                                    className="text-slate-800"
                                >
                                    Rel e-A:
                                </label>
                                <input
                                    type="number"
                                    id="rel_e_a"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="rel_e_a"
                                    value={expediente.rel_e_a}
                                    onChange={ev => setExpediente({...expediente,rel_e_a: ev.target.value})} 
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="otros_eco"
                                    className="text-slate-800"
                                >
                                    Otros ECO:
                                </label>
                                <input
                                    type="text"
                                    id="otros_eco"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="otros_eco"
                                    value={expediente.otros_eco}
                                    onChange={ev => setExpediente({...expediente,otros_eco: ev.target.value})} 
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="mn_fecha"
                                    className="text-slate-800"
                                >
                                    MN Fecha:
                                </label>
                                <input
                                    type="date"
                                    id="mn_fecha"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="mn_fecha"
                                    value={expediente.mn_fecha}
                                    onChange={ev => setExpediente({...expediente,mn_fecha: ev.target.value})} 
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="fe_por_mn"
                                    className="text-slate-800"
                                >
                                    FE(%):
                                </label>
                                <input
                                    type="number"
                                    id="fe_por_mn"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="fe_por_mn"
                                    value={expediente.fe_por_mn}
                                    onChange={ev => setExpediente({...expediente,fe_por_mn: ev.target.value})} 
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="ant_im"
                                    className="text-slate-800"
                                >
                                    Ant (IM):
                                </label>
                                <select id="ant_im" name="ant_im" className='mt-2 w-full p-3'  value={expediente.ant_im===1 ||expediente.ant_im ==="true"?"true":"false"} onChange={ev => setExpediente({...expediente,ant_im: ev.target.value})}>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="ant_isq"
                                    className="text-slate-800"
                                >
                                    Ant (isq):
                                </label>
                                <select id="ant_isq" name="ant_isq" className='mt-2 w-full p-3'   value={expediente.ant_isq===1 ||expediente.ant_isq ==="true"?"true":"false"} onChange={ev => setExpediente({...expediente,ant_isq: ev.target.value})}>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="ant_rr"
                                    className="text-slate-800"
                                >
                                    Ant (RR):
                                </label>
                                <select id="ant_rr" name="ant_rr" className='mt-2 w-full p-3' value={expediente.ant_rr===1 ||expediente.ant_rr ==="true"?"true":"false"} onChange={ev => setExpediente({...expediente,ant_rr: ev.target.value})}>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="sept_im"
                                    className="text-slate-800"
                                >
                                    Sept (IM):
                                </label>
                                <select id="sept_im" name="sept_im" className='mt-2 w-full p-3' value={expediente.sept_im===1 ||expediente.sept_im ==="true"?"true":"false"} onChange={ev => setExpediente({...expediente,sept_im: ev.target.value})}>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="sept_isq"
                                    className="text-slate-800"
                                >
                                    Sept (isq):
                                </label>
                                <select id="sept_isq" name="sept_isq" className='mt-2 w-full p-3'  value={expediente.sept_isq===1 ||expediente.sept_isq ==="true"?"true":"false"} onChange={ev => setExpediente({...expediente,sept_isq: ev.target.value})}>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="sept_rr"
                                    className="text-slate-800"
                                >
                                    Sept (RR):
                                </label>
                                <select id="sept_rr" name="sept_rr" className='mt-2 w-full p-3'  value={expediente.sept_rr===1 ||expediente.sept_rr ==="true"?"true":"false"} onChange={ev => setExpediente({...expediente,sept_rr: ev.target.value})}>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="lat_im"
                                    className="text-slate-800"
                                >
                                    Lat (IM):
                                </label>
                                <select id="lat_im" name="lat_im" className='mt-2 w-full p-3'  value={expediente.lat_im===1 ||expediente.lat_im ==="true"?"true":"false"} onChange={ev => setExpediente({...expediente,lat_im: ev.target.value})}>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="lat_isq"
                                    className="text-slate-800"
                                >
                                    Lat (isq):
                                </label>
                                <select id="lat_isq" name="lat_isq" className='mt-2 w-full p-3'  value={expediente.lat_isq===1 ||expediente.lat_isq ==="true"?"true":"false"} onChange={ev => setExpediente({...expediente,lat_isq: ev.target.value})}>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="lat_rr"
                                    className="text-slate-800"
                                >
                                    Lat (RR):
                                </label>
                                <select id="lat_rr" name="lat_rr" className='mt-2 w-full p-3'  value={expediente.lat_rr===1 ||expediente.lat_rr ==="true"?"true":"false"} onChange={ev => setExpediente({...expediente,lat_rr: ev.target.value})}>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="inf_im"
                                    className="text-slate-800"
                                >
                                    Inf (IM):
                                </label>
                                <select id="inf_im" name="inf_im" className='mt-2 w-full p-3'   value={expediente.inf_im===1 ||expediente.inf_im ==="true"?"true":"false"} onChange={ev => setExpediente({...expediente,inf_im: ev.target.value})}>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="inf_isq"
                                    className="text-slate-800"
                                >
                                    Inf (isq):
                                </label>
                                <select id="inf_isq" name="inf_isq" className='mt-2 w-full p-3'  value={expediente.inf_isq===1 ||expediente.inf_isq ==="true"?"true":"false"} onChange={ev => setExpediente({...expediente,inf_isq: ev.target.value})}>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="inf_rr"
                                    className="text-slate-800"
                                >
                                    Inf (RR):
                                </label>
                                <select id="inf_rr" name="inf_rr" className='mt-2 w-full p-3'  value={expediente.inf_rr===1 ||expediente.inf_rr ==="true"?"true":"false"} onChange={ev => setExpediente({...expediente,inf_rr: ev.target.value})}>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="vrie"
                                    className="text-slate-800"
                                >
                                    VRIE:
                                </label>
                                <select id="vrie" name="vrie" className='mt-2 w-full p-3' value={expediente.vrie===1 ||expediente.vrie ==="true"?"true":"false"} onChange={ev => setExpediente({...expediente,vrie: ev.target.value})}>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="vrie_fcha"
                                    className="text-slate-800"
                                >
                                    VRIE Fecha:
                                </label>
                                <input
                                    type="date"
                                    id="vrie_fcha"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="vrie_fcha"
                                    value={expediente.vrie_fcha}
                                    onChange={ev => setExpediente({...expediente,vrie_fcha: ev.target.value})}
                                />
                                
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="fevi_basal"
                                    className="text-slate-800"
                                >
                                    FEVI basal:
                                </label>
                                <input
                                    type="number"
                                    id="fevi_basal"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="fevi_basal"
                                    value={expediente.fevi_basal}
                                    onChange={ev => setExpediente({...expediente,fevi_basal: ev.target.value})}
                                />
                                
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="fevi_10_dobuta"
                                    className="text-slate-800"
                                >
                                    FEVI (10dobuta):
                                </label>
                                <input
                                    type="number"
                                    id="fevi_10_dobuta"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="fevi_10_dobuta"
                                    value={expediente.fevi_10_dobuta}
                                    onChange={ev => setExpediente({...expediente,fevi_10_dobuta: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="reserva_inot_absolut"
                                    className="text-slate-800"
                                >
                                    Reserva Inot Abs.:
                                </label>
                                <input
                                    type="number"
                                    id="reserva_inot_absolut"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="reserva_inot_absolut"
                                    value={expediente.reserva_inot_absolut}
                                    onChange={ev => setExpediente({...expediente,reserva_inot_absolut: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="reserva_inot_relat"
                                    className="text-slate-800"
                                >
                                    Reserva Inot Rel.:
                                </label>
                                <input
                                    type="number"
                                    id="reserva_inot_relat"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="reserva_inot_relat"
                                    value={expediente.reserva_inot_relat}
                                    onChange={ev => setExpediente({...expediente,reserva_inot_relat: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="vrie_otros"
                                    className="text-slate-800"
                                >
                                    VRIE otro:
                                </label>
                                <input
                                    type="number"
                                    id="vrie_otros"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="vrie_otros"
                                    value={expediente.vrie_otros}
                                    onChange={ev => setExpediente({...expediente,vrie_otros: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="vrie_riesgo"
                                    className="text-slate-800"
                                >
                                    VRIE riesgo:
                                </label>
                                <input
                                    type="number"
                                    id="vrie_riesgo"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="vrie_riesgo"
                                    value={expediente.vrie_riesgo}
                                    onChange={ev => setExpediente({...expediente,vrie_riesgo: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="holter"
                                    className="text-slate-800"
                                >
                                    Holter:
                                </label>
                                <select id="holter" name="holter" className='mt-2 w-full p-3' value={expediente.holter===1 ||expediente.holter ==="true"?"true":"false"} onChange={ev => setExpediente({...expediente,holter: ev.target.value})}>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="holter_fecha"
                                    className="text-slate-800"
                                >
                                    Holter Fecha:
                                </label>
                                <input
                                    type="date"
                                    id="holter_fecha"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="holter_fecha"
                                    value={expediente.holter_fecha}
                                    onChange={ev => setExpediente({...expediente,holter_fecha: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="holter_dignostico"
                                    className="text-slate-800"
                                >
                                    Holter Diagnostico:
                                </label>
                                <input
                                    type="text"
                                    id="holter_dignostico"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="holter_dignostico"
                                    value={expediente.holter_dignostico}
                                    onChange={ev => setExpediente({...expediente,holter_dignostico: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="holter_riesgo"
                                    className="text-slate-800"
                                >
                                    Holter Riesgo:
                                </label>
                                <input
                                    type="text"
                                    id="holter_riesgo"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="holter_riesgo"
                                    value={expediente.holter_riesgo}
                                    onChange={ev => setExpediente({...expediente,holter_riesgo: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="cateterismo"
                                    className="text-slate-800"
                                >
                                    Cateterismo:
                                </label>
                                <select id="cateterismo" name="cateterismo" className='mt-2 w-full p-3' value={expediente.cateterismo===1 ||expediente.cateterismo ==="true"?"true":"false"} onChange={ev => setExpediente({...expediente,cateterismo: ev.target.value})}>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="catet_fecha"
                                    className="text-slate-800"
                                >
                                    Cateterismo Fecha:
                                </label>
                                <input
                                    type="date"
                                    id="catet_fecha"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="catet_fecha"
                                    value={expediente.catet_fecha}
                                    onChange={ev => setExpediente({...expediente,catet_fecha: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="catet_fe"
                                    className="text-slate-800"
                                >
                                    Cateterismo FE:
                                </label>
                                <input
                                    type="number"
                                    id="catet_fe"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="catet_fe"
                                    value={expediente.catet_fe}
                                    onChange={ev => setExpediente({...expediente,catet_fe: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="catet_d2vi"
                                    className="text-slate-800"
                                >
                                    D2VI:
                                </label>
                                <input
                                    type="number"
                                    id="catet_d2vi"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="catet_d2vi"
                                    value={expediente.catet_d2vi}
                                    onChange={ev => setExpediente({...expediente,catet_d2vi: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="catet_tco"
                                    className="text-slate-800"
                                >
                                    TCO:
                                </label>
                                <input
                                    type="number"
                                    id="catet_tco"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="catet_tco"
                                    value={expediente.catet_tco}
                                    onChange={ev => setExpediente({...expediente,catet_tco: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="catet_da_prox"
                                    className="text-slate-800"
                                >
                                    DA prox:
                                </label>
                                <input
                                    type="text"
                                    id="catet_da_prox"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="catet_da_prox"
                                    value={expediente.catet_da_prox}
                                    onChange={ev => setExpediente({...expediente,catet_da_prox: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="catet_da_med"
                                    className="text-slate-800"
                                >
                                    DA 1/2:
                                </label>
                                <input
                                    type="text"
                                    id="catet_da_med"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="catet_da_med"
                                    value={expediente.catet_da_med}
                                    onChange={ev => setExpediente({...expediente,catet_da_med: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="catet_da_dist"
                                    className="text-slate-800"
                                >
                                    DA dist:
                                </label>
                                <input
                                    type="text"
                                    id="catet_da_dist"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="catet_da_dist"
                                    value={expediente.catet_da_dist}
                                    onChange={ev => setExpediente({...expediente,catet_da_dist: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="catet_1a_d"
                                    className="text-slate-800"
                                >
                                    1a D:
                                </label>
                                <input
                                    type="number"
                                    id="catet_1a_d"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="catet_1a_d"
                                    value={expediente.catet_1a_d}
                                    onChange={ev => setExpediente({...expediente,catet_1a_d: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="catet_2a_d"
                                    className="text-slate-800"
                                >
                                    2a D:
                                </label>
                                <input
                                    type="number"
                                    id="catet_2a_d"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="catet_2a_d"
                                    value={expediente.catet_2a_d}
                                    onChange={ev => setExpediente({...expediente,catet_2a_d: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="catet_cx_prox"
                                    className="text-slate-800"
                                >
                                    Cx prox:
                                </label>
                                <input
                                    type="text"
                                    id="catet_cx_prox"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="catet_cx_prox"
                                    value={expediente.catet_cx_prox}
                                    onChange={ev => setExpediente({...expediente,catet_cx_prox: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="catet_cx_dist"
                                    className="text-slate-800"
                                >
                                    Cx dist:
                                </label>
                                <input
                                    type="number"
                                    id="catet_cx_dist"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="catet_cx_dist"
                                    value={expediente.catet_cx_dist}
                                    onChange={ev => setExpediente({...expediente,catet_cx_dist: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="catet_om"
                                    className="text-slate-800"
                                >
                                    OM:
                                </label>
                                <input
                                    type="number"
                                    id="catet_om"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="catet_om"
                                    value={expediente.catet_om}
                                    onChange={ev => setExpediente({...expediente,catet_om: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="catet_pl"
                                    className="text-slate-800"
                                >
                                    PL:
                                </label>
                                <input
                                    type="number"
                                    id="catet_pl"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="catet_pl"
                                    value={expediente.catet_pl}
                                    onChange={ev => setExpediente({...expediente,catet_pl: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="catet_cd_aprox"
                                    className="text-slate-800"
                                >
                                    CD prox:
                                </label>
                                <input
                                    type="text"
                                    id="catet_cd_aprox"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="catet_cd_aprox"
                                    value={expediente.catet_cd_aprox}
                                    onChange={ev => setExpediente({...expediente,catet_cd_aprox: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="catet_cd_med"
                                    className="text-slate-800"
                                >
                                    CD 1/2:
                                </label>
                                <input
                                    type="text"
                                    id="catet_cd_med"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="catet_cd_med"
                                    value={expediente.catet_cd_med}
                                    onChange={ev => setExpediente({...expediente,catet_cd_med: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="catet_cd_dist"
                                    className="text-slate-800"
                                >
                                    CD dist:
                                </label>
                                <input
                                    type="text"
                                    id="catet_cd_dist"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="catet_cd_dist"
                                    value={expediente.catet_cd_dist}
                                    onChange={ev => setExpediente({...expediente,catet_cd_dist: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="catet_r_vent_izq"
                                    className="text-slate-800"
                                >
                                    R. Vent. Izq:
                                </label>
                                <input
                                    type="number"
                                    id="catet_r_vent_izq"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="catet_r_vent_izq"
                                    value={expediente.catet_r_vent_izq}
                                    onChange={ev => setExpediente({...expediente,catet_r_vent_izq: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="catet_dp"
                                    className="text-slate-800"
                                >
                                    DP:
                                </label>
                                <input
                                    type="number"
                                    id="catet_dp"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="catet_dp"
                                    value={expediente.catet_dp}
                                    onChange={ev => setExpediente({...expediente,catet_dp: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="catet_otros"
                                    className="text-slate-800"
                                >
                                    Otros:
                                </label>
                                <input
                                    type="text"
                                    id="catet_otros"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="catet_otros"
                                    value={expediente.catet_otros}
                                    onChange={ev => setExpediente({...expediente,catet_otros: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="catet_movilidad"
                                    className="text-slate-800"
                                >
                                    Movilidad:
                                </label>
                                <input
                                    type="text"
                                    id="catet_movilidad"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="catet_movilidad"
                                    value={expediente.catet_movilidad}
                                    onChange={ev => setExpediente({...expediente,catet_movilidad: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="catet_riesgo"
                                    className="text-slate-800"
                                >
                                    Riesgo:
                                </label>
                                <select id="catet_riesgo" name="catet_riesgo" className='mt-2 w-full p-3' value={expediente.catet_riesgo}onChange={ev => setExpediente({...expediente,catet_riesgo: ev.target.value})} >
                                    <option value="bajo">Bajo</option>
                                    <option value="medio">Medio</option>
                                    <option value="alto">Alto</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="termino"
                                    className="text-slate-800"
                                >
                                    Terminó:
                                </label>
                                <select id="termino" name="termino" className='mt-2 w-full p-3'  value={expediente.termino===1 ||expediente.termino ==="true"?"true":"false"} onChange={ev => setExpediente({...expediente,termino: ev.target.value})}>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="semanas"
                                    className="text-slate-800"
                                >
                                    Semanas:
                                </label>
                                <input
                                    type="number"
                                    id="semanas"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="semanas"
                                    value={expediente.semanas}
                                    onChange={ev => setExpediente({...expediente,semanas: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="aprendio_borg"
                                    className="text-slate-800"
                                >
                                    Aprendió Borg:
                                </label>
                                <select id="aprendio_borg" name="aprendio_borg" className='mt-2 w-full p-3'   value={expediente.aprendio_borg===1 ||expediente.aprendio_borg ==="true"?"true":"false"} onChange={ev => setExpediente({...expediente,aprendio_borg: ev.target.value})}>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="muerte"
                                    className="text-slate-800"
                                >
                                    Muerte:
                                </label>
                                <select id="muerte" name="muerte" className='mt-2 w-full p-3' value={expediente.muerte===1 ||expediente.muerte ==="true"?"true":"false"} onChange={ev => setExpediente({...expediente,muerte: ev.target.value})}>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="inestabilidad_cardio"
                                    className="text-slate-800"
                                >
                                    Inestabilidad cardiovascular:
                                </label>
                                <select id="inestabilidad_cardio" name="inestabilidad_cardio" className='mt-2 w-full p-3'  value={expediente.inestabilidad_cardio===1 ||expediente.inestabilidad_cardio ==="true"?"true":"false"} onChange={ev => setExpediente({...expediente,inestabilidad_cardio: ev.target.value})}>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="hospitalizacion"
                                    className="text-slate-800"
                                >
                                    Hospitalización:
                                </label>
                                <select id="hospitalizacion" name="hospitalizacion" className='mt-2 w-full p-3'  value={expediente.hospitalizacion===1 ||expediente.hospitalizacion ==="true"?"true":"false"} onChange={ev => setExpediente({...expediente,hospitalizacion: ev.target.value})}>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="susp_motu_propio"
                                    className="text-slate-800"
                                >
                                    Suspendió por "muto propio":
                                </label>
                                <select id="susp_motu_propio" name="susp_motu_propio" className='mt-2 w-full p-3'  value={expediente.susp_motu_propio===1 ||expediente.susp_motu_propio ==="true"?"true":"false"} onChange={ev => setExpediente({...expediente,susp_motu_propio: ev.target.value})}>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="lesion_osteo"
                                    className="text-slate-800"
                                >
                                    Lesión Osteomuscular:
                                </label>
                                <select id="lesion_osteo" name="lesion_osteo" className='mt-2 w-full p-3'  value={expediente.lesion_osteo===1 ||expediente.lesion_osteo ==="true"?"true":"false"} onChange={ev => setExpediente({...expediente,lesion_osteo: ev.target.value})}>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="res_otros"
                                    className="text-slate-800"
                                >
                                    Otros:
                                </label>
                                <select id="res_otros" name="res_otros" className='mt-2 w-full p-3'  value={expediente.res_otros===1 ||expediente.res_otros ==="true"?"true":"false"} onChange={ev => setExpediente({...expediente,res_otros: ev.target.value})}>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="1a_vez_fecha"
                                    className="text-slate-800"
                                >
                                    Nota de 1a vez:
                                </label>
                                <input
                                    type="date"
                                    id="1a_vez_fecha"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="1a_vez_fecha"
                                    value={expediente.era_vez_fecha}
                                    onChange={ev => setExpediente({...expediente,era_vez_fecha: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="sintomas"
                                    className="text-slate-800"
                                >
                                    Síntomas:
                                </label>
                                <input
                                    type="text"
                                    id="sintomas"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="sintomas"
                                    value={expediente.sintomas}
                                    onChange={ev => setExpediente({...expediente,sintomas: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="comer_vestirse"
                                    className="text-slate-800"
                                >
                                    ¿Puede comer, bañarse, vestirse o ir al baño?
                                </label>
                                <select id="comer_vestirse" name="comer_vestirse" className='mt-2 w-full p-3' value={expediente.comer_vestirse===1 ||expediente.comer_vestirse ==="true"?"true":"false"} onChange={ev => setExpediente({...expediente,comer_vestirse: ev.target.value})}>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="caminar_casa"
                                    className="text-slate-800"
                                >
                                    ¿Puede caminar dentro de casa?
                                </label>
                                <select id="caminar_casa" name="caminar_casa" className='mt-2 w-full p-3'  value={expediente.caminar_casa===1 ||expediente.caminar_casa ==="true"?"true":"false"} onChange={ev => setExpediente({...expediente,caminar_casa: ev.target.value})}>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="caminar_2_cuadras"
                                    className="text-slate-800"
                                >
                                    ¿Puede caminar 2 cuadras en plano?
                                </label>
                                <select id="caminar_2_cuadras" name="caminar_2_cuadras" className='mt-2 w-full p-3'  value={expediente.caminar_2_cuadras===1 ||expediente.caminar_2_cuadras ==="true"?"true":"false"} onChange={ev => setExpediente({...expediente,caminar_2_cuadras: ev.target.value})}>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="subir_piso"
                                    className="text-slate-800"
                                >
                                    ¿Puede subir un piso de escaleras?
                                </label>
                                <select id="subir_piso" name="subir_piso" className='mt-2 w-full p-3'  value={expediente.subir_piso===1 ||expediente.subir_piso ==="true"?"true":"false"} onChange={ev => setExpediente({...expediente,subir_piso: ev.target.value})}>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="correr_corta"
                                    className="text-slate-800"
                                >
                                    ¿Puede correr una distancia corta?
                                </label>
                                <select id="correr_corta" name="correr_corta" className='mt-2 w-full p-3'  value={expediente.correr_corta===1 ||expediente.correr_corta ==="true"?"true":"false"} onChange={ev => setExpediente({...expediente,correr_corta: ev.target.value})}>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="lavar_trastes"
                                    className="text-slate-800"
                                >
                                    ¿Puede lavar los trastes ó sacudir el polvo?
                                </label>
                                <select id="lavar_trastes" name="lavar_trastes" className='mt-2 w-full p-3'  value={expediente.lavar_trastes===1 ||expediente.lavar_trastes ==="true"?"true":"false"} onChange={ev => setExpediente({...expediente,lavar_trastes: ev.target.value})}>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="aspirar_casa"
                                    className="text-slate-800"
                                >
                                    ¿Puede aspirar la casa ó cargar el mandado?
                                </label>
                                <select id="aspirar_casa" name="aspirar_casa" className='mt-2 w-full p-3'  value={expediente.aspirar_casa===1 ||expediente.aspirar_casa ==="true"?"true":"false"} onChange={ev => setExpediente({...expediente,aspirar_casa: ev.target.value})}>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="trapear"
                                    className="text-slate-800"
                                >
                                    ¿Puede trapear los pisos ó cargar cosas pesadas?
                                </label>
                                <select id="trapear" name="trapear" className='mt-2 w-full p-3'  value={expediente.trapear===1 ||expediente.trapear ==="true"?"true":"false"} onChange={ev => setExpediente({...expediente,trapear: ev.target.value})}>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="jardineria"
                                    className="text-slate-800"
                                >
                                    ¿Puede hacer jardinería (podar el pasto, levantar las hojas secas)?
                                </label>
                                <select id="jardineria" name="jardineria" className='mt-2 w-full p-3'  value={expediente.jardineria===1 ||expediente.jardineria ==="true"?"true":"false"} onChange={ev => setExpediente({...expediente,jardineria: ev.target.value})}>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="relaciones"
                                    className="text-slate-800"
                                >
                                    ¿Tiene relaciones sexuales?
                                </label>
                                <select id="relaciones" name="relaciones" className='mt-2 w-full p-3'  value={expediente.relaciones===1 ||expediente.relaciones ==="true"?"true":"false"} onChange={ev => setExpediente({...expediente,relaciones: ev.target.value})}>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="jugar"
                                    className="text-slate-800"
                                >
                                    ¿Juega golf, boliche, baila, juega tenis (dobles), futbol, ó beisbol?
                                </label>
                                <select id="jugar" name="jugar" className='mt-2 w-full p-3'  value={expediente.jugar===1 ||expediente.jugar ==="true"?"true":"false"} onChange={ev => setExpediente({...expediente,jugar: ev.target.value})}>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="deportes_extenuantes"
                                    className="text-slate-800"
                                >
                                    ¿Juega deportes extenuantes como natación, tenis (singles), futbol, basquetbol?
                                </label>
                                <select id="deportes_extenuantes" name="deportes_extenuantes" className='mt-2 w-full p-3'  value={expediente.deportes_extenuantes===1 ||expediente.deportes_extenuantes ==="true"?"true":"false"} onChange={ev => setExpediente({...expediente,deportes_extenuantes: ev.target.value})}>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="TA"
                                    className="text-slate-800"
                                >
                                    TA:
                                </label>
                                <input
                                    type="text"
                                    id="TA"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="TA"
                                    value={expediente.TA}
                                    onChange={ev => setExpediente({...expediente,TA: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="fc"
                                    className="text-slate-800"
                                >
                                    FC:
                                </label>
                                <input
                                    type="number"
                                    id="fc"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="fc"
                                    value={expediente.fc}
                                    onChange={ev => setExpediente({...expediente,fc: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4 col-start-1 lg:col-end-5">
                                <label
                                    htmlFor="exploracion_fisica"
                                    className="text-slate-800"
                                >
                                    Exploración Física:
                                </label>
                                <input
                                    type="text"
                                    id="exploracion_fisica"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="exploracion_fisica"
                                    value={expediente.exploracion_fisica}
                                    onChange={ev => setExpediente({...expediente,exploracion_fisica: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4 col-start-1 lg:col-end-5">
                                <label
                                    htmlFor="estudios"
                                    className="text-slate-800"
                                >
                                    Estudios a solicitar:
                                </label>
                                <input
                                    type="text"
                                    id="estudios"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="estudios"
                                    value={expediente.estudios}
                                    onChange={ev => setExpediente({...expediente,estudios: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4 ">
                                <label
                                    htmlFor="diagnostico_general"
                                    className="text-slate-800"
                                >
                                    Diagnóstico:
                                </label>
                                <input
                                    type="text"
                                    id="diagnostico_general"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="diagnostico_general"
                                    value={expediente.diagnostico_general}
                                    onChange={ev => setExpediente({...expediente,diagnostico_general: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4 col-start-1 lg:col-end-5">
                                <label
                                    htmlFor="plan"
                                    className="text-slate-800"
                                >
                                    Plan:
                                </label>
                                <input
                                    type="text"
                                    id="plan"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="plan"
                                    value={expediente.plan}
                                    onChange={ev => plan({...expediente,diagnostico_general: ev.target.value})}
                                />
                            </div>
                        
                        </div>
                        <div className='flex justify-end'>
                            <input
                                type="submit"
                                value="Imprimir"
                                className="bg-blue-500 hover:bg-blue-600 text-white m-5 p-3 uppercase font-bold cursor-pointer"
                            />
                              <Link className="bg-red-500 hover:bg-red-600 text-white m-5 p-3 uppercase font-bold cursor-pointer" to="/expedientes"> Cancelar</Link>
                    </div>
            </form>
        </div>
    </>
  )
}
