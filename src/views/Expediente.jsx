import React, { useEffect } from 'react'
import Header from '../components/Header'
import { usevalue, useState } from 'react'
import clienteAxios from '../axios-client';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function Expediente() {
    const token = localStorage.getItem('AUTH_TOKEN')
    const {id} = useParams()
    const [errores, setErrores] = useState(null)
    const navigate = useNavigate()

    const [expediente, setExpediente] = useState({})


    if(id) {
        useEffect(() => {
            clienteAxios.get(`/api/esfuerzo/${id}`,{
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
                clienteAxios.put(`/api/esfuerzo/${expediente.id}`, expediente,{
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                }).then(function (response) {
                    // Redireccionar a una página específica
                    setTimeout(function() {
                        // Redireccionar a una página específica
                        window.location.reload()
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
    <Header titulo ="Editar Prueba de Esfuerzo"/>
    <div>
        <div className=" px-5 py-10">
        <form action="" onSubmit={onSubmit}>
                        <div className='grid grid-flow-row lg:grid-cols-4  mt-5 px-5 py-10 gap-2'>
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
                                    htmlFor="num_prueba"
                                    className="text-slate-800"
                                >
                                    Num. Prueba:
                                </label>
                                <input
                                    type="text"
                                    id="num_prueba"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="num_prueba"
                                    value={expediente.numPrueba}
                                    onChange={ev => setExpediente({...expediente,numPrueba: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="icc"
                                    className="text-slate-800"
                                >
                                    ICC o digoxina :
                                </label>
                                <select id="icc" name="icc" className='mt-2 w-full p-3' value={(expediente.icc === 1 || expediente.icc==="true"?"true":"false")} onChange={ev => setExpediente({...expediente,icc: ev.target.value})}> 
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
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
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="fevi"
                                    value={expediente.FEVI}
                                    onChange={ev => setExpediente({...expediente,FEVI: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="metodo"
                                    className="text-slate-800"
                                >
                                    Método:
                                </label>
                                <select id="metodo" name="metodo" className='mt-2 w-full p-3' value={expediente.metodo} onChange={ev => setExpediente({...expediente,metodo: ev.target.value})}>
                                    <option value="ecott">ECOTT</option>
                                    <option value="irm">IRM</option>
                                    <option value="nv">NV</option>
                                    <option value="mn">MN</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="difuncionDiastolica"
                                    className="text-slate-800"
                                >
                                    Disfunción Diastólica:
                                </label>
                                <select id="difuncionDiastolica" name="difuncionDiastolica" className='mt-2 w-full p-3' value={(expediente.disfuncionDias === 1||expediente.disfuncionDias==="true"?"true":"false")} onChange={ev => setExpediente({...expediente,disfuncionDias: ev.target.value})}>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="nyha"
                                    className="text-slate-800"
                                >
                                   NYHA:
                                </label>
                                <input
                                    type="number"
                                    id="nyha"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="nyha"
                                    value={expediente.nyha}
                                    onChange={ev => setExpediente({...expediente,nyha: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="ccs"
                                    className="text-slate-800"
                                >
                                   CCS:
                                </label>
                                <input
                                    type="number"
                                    id="ccs"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="ccs"
                                    value={expediente.ccs}
                                    onChange={ev => setExpediente({...expediente,ccs: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="betabloqueador"
                                    className="text-slate-800"
                                >
                                    Betabloqueador:
                                </label>
                                <select id="betabloqueador" name="betabloqueador" className='mt-2 w-full p-3' value={(expediente.betabloqueador === 1||expediente.betabloqueador==="true"?"true":"false")} onChange={ev => setExpediente({...expediente,betabloqueador: ev.target.value})}>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="iecas_atii"
                                    className="text-slate-800"
                                >
                                    IECAS/ATII:
                                </label>
                                <select id="iecas_atii" name="iecas_atii" className='mt-2 w-full p-3'value={(expediente.iecas === 1||expediente.iecas==="true"?"true":"false")} onChange={ev => setExpediente({...expediente,iecas: ev.target.value})}>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="nitratos"
                                    className="text-slate-800"
                                >
                                    Nitratos:
                                </label>
                                <select id="nitratos" name="nitratos" className='mt-2 w-full p-3' value={(expediente.nitratos === 1||expediente.nitratos==="true"?"true":"false")} onChange={ev => setExpediente({...expediente,nitratos: ev.target.value})}>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="digoxina"
                                    className="text-slate-800"
                                >
                                    Digoxina:
                                </label>
                                <select id="digoxina" name="digoxina" className='mt-2 w-full p-3' value={(expediente.digoxina === 1||expediente.digoxina==="true"?"true":"false")} onChange={ev => setExpediente({...expediente,digoxina: ev.target.value})}>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="calcio_antag"
                                    className="text-slate-800"
                                >
                                    Calcio Antag.:
                                </label>
                                <select id="calcio_antag" name="calcio_antag" className='mt-2 w-full p-3 ' value={(expediente.calcioAntag === 1||expediente.calcioAntag==="true"?"true":"false")} onChange={ev => setExpediente({...expediente,calcioAntag: ev.target.value})}>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="antiarritmicos"
                                    className="text-slate-800"
                                >
                                    Antiarrítmicos:
                                </label>
                                <select id="antiarritmicos" name="antiarritmicos" className='mt-2 w-full p-3' value={(expediente.antirritmicos === 1||expediente.antirritmicos==="true"?"true":"false")} onChange={ev => setExpediente({...expediente,antirritmicos: ev.target.value})}>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="hipolipemiantes"
                                    className="text-slate-800"
                                >
                                    Hipolipemiantes:
                                </label>
                                <select id="hipolipemiantes" name="hipolipemiantes" className='mt-2 w-full p-3' value={(expediente.hipolipemiantes === 1||expediente.hipolipemiantes==="true"?"true":"false")} onChange={ev => setExpediente({...expediente,hipolipemiantes: ev.target.value})}>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="diureticos"
                                    className="text-slate-800"
                                >
                                    Diuréticos:
                                </label>
                                <select id="diureticos" name="diureticos" className='mt-2 w-full p-3' value={(expediente.diureticos === 1||expediente.diureticos==="true"?"true":"false")} onChange={ev => setExpediente({...expediente,diureticos: ev.target.value})}>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="aldactone"
                                    className="text-slate-800"
                                >
                                    Aldactone:
                                </label>
                                <select id="aldactone" name="aldactone" className='mt-2 w-full p-3' value={(expediente.aldactone === 1||expediente.aldactone==="true"?"true":"false")} onChange={ev => setExpediente({...expediente,aldactone: ev.target.value})}>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="antiagregante"
                                    className="text-slate-800"
                                >
                                    Antiagregante:
                                </label>
                                <select id="antiagregante" name="antiagregante" className='mt-2 w-full p-3' value={(expediente.antiagregante === 1||expediente.antiagregante==="true"?"true":"false")} onChange={ev => setExpediente({...expediente,antiagregante: ev.target.value})}>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="otros"
                                    className="text-slate-800"
                                >
                                    Otros:
                                </label>
                                <select id="otros" name="otros" className='mt-2 w-full p-3' value={(expediente.otros === 1||expediente.otros==="true"?"true":"false")} onChange={ev => setExpediente({...expediente,otros: ev.target.value})}>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="prevalencia"
                                    className="text-slate-800"
                                >
                                    Prevalencia:
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    id="prevalencia"
                                    className="mt-2 w-full p-3 bg-gray-50 "
                                    name="prevalencia"
                                    value={expediente.prevalencia}
                                    onChange={ev => setExpediente({...expediente,prevalencia: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="confusor"
                                    className="text-slate-800"
                                >
                                    Confusor:
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    id="confusor"
                                    className="mt-2 w-full p-3 bg-gray-50 "
                                    name="confusor"
                                    value={expediente.confusor}
                                    onChange={ev => setExpediente({...expediente,confusor: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="sensibilidad"
                                    className="text-slate-800"
                                >
                                    Sensibilidad:
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    id="sensibilidad"
                                    className="mt-2 w-full p-3 bg-gray-50 "
                                    name="sensibilidad"
                                    value={expediente.sensibilidad}
                                    onChange={ev => setExpediente({...expediente,sensibilidad: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="especificidad"
                                    className="text-slate-800"
                                >
                                    Especificidad:
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    id="especificidad"
                                    className="mt-2 w-full p-3 bg-gray-50 "
                                    name="especificidad"
                                    value={expediente.especificidad}
                                    onChange={ev => setExpediente({...expediente,especificidad: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="prueba_ingreso"
                                    className="text-slate-800"
                                >
                                    Prueba de Ingreso:
                                </label>
                                <select id="prueba_ingreso" name="prueba_ingreso" className='mt-2 w-full p-3' value={(expediente.pruebaIngreso === 1||expediente.pruebaIngreso==="true"?"true":"false")} onChange={ev => setExpediente({...expediente,pruebaIngreso: ev.target.value})}>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="prueba_fase_2"
                                    className="text-slate-800"
                                >
                                    Prueba Fin Fase 2:
                                </label>
                                <select id="prueba_fase_2" name="prueba_fase_2" className='mt-2 w-full p-3' value={(expediente.pruebaFinFase2 === 1||expediente.pruebaFinFase2==="true"?"true":"false")} onChange={ev => setExpediente({...expediente,pruebaFinFase2: ev.target.value})}>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="prueba_fase_3"
                                    className="text-slate-800"
                                >
                                    Prueba Fin Fase 3:
                                </label>
                                <select id="prueba_fase_3" name="prueba_fase_3" className='mt-2 w-full p-3' value={(expediente.pruebaFinFase3 === 1||expediente.pruebaFinFase3==="true"?"true":"false")} onChange={ev => setExpediente({...expediente,pruebaFinFase3: ev.target.value})}>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="fecha_ingreso"
                                    className="text-slate-800"
                                >
                                    Fecha de Inicio de RHC:
                                </label>
                                <input
                                    type="date"
                                    id="fecha_ingreso"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="fecha_ingreso"
                                    value={expediente.fechaDeInicio}
                                    onChange={ev => setExpediente({...expediente,fechaDeInicio: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="balke"
                                    className="text-slate-800"
                                >
                                    Balke:
                                </label>
                                <select id="balke" name="balke" className='mt-2 w-full p-3' value={(expediente.balke === 1||expediente.balke==="true"?"true":"false")} onChange={ev => setExpediente({...expediente,balke: ev.target.value})}>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="bruce"
                                    className="text-slate-800"
                                >
                                    Bruce:
                                </label>
                                <select id="bruce" name="bruce" className='mt-2 w-full p-3' value={(expediente.bruce === 1||expediente.bruce==="true"?"true":"false")} onChange={ev => setExpediente({...expediente,bruce: ev.target.value})}>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="ciclo"
                                    className="text-slate-800"
                                >
                                    Ciclo:
                                </label>
                                <select id="ciclo" name="ciclo" className='mt-2 w-full p-3' value={(expediente.ciclo === 1||expediente.ciclo==="true"?"true":"false")} onChange={ev => setExpediente({...expediente,ciclo: ev.target.value})}>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="banda"
                                    className="text-slate-800"
                                >
                                    Banda:
                                </label>
                                <select id="banda" name="banda" className='mt-2 w-full p-3' value={(expediente.banda === 1||expediente.banda==="true"?"true":"false")} onChange={ev => setExpediente({...expediente,banda: ev.target.value})}>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="medicion_gases"
                                    className="text-slate-800"
                                >
                                    Medicion de Gases:
                                </label>
                                <select id="medicion_gases" name="medicion_gases" className='mt-2 w-full p-3' value={(expediente.medicionGases === 1||expediente.medicionGases==="true"?"true":"false")} onChange={ev => setExpediente({...expediente,medicionGases: ev.target.value})}>
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
                                    className="mt-2 w-full p-3 bg-gray-50 "
                                    name="fc_basal"
                                    value={expediente.fcBasal}
                                    onChange={ev => setExpediente({...expediente,fcBasal: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="tas_basal_brazo"
                                    className="text-slate-800"
                                >
                                    TAS Basal(brazo):
                                </label>
                                <input
                                    type="number"
                                    id="tas_basal_brazo"
                                    className="mt-2 w-full p-3 bg-gray-50 "
                                    name="tas_basal_brazo"
                                    value={expediente.tasBasal}
                                    onChange={ev => setExpediente({...expediente,tasBasal: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="tad_basal"
                                    className="text-slate-800"
                                >
                                    TAD Basal:
                                </label>
                                <input
                                    type="number"
                                    id="tad_basal"
                                    className="mt-2 w-full p-3 bg-gray-50 "
                                    name="tad_basal"
                                    value={expediente.tadBasal}
                                    onChange={ev => setExpediente({...expediente,tadBasal: ev.target.value})}
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
                                    value={expediente.fcBorg12}
                                    onChange={ev => setExpediente({...expediente,fcBorg12: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="tas_borg_12"
                                    className="text-slate-800"
                                >
                                    TAS Borg 12:
                                </label>
                                <input
                                    type="number"
                                    id="tas_borg_12"
                                    className="mt-2 w-full p-3 bg-gray-50 "
                                    name="tas_borg_12"
                                    value={expediente.tasBorg12}
                                    onChange={ev => setExpediente({...expediente,tasBorg12: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="tad_borg_12"
                                    className="text-slate-800"
                                >
                                    TAD Borg 12:
                                </label>
                                <input
                                    type="number"
                                    id="tad_borg_12"
                                    className="mt-2 w-full p-3 bg-gray-50 "
                                    name="tad_borg_12"
                                    value={expediente.tadBorg12}
                                    onChange={ev => setExpediente({...expediente,tadBorg12: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="50_w"
                                    className="text-slate-800"
                                >
                                    50%W:
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    id="50_w"
                                    className="mt-2 w-full p-3 bg-gray-50 "
                                    name="50_w"
                                    value={expediente.w_50}
                                    onChange={ev => setExpediente({...expediente,w_50: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="fc_50_w"
                                    className="text-slate-800"
                                >
                                    FC50%W:
                                </label>
                                <input
                                    type="number"
                                    id="fc_50_w"
                                    className="mt-2 w-full p-3 bg-gray-50 "
                                    name="fc_50_w"
                                    value={expediente.fc_w_50}
                                    onChange={ev => setExpediente({...expediente,fc_w_50: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="tas_50_w"
                                    className="text-slate-800"
                                >
                                    TAS50%W:
                                </label>
                                <input
                                    type="number"
                                    id="tas_50_w"
                                    className="mt-2 w-full p-3 bg-gray-50 "
                                    name="tas_50_w"
                                    value={expediente.tas_w_50}
                                    onChange={ev => setExpediente({...expediente,tas_w_50: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="tad_50_w"
                                    className="text-slate-800"
                                >
                                    TAD50%W:
                                </label>
                                <input
                                    type="number"
                                    id="tad_50_w"
                                    className="mt-2 w-full p-3 bg-gray-50 "
                                    name="tad_50_w"
                                    value={expediente.tad_w_50}
                                    onChange={ev => setExpediente({...expediente,tad_w_50: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="borg_50_w"
                                    className="text-slate-800"
                                >
                                    Borg50%W:
                                </label>
                                <input
                                    type="number"
                                    id="borg_50_w"
                                    className="mt-2 w-full p-3 bg-gray-50 "
                                    name="borg_50_w"
                                    value={expediente.borg_w_50}
                                    onChange={ev => setExpediente({...expediente,borg_w_50: ev.target.value})}
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
                                    id="fc_max"
                                    className="mt-2 w-full p-3 bg-gray-50 "
                                    name="fc_max"
                                    value={expediente.fcMax}
                                    onChange={ev => setExpediente({...expediente,fcMax: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="tas_max"
                                    className="text-slate-800"
                                >
                                    TAS Max:
                                </label>
                                <input
                                    type="number"
                                    id="tas_max"
                                    className="mt-2 w-full p-3 bg-gray-50 "
                                    name="tas_max"
                                    value={expediente.tasMax}
                                    onChange={ev => setExpediente({...expediente,tasMax: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="tad_max"
                                    className="text-slate-800"
                                >
                                    TAD Max:
                                </label>
                                <input
                                    type="number"
                                    id="tad_max"
                                    className="mt-2 w-full p-3 bg-gray-50 "
                                    name="tad_max"
                                    value={expediente.tadMax}
                                    onChange={ev => setExpediente({...expediente,tadMax: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="borg_max"
                                    className="text-slate-800"
                                >
                                    Borg Max:
                                </label>
                                <input
                                    type="number"
                                    id="borg_max"
                                    className="mt-2 w-full p-3 bg-gray-50 "
                                    name="borg_max"
                                    value={expediente.borgMax}
                                    onChange={ev => setExpediente({...expediente,borgMax: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="motivo_susp"
                                    className="text-slate-800"
                                >
                                    Motivo Susp.:
                                </label>
                                <select id="motivo_susp" name="motivo_susp" className='mt-2 w-full p-3' value={expediente.motivoSuspension} onChange={ev => setExpediente({...expediente,motivoSuspension: ev.target.value})}>
                                    <option value="fatiga">Fatiga</option>
                                    <option value="angina">Angina</option>
                                    <option value="desnivelSt">Desnivel ST</option>
                                    <option value="arritmias">Arritmias</option>
                                    <option value="bloqueos">Bloqueos</option>
                                    <option value="claudicacion">Claudicación</option>
                                    <option value="disnea">Disnea</option>
                                    <option value="mareos">Mareos</option>
                                    <option value="hipoperfusion">Hipoperfusión</option>
                                    <option value="resp_hipotensiva">Resp. Hipotensiva</option>
                                    <option value="resp_hipertensiva">Resp. Hipertensiva</option>
                                    <option value="voluntaria">Volutaria</option>
                                    <option value="dific_tecnicas">Dific. Técnicas</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="pba_submax"
                                    className="text-slate-800"
                                >
                                    Pba. Submáx:
                                </label>
                                <select id="pba_submax" name="pba_submax" className='mt-2 w-full p-3' value={(expediente.pba_submax === 1||expediente.pba_submax==="true"?"true":"false")} onChange={ev => setExpediente({...expediente,pba_submax: ev.target.value})}>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="fc_mayor_85"
                                    className="text-slate-800"
                                >
                                    FC &gt;85%:
                                </label>
                                <select id="fc_mayor_85" name="fc_mayor_85" className='mt-2 w-full p-3' value={(expediente.fc_mayor_50 === 1||expediente.fc_mayor_50==="true"?"true":"false")} onChange={ev => setExpediente({...expediente,fc_mayor_50: ev.target.value})}>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="fc_1er_min"
                                    className="text-slate-800"
                                >
                                    FC 1er min Rec:
                                </label>
                                <input
                                    type="number"
                                    id="fc_1er_min"
                                    className="mt-2 w-full p-3 bg-gray-50 "
                                    name="fc_1er_min"
                                    value={expediente.fc_1er_min}
                                    onChange={ev => setExpediente({...expediente,fc_1er_min: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="tas_1er_min"
                                    className="text-slate-800"
                                >
                                    TAS 1er min Rec:
                                </label>
                                <input
                                    type="number"
                                    id="tas_1er_min"
                                    className="mt-2 w-full p-3 bg-gray-50 "
                                    name="tas_1er_min"
                                    value={expediente.tas_1er_min}
                                    onChange={ev => setExpediente({...expediente,tas_1er_min: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="tad_1er_min"
                                    className="text-slate-800"
                                >
                                    TAD 1er min Rec:
                                </label>
                                <input
                                    type="number"
                                    id="tad_1er_min"
                                    className="mt-2 w-full p-3 bg-gray-50 "
                                    name="tad_1er_min"
                                    value={expediente.tad_1er_min}
                                    onChange={ev => setExpediente({...expediente,tad_1er_min: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="borg_1er_min"
                                    className="text-slate-800"
                                >
                                    Borg 1er min Rec:
                                </label>
                                <input
                                    type="number"
                                    id="borg_1er_min"
                                    className="mt-2 w-full p-3 bg-gray-50 "
                                    name="borg_1er_min"
                                    value={expediente.borg_1er_min}
                                    onChange={ev => setExpediente({...expediente,borg_1er_min: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="fc_3er_min"
                                    className="text-slate-800"
                                >
                                    FC 3er min Rec:
                                </label>
                                <input
                                    type="number"
                                    id="fc_3er_min"
                                    className="mt-2 w-full p-3 bg-gray-50 "
                                    name="fc_3er_min"
                                    value={expediente.fc_3er_min}
                                    onChange={ev => setExpediente({...expediente,fc_3er_min: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="tas_3er_min"
                                    className="text-slate-800"
                                >
                                    TAS 3er min Rec:
                                </label>
                                <input
                                    type="number"
                                    id="tas_3er_min"
                                    className="mt-2 w-full p-3 bg-gray-50 "
                                    name="tas_3er_min"
                                    value={expediente.tas_3er_min}
                                    onChange={ev => setExpediente({...expediente,tas_3er_min: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="tad_3er_min"
                                    className="text-slate-800"
                                >
                                    TAD 3er min Rec:
                                </label>
                                <input
                                    type="number"
                                    id="tad_3er_min"
                                    className="mt-2 w-full p-3 bg-gray-50 "
                                    name="tad_3er_min"
                                    value={expediente.tad_3er_min}
                                    onChange={ev => setExpediente({...expediente,tad_3er_min: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="borg_3er_min"
                                    className="text-slate-800"
                                >
                                    Borg 3er min Rec:
                                </label>
                                <input
                                    type="number"
                                    id="borg_3er_min"
                                    className="mt-2 w-full p-3 bg-gray-50 "
                                    name="borg_3er_min"
                                    value={expediente.borg_3er_min}
                                    onChange={ev => setExpediente({...expediente,borg_3er_min: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="fc_5to_min"
                                    className="text-slate-800"
                                >
                                    FC 5to min Rec:
                                </label>
                                <input
                                    type="number"
                                    id="fc_5to_min"
                                    className="mt-2 w-full p-3 bg-gray-50 "
                                    name="fc_5to_min"
                                    value={expediente.fc_5to_min}
                                    onChange={ev => setExpediente({...expediente,fc_5to_min: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="tas_5to_min"
                                    className="text-slate-800"
                                >
                                    TAS 5to min Rec:
                                </label>
                                <input
                                    type="number"
                                    id="tas_5to_min"
                                    className="mt-2 w-full p-3 bg-gray-50 "
                                    name="tas_5to_min"
                                    value={expediente.tas_5to_min}
                                    onChange={ev => setExpediente({...expediente,tas_5to_min: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="tad_5to_min"
                                    className="text-slate-800"
                                >
                                    TAD 5to min Rec:
                                </label>
                                <input
                                    type="number"
                                    id="tad_5to_min"
                                    className="mt-2 w-full p-3 bg-gray-50 "
                                    name="tad_5to_min"
                                    value={expediente.tad_5to_min}
                                    onChange={ev => setExpediente({...expediente,tad_5to_min: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="fc_8vo_min"
                                    className="text-slate-800"
                                >
                                    FC 8vo min Rec:
                                </label>
                                <input
                                    type="number"
                                    id="fc_8vo_min"
                                    className="mt-2 w-full p-3 bg-gray-50 "
                                    name="fc_8vo_min"
                                    value={expediente.fc_8vo_min}
                                    onChange={ev => setExpediente({...expediente,fc_8vo_min: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="tas_8vo_min"
                                    className="text-slate-800"
                                >
                                    TAS 8vo min Rec:
                                </label>
                                <input
                                    type="number"
                                    id="tas_8vo_min"
                                    className="mt-2 w-full p-3 bg-gray-50 "
                                    name="tas_8vo_min"
                                    value={expediente.tas_8vo_min}
                                    onChange={ev => setExpediente({...expediente,tas_8vo_min: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="tad_8vo_min"
                                    className="text-slate-800"
                                >
                                    TAD 8vo min Rec:
                                </label>
                                <input
                                    type="number"
                                    id="tad_8vo_min"
                                    className="mt-2 w-full p-3 bg-gray-50 "
                                    name="tad_8vo_min"
                                    value={expediente.tad_8vo_min}
                                    onChange={ev => setExpediente({...expediente,tad_8vo_min: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="fc_u_isq"
                                    className="text-slate-800"
                                >
                                    FC (U.Isq):
                                </label>
                                <input
                                    type="number"
                                    id="fc_u_isq"
                                    className="mt-2 w-full p-3 bg-gray-50 "
                                    name="fc_u_isq"
                                    value={expediente.fc_U_isq}
                                    onChange={ev => setExpediente({...expediente,fc_U_isq: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="tas_u_isq"
                                    className="text-slate-800"
                                >
                                    TAS (U. Isq):
                                </label>
                                <input
                                    type="number"
                                    id="tas_u_isq"
                                    className="mt-2 w-full p-3 bg-gray-50 "
                                    name="tas_u_isq"
                                    value={expediente.tas_U_isq}
                                    onChange={ev => setExpediente({...expediente,tas_U_isq: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="tad_u_isq"
                                    className="text-slate-800"
                                >
                                    TAD (U. Isq):
                                </label>
                                <input
                                    type="number"
                                    id="tad_u_isq"
                                    className="mt-2 w-full p-3 bg-gray-50 "
                                    name="tad_u_isq"
                                    value={expediente.tad_U_isq}
                                    onChange={ev => setExpediente({...expediente,tad_U_isq: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="borg_u_isq"
                                    className="text-slate-800"
                                >
                                    Borg (U. Isq):
                                </label>
                                <input
                                    type="number"
                                    id="borg_u_isq"
                                    className="mt-2 w-full p-3 bg-gray-50 "
                                    name="borg_u_isq"
                                    value={expediente.borg_U_isq}
                                    onChange={ev => setExpediente({...expediente,borg_U_isq: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="score_angina"
                                    className="text-slate-800"
                                >
                                    Score de Angina:
                                </label>
                                <input
                                    type="number"
                                    id="score_angina"
                                    className="mt-2 w-full p-3 bg-gray-50 "
                                    name="score_angina"
                                    value={expediente.scoreAngina}
                                    onChange={ev => setExpediente({...expediente,scoreAngina: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="arritmias"
                                    className="text-slate-800"
                                >
                                    Arritmias:
                                </label>
                                <select id="arritmias" name="arritmias" className='mt-2 w-full p-3' value={(expediente.arritmias === 1||expediente.arritmias==="true"?"true":"false")} onChange={ev => setExpediente({...expediente,arritmias: ev.target.value})}>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="tipo_arritmias"
                                    className="text-slate-800"
                                >
                                    Tipo de arritmias:
                                </label>
                                <input
                                    type="text"
                                    id="tipo_arritmias"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="tipo_arritmias"
                                    value={expediente.tipoArritmias}
                                    onChange={ev => setExpediente({...expediente,tipoArritmias: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="arritmia_positiva"
                                    className="text-slate-800"
                                >
                                    Positiva:
                                </label>
                                <select id="arritmia_positiva" name="arritmia_positiva" className='mt-2 w-full p-3' value={(expediente.positiva === 1||expediente.positiva==="true"?"true":"false")} onChange={ev => setExpediente({...expediente,positiva: ev.target.value})}>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="tipo_cambio_electrico"
                                    className="text-slate-800"
                                >
                                    Tipo cambio eléctrico:
                                </label>
                                <input
                                    type="text"
                                    id="tipo_cambio_electrico"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="tipo_cambio_electrico"
                                    value={expediente.tipoCambioElectrico}
                                    onChange={ev => setExpediente({...expediente,tipoCambioElectrico: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="max_infradesnivel"
                                    className="text-slate-800"
                                >
                                    Max Infradesnivel:
                                </label>
                                <input
                                    type="number"
                                    id="max_infradesnivel"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="max_infradesnivel"
                                    value={expediente.MaxInfra}
                                    onChange={ev => setExpediente({...expediente,MaxInfra: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="riesgo"
                                    className="text-slate-800"
                                >
                                    Riesgo:
                                </label>
                                <input
                                    type="text"
                                    id="riesgo"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="riesgo"
                                    value={expediente.riesgo}
                                    onChange={ev => setExpediente({...expediente,riesgo: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="vel_borg"
                                    className="text-slate-800"
                                >
                                    Vel Borg(MPH):
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    id="vel_borg"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="vel_borg"
                                    value={expediente.vel_borg_12}
                                    onChange={ev => setExpediente({...expediente,vel_borg_12: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="inclin_borg"
                                    className="text-slate-800"
                                >
                                    Inclin Borg 12:
                                </label>
                                <input
                                    type="number"
                                    id="inclin_borg"
                                    step="0.01"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="inclin_borg"
                                    value={expediente.inclin_borg_12}
                                    onChange={ev => setExpediente({...expediente,inclin_borg_12: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="watts_ciclo_b"
                                    className="text-slate-800"
                                >
                                    Watts Ciclo B 12:
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    id="watts_ciclo_b"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="watts_ciclo_b"
                                    value={expediente.watts_ciclo_b_12}
                                    onChange={ev => setExpediente({...expediente,watts_ciclo_b_12: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="vel_max"
                                    className="text-slate-800"
                                >
                                    Vel max (MPH):
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    id="vel_max"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="vel_max"
                                    value={expediente.vel_max}
                                    onChange={ev => setExpediente({...expediente,vel_max: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="incl_max"
                                    className="text-slate-800"
                                >
                                    Incl Max:
                                </label>
                                <input
                                    type="number"
                                    id="incl_max"
                                    step="0.01"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="incl_max"
                                    value={expediente.incl_max}
                                    onChange={ev => setExpediente({...expediente,incl_max: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="watts_ciclo_max"
                                    className="text-slate-800"
                                >
                                    Watts ciclo Max:
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    id="watts_ciclo_max"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="watts_ciclo_max"
                                    value={expediente.watts_ciclo_max}
                                    onChange={ev => setExpediente({...expediente,watts_ciclo_max: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="vel_um_isq"
                                    className="text-slate-800"
                                >
                                    Vel Um Isq(MPH):
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    id="vel_um_isq"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="vel_um_isq"
                                    value={expediente.vel_um_isq}
                                    onChange={ev => setExpediente({...expediente,vel_um_isq: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="incl_um_isq"
                                    className="text-slate-800"
                                >
                                    Incl Um Isq(MPH):
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    id="incl_um_isq"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="incl_um_isq"
                                    value={expediente.incl_um_isq}
                                    onChange={ev => setExpediente({...expediente,incl_um_isq: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="watts_ciclo_um_isq"
                                    className="text-slate-800"
                                >
                                    Watts Ciclo U. Isq(MPH):
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    id="watts_ciclo_um_isq"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="watts_ciclo_um_isq"
                                    value={expediente.watts_ciclo_u_isq}
                                    onChange={ev => setExpediente({...expediente,watts_ciclo_u_isq: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="vo2_max_gases"
                                    className="text-slate-800"
                                >
                                    VO2max (gases):
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    id="vo2_max_gases"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="vo2_max_gases"
                                    value={expediente.vo2_max_gases}
                                    onChange={ev => setExpediente({...expediente,vo2_max_gases: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="vo2_pico_gases"
                                    className="text-slate-800"
                                >
                                    VO2pico (gases):
                                </label>
                                <input
                                    type="number"
                                    id="vo2_pico_gases"
                                    step="0.01"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="vo2_pico_gases"
                                    value={expediente.vo2_pico_gases}
                                    onChange={ev => setExpediente({...expediente,vo2_pico_gases: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="vo2_borg_12_gases"
                                    className="text-slate-800"
                                >
                                    VO2 Borg 12 (gases):
                                </label>
                                <input
                                    type="number"
                                    id="vo2_borg_12_gases"
                                    step="0.01"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="vo2_borg_12_gases"
                                    value={expediente.vo2_borg_gases}
                                    onChange={ev => setExpediente({...expediente,vo2_borg_gases: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="r_qmax"
                                    className="text-slate-800"
                                >
                                    R/Qmax:
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    id="r_qmax"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="r_qmax"
                                    value={expediente.r_qmax}
                                    onChange={ev => setExpediente({...expediente,r_qmax: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="umbral_aer"
                                    className="text-slate-800"
                                >
                                    Umbral Aer/Anaer:
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    id="umbral_aer"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="umbral_aer"
                                    value={expediente.umbral_aeer_anaer}
                                    onChange={ev => setExpediente({...expediente,umbral_aeer_anaer: ev.target.value})}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="po2_teor"
                                    className="text-slate-800"
                                >
                                    %PO2 Teor:
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    id="po2_teor"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="po2_teor"
                                    value={expediente.po2_teor}
                                    onChange={ev => setExpediente({...expediente,po2_teor: ev.target.value})}
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
                                    className="mt-2 w-full p-3 h-11 bg-gray-50"
                                    name="comentarios"
                                    value={expediente.conclusiones}
                                    onChange={ev => setExpediente({...expediente,conclusiones: ev.target.value})}
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
    </div>
    </>
  )
}
