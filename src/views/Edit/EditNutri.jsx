import React, { useEffect } from 'react'
import { usevalue, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import Header from '../../components/Header';
import clienteAxios from '../../axios-client';

export default function EditNutri() {
  const token = localStorage.getItem('AUTH_TOKEN')
    const {id} = useParams()
    const [errores, setErrores] = useState(null)
    const navigate = useNavigate()
    const [expediente, setExpediente] = useState({
      id: '',
      created_at: '',
      updated_at: '',
      motivo_consulta: '',
      antecedentes_medicos: '',
      cirugias_previas: '',
      antecedentes_familiares: '',
      tratamiento_actual: '',
      aspectos_sociales: '',
      escalas_utilizadas: '',
      sintomas_actuales: '',
      plan_tratamiento: '',
      seguimiento: '',
      calif_salud: '',
      realizas_ejercicio: '',
      ejercicio_frecuencia: '',
      condicion_medica: '',
      dieta_diaria: '',
      frutas_verduras: '',
      frecuencia_comida: '',
      feliz: '',
      apoyo_emocional: '',
      estres_nivel: '',
      frecuencia_reuniones: '',
      actividades_comunitarias: '',
      comunidad: '',
      situa_financiera: '',
      seguro_economico: '',
      ingresos_suficientes: '',
      trabajo_actual: '',
      reconocimiento: '',
      equilibrio_trabajo: '',
      alchol_consumo: '',
      drogas_recreativas: '',
      tabaco_consumo: '',
      tipo_exp: '',
      user_id: '',
      paciente_id: '',
      recomendaciones: [],
    });
    const [paciente, setPaciente] = useState({
      nombre: '',
      apellidoPat: '',
      apellidoMat: '',
      edad: '',
      fechaNacimiento: '',
      cintura: '',
      peso: '',
      talla: '',
      imc: '',
      medicamentos: ''
  });

  


    const recomendacioneslist = [
      "Evitar el consumo de azucares (azúcar de mesa, mascabado, mieles, mermeladas, cajeta, lechera) así como productos con azucares simples (jugos, refrescos, yogurt con frutas, postres, etc). Los azúcares pueden estar incluidos en otros alimentos como azúcares añadidos, por ejemplo en el pan dulce, postres, almibares, garapiñados, etc. ",
      "Evitar el consumo de bebidas azucaradas e intercambiarlo por agua simple.",
      "Formar horarios para las tres principales comidas del día.",
      "Realizar 3 comidas principales al día.",
      "Aumentar el consumo de agua simple (la sed es la señal más confiable de que necesita agua).",
      "Mantener actividad física.",
      "Iniciar  actividad física moderada-ligera caminata, trotar, bicicleta, natación, etc.) por al menos 30 minutos al día 5 días a la semana o el equivalente a 150 minutos a la semana o 75 minutos a la semana de actividad vigorosa (correr, tenis, natación continua, bicicleta de subida) a la semana.",
      "Aumentar  actividad física moderada-ligera caminata, trotar, bicicleta, natación, etc.) por al menos 30 minutos al día 5 días a la semana o el equivalente a 150 minutos a la semana o 75 minutos a la semana de actividad vigorosa (correr, tenis, natación continua, bicicleta de subida) a la semana.",
      "A la hora de la comida elegir una opción entre arroz, frijoles, pasta o papa como acompañamiento.",
      "Disminuir la cantidad de cereales (arroz, tortilla, pan, papa, pasta).",
      "Siempre y cuando realice 1 hora o más de ejercicio: consumir una colación antes de la actividad (fruta y algún lácteo o fruta y algún cereal), 150mL de alguna bebida deportiva (no light) cada 15 minutos durante el ejercicio y una colación al terminar (fruta y algún lácteo o fruta y algún cereal).",
    ];

    const imprimirExpediente = expediente => {
      const nutricional = `/api/nutri/imprimir/${expediente.id}`;

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

    if(id) {
      useEffect(() => {
          clienteAxios.get(`/api/nutrio/${id}`,{
              headers:{
                  Authorization: `Bearer ${token}`
              }
          })
          .then(({data}) => {
            let recomendaciones = [];
            try {
              // Si las recomendaciones vienen como una cadena JSON
              recomendaciones = JSON.parse(data.recomendaciones);
              
            } catch (error) {
              console.error("Error al convertir recomendaciones:", error);
              // Si no están en formato JSON, usa un valor predeterminado
              recomendaciones = Array(11).fill(false);
            }
            setExpediente({ ...data, recomendaciones });
              return clienteAxios.get(`/api/pacientes/${data.paciente_id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
          })
          .then(({ data }) => {
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

  const handleSubmit = (e) => {
    e.preventDefault()
        try {
            clienteAxios.put(`/api/nutri/${expediente.id}`, expediente,{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            }).then(function (response) {
                // Redireccionar a una página específica
                setTimeout(function() {
                    // Redireccionar a una página específica
                    window.location.reload();
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

const handleRecomendacionChange = (index, value) => {
  const newRecomendaciones = [...expediente.recomendaciones];
  newRecomendaciones[index] = value;
  setExpediente({ ...expediente, recomendaciones: newRecomendaciones });
};
  return (
    <>
     <Header titulo ="Editar Nota Nutricional"/>
     <div className="">
            <form action="" onSubmit={handleSubmit}>
                <h1 className="text-4xl font-bold mt-2">Evaluación nutricional para paciente de Check up</h1>
                        <div className='grid lg:grid-cols-4 grid-cols-1 mt-5 px-5 py-10 gap-2'>
                            <div className="mb-4 col-start-1 col-end-3 lg:col-end-3">
                                <label
                                    htmlFor="nombre"
                                    className="text-slate-800"
                                >
                                    Nombre:
                                </label>
                                <input
                                    type="text"
                                    id="nombre"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="nombre"
                                    value={paciente.nombre + ' ' + paciente.apellidoPat + ' ' + paciente.apellidoMat}
                                    disabled
                                />
                            </div>
                            <div className="mb-4 col-start-3 lg:col-end-3">
                                <label
                                    htmlFor="edad"
                                    className="text-slate-800"
                                >
                                    Edad:
                                </label>
                                <input
                                    type="text"
                                    id="edad"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="edad"
                                    value={paciente.edad}
                                    disabled
                                />
                            </div>
                            <div className="mb-4 col-start-4 lg:col-end-5">
                                <label
                                    htmlFor="nacimiento"
                                    className="text-slate-800"
                                >
                                    Fecha de Nacimiento:
                                </label>
                                <input
                                    type="text"
                                    id="nacimiento"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="nacimiento"
                                    value={paciente.fechaNacimiento}
                                    disabled
                                />
                            </div>
                            <h2 className="text-2xl font-bold col-start-1">Antropometría</h2>
                            <h3 className="text-xl font-bold  col-start-1">Presión Arterial</h3>
                            <div className="mb-4 col-start-1 col-end-3 lg:col-end-2">
                                <label
                                    htmlFor="sistolica"
                                    className="text-slate-800"
                                >
                                    Sistólica:
                                </label>
                                <input
                                    type="number"
                                    id="sistolica"
                          
                                    className="mt-2 w-full p-3 bg-gray-50 border-2"
                                    name="sistolica"
                                    onChange={ev => setExpediente({...expediente,sistolica: ev.target.value})}
                                    value={expediente.sistolica}
                                />
                            </div>
                            
                            <div className="mb-4 col-start-3 lg:col-end-2">
                                <label
                                    htmlFor="diastolica"
                                    className="text-slate-800"
                                >
                                    Diastolica:
                                </label>
                                <input
                                    type="number"
                                    id="diastolica"
                                    className="mt-2 w-full p-3 bg-gray-50 border-2"
                                    name="diastolica"
                                    onChange={ev => setExpediente({...expediente,diastolica: ev.target.value})}
                                    value={expediente.diastolica}
                                />
                            </div>
                            <h3 className="text-xl font-bold  col-start-1">Cintura</h3>
                            <div className="mb-4 col-start-1 lg:col-end-3">
                                <label
                                    htmlFor="cintura"
                                    className="text-slate-800"
                                >
                                    Cintura (cm):
                                </label>
                                <input
                                    type="text"
                                    id="cintura"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="cintura"
                                    value={paciente.cintura}
                                    disabled
                                />
                            </div>
                            <h3 className="text-xl font-bold  col-start-1 col-end-3">Indice de masa corporal</h3>
                            <div className="mb-4 col-start-1 col-end-3 lg:col-end-2">
                                <label
                                    htmlFor="peso"
                                    className="text-slate-800"
                                >
                                    Peso (kg):
                                </label>
                                <input
                                    type="text"
                                    id="peso"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="peso"
                                    value={paciente.peso}
                                    disabled
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="talla"
                                    className="text-slate-800"
                                >
                                    Talla (cm):
                                </label>
                                <input
                                    type="text"
                                    id="talla"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="talla"
                                    value={paciente.talla}
                                    disabled
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="imc"
                                    className="text-slate-800"
                                >
                                    IMC:
                                </label>
                                <input
                                    type="text"
                                    id="imc"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="imc"
                                    value={Math.round(paciente.imc)}
                                    disabled
                                />
                            </div>
                            <div className="mb-4 col-end-3 lg:col-end-5">
                                <label
                                    htmlFor="estado"
                                    className="text-slate-800"
                                >
                                    Estado:
                                </label>
                                <input
                                    type="text"
                                    id="estado"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="estado"
                                    onChange={ev => setExpediente({...expediente,estado: ev.target.value})}    
                                    value={expediente.estado} 
                                />
                            </div>
                            <div className="mb-4 col-end-4 lg:col-end-2">
                                <label
                                    htmlFor="glucosa"
                                    className="text-slate-800"
                                >
                                    Glucosa (mg/dl):
                                </label>
                                <input
                                    type="number"
                                    id="glucosa"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="glucosa"
                                    onChange={ev => setExpediente({...expediente,glucosa: ev.target.value})}
                                    value={expediente.glucosa}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="trigliceridos"
                                    className="text-slate-800"
                                >
                                    Trigliceridos (mg/dl):
                                </label>
                                <input
                                    type="number"
                                    id="trigliceridos"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="trigliceridos"
                                    onChange={ev => setExpediente({...expediente,trigliceridos: ev.target.value})}
                                    value={expediente.trigliceridos}
                                />
                            </div>
                            <div className="mb-4 col-end-3 lg:col-end-4">
                                <label
                                    htmlFor="hdl"
                                    className="text-slate-800"
                                >
                                    HDL (mg/dl):
                                </label>
                                <input
                                    type="number"
                                    id="hdl"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="hdl"
                                    onChange={ev => setExpediente({...expediente,hdl: ev.target.value})}
                                    value={expediente.hdl}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="colesterol"
                                    className="text-slate-800"
                                >
                                    Colesterol Total:
                                </label>
                                <input
                                    type="number"
                                    id="colesterol"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="colesterol"
                                    onChange={ev => setExpediente({...expediente,colesterol: ev.target.value})}
                                    value={expediente.colesterol}
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
                                    onChange={ev => setExpediente({...expediente,ldl: ev.target.value})}
                                    value={expediente.ldl}
                                />
                            </div>
                            <div className="mb-4 col-start-1 col-end-5">
                                <label
                                    htmlFor="otro"
                                    className="text-slate-800"
                                >
                                   Otro:
                                </label>
                                <input
                                    type="text"
                                    id="otro"
                                    className="mt-2 w-full p-3 bg-gray-50 border-2 "
                                    name="otro"
                                    onChange={ev => setExpediente({...expediente,otro: ev.target.value})}
                                    value={expediente?.otro}
                                />
                            </div>
                            <h2 className="text-2xl font-bold  col-start-1 col-end-4">Referencias Alimenticias</h2>
                            <h3 className="text-xl font-bold  col-start-1">Líquidos</h3>
                            <div className="mb-4 col-start-1 lg:col-end-5">
                                <label
                                    htmlFor="recomendacion"
                                    className="text-slate-800"
                                >
                                    Recordatorio de 24 hrs:
                                </label>
                                <textarea
                                    id="recomendacion"
                                    className="mt-2 w-full p-3 bg-gray-50 "
                                    name="recomendacion"
                                    onChange={ev => setExpediente({...expediente,recomendacion: ev.target.value})}
                                    value={expediente?.recomendacion}
                                />
                            </div>
                            <div className="mb-4 col-start-1 col-end-3 lg:col-end-2">
                                <label
                                    htmlFor="aguaSimple"
                                    className="text-slate-800"
                                >
                                    Agua Simple (ml):
                                </label>
                                <input
                                    type="number"
                                    id="aguaSimple"
                                    className="mt-2 w-full p-3 bg-gray-50 border-2"
                                    name="aguaSimple"
                                    onChange={ev => setExpediente({...expediente,aguaSimple: ev.target.value})}
                                    value={expediente.aguaSimple}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="cafe_te"
                                    className="text-slate-800"
                                >
                                    Café o té (ml):
                                </label>
                                <input
                                    type="number"
                                    id="cafe_te"
                                    className="mt-2 w-full p-3 bg-gray-50 border-2 "
                                    name="cafe_te"
                                    onChange={ev => setExpediente({...expediente,cafe_te: ev.target.value})}
                                    value={expediente.cafe_te}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="bebidas"
                                    className="text-slate-800"
                                >
                                    Bebidas Azucaradas(ml):
                                </label>
                                <input
                                    type="number"
                                    id="bebidas"
                                    className="mt-2 w-full p-3 bg-gray-50 border-2 "
                                    name="bebidas"
                                    onChange={ev => setExpediente({...expediente,bebidas: ev.target.value})}
                                    value={expediente.bebidas}
                                />
                            </div>
                            <div className="mb-4 col-end-3 lg:col-end-5">
                                <label
                                    htmlFor="light"
                                    className="text-slate-800"
                                >
                                    Bebidas Light (ml):
                                </label>
                                <input
                                    type="number"
                                    id="light"
                                    className="mt-2 w-full p-3 bg-gray-50 border-2 "
                                    name="light"
                                    onChange={ev => setExpediente({...expediente,light: ev.target.value})}
                                    value={expediente.light}
                                    
                                />
                            </div>
                            <h3 className="text-xl font-bold col-start-1">Comidas</h3>
                            <div className="mb-4 col-start-1 col-end-3 lg:col-end-2">
                                <label
                                    htmlFor="comidas"
                                    className="text-slate-800"
                                >
                                    Comidas al día:
                                </label>
                                <input
                                    type="number"
                                    id="comidas"
                                    className="mt-2 w-full p-3 bg-gray-50 border-2 "
                                    name="comidas"
                                    onChange={ev => setExpediente({...expediente,comidas: ev.target.value})}
                                    value={expediente.comidas}
                                    
                                />
                            </div>
                            <h2 className="text-2xl font-bold col-start-1">Actividad</h2>
                            <div className="mb-4 col-start-1 col-end-3 lg:col-end-3">
                                <label
                                    htmlFor="actividad"
                                    className="text-slate-800"
                                >
                                    Actividad Física:
                                </label>
                                <input
                                    type="text"
                                    id="actividad"
                                    className="mt-2 w-full p-3 bg-gray-50 border-2 "
                                    name="actividad"
                                    onChange={ev => setExpediente({...expediente,actividad: ev.target.value})}
                                    value={expediente.actividad}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="actividadDias"
                                    className="text-slate-800"
                                >
                                    Días por semana:
                                </label>
                                <input
                                    type="number"
                                    id="actividadDias"
                                    className="mt-2 w-full p-3 bg-gray-50 border-2 "
                                    name="actividadDias"
                                    onChange={ev => setExpediente({...expediente,actividadDias: ev.target.value})}
                                    value={expediente.actividadDias}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="minutosDia"
                                    className="text-slate-800"
                                >
                                    Minutos al día:
                                </label>
                                <input
                                    type="number"
                                    id="minutosDia"
                                    className="mt-2 w-full p-3 bg-gray-50 border-2 "
                                    name="minutosDia"
                                    onChange={ev => setExpediente({...expediente,minutosDia: ev.target.value})}
                                    value={expediente.minutosDia}
                                />
                            </div>
                            <div className="mb-4 col-end-3 lg:col-end-2">
                                <label
                                    htmlFor="formula"
                                    className="text-slate-800"
                                >
                                    Fórmula:
                                </label>
                                <input
                                    type="text"
                                    id="formula"
                                    className="mt-2 w-full p-3 bg-gray-50 border-2 "
                                    name="formula"
                                    onChange={ev => setExpediente({...expediente,formula: ev.target.value})}
                                    value={expediente.formula}
                                />
                            </div>
                            <h2 className="text-2xl font-bold col-start-1">Medicamentos</h2>
                            <div className="mb-4 col-start-1 col-end-3 lg:col-end-2">
                                <label
                                    htmlFor="lipidos"
                                    className="text-slate-800"
                                >
                                   Control de lipidos:
                                </label>
                                <select name="lipidos" id="lipidos" className="mt-2 w-full p-3 bg-gray-50 border-2" onChange={ev => setExpediente({...expediente,lipidos: ev.target.value})} value={expediente.lipidos==="1"  || expediente.lipidos==="true"?"true":"false"}>
                                    <option value=""></option>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="Controlglucosa"
                                    className="text-slate-800"
                                >
                                   Control de glucosa:
                                </label>
                                <select name="Controlglucosa" id="Controlglucosa" className="mt-2 w-full p-3 bg-gray-50 border-2" onChange={ev => setExpediente({...expediente,Controlglucosa: ev.target.value})} value={expediente.Controlglucosa==="1"  || expediente.Controlglucosa==="true"?"true":"false"} >
                                    <option value=""></option>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="controlPeso"
                                    className="text-slate-800"
                                >
                                   Control de peso:
                                </label>
                                <select name="controlPeso" id="controlPeso" className="mt-2 w-full p-3 bg-gray-50 border-2" onChange={ev => setExpediente({...expediente,controlPeso: ev.target.value})} value={expediente.controlPeso==="1" || expediente.controlPeso==="true"?"true":"false"} >
                                    <option value=""></option>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="controlPresion"
                                    className="text-slate-800"
                                >
                                   Control de Presión:
                                </label>
                                <select name="controlPresion" id="controlPresion" className="mt-2 w-full p-3 bg-gray-50 border-2" onChange={ev => setExpediente({...expediente,controlPresion: ev.target.value})} value={expediente.controlPresion==="1" || expediente.controlPresion==="true"?"true":"false"} >
                                    <option value=""></option>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <h2 className="text-2xl font-bold col-start-1">Diagnostico</h2>
                            <div className="mb-4 col-start-1 col-end-5 lg:col-end-5">
                                <label
                                    htmlFor="diagnostico"
                                    className="text-slate-800"
                                >
                                </label>
                                <select name="diagnostico" id="diagnostico" className="mt-2 w-full p-3 bg-gray-50 border-2"  onChange={ev => setExpediente({...expediente,diagnostico: ev.target.value})}  value={expediente.diagnostico}>
                                    <option value="1"></option>
                                    <option value="2">Paciente en Obesidad que cumple los criterios armonizados para Síndrome Metabólico.</option>
                                    <option value="3">Paciente en Sobrepeso que cumple los criterios armonizados para Síndrome Metabólico.</option>
                                    <option value="4">Paciente en Sobrepeso sin Síndrome Metabólico.</option>
                                    <option value="5">Paciente en Obesidad sin  Síndrome Metabólico.</option>
                                    <option value="6">Paciente en Normopeso.</option>
                                    <option value="7">Paciente en Normopeso que cumple los criterios armonizados para Síndrome Metabólico.</option>
                                    <option value="8">Paciente en Infrapeso, se recomienda visita subsecuente con Nutrición para descartar desnutrición.</option>

                                </select>
                            </div>
                            <h2 className="text-2xl font-bold col-start-1 col-end-3">Recomendaciones específicas</h2>
                            <table className=" table-auto w-full mt-3 col-start-1 col-end-5">
                                <thead>
                                    <tr>
                                        <th className="px-4 py-2"></th>
                                        <th className="px-4 py-2">No</th>
                                        <th className="px-4 py-2">Sí</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recomendacioneslist.map((recomendacion, index) => (
                                        <tr key={index}>
                                            <td className="border px-4 py-2">{recomendacion}</td>
                                            <td className="border px-4 py-2 text-center">
                                          <input
                                            type="radio"
                                            name={`recomendacion${index}`}
                                            value="false"
                                            checked={expediente.recomendaciones[index] === false}
                                            onChange={() => handleRecomendacionChange(index, false)}
                                          />
                                            </td>
                                            <td className="border px-4 py-2 text-center">
                                          <input
                                            type="radio"
                                            name={`recomendacion${index}`}
                                            value="true"
                                            checked={expediente.recomendaciones[index] === true}
                                            onChange={() => handleRecomendacionChange(index, true)}
                                          />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="mb-4 col-end-3 lg:col-end-2 mt-2">
                                <label
                                    htmlFor="nutriologo"
                                    className="text-slate-800 font-bold"
                                >
                                    Nombre Nutriólogo:
                                </label>
                                <input
                                    type="text"
                                    id="nutriologo"
                                    className="mt-2 w-full p-3 bg-gray-50 border-2 "
                                    name="nutriologo"
                                    onChange={ev => setExpediente({...expediente,nutriologo: ev.target.value})}
                                    value={expediente.nutriologo}
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
                                    onChange={ev => setExpediente({...expediente,cedula_nutriologo: ev.target.value})}
                                    value={expediente.cedula_nutriologo}
                                />
                            </div>
                            <div className="mb-4 col-start-1 lg:col-end-5">
                                <label
                                    htmlFor="observaciones"
                                    className="text-slate-800 font-bold"
                                >
                                    Observaciones:
                                </label>
                                <textarea
                                    id="observaciones"
                                    className="mt-2 w-full p-3 bg-gray-50 "
                                    onChange={ev => setExpediente({...expediente,observaciones: ev.target.value})}
                                    value={expediente?.observaciones}
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
