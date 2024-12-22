import React, { useRef } from 'react'
import clienteAxios from '../axios-client'
import { useNavigate, useParams } from 'react-router-dom';
import useSWR from 'swr'
import Swal from "sweetalert2";

export default function Psicologico() {
    const { id } = useParams();
    const token = localStorage.getItem('AUTH_TOKEN')

  const motivo_consulta = useRef();
  const antecedentes_medicos = useRef();
  const cirugias_previas = useRef();
  const antecedentes_familiares = useRef();
  const tratamiento_actual = useRef();
  const aspectos_sociales = useRef();
  const escalas_utilizadas = useRef();
  const sintomas_actuales = useRef();
  const plan_tratamiento = useRef();
  const seguimiento = useRef();
  const calif_salud = useRef();
  const realizas_ejercicio = useRef();
  const ejercicio_frecuencia = useRef();
  const condicion_medica = useRef();
  const dieta_diaria = useRef();
  const frutas_verduras = useRef();
  const frecuencia_comida = useRef();
  const feliz = useRef();
  const apoyo_emocional = useRef();
  const estres_nivel = useRef();
  const frecuencia_reuniones = useRef();
  const actividades_comunitarias = useRef();
  const comunidad = useRef();
  const situa_financiera = useRef();
  const seguro_economico = useRef();
  const ingresos_suficientes = useRef();
  const trabajo_actual = useRef();
  const reconocimiento = useRef();
  const equilibrio_trabajo = useRef();
  const alchol_consumo = useRef();
  const drogas_recreativas = useRef();
  const tabaco_consumo = useRef();
  const psicologoRef = useRef();
  const cedulaPsicologoRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const datos = {
      motivo_consulta: motivo_consulta.current.value,
      antecedentes_medicos: antecedentes_medicos.current.value,
      cirugias_previas: cirugias_previas.current.value,
      antecedentes_familiares: antecedentes_familiares.current.value,
      tratamiento_actual: tratamiento_actual.current.value,
      aspectos_sociales: aspectos_sociales.current.value,
      escalas_utilizadas: escalas_utilizadas.current.value,
      sintomas_actuales: sintomas_actuales.current.value,
      plan_tratamiento: plan_tratamiento.current.value,
      seguimiento: seguimiento.current.value,
      calif_salud: calif_salud.current.value,
      realizas_ejercicio: realizas_ejercicio.current.value,
      ejercicio_frecuencia: ejercicio_frecuencia.current.value,
      condicion_medica: condicion_medica.current.value,
      dieta_diaria: dieta_diaria.current.value,
      frutas_verduras: frutas_verduras.current.value,
      frecuencia_comida: frecuencia_comida.current.value,
      feliz: feliz.current.value,
      apoyo_emocional: apoyo_emocional.current.value,
      estres_nivel: estres_nivel.current.value,
      frecuencia_reuniones: frecuencia_reuniones.current.value,
      actividades_comunitarias: actividades_comunitarias.current.value,
      comunidad: comunidad.current.value,
      situa_financiera: situa_financiera.current.value,
      seguro_economico: seguro_economico.current.value,
      ingresos_suficientes: ingresos_suficientes.current.value,
      trabajo_actual: trabajo_actual.current.value,
      reconocimiento: reconocimiento.current.value,
      equilibrio_trabajo: equilibrio_trabajo.current.value,
      alchol_consumo: alchol_consumo.current.value,
      drogas_recreativas: drogas_recreativas.current.value,
      tabaco_consumo: tabaco_consumo.current.value,
      psicologo : psicologoRef.current.value,
      cedula_psicologo : psicologoRef.current.value
    };

    try {
        clienteAxios.post('/api/psico', {
            id,
            datos
        },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(function (response) {
            
                setTimeout(function () {
                    window.location.reload();
                }, 2000);
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Guardado Correctamente",
                    showConfirmButton: false,
                    timer: 1500
                  });
            })
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Ocurrió un error!",
            
          });
    }
  }

  return (
    <>
     <div className="">
            <form action="" onSubmit={handleSubmit}>
                <h1 className="text-4xl font-bold mt-2">Informe Psicología Clínica</h1>
                        <div className='grid lg:grid-cols-4 grid-cols-1 mt-5 px-5 py-10 gap-2'>

                            <div className="mb-4 col-start-1 lg:col-end-5">
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
                                    ref={motivo_consulta}
                                     
                                />
                            </div>
                            <div className="mb-4 col-start-1 lg:col-end-5">
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
                                    ref={antecedentes_medicos}
                                     
                                />
                            </div>
                            <div className="mb-4 col-start-1 lg:col-end-3">
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
                                    ref={cirugias_previas}
                                     
                                />
                            </div>
                            <div className="mb-4 col-start-3 lg:col-end-5">
                                <label
                                    htmlFor="antecedentes_familiares"
                                    className="text-slate-800"
                                >
                                    Antcedentes Familiares:
                                </label>
                                <textarea
                                    type="text"
                                    id="antecedentes_familiares"
                                    className="mt-2 w-full p-3 bg-gray-50 border-2 "
                                    name="antecedentes_familiares"
                                    ref={antecedentes_familiares}
                                     
                                />
                            </div>
                            <div className="mb-4 col-start-1 lg:col-end-5">
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
                                    ref={  tratamiento_actual}
                                     
                                />
                            </div>
                            <div className="mb-4 col-start-1 lg:col-end-5">
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
                                    ref={ aspectos_sociales}
                                     
                                />
                            </div>
                            <div className="mb-4 col-start-1 lg:col-end-3">
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
                                    ref={ escalas_utilizadas}
                                     
                                />
                            </div>
                            <div className="mb-4 col-start-3 lg:col-end-5">
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
                                    ref={ sintomas_actuales}
                                     
                                />
                            </div>
                            <div className="mb-4 col-start-1 lg:col-end-5">
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
                                    ref={ plan_tratamiento}
                                     
                                />
                            </div>
                            <div className="mb-4 col-start-1 lg:col-end-5">
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
                                    ref={ seguimiento}
                                     
                                />
                            </div>
                            <h2 className="text-2xl font-bold">Salud Física</h2>
                            <div className="mb-4 col-start-1 lg:col-end-3">
                                <label
                                    htmlFor="calif_salud"
                                    className="text-slate-800"
                                >
                                   ¿Cómo calificarías tu estado de salud general?
                                </label>
                                <select name="calif_salud" id="calif_salud" className="mt-2 w-full p-3 bg-gray-50 border-2" ref={ calif_salud}>
                                    <option value=""></option>
                                    <option value="1">Excelente</option>
                                    <option value="2">Bueno</option>
                                    <option value="3">Regular</option>
                                    <option value="4">Malo</option>
                                </select>
                            </div>
                            <div className="mb-4 col-start-3 lg:col-end-5">
                                <label
                                    htmlFor="realizas_ejercicio"
                                    className="text-slate-800"
                                >
                                   ¿Realizas ejercicio físico regularmente?
                                </label>
                                <select name="realizas_ejercicio" id="realizas_ejercicio" className="mt-2 w-full p-3 bg-gray-50 border-2" ref={realizas_ejercicio}>
                                <option value=""></option>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4 col-start-1 lg:col-end-3">
                                <label
                                    htmlFor="ejercicio_frecuencia"
                                    className="text-slate-800"
                                >
                                   Si es así, ¿con qué frecuencia?
                                </label>
                                <select name="ejercicio_frecuencia" id="ejercicio_frecuencia" className="mt-2 w-full p-3 bg-gray-50 border-2" ref={ejercicio_frecuencia}>
                                <option value="">N/A</option>
                                    <option value="1">Diariamente</option>
                                    <option value="2">3-4 veces por semana</option>
                                    <option value="3">1-2 veces por semana</option>
                                    <option value="4">Raramente</option>
                                </select>
                            </div>
                            <div className="mb-4 col-start-3 lg:col-end-5">
                                <label
                                    htmlFor="condicion_medica"
                                    className="text-slate-800"
                                >
                                   ¿Tienes alguna condición médica crónica?
                                </label>
                                <select name="condicion_medica" id="condicion_medica" className="mt-2 w-full p-3 bg-gray-50 border-2" ref={condicion_medica}>
                                    <option value=""></option>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <h2 className="text-2xl font-bold">Alimentación</h2>
                            <div className="mb-4 col-start-1 lg:col-end-3">
                                <label
                                    htmlFor="dieta_diaria"
                                    className="text-slate-800"
                                >
                                   ¿Cómo describirías tu dieta diaria?
                                </label>
                                <select name="dieta_diaria" id="dieta_diaria" className="mt-2 w-full p-3 bg-gray-50 border-2" ref={dieta_diaria}>
                                <option value=""></option>
                                    <option value="1">Equilibrada</option>
                                    <option value="2">Altas en grasas</option>
                                    <option value="3">Alta de azucares</option>
                                    <option value="4">Insuficiente</option>
                                </select>
                            </div>
                            <div className="mb-4 col-start-3 lg:col-end-5">
                                <label
                                    htmlFor="frutas_verduras"
                                    className="text-slate-800"
                                >
                                   ¿Comes frutas y verduras diariamente?
                                </label>
                                <select name="frutas_verduras" id="frutas_verduras" className="mt-2 w-full p-3 bg-gray-50 border-2" ref={frutas_verduras}>
                                <option value=""></option>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4 col-start-1 lg:col-end-3">
                                <label
                                    htmlFor="frecuencia_comida"
                                    className="text-slate-800"
                                >
                                   ¿Con qué frecuencia comes fuera de casa?
                                </label>
                                <select name="frecuencia_comida" id="frecuencia_comida" className="mt-2 w-full p-3 bg-gray-50 border-2" ref={frecuencia_comida}>
                                <option value=""></option>
                                    <option value="1">Diariamente</option>
                                    <option value="2">Semanalmente</option>
                                    <option value="3">Raramente</option>
                                </select>
                            </div>
                            <h2 className="text-2xl font-bold  col-start-1 lg:col-end-3">Salud Mental y Emocional</h2>
                            <div className="mb-4 col-start-1 lg:col-end-3">
                                <label
                                    htmlFor="feliz"
                                    className="text-slate-800"
                                >
                                   ¿Te sientes feliz la mayor parte del tiempo? 
                                </label>
                                <select name="feliz" id="feliz" className="mt-2 w-full p-3 bg-gray-50 border-2" ref={feliz}>
                                <option value=""></option>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4 col-start-3 lg:col-end-5">
                                <label
                                    htmlFor="apoyo_emocional"
                                    className="text-slate-800"
                                >
                                   ¿Tienes apoyo emocional de amigos o familiares? 
                                </label>
                                <select name="apoyo_emocional" id="apoyo_emocional" className="mt-2 w-full p-3 bg-gray-50 border-2" ref={apoyo_emocional}>
                                <option value=""></option>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4 col-start-1 lg:col-end-3">
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
                                    ref={estres_nivel}
                                      
                                />
                            </div>
                            <h2 className="text-2xl font-bold  col-start-1 lg:col-end-3">Vida Social</h2>
                            <div className="mb-4 col-start-1 lg:col-end-3">
                                <label
                                    htmlFor="frecuencia_reuniones"
                                    className="text-slate-800"
                                >
                                   ¿Con qué frecuencia te reúnes con amigos o familiares? 
                                </label>
                                <select name="frecuencia_reuniones" id="frecuencia_reuniones" className="mt-2 w-full p-3 bg-gray-50 border-2" ref={frecuencia_reuniones}>
                                <option value=""></option>
                                    <option value="1">Diariamente</option>
                                    <option value="2">Semanalmente</option>
                                    <option value="3">Mensualmente</option>
                                    <option value="4">Raramente</option>
                                </select>
                            </div>
                            <div className="mb-4 col-start-3 lg:col-end-5">
                                <label
                                    htmlFor="actividades_comunitarias"
                                    className="text-slate-800"
                                >
                                   ¿Participas en actividades comunitarias o grupos sociales? 
                                </label>
                                <select name="actividades_comunitarias" id="actividades_comunitarias" className="mt-2 w-full p-3 bg-gray-50 border-2" ref={actividades_comunitarias}>
                                <option value=""></option>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4 col-start-1 lg:col-end-3">
                                <label
                                    htmlFor="comunidad"
                                    className="text-slate-800"
                                >
                                   ¿Te sientes parte de tu comunidad?
                                </label>
                                <select name="comunidad" id="comunidad" className="mt-2 w-full p-3 bg-gray-50 border-2" ref={comunidad}>
                                <option value=""></option>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <h2 className="text-2xl font-bold  col-start-1 lg:col-end-3">Bienestar Financiero</h2>
                            <div className="mb-4 col-start-1 lg:col-end-3">
                                <label
                                    htmlFor="situa_financiera"
                                    className="text-slate-800"
                                >
                                   ¿Cómo calificarías tu situación financiera actual?
                                </label>
                                <select name="situa_financiera" id="situa_financiera" className="mt-2 w-full p-3 bg-gray-50 border-2" ref={situa_financiera}>
                                    <option value=""></option>
                                    <option value="1">Excelente</option>
                                    <option value="2">Bueno</option>
                                    <option value="3">Regular</option>
                                    <option value="4">Malo</option>
                                </select>
                            </div>
                            <div className="mb-4 col-start-3 lg:col-end-5">
                                <label
                                    htmlFor="seguro_economico"
                                    className="text-slate-800"
                                >
                                   ¿Te sientes seguro económicamente? 
                                </label>
                                <select name="seguro_economico" id="seguro_economico" className="mt-2 w-full p-3 bg-gray-50 border-2" ref={seguro_economico}>
                                <option value=""></option>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4 col-start-1 lg:col-end-3">
                                <label
                                    htmlFor="ingresos_suficientes"
                                    className="text-slate-800"
                                >
                                   ¿Sientes que tus ingresos son suficientes para cubrir tus necesidades básicas?
                                </label>
                                <select name="ingresos_suficientes" id="ingresos_suficientes" className="mt-2 w-full p-3 bg-gray-50 border-2" ref={ingresos_suficientes}>
                                <option value=""></option>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <h2 className="text-2xl font-bold  col-start-1 lg:col-end-3">Trabajo y Satisfacción Laboral</h2>
                            <div className="mb-4 col-start-1 lg:col-end-3">
                                <label
                                    htmlFor="trabajo_actual"
                                    className="text-slate-800"
                                >
                                   ¿Estás satisfecho con tu trabajo actual?
                                </label>
                                <select name="trabajo_actual" id="trabajo_actual" className="mt-2 w-full p-3 bg-gray-50 border-2" ref={trabajo_actual}>
                                <option value=""></option>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4 col-start-3 lg:col-end-5">
                                <label
                                    htmlFor="reconocimiento"
                                    className="text-slate-800"
                                >
                                   ¿Recibes reconocimiento por tu trabajo?
                                </label>
                                <select name="reconocimiento" id="reconocimiento" className="mt-2 w-full p-3 bg-gray-50 border-2" ref={reconocimiento}>
                                <option value=""></option>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4 col-start-1 lg:col-end-3">
                                <label
                                    htmlFor="equilibrio_trabajo"
                                    className="text-slate-800"
                                >
                                   ¿Consideras que tienes un buen equilibrio entre el trabajo y la vida personal? 
                                </label>
                                <select name="equilibrio_trabajo" id="equilibrio_trabajo" className="mt-2 w-full p-3 bg-gray-50 border-2" ref={equilibrio_trabajo}>
                                <option value=""></option>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
    
                            <h2 className="text-2xl font-bold  col-start-1 lg:col-end-3">Consumo de Sustancias</h2>
                            <div className="mb-4 col-start-1 lg:col-end-3">
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
                                    ref={alchol_consumo}
                                     
                                />
                            </div>
                            <div className="mb-4 col-start-3 lg:col-end-5">
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
                                    ref={drogas_recreativas}
                                    
                                />
                            </div>
                            <div className="mb-4 col-start-1 lg:col-end-3">
                                <label
                                    htmlFor="tabaco_consumo"
                                    className="text-slate-800"
                                >
                                   ¿Fumas tabaco o utilizas productos de tabaco?
                                </label>
                                <select name="tabaco_consumo" id="tabaco_consumo" className="mt-2 w-full p-3 bg-gray-50 border-2" ref={tabaco_consumo}>
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
                                    ref={ psicologoRef }
                                />
                            </div>
                            <div className="mb-4 mt-2">
                                <label
                                    htmlFor="cedula_nutriologo"
                                    className="text-slate-800 font-bold"
                                >
                                    Cédula del Psicólogo:
                                </label>
                                <input
                                    type="text"
                                    id="cedula_nutriologo"
                                    className="mt-2 w-full p-3 bg-gray-50 border-2 "
                                    name="cedula_nutriologo"
                                    ref={ cedulaPsicologoRef }
                                />
                            </div>

                        </div>
                        <div className='flex justify-end'>
                    <input
                    type="submit"
                    value="Guardar"
                    className="bg-green-500 hover:bg-green-600 text-white m-5 p-3 uppercase font-bold cursor-pointer"
                />
                </div>
            </form>
        </div>
    </>
  )
}
