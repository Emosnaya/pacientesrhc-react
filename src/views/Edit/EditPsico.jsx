import React, { useEffect } from 'react'
import { usevalue, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import Header from '../../components/Header';
import clienteAxios from '../../axios-client';

export default function EditPsico() {
    const token = localStorage.getItem('AUTH_TOKEN')
    const {id} = useParams()
    const [errores, setErrores] = useState(null)
    const navigate = useNavigate()
    const [expediente, setExpediente] = useState([]);

    if(id) {
        useEffect(() => {
            clienteAxios.get(`/api/psicolog/${id}`,{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            .then(({data}) => {
                setExpediente(data)
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
                clienteAxios.put(`/api/psico/${expediente.id}`, expediente,{
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

    const imprimirExpediente = expediente => {
        const nutricional = `/api/psico/imprimir/${expediente.id}`;
  
            try {
                clienteAxios.get(nutricional, { 
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
    <Header titulo ="Editar Nota Psicológica"/>
    <div className="">
            <form action="" onSubmit={onSubmit}>
                        <div className='grid lg:grid-cols-4 grid-cols-1 mt-5 px-5 py-10 gap-2'>

                            <div className="mb-4 col-start-1 col-end-5">
                                <label
                                    htmlFor="motivo_consulta"
                                    className="text-slate-800"
                                >
                                    Motivo de Consulta:
                                </label>
                                <textarea
                                    type="text"
                                    id="motivo_consulta"
                                    className="mt-2 w-full p-3 bg-gray-50 border-2 "
                                    name="motivo_consulta"
                                    value={expediente.motivo_consulta}
                                    onChange={ev => setExpediente({...expediente,motivo_consulta: ev.target.value})}
                                    
                                />
                            </div>
                            <div className="mb-4 col-start-1 col-end-5">
                                <label
                                    htmlFor="antecedentes_medicos"
                                    className="text-slate-800"
                                >
                                    Antecedentes Médicos:
                                </label>
                                <textarea
                                    type="text"
                                    id="antecedentes_medicos"
                                    className="mt-2 w-full p-3 bg-gray-50 border-2 "
                                    name="antecedentes_medicos"
                                    onChange={ev => setExpediente({...expediente,antecedentes_medicos: ev.target.value})}
                                    value={expediente.antecedentes_medicos}                                     
                                />
                            </div>
                            <div className="mb-4 col-start-1 col-end-5 lg:col-end-3">
                                <label
                                    htmlFor="cirugias_previas"
                                    className="text-slate-800"
                                >
                                    Cirugías Previas:
                                </label>
                                <textarea
                                    type="text"
                                    id="cirugias_previas"
                                    className="mt-2 w-full p-3 bg-gray-50 border-2 "
                                    name="cirugias_previas"
                                    onChange={ev => setExpediente({...expediente,cirugias_previas: ev.target.value})}
                                    value={expediente.cirugias_previas}  
                                />
                            </div>
                            <div className="mb-4 col-start-1 lg:col-start-3  col-end-5">
                                <label
                                    htmlFor="antecedentes_familiares"
                                    className="text-slate-800"
                                >
                                    Antecedentes Familiares:
                                </label>
                                <textarea
                                    type="text"
                                    id="antecedentes_familiares"
                                    className="mt-2 w-full p-3 bg-gray-50 border-2 "
                                    name="antecedentes_familiares"
                                    onChange={ev => setExpediente({...expediente,antecedentes_familiares: ev.target.value})}
                                    value={expediente.antecedentes_familiares} 
                                />
                            </div>
                            <div className="mb-4 col-start-1 col-end-5">
                                <label
                                    htmlFor="tratamiento_actual"
                                    className="text-slate-800"
                                >
                                    Tratamiento Actual:
                                </label>
                                <textarea
                                    type="text"
                                    id="tratamiento_actual"
                                    className="mt-2 w-full p-3 bg-gray-50 border-2 "
                                    name="tratamiento_actual"
                                    onChange={ev => setExpediente({...expediente,tratamiento_actual: ev.target.value})}
                                    value={expediente.tratamiento_actual} 
                                />
                            </div>
                            <div className="mb-4 col-start-1 col-end-5">
                                <label
                                    htmlFor="aspectos_sociales"
                                    className="text-slate-800"
                                >
                                    Aspectos Sociales:
                                </label>
                                <textarea
                                    type="text"
                                    id="aspectos_sociales"
                                    className="mt-2 w-full p-3 bg-gray-50 border-2 "
                                    name="aspectos_sociales"
                                    onChange={ev => setExpediente({...expediente,aspectos_sociales: ev.target.value})}
                                    value={expediente.aspectos_sociales} 
                                />
                            </div>
                            <div className="mb-4 col-start-1 col-end-5  lg:col-end-3">
                                <label
                                    htmlFor="escalas_utilizadas"
                                    className="text-slate-800"
                                >
                                    Escalas Utilizadas:
                                </label>
                                <textarea
                                    type="text"
                                    id="escalas_utilizadas"
                                    className="mt-2 w-full p-3 bg-gray-50 border-2 "
                                    name="escalas_utilizadas"
                                    onChange={ev => setExpediente({...expediente,escalas_utilizadas: ev.target.value})}
                                    value={expediente.escalas_utilizadas}  
                                />
                            </div>
                            <div className="mb-4 col-start-1 lg:col-start-3  col-end-5">
                                <label
                                    htmlFor="sintomas_actuales"
                                    className="text-slate-800"
                                >
                                    Sintomas Actuales:
                                </label>
                                <textarea
                                    type="text"
                                    id="sintomas_actuales"
                                    className="mt-2 w-full p-3 bg-gray-50 border-2 "
                                    name="sintomas_actuales"
                                    onChange={ev => setExpediente({...expediente,sintomas_actuales: ev.target.value})}
                                    value={expediente.sintomas_actuales}
                                />
                            </div>
                            <div className="mb-4 col-start-1 col-end-5">
                                <label
                                    htmlFor="plan_tratamiento"
                                    className="text-slate-800"
                                >
                                    Plan de Tratamiento Psicoterapia:
                                </label>
                                <textarea
                                    type="text"
                                    id="plan_tratamiento"
                                    className="mt-2 w-full p-3 bg-gray-50 border-2 "
                                    name="plan_tratamiento"
                                    onChange={ev => setExpediente({...expediente,plan_tratamiento: ev.target.value})}
                                    value={expediente.plan_tratamiento}
                                />
                            </div>
                            <div className="mb-4 col-start-1 col-end-5">
                                <label
                                    htmlFor="seguimiento"
                                    className="text-slate-800"
                                >
                                    Seguimiento:
                                </label>
                                <textarea
                                    type="text"
                                    id="seguimiento"
                                    className="mt-2 w-full p-3 bg-gray-50 border-2 "
                                    name="seguimiento"
                                    onChange={ev => setExpediente({...expediente,seguimiento: ev.target.value})}
                                    value={expediente.seguimiento}
                                />
                            </div>
                            <h2 className="text-2xl font-bold">Salud Física</h2>
                            <div className="mb-4 col-start-1 col-end-5 lg:col-end-3">
                                <label
                                    htmlFor="calif_salud"
                                    className="text-slate-800"
                                >
                                   ¿Cómo calificarías tu estado de salud general?
                                </label>
                                <select name="calif_salud" id="calif_salud" className="mt-2 w-full p-3 bg-gray-50 border-2" onChange={ev => setExpediente({...expediente,calif_salud: ev.target.value})} value={expediente.calif_salud}>
                                    <option value=""></option>
                                    <option value="1">Excelente</option>
                                    <option value="2">Bueno</option>
                                    <option value="3">Regular</option>
                                    <option value="4">Malo</option>
                                </select>
                            </div>
                            <div className="mb-4 col-start-1 lg:col-start-3  col-end-5">
                                <label
                                    htmlFor="realizas_ejercicio"
                                    className="text-slate-800"
                                >
                                   ¿Realizas ejercicio físico regularmente?
                                </label>
                                <select name="realizas_ejercicio" id="realizas_ejercicio" className="mt-2 w-full p-3 bg-gray-50 border-2" onChange={ev => setExpediente({...expediente,realizas_ejercicio: ev.target.value})} value={expediente.realizas_ejercicio==1?"true":"false"} >
                                <option value=""></option>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4 col-start-1 col-end-5 lg:col-end-3">
                                <label
                                    htmlFor="ejercicio_frecuencia"
                                    className="text-slate-800"
                                >
                                   Si es así, ¿con qué frecuencia?
                                </label>
                                <select name="ejercicio_frecuencia" id="ejercicio_frecuencia" className="mt-2 w-full p-3 bg-gray-50 border-2" onChange={ev => setExpediente({...expediente,ejercicio_frecuencia: ev.target.value})} value={expediente.ejercicio_frecuencia} >
                                <option value="">N/A</option>
                                    <option value="1">Diariamente</option>
                                    <option value="2">3-4 veces por semana</option>
                                    <option value="3">1-2 veces por semana</option>
                                    <option value="4">Raramente</option>
                                </select>
                            </div>
                            <div className="mb-4 col-start-1 lg:col-start-3  col-end-5">
                                <label
                                    htmlFor="condicion_medica"
                                    className="text-slate-800"
                                >
                                   ¿Tienes alguna condición médica crónica?
                                </label>
                                <select name="condicion_medica" id="condicion_medica" className="mt-2 w-full p-3 bg-gray-50 border-2" onChange={ev => setExpediente({...expediente,condicion_medica: ev.target.value})} value={expediente.condicion_medica==1?"true":"false"} >
                                    <option value=""></option>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <h2 className="text-2xl font-bold">Alimentación</h2>
                            <div className="mb-4 col-start-1 col-end-5 lg:col-end-3">
                                <label
                                    htmlFor="dieta_diaria"
                                    className="text-slate-800"
                                >
                                   ¿Cómo describirías tu dieta diaria?
                                </label>
                                <select name="dieta_diaria" id="dieta_diaria" className="mt-2 w-full p-3 bg-gray-50 border-2" onChange={ev => setExpediente({...expediente,dieta_diaria: ev.target.value})} value={expediente.dieta_diaria}>
                                <option value=""></option>
                                    <option value="1">Equilibrada</option>
                                    <option value="2">Altas en grasas</option>
                                    <option value="3">Alta de azucares</option>
                                    <option value="4">Insuficiente</option>
                                </select>
                            </div>
                            <div className="col-start-1 lg:col-start-3  col-end-5">
                                <label
                                    htmlFor="frutas_verduras"
                                    className="text-slate-800"
                                >
                                   ¿Comes frutas y verduras diariamente?
                                </label>
                                <select name="frutas_verduras" id="frutas_verduras" className="mt-2 w-full p-3 bg-gray-50 border-2" onChange={ev => setExpediente({...expediente,frutas_verduras: ev.target.value})} value={expediente.frutas_verduras==0?"false":"true"} >
                                <option value=""></option>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4 col-start-1 col-end-5 lg:col-end-3">
                                <label
                                    htmlFor="frecuencia_comida"
                                    className="text-slate-800"
                                >
                                   ¿Con qué frecuencia comes fuera de casa?
                                </label>
                                <select name="frecuencia_comida" id="frecuencia_comida" className="mt-2 w-full p-3 bg-gray-50 border-2" onChange={ev => setExpediente({...expediente,frecuencia_comida: ev.target.value})} value={expediente.frecuencia_comida}>
                                <option value=""></option>
                                    <option value="diariamente">Diariamente</option>
                                    <option value="semanalmente">Semanalmente</option>
                                    <option value="raramente">Raramente</option>
                                </select>
                            </div>
                            <h2 className="text-2xl font-bold  col-start-1 lg:col-end-3">Salud Mental y Emocional</h2>
                            <div className="mb-4 col-start-1 col-end-5 lg:col-end-3">
                                <label
                                    htmlFor="feliz"
                                    className="text-slate-800"
                                >
                                   ¿Te sientes feliz la mayor parte del tiempo? 
                                </label>
                                <select name="feliz" id="feliz" className="mt-2 w-full p-3 bg-gray-50 border-2" onChange={ev => setExpediente({...expediente,feliz: ev.target.value})} value={expediente.feliz==1?"true":"false"} >
                                <option value=""></option>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4 col-start-1 lg:col-start-3  col-end-5">
                                <label
                                    htmlFor="apoyo_emocional"
                                    className="text-slate-800"
                                >
                                   ¿Tienes apoyo emocional de amigos o familiares? 
                                </label>
                                <select name="apoyo_emocional" id="apoyo_emocional" className="mt-2 w-full p-3 bg-gray-50 border-2" onChange={ev => setExpediente({...expediente,apoyo_emocional: ev.target.value})} value={expediente.apoyo_emocional==1?"true":"false"} >
                                <option value=""></option>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4 col-start-1 col-end-5 lg:col-end-3">
                                <label
                                    htmlFor="estres_nivel"
                                    className="text-slate-800"
                                >
                                   Del 1 al 10, ¿cómo calificarías tu nivel de estrés actual?
                                </label>
                                <input type="number"
                                    id="estres_nivel"
                                    className="mt-2 w-full p-3 bg-gray-50 border-2 "
                                    name="estres_nivel"
                                    onChange={ev => setExpediente({...expediente,estres_nivel: ev.target.value})}
                                    value={expediente.estres_nivel}
                                />
                            </div>
                            <h2 className="text-2xl font-bold  col-start-1 lg:col-end-3">Vida Social</h2>
                            <div className="mb-4 col-start-1 lg:col-end-3 col-end-5">
                                <label
                                    htmlFor="frecuencia_reuniones"
                                    className="text-slate-800"
                                >
                                   ¿Con qué frecuencia te reúnes con amigos o familiares? 
                                </label>
                                <select name="frecuencia_reuniones" id="frecuencia_reuniones" className="mt-2 w-full p-3 bg-gray-50 border-2" onChange={ev => setExpediente({...expediente,frecuencia_reuniones: ev.target.value})} value={expediente.frecuencia_reuniones} >
                                <option value=""></option>
                                    <option value="true">Diariamente</option>
                                    <option value="semanalmente">Semanalmente</option>
                                    <option value="mensualmente">Mensualmente</option>
                                    <option value="raramente">Raramente</option>
                                </select>
                            </div>
                            <div className="mb-4 col-start-1 lg:col-start-3  col-end-5">
                                <label
                                    htmlFor="actividades_comunitarias"
                                    className="text-slate-800"
                                >
                                   ¿Participas en actividades comunitarias o grupos sociales? 
                                </label>
                                <select name="actividades_comunitarias" id="actividades_comunitarias" className="mt-2 w-full p-3 bg-gray-50 border-2" onChange={ev => setExpediente({...expediente,actividades_comunitarias: ev.target.value})} value={expediente.actividades_comunitarias==1?"true":"false"} >
                                <option value=""></option>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4 col-start-1 lg:col-end-3 col-end-5">
                                <label
                                    htmlFor="comunidad"
                                    className="text-slate-800"
                                >
                                   ¿Te sientes parte de tu comunidad?
                                </label>
                                <select name="comunidad" id="comunidad" className="mt-2 w-full p-3 bg-gray-50 border-2" onChange={ev => setExpediente({...expediente,comunidad: ev.target.value})} value={expediente.comunidad==1?"true":"false"}>
                                <option value=""></option>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <h2 className="text-2xl font-bold  col-start-1 lg:col-end-3">Bienestar Financiero</h2>
                            <div className="mb-4 col-start-1 lg:col-end-3 col-end-5">
                                <label
                                    htmlFor="situa_financiera"
                                    className="text-slate-800"
                                >
                                   ¿Cómo calificarías tu situación financiera actual?
                                </label>
                                <select name="situa_financiera" id="situa_financiera" className="mt-2 w-full p-3 bg-gray-50 border-2"  onChange={ev => setExpediente({...expediente,situa_financiera: ev.target.value})} value={expediente.situa_financiera} >
                                    <option value=""></option>
                                    <option value="1">Excelente</option>
                                    <option value="2">Bueno</option>
                                    <option value="3">Regular</option>
                                    <option value="4">Malo</option>
                                </select>
                            </div>
                            <div className="mb-4 col-start-1 lg:col-start-3  col-end-5">
                                <label
                                    htmlFor="seguro_economico"
                                    className="text-slate-800"
                                >
                                   ¿Te sientes seguro económicamente? 
                                </label>
                                <select name="seguro_economico" id="seguro_economico" className="mt-2 w-full p-3 bg-gray-50 border-2" onChange={ev => setExpediente({...expediente,seguro_economico: ev.target.value})} value={expediente.seguro_economico==1?"true":"false"} >
                                <option value=""></option>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4 col-start-1 lg:col-end-3 col-end-5">
                                <label
                                    htmlFor="ingresos_suficientes"
                                    className="text-slate-800"
                                >
                                   ¿Sientes que tus ingresos son suficientes para cubrir tus necesidades básicas?
                                </label>
                                <select name="ingresos_suficientes" id="ingresos_suficientes" className="mt-2 w-full p-3 bg-gray-50 border-2" onChange={ev => setExpediente({...expediente,ingresos_suficientes: ev.target.value})} value={expediente.ingresos_suficientes==1?"true":"false"} >
                                <option value=""></option>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <h2 className="text-2xl font-bold  col-start-1 lg:col-end-3">Trabajo y Satisfacción Laboral</h2>
                            <div className="mb-4 col-start-1 lg:col-end-3 col-end-5">
                                <label
                                    htmlFor="trabajo_actual"
                                    className="text-slate-800"
                                >
                                   ¿Estás satisfecho con tu trabajo actual?
                                </label>
                                <select name="trabajo_actual" id="trabajo_actual" className="mt-2 w-full p-3 bg-gray-50 border-2" onChange={ev => setExpediente({...expediente,trabajo_actual: ev.target.value})} value={expediente.trabajo_actual==1?"true":"false"}>
                                <option value=""></option>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4 col-start-1 lg:col-start-3  col-end-5">
                                <label
                                    htmlFor="reconocimiento"
                                    className="text-slate-800"
                                >
                                   ¿Recibes reconocimiento por tu trabajo?
                                </label>
                                <select name="reconocimiento" id="reconocimiento" className="mt-2 w-full p-3 bg-gray-50 border-2" onChange={ev => setExpediente({...expediente,reconocimiento: ev.target.value})} value={expediente.reconocimiento==1?"true":"false"}>
                                <option value=""></option>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4 col-start-1 lg:col-end-3 col-end-5">
                                <label
                                    htmlFor="equilibrio_trabajo"
                                    className="text-slate-800"
                                >
                                   ¿Consideras que tienes un buen equilibrio entre el trabajo y la vida personal? 
                                </label>
                                <select name="equilibrio_trabajo" id="equilibrio_trabajo" className="mt-2 w-full p-3 bg-gray-50 border-2" onChange={ev => setExpediente({...expediente,equilibrio_trabajo: ev.target.value})} value={expediente.equilibrio_trabajo==1?"true":"false"}>
                                <option value=""></option>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
    
                            <h2 className="text-2xl font-bold  col-start-1 lg:col-end-3">Consumo de Sustancias</h2>
                            <div className="mb-4 col-start-1 lg:col-end-3 col-end-5">
                                <label
                                    htmlFor="alchol_consumo"
                                    className="text-slate-800"
                                >
                                    ¿Consumes alcohol y, de ser así, con qué frecuencia y en qué cantidades?
                                </label>
                                <textarea
                                    type="text"
                                    id="alchol_consumo"
                                    className="mt-2 w-full p-3 bg-gray-50 border-2 "
                                    name="alchol_consumo"
                                    onChange={ev => setExpediente({...expediente,alchol_consumo: ev.target.value})}
                                    value={expediente.alchol_consumo}
                                />
                            </div>
                            <div className="mb-4 col-start-1 lg:col-start-3  col-end-5">
                                <label
                                    htmlFor="drogas_recreativas"
                                    className="text-slate-800"
                                >
                                    ¿Utilizas drogas recreativas o tienes un historial de abuso de sustancias?
                                </label>
                                <textarea
                                    type="text"
                                    id="drogas_recreativas"
                                    className="mt-2 w-full p-3 bg-gray-50 border-2 "
                                    name="drogas_recreativas"
                                    onChange={ev => setExpediente({...expediente,drogas_recreativas: ev.target.value})}
                                    value={expediente.drogas_recreativas}
                                />
                            </div>
                            <div className="mb-4 col-start-1 lg:col-end-3 col-end-5">
                                <label
                                    htmlFor="tabaco_consumo"
                                    className="text-slate-800"
                                >
                                   ¿Fumas tabaco o utilizas productos de tabaco?
                                </label>
                                <select name="tabaco_consumo" id="tabaco_consumo" className="mt-2 w-full p-3 bg-gray-50 border-2" onChange={ev => setExpediente({...expediente,tabaco_consumo: ev.target.value})} value={expediente.tabaco_consumo==1?"true":"false"} >
                                <option value=""></option>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>

                            <div className="mb-4 col-end-3 lg:col-end-2 mt-2">
                                <label
                                    htmlFor="nutriologo"
                                    className="text-slate-800 font-bold"
                                >
                                    Nombre Psicólogo:
                                </label>
                                <input
                                    type="text"
                                    id="nutriologo"
                                    className="mt-2 w-full p-3 bg-gray-50 border-2 "
                                    name="nutriologo"
                                    onChange={ev => setExpediente({...expediente,psicologo: ev.target.value})}
                                    value={expediente.psicologo}
                                />
                            </div>
                            <div className="mb-4 mt-2">
                                <label
                                    htmlFor="cedula_nutriologo"
                                    className="text-slate-800 font-bold"
                                >
                                    Cédula del Nutriólogo:
                                </label>
                                <input
                                    type="text"
                                    id="cedula_nutriologo"
                                    className="mt-2 w-full p-3 bg-gray-50 border-2 "
                                    name="cedula_nutriologo"
                                    onChange={ev => setExpediente({...expediente,cedula_psicologo: ev.target.value})}
                                    value={expediente.cedula_psicologo}
                                />
                            </div>

                        </div>
                        <div className='flex justify-end'>
                        <button className="bg-blue-500 hover:bg-blue-600 text-white m-5 p-3 uppercase font-bold cursor-pointer" onClick={ev => imprimirExpediente(expediente)} > Imprimir</button>
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
