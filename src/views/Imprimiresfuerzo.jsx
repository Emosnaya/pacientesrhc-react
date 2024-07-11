import React, { useEffect } from 'react'
import Header from '../components/Header'
import { usevalue, useState } from 'react'
import clienteAxios from '../axios-client';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function Imprimiresfuerzo() {
  const token = localStorage.getItem('AUTH_TOKEN')
    const {id} = useParams()
    const [errores, setErrores] = useState(null)
    const [expediente, setExpediente] = useState([])
    const [paciente, setPaciente] = useState([])

    if(id) {
        useEffect(() => {
            clienteAxios.get(`/api/esfuerzo/${id}`,{
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
                clienteAxios.get(`/api/esfuerzo/imprimir/${expediente.id}`, { 
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
    <Header titulo ="Imprimir Prueba de Esfuerzo"/>
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
                <div className="mb-4">
                    <label 
                    htmlFor="cintura"
                    className="text-slate-800"
                    >
                        Medicamentos:
                    </label>
                    <input 
                        type="numeric"
                        id="cintura"
                        className="mt-2 w-full p-3 bg-gray-50" 
                        name="cintura"
                        value={paciente.medicamentos}
                        disabled
                    />
                </div>
                <div className="mb-4">
                    <label 
                    htmlFor="cintura"
                    className="text-slate-800"
                    >
                        Diagnostico:
                    </label>
                    <input 
                        type="numeric"
                        id="cintura"
                        className="mt-2 w-full p-3 bg-gray-50" 
                        name="cintura"
                        value={paciente.diagnostico}
                        disabled
                    />
                </div>
        </div>
            <form action="" onSubmit={onSubmit}>
            <h2 className='text-3xl font-bold mt-8'>Prueba de esfuerzo</h2>
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
                                    disabled
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
                                    disabled
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="icc"
                                    className="text-slate-800"
                                >
                                    ICC o digoxina :
                                </label>
                                <select id="icc" name="icc" className='mt-2 w-full p-3' value={(expediente.icc === 1?"true":"false")} disabled> 
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
                                    disabled
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="metodo"
                                    className="text-slate-800"
                                >
                                    Método:
                                </label>
                                <select id="metodo" name="metodo" className='mt-2 w-full p-3' value={expediente.metodo} disabled>
                                    <option value="ecott">ECOTT</option>
                                    <option value="irm">IRM</option>
                                    <option value="nv">NV</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="difuncionDiastolica"
                                    className="text-slate-800"
                                >
                                    Disfunción Diastólica:
                                </label>
                                <select id="difuncionDiastolica" name="difuncionDiastolica" className='mt-2 w-full p-3' value={(expediente.disfuncionDias === 1?"true":"false")} disabled>
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
                                    disabled
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
                                    disabled
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="betabloqueador"
                                    className="text-slate-800"
                                >
                                    Betabloqueador:
                                </label>
                                <select id="betabloqueador" name="betabloqueador" className='mt-2 w-full p-3' value={(expediente.betabloqueador === 1?"true":"false")} disabled>
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
                                <select id="iecas_atii" name="iecas_atii" className='mt-2 w-full p-3'value={(expediente.iecas === 1?"true":"false")} disabled>
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
                                <select id="nitratos" name="nitratos" className='mt-2 w-full p-3' value={(expediente.nitratos === 1?"true":"false")} disabled>
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
                                <select id="digoxina" name="digoxina" className='mt-2 w-full p-3' value={(expediente.digoxina === 1?"true":"false")} disabled>
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
                                <select id="calcio_antag" name="calcio_antag" className='mt-2 w-full p-3 ' value={(expediente.calcioAntag === 1?"true":"false")} disabled>
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
                                <select id="antiarritmicos" name="antiarritmicos" className='mt-2 w-full p-3' value={(expediente.antirritmicos === 1?"true":"false")} disabled>
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
                                <select id="hipolipemiantes" name="hipolipemiantes" className='mt-2 w-full p-3' value={(expediente.hipolipemiantes === 1?"true":"false")} disabled>
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
                                <select id="diureticos" name="diureticos" className='mt-2 w-full p-3' value={(expediente.diureticos === 1?"true":"false")} disabled>
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
                                <select id="aldactone" name="aldactone" className='mt-2 w-full p-3' value={(expediente.aldactone === 1?"true":"false")} disabled>
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
                                <select id="antiagregante" name="antiagregante" className='mt-2 w-full p-3' value={(expediente.antiagregante === 1?"true":"false")} disabled>
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
                                <select id="otros" name="otros" className='mt-2 w-full p-3' value={(expediente.otros === 1?"true":"false")} disabled>
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
                                    disabled
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
                                    disabled
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
                                    disabled
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
                                    disabled
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="prueba_ingreso"
                                    className="text-slate-800"
                                >
                                    Prueba de Ingreso:
                                </label>
                                <select id="prueba_ingreso" name="prueba_ingreso" className='mt-2 w-full p-3' value={(expediente.pruebaIngreso === 1?"true":"false")} disabled>
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
                                <select id="prueba_fase_2" name="prueba_fase_2" className='mt-2 w-full p-3' value={(expediente.pruebaFinFase2 === 1?"true":"false")}disabled>
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
                                <select id="prueba_fase_3" name="prueba_fase_3" className='mt-2 w-full p-3' value={(expediente.pruebaFinFase3 === 1?"true":"false")} disabled>
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
                                    disabled
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="balke"
                                    className="text-slate-800"
                                >
                                    Balke:
                                </label>
                                <select id="balke" name="balke" className='mt-2 w-full p-3' value={(expediente.balke === 1?"true":"false")} disabled>
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
                                <select id="bruce" name="bruce" className='mt-2 w-full p-3' value={(expediente.bruce === 1?"true":"false")} disabled>
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
                                <select id="ciclo" name="ciclo" className='mt-2 w-full p-3' value={(expediente.ciclo === 1?"true":"false")} disabled>
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
                                <select id="banda" name="banda" className='mt-2 w-full p-3' value={(expediente.banda === 1?"true":"false")} disabled>
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
                                <select id="medicion_gases" name="medicion_gases" className='mt-2 w-full p-3' value={(expediente.medicionGases === 1?"true":"false")} disabled>
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
                                    disabled
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
                                    disabled
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
                                    value={expediente.fcBorg12}
                                    disabled
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
                                    disabled
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
                                    disabled
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
                                    disabled
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
                                    disabled
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
                                    disabled
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
                                    disabled
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
                                    id="fc_max"
                                    className="mt-2 w-full p-3 bg-gray-50 "
                                    name="fc_max"
                                    value={expediente.fcMax}
                                    disabled
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
                                    disabled
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
                                    disabled
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
                                    disabled
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="motivo_susp"
                                    className="text-slate-800"
                                >
                                    Motivo Susp.:
                                </label>
                                <select id="motivo_susp" name="motivo_susp" className='mt-2 w-full p-3' value={expediente.motivoSuspension} disabled>
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
                                <select id="pba_submax" name="pba_submax" className='mt-2 w-full p-3' value={(expediente.pba_submax === 1?"true":"false")} disabled>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="fc_mayor_85"
                                    className="text-slate-800"
                                >
                                    FC >85%:
                                </label>
                                <select id="fc_mayor_85" name="fc_mayor_85" className='mt-2 w-full p-3' value={(expediente.fc_mayor_50 === 1?"true":"false")} disabled>
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
                                    disabled
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
                                    disabled
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
                                    disabled
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
                                    disabled
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
                                    disabled
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
                                    disabled
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
                                    disabled
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
                                    disabled
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
                                    disabled
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
                                    disabled
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
                                    disabled
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
                                    disabled
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
                                    disabled
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
                                    disabled
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
                                    disabled
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
                                    disabled
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
                                    disabled
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
                                    disabled
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
                                    disabled
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="arritmias"
                                    className="text-slate-800"
                                >
                                    Arritmias:
                                </label>
                                <select id="arritmias" name="arritmias" className='mt-2 w-full p-3' value={(expediente.arritmias === 1?"true":"false")} disabled>
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
                                    disabled
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="arritmia_positiva"
                                    className="text-slate-800"
                                >
                                    Positiva:
                                </label>
                                <select id="arritmia_positiva" name="arritmia_positiva" className='mt-2 w-full p-3' value={(expediente.positiva === 1?"true":"false")} disabled>
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
                                    disabled
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
                                    disabled
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
                                    disabled
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
                                    disabled
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
                                    disabled
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
                                    disabled
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
                                    disabled
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
                                    disabled
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
                                    disabled
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
                                    disabled
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
                                    disabled
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
                                    disabled
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
                                    disabled
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
                                    disabled
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
                                    disabled
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
                                    disabled
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
                                    disabled
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
                                    className="mt-2 w-full p-3 h-11 bg-gray-50"
                                    name="comentarios"
                                    value={expediente.conclusiones}
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
                              <Link className="bg-red-500 hover:bg-red-600 text-white m-5 p-3 uppercase font-bold cursor-pointer" to="/expedientes"> Cancelar</Link>
                    </div>
            </form>
        </div>
    </>
  )
}
