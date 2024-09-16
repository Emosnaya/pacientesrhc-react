import React, { useEffect } from 'react'
import Header from '../components/Header'
import { usevalue, useState } from 'react'
import clienteAxios from '../axios-client';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function ExpEstartificacion() {
    const token = localStorage.getItem('AUTH_TOKEN')
    const {id} = useParams()
    const [errores, setErrores] = useState(null)
    const navigate = useNavigate()
    const [expediente, setExpediente] = useState([])

    if(id) {
        useEffect(() => {
            clienteAxios.get(`/api/estratificacion/${id}`,{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            .then(({data}) => {
                setExpediente(data)
            })
        }, [])
    }


    const onSubmit = (e) => {
        e.preventDefault()
            try {
                clienteAxios.put(`/api/estratificacion/${expediente.id}`, expediente,{
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                }).then(function (response) {
                    // Redireccionar a una página específica
                    setTimeout(function() {
                        // Redireccionar a una página específica
                        window.location.href = '/dashboard';
                    }, 2000);
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Actualizado Correctamente",
                        showConfirmButton: false,
                        timer: 1500
                      }); 
                  })
            } catch (error) {
                setErrores(Object.values(error.response.data.errors) )
            }
    } 

  return (
    <>
    <Header titulo ="Editar Estratificación"/>
    <div className="">
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
                                    onChange={ev => setExpediente({...expediente,primeravez_rhc: ev.target.value})}
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
                                    onChange={ev => setExpediente({...expediente,pe_fecha: ev.target.value})}
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
                                    onChange={ev => setExpediente({...expediente,estrati_fecha: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="c_isquemia"
                                    className="text-slate-800"
                                >
                                    C. Isquémica:
                                </label>
                                <select id="c_isquemia" name="c_isquemia" className='mt-2 w-full p-3' value={expediente.c_isquemia===1 ||expediente.c_isquemia ==="true"?"true":"false"} onChange={ev => setExpediente({...expediente,c_isquemia: ev.target.value})}>
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
                                <select id="im" name="im" className='mt-2 w-full p-3' value={expediente.im===1||expediente.im==="true"?"true":"false"} onChange={ev => setExpediente({...expediente,im: ev.target.value})}>
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
                                <select id="ima" name="ima" className='mt-2 w-full p-3' value={expediente.ima===1||expediente.ima==="true"?"true":"false"} onChange={ev => setExpediente({...expediente,ima: ev.target.value})}>
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
                                <select id="imas" name="imas" className='mt-2 w-full p-3' value={expediente.imas===1||expediente.imas==="true"?"true":"false"} onChange={ev => setExpediente({...expediente,imas: ev.target.value})}>
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
                                <select id="imaa" name="imaa" className='mt-2 w-full p-3' value={expediente.imaa===1||expediente.imaa==="true"?"true":"false"} onChange={ev => setExpediente({...expediente,imaa: ev.target.value})}>
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
                                <select id="imaa" name="imaa" className='mt-2 w-full p-3' value={expediente.imal===1||expediente.imal==="true"?"true":"false"} onChange={ev => setExpediente({...expediente,imal: ev.target.value})}>
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
                                <select id="imae" name="imae" className='mt-2 w-full p-3' value={expediente.imae===1||expediente.imae==="true"?"true":"false"} onChange={ev => setExpediente({...expediente,imae: ev.target.value})}>
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
                                <select id="im_inf" name="im_inf" className='mt-2 w-full p-3' value={expediente.iminf===1||expediente.iminf==="true"?"true":"false"} onChange={ev => setExpediente({...expediente,iminf: ev.target.value})}>
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
                                <select id="impi" name="impi" className='mt-2 w-full p-3' value={expediente.impi===1||expediente.impi==="true"?"true":"false"} onChange={ev => setExpediente({...expediente,impi: ev.target.value})}>
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
                                <select id="impi_vd" name="impi_vd" className='mt-2 w-full p-3' value={expediente.impi_vd===1||expediente.impi_vd==="true"?"true":"false"} onChange={ev => setExpediente({...expediente,impi_vd: ev.target.value})}>
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
                                <select id="imlat" name="imlat" className='mt-2 w-full p-3' value={expediente.imlat===1?"true":"false"} onChange={ev => setExpediente({...expediente,imlat: ev.target.value})}>
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
                                <select id="imsesst" name="imsesst" className='mt-2 w-full p-3' value={expediente.imsesst===1||expediente.imsesst==="true"?"true":"false"} onChange={ev => setExpediente({...expediente,imsesst: ev.target.value})}>
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
                                <select id="imcomplicado" name="imcomplicado" className='mt-2 w-full p-3' value={expediente.imComplicado===1||expediente.imComplicado==="true"?"true":"false"} onChange={ev => setExpediente({...expediente,imComplicado: ev.target.value})}>
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
                                <select id="valvular" name="valvular" className='mt-2 w-full p-3' value={expediente.valvular} onChange={ev => setExpediente({...expediente,valvular: ev.target.value})}>
                                    <option value="ao_l">Ao(I)</option>
                                    <option value="ao_est">Ao(Est)</option>
                                    <option value="mitr_l">Mitr(I)</option>
                                    <option value="mitr_est">Mitr(Est)</option>
                                    <option value="pulm_l">Pulm(I)</option>
                                    <option value="pulm_est">Pulm(Est)</option>
                                    <option value="tric_l">Tric(I)</option>
                                    <option value="tric_est">Tric(Est)</option>
                                    <option value="otro">Otro</option>
                                    <option value="no">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="otro"
                                    className="text-slate-800"
                                >
                                    otro:
                                </label>
                                <select id="otro" name="otro" className='mt-2 w-full p-3' value={expediente.otro===1||expediente.otro==="true"?"true":"false"} onChange={ev => setExpediente({...expediente,otro: ev.target.value})}>
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
                                <select id="mcd" name="mcd" className='mt-2 w-full p-3' value={expediente.mcd===1||expediente.mcd==="true"?"true":"false"} onChange={ev => setExpediente({...expediente,mcd: ev.target.value})}>
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
                                <select id="icc" name="icc" className='mt-2 w-full p-3' value={expediente.icc===1||expediente.icc==="true"?"true":"false"} onChange={ev => setExpediente({...expediente,icc: ev.target.value})}>
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
                                <select id="reanimacion" name="reanimacion" className='mt-2 w-full p-3' value={expediente.reanimacion_cardio===1||expediente.reanimacion_cardio==="true"?"true":"false"} onChange={ev => setExpediente({...expediente,reanimacion_cardio: ev.target.value})}>
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
                                <select id="fallaEntrenar" name="fallaEntrenar" className='mt-2 w-full p-3' value={expediente.falla_entrenar===1||expediente.falla_entrenar==="true"?"true":"false"} onChange={ev => setExpediente({...expediente,falla_entrenar: ev.target.value})}>
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
                                <select id="tabaquismo" name="tabaquismo" className='mt-2 w-full p-3' value={expediente.tabaquismo===1||expediente.tabaquismo==="true"?"true":"false"} onChange={ev => setExpediente({...expediente,tabaquismo: ev.target.value})}>
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
                                <select id="dislipidemia" name="dislipidemia" className='mt-2 w-full p-3' value={expediente.dislipidemia===1||expediente.dislipidemia==="true"?"true":"false"} onChange={ev => setExpediente({...expediente,dislipidemia: ev.target.value})}>
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
                                <select id="dm" name="dm" className='mt-2 w-full p-3' value={expediente.dm===1||expediente.dm==="true"?"true":"false"} onChange={ev => setExpediente({...expediente,dm: ev.target.value})}>
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
                                <select id="has" name="has" className='mt-2 w-full p-3' value={expediente.has===1||expediente.has==="true"?"true":"false"} onChange={ev => setExpediente({...expediente,has: ev.target.value})}>
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
                                <select id="obesidad" name="obesidad" className='mt-2 w-full p-3' value={expediente.obesidad===1||expediente.obesidad==="true"?"true":"false"} onChange={ev => setExpediente({...expediente,obesidad: ev.target.value})}>
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
                                <select id="estres" name="estres" className='mt-2 w-full p-3' value={expediente.estres===1||expediente.estres==="true"?"true":"false"} onChange={ev => setExpediente({...expediente,estres: ev.target.value})}>
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
                                <select id="sedentarismo" name="sedentarismo" className='mt-2 w-full p-3' value={expediente.sedentarismo===1||expediente.sedentarismo==="true"?"true":"false"} onChange={ev => setExpediente({...expediente,sedentarismo: ev.target.value})}>
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
                                <select id="otro_factor" name="otro_factor" className='mt-2 w-full p-3' value={expediente.riesgo_otro===1||expediente.riesgo_otro==="true"?"true":"false"} onChange={ev => setExpediente({...expediente,riesgo_otro: ev.target.value})}>
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
                                <select id="depresion" name="depresion" className='mt-2 w-full p-3' value={expediente.depresion===1||expediente.depresion==="true"?"true":"false"} onChange={ev => setExpediente({...expediente,depresion: ev.target.value})}>
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
                                <select id="ansiedad" name="ansiedad" className='mt-2 w-full p-3' value={expediente.ansiedad===1||expediente.ansiedad==="true"?"true":"false"} onChange={ev => setExpediente({...expediente,ansiedad: ev.target.value})}>
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
                                <select id="sintomatologia" name="sintomatologia" className='mt-2 w-full p-3' value={expediente.sintomatologia} onChange={ev => setExpediente({...expediente,sintomatologia: ev.target.value})}>
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
                                    onChange={ev => setExpediente({...expediente,puntuacion_atp2000: ev.target.value})}
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
                                    onChange={ev => setExpediente({...expediente,heart_score: ev.target.value})}
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
                                    onChange={ev => setExpediente({...expediente,col_total: ev.target.value})}
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
                                    step="0.01"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="hdl"
                                    value={expediente.hdl}
                                    onChange={ev => setExpediente({...expediente,hdl: ev.target.value})}
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
                                    onChange={ev => setExpediente({...expediente,tg: ev.target.value})}
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
                                    onChange={ev => setExpediente({...expediente,fevi: ev.target.value})}
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
                                    onChange={ev => setExpediente({...expediente,pcr: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="enfCoronaria"
                                    className="text-slate-800"
                                >
                                    Enf Coronaria:
                                </label>
                                <select id="enfCoronaria" name="enfCoronaria" className='mt-2 w-full p-3' value={expediente.enf_coronaria} onChange={ev => setExpediente({...expediente,enf_coronaria: ev.target.value})}>
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
                                <select id="isquemia" name="isquemia" className='mt-2 w-full p-3' value={expediente.isquemia} onChange={ev => setExpediente({...expediente,isquemia: ev.target.value})}>
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
                                <select id="holter" name="holter" className='mt-2 w-full p-3' value={expediente.holter} onChange={ev => setExpediente({...expediente,holter: ev.target.value})}>
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
                                <select id="capacidadPe" name="capacidadPe" className='mt-2 w-full p-3' value={expediente.pe_capacidad===1||expediente.pe_capacidad==="true"?"true":"false"} onChange={ev => setExpediente({...expediente,pe_capacidad: ev.target.value})}>
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
                                    onChange={ev => setExpediente({...expediente,fc_basal: ev.target.value})}
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
                                    onChange={ev => setExpediente({...expediente,fc_maxima: ev.target.value})}
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
                                    onChange={ev => setExpediente({...expediente,fc_borg_12: ev.target.value})}
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
                                    onChange={ev => setExpediente({...expediente,dp_borg_12: ev.target.value})}
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
                                    onChange={ev => setExpediente({...expediente,mets_borg_12: ev.target.value})}
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
                                    onChange={ev => setExpediente({...expediente,carga_max_bnda: ev.target.value})}
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
                                    onChange={ev => setExpediente({...expediente,tolerancia_max_esfuerzo: ev.target.value})}
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
                                    onChange={ev => setExpediente({...expediente,respuesta_presora: ev.target.value})}
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
                                    onChange={ev => setExpediente({...expediente,indice_ta_esf: ev.target.value})}
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
                                    onChange={ev => setExpediente({...expediente,porc_fc_pre_alcanzado: ev.target.value})}
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
                                    onChange={ev => setExpediente({...expediente,r_cronotr: ev.target.value})}
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
                                    onChange={ev => setExpediente({...expediente,poder_cardiaco: ev.target.value})}
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
                                    onChange={ev => setExpediente({...expediente,recuperacion_tas: ev.target.value})}
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
                                    onChange={ev => setExpediente({...expediente,recuperacion_fc: ev.target.value})}
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
                                    onChange={ev => setExpediente({...expediente,duke: ev.target.value})}
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
                                    onChange={ev => setExpediente({...expediente,veteranos: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="ectopiaVen"
                                    className="text-slate-800"
                                >
                                    Ectopia ventricular frecuente:
                                </label>
                                <select id="ectopiaVen" name="ectopiaVen" className='mt-2 w-full p-3' value={expediente.ectopia_ventricular===1||expediente.ectopia_ventricular==="true"?"true":"false"} onChange={ev => setExpediente({...expediente,ectopia_ventricular: ev.target.value})}>
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
                                <select id="umbraIsque" name="umbraIsque" className='mt-2 w-full p-3' value={expediente.umbral_isquemico===1||expediente.umbral_isquemico==="true"?"true":"false"} onChange={ev => setExpediente({...expediente,umbral_isquemico: ev.target.value})}>
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
                                <select id="supradesnivel" name="supradesnivel" className='mt-2 w-full p-3' value={expediente.supranivel_st===1||expediente.supranivel_st==="true"?"true":"false"} onChange={ev => setExpediente({...expediente,supranivel_st: ev.target.value})}>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="infra135"
                                    className="text-slate-800"
                                >
                                    InfraST  2mm:
                                </label>
                                <select id="infra135" name="infra135" className='mt-2 w-full p-3' value={expediente.infra_st_mayor2_135} onChange={ev => setExpediente({...expediente,infra_st_mayor2_135: ev.target.value})}>
                                    <option value="false">No</option>
                                    <option value="m_135">mayor 135</option>
                                    <option value="me_135">menor 135</option>
                                </select>
                            </div>

                            <div className="mb-4">
                                <label
                                    htmlFor="infra5"
                                    className="text-slate-800"
                                >
                                    InfraST  2mm:
                                </label>
                                <select id="infra5" name="infra5" className='mt-2 w-full p-3' value={expediente.infra_st_mayor2_5mets} onChange={ev => setExpediente({...expediente,infra_st_mayor2_5mets: ev.target.value})}>
                                    <option value="false">No</option>
                                    <option value="m_5">mayor 5</option>
                                    <option value="me_5">menor 5</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="riesgoGlobal"
                                    className="text-slate-800"
                                >
                                    Riesgo global:
                                </label>
                                <select id="riesgoGlobal" name="riesgoGlobal" className='mt-2 w-full p-3' value={expediente.riesgo_global} onChange={ev => setExpediente({...expediente,riesgo_global: ev.target.value})}>
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
                                <select id="grupo" name="grupo" className='mt-2 w-full p-3' value={expediente.grupo} onChange={ev => setExpediente({...expediente,grupo: ev.target.value})}>
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
                                <select id="semanas" name="semanas" className='mt-2 w-full p-3' value={expediente.semanas} onChange={ev => setExpediente({...expediente,semanas: ev.target.value})}>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="4">4</option>
                                    <option value="6">6</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="sesiones"
                                    className="text-slate-800"
                                >
                                    Sesiones:
                                </label>
                                <input
                                    type="number"
                                    id="sesiones"
                                    step="0.01"
                                    className="mt-2 w-full p-3 bg-gray-50 "
                                    name="sesiones"
                                    value={expediente.sesiones} 
                                    onChange={ev => setExpediente({...expediente,sesiones: ev.target.value})}
                                />  
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="borg"
                                    className="text-slate-800"
                                >
                                    Borg:
                                </label>
                                <select id="borg" name="borg" className='mt-2 w-full p-3' value={expediente.borg} onChange={ev => setExpediente({...expediente,borg: ev.target.value})}>
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
                                <select id="fcDiana" name="fcDiana" className='mt-2 w-full p-3' value={expediente.fc_diana_str} onChange={ev => setExpediente({...expediente,fc_diana_str: ev.target.value})}>
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
                                    onChange={ev => setExpediente({...expediente,dp_diana: ev.target.value})}
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
                                    onChange={ev => setExpediente({...expediente,comentarios: ev.target.value})}
                                />
                            </div>
                            


                        </div>
                        <div className='flex justify-end'>
                            <input
                                type="submit"
                                value="Guardar"
                                className="bg-green-500 hover:bg-green-600 text-white m-5 p-3 uppercase font-bold cursor-pointer"
                            />
                              <Link className="bg-red-500 hover:bg-red-600 text-white m-5 p-3 uppercase font-bold cursor-pointer" to="/dashboard"> Cancelar</Link>
                    </div>
            </form>
        </div>
    </>
  )
}
