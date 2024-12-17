import React, { useRef } from 'react'
import Swal from "sweetalert2";
import clienteAxios from '../axios-client'
import { useNavigate, useParams } from 'react-router-dom';


export default function Nutricional({paciente}) {
  const { id } = useParams();
  const token = localStorage.getItem('AUTH_TOKEN')
  const sistolica = useRef();
  const trigliceridos = useRef();
  const hdl = useRef();
  const colesterol = useRef();
  const ldl = useRef();
  const aguaSimple = useRef();
  const cafe_te = useRef();
  const bebidas = useRef();
  const light = useRef();
  const comidas = useRef();
  const actividad = useRef();
  const actividadDias = useRef();
  const minutosDia = useRef();
  const formula = useRef();
  const lipidos = useRef();
  const Controlglucosa = useRef();
  const controlPeso = useRef();
  const otro = useRef();
  const diastolica = useRef();
  const mmHg = useRef();
  const estado = useRef();
  const glucosa = useRef();
  const diagnostico = useRef();
  const nutriologoRef = useRef();
  const cedulanutriologoRef = useRef();

  const recomendaciones = [
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

  const recomendacionesRefs = useRef(recomendaciones.map(() => React.createRef()));

  const handleSubmit = (e) => {
    e.preventDefault();
    const datos = {
      sistolica : sistolica.current.value,
      trigliceridos : trigliceridos.current.value,
      hdl : hdl.current.value,
      colesterol : colesterol.current.value,
      ldl : ldl.current.value,
      aguaSimple : aguaSimple.current.value,
      cafe_te : cafe_te.current.value,
      bebidas : bebidas.current.value,
      light : light.current.value,
      comidas : comidas.current.value,
      actividad : actividad.current.value,
      actividadDias : actividadDias.current.value,
      minutosDia : minutosDia.current.value,
      formula : formula.current.value,
      lipidos : lipidos.current.value,
      Controlglucosa : Controlglucosa.current.value,
      controlPeso : controlPeso.current.value,
      otro : otro.current.value,
      diastolica : diastolica.current.value,
      mmHg :  mmHg.current.value,
      estado : estado.current.value,
      glucosa : glucosa.current.value,
      diagnostico : diagnostico.current.value,
      recomendaciones : recomendacionesRefs.current.map((ref) => ref.current.checked),
      nutriologo : nutriologoRef.current.value,
      cedula_nutriologo : cedulanutriologoRef.current.value
    };

    try {
        clienteAxios.post('/api/nutri', {
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

    console.log(data); 
  }


  return (
    <>
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
                                    ref={sistolica}
                                    className="mt-2 w-full p-3 bg-gray-50 border-2"
                                    name="sistolica"
                                    
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
                                    ref={diastolica}
                                    
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="mmHg"
                                    className="text-slate-800"
                                >
                                    mmHG:
                                </label>
                                <input
                                    type="number"
                                    id="mmHg"
                                    className="mt-2 w-full p-3 bg-gray-50 border-2"
                                    name="mmHg"
                                    ref={mmHg}
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
                                    ref={estado}
                                    
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
                                    ref={glucosa}
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
                                    ref={trigliceridos}
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
                                    ref={hdl}
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
                                    ref={colesterol}
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
                                    ref={ldl}
                                />
                            </div>
                            <h2 className="text-2xl font-bold  col-start-1 col-end-4">Referencias Alimenticias</h2>
                            <h3 className="text-xl font-bold  col-start-1">Líquidos</h3>
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
                                    ref={ aguaSimple }
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
                                    ref={ cafe_te }
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
                                    ref={ bebidas}
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
                                    ref={ light }
                                    
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
                                    ref={ comidas }
                                    
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
                                    ref={ actividad }
                                    
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
                                    ref={ actividadDias }
                                    
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
                                    ref={ minutosDia }
                                    
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
                                    ref={ formula }
                                    
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
                                <select name="lipidos" id="lipidos" className="mt-2 w-full p-3 bg-gray-50 border-2" ref={lipidos}>
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
                                <select name="Controlglucosa" id="Controlglucosa" className="mt-2 w-full p-3 bg-gray-50 border-2" ref={Controlglucosa}>
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
                                <select name="controlPeso" id="controlPeso" className="mt-2 w-full p-3 bg-gray-50 border-2" ref={controlPeso}>
                                    <option value=""></option>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4 col-start-1 col-end-3">
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
                                    ref={ otro }
                                    value={paciente?.medicamentos}
                                />
                            </div>
                            <h2 className="text-2xl font-bold col-start-1">Diagnóstico</h2>
                            <div className="mb-4 col-start-1 col-end-5 lg:col-end-5">
                                <label
                                    htmlFor="diagnostico"
                                    className="text-slate-800"
                                >
                                </label>
                                <select name="diagnostico" id="diagnostico" className="mt-2 w-full p-3 bg-gray-50 border-2" ref={diagnostico}>
                                    <option value="0"></option>
                                    <option value="1">Paciente en Obesidad que cumple los criterios armonizados para Síndrome Metabólico.</option>
                                    <option value="2">Paciente en Sobrepeso que cumple los criterios armonizados para Síndrome Metabólico.</option>
                                    <option value="3">Paciente en Sobrepeso sin Síndrome Metabólico.</option>
                                    <option value="4">Paciente en Obesidad sin  Síndrome Metabólico.</option>
                                    <option value="5">Paciente en Normopeso.</option>
                                    <option value="6">Paciente en Normopeso que cumple los criterios armonizados para Síndrome Metabólico.</option>
                                    <option value="7">Paciente en Infrapeso, se recomienda visita subsecuente con Nutrición para descartar desnutrición.</option>
                                    <option value="8">Paciente en Obesidad Morbida.</option>
                                </select>
                            </div>
                            <h2 className="text-2xl font-bold col-start-1 col-end-3">Recomendaciones específicas</h2>
                            <table className=" table-auto w-full mt-1 col-start-1 col-end-5">
                                <thead>
                                    <tr>
                                        <th className="px-4 py-2"></th>
                                        <th className="px-4 py-2">No</th>
                                        <th className="px-4 py-2">Sí</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recomendaciones.map((recomendacion, index) => (
                                        <tr key={index}>
                                            <td className="border px-4 py-2">{recomendacion}</td>
                                            <td className="border px-4 py-2 text-center">
                                                <input type="radio" name={`recomendacion${index}`} ref={recomendacionesRefs.current[index]} value="false" />
                                            </td>
                                            <td className="border px-4 py-2 text-center">
                                                <input type="radio" name={`recomendacion${index}`} ref={recomendacionesRefs.current[index]} value="true" />
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
                                    ref={ nutriologoRef }
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
                                    ref={ cedulanutriologoRef }
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
