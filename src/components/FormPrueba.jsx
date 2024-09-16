import { useRef, useState } from "react";
import useSWR from "swr";
import clienteAxios from "../axios-client";
import { useNavigate, useParams } from 'react-router-dom';
import Swal from "sweetalert2";


export default function FormPrueba() {
    const token = localStorage.getItem('AUTH_TOKEN')
  const [pacientes, setPacientes] = useState([])
  const [paciente, setPaciente] = useState({})
  const { id } = useParams()

  const [respuesta, setRespuesta] = useState('');
  const [inputBloqueado, setInputBloqueado] = useState('');

  const handleRespuestaChange = (e) => {
    const valorRespuesta = e.target.value.toLowerCase().trim();
    setRespuesta(valorRespuesta);

    // Lógica para bloquear el segundo input
    if (valorRespuesta === 'false') {
      setInputBloqueado(true);
    } else {
      setInputBloqueado(false);
    }
  };





  const numPruebaRef = useRef();
    const iccRef = useRef();
    const feviRef = useRef();
    const metodoRef = useRef();
    const disfuncionRef = useRef();
    const nyaRef = useRef();

    const ccsRef = useRef();
    const betabloqueadorRef = useRef();
    const iecassRef = useRef();
    const nitratosRef = useRef();
    const digoxinaRef = useRef();
    const calcioRef = useRef();
    const antiarritmicosRef = useRef();
    const hipolipemiantesRef = useRef();

    const diureticosRef = useRef();
    const aldactoneRef = useRef();
    const antiagreganteRef = useRef();
    const otrosRef = useRef();
    const confusorRef = useRef();
    const especificidadRef = useRef();
    const pruebaIngresoRef = useRef();

    const pruebaFin2Ref = useRef();
    const pruebaFin3Ref = useRef();
    const pruebaInicioRef = useRef();
    const balkeRef = useRef();
    const bruceRef = useRef();
    const cicloRef = useRef();
    const bandaRef = useRef();
    const medicionGasesRef = useRef();
    const fcBasalRef = useRef();

    const tasBasalRef = useRef();
    const tadBasalRef = useRef();
    const fcBorg12Ref = useRef();
    const tasBorg12Ref = useRef();
    const tadBorg12Ref = useRef();
    const w50Ref = useRef();
    const fcw50Ref = useRef();
    const tasw50Ref = useRef();
    const tad50Ref = useRef();

    const borgw50Ref = useRef();
    const fcMaxRef = useRef();
    const tasMaxRef = useRef();
    const tadMaxRef = useRef();
    const borgMaxRef = useRef();
    const motivoSuspRef = useRef();
    const pbaSubmaxRef = useRef();
    const fcMayor85Ref = useRef();
    const fc1erMinRef = useRef();

    const tas1erMinRef = useRef();
    const tad1erMinRef = useRef();
    const borg1erMinRef = useRef();
    const fc3erMinRef = useRef();
    const tas3erMinRef = useRef();
    const tad3erMinRef = useRef();
    const borg3erMinRef = useRef();
    const fc5toMinRef = useRef();
    const tas5toMinRef = useRef();

    const tad5toMinRef = useRef();
    const fc8voMinRef = useRef();
    const tas8voMinRef = useRef();
    const tad8voMinRef = useRef();
    const fcUisqRef = useRef();
    const tasUisqRef = useRef();
    const tadUisqRef = useRef();
    const borgUisqRef = useRef();
    const scoreAnginaRef = useRef();

    const arritmiasRef = useRef();
    const tipoArritmiasRef = useRef();
    const positivaRef = useRef();
    const tipoCambioERef = useRef();
    const maxInfradesnivelRef = useRef();
    const riesgoRef = useRef();
    const velBorgRef = useRef();
    const inclinBorgRef = useRef();
    const wattsCicloBRef = useRef();

    const velmaxRef = useRef();
    const inclMaxRef = useRef();
    const wattsCicloMaxRef = useRef();
    const velUmIsqRef = useRef();
    const inclUmIsqRef = useRef();
    const wattsCicloUmIsqRef = useRef();
    const vo2MaxGasesRef = useRef();
    const vo2picoGasesRef = useRef();
    const vo2BorgGasesRef = useRef();

    const rQmaxRef = useRef();
    const umbralAerRef = useRef();
    const poTeoricoRef = useRef();
    const comentariosRef = useRef();
    const fechaRef = useRef();
    const ectopiaVenRef= useRef();

    const onSubmit = (e) => {
        e.preventDefault()

        const datos = {
            numPrueba: numPruebaRef.current.value,
            icc: iccRef.current.value,
            fevi: feviRef.current.value,
            metodo: metodoRef.current.value,
            disfuncion: disfuncionRef.current.value,
            nya: nyaRef.current.value,
            ccs: ccsRef.current.value,
            betabloqueador: betabloqueadorRef.current.value,
            iecass: iecassRef.current.value,
            nitratos: nitratosRef.current.value,
            digoxina: digoxinaRef.current.value,

            calcio: calcioRef.current.value,
            antiarritmicos: antiarritmicosRef.current.value,
            hipolipemiantes: hipolipemiantesRef.current.value,
            diureticos: diureticosRef.current.value,
            aldactone: aldactoneRef.current.value,
            antiagregante: antiagreganteRef.current.value,
            otros: otrosRef.current.value,
            confusor: confusorRef.current.value,
            especificidad: especificidadRef.current.value,
            pruebaIngreso: pruebaIngresoRef.current.value,
            ectopia : ectopiaVenRef.current.value,

            pruebaFin2: pruebaFin2Ref.current.value,
            pruebaFin3: pruebaFin3Ref.current.value,
            
            pruebaInicio: pruebaInicioRef.current.value,
            balke: balkeRef.current.value,
            bruce: bruceRef.current.value,
            ciclo: cicloRef.current.value,
            banda: bandaRef.current.value,
            medicionGases: medicionGasesRef.current.value,
            fcBasal: fcBasalRef.current.value,
            tasBasal: tasBasalRef.current.value,
            tadBasal: tadBasalRef.current.value,
            fcBorg12: fcBorg12Ref.current.value,
            tasBorg12: tasBorg12Ref.current.value,
            tadBorg12: tadBorg12Ref.current.value,
            w50: w50Ref.current.value,

            fcw50: fcw50Ref.current.value,
            tasw50: tasw50Ref.current.value,
            tad50: tad50Ref.current.value,
            borgw50: borgw50Ref.current.value,
            fcMax: fcMaxRef.current.value,
            tasMax: tasMaxRef.current.value,
            tadMax: tadMaxRef.current.value,
            borgMax: borgMaxRef.current.value,
            motivoSusp: motivoSuspRef.current.value,
            pbaSubmax: pbaSubmaxRef.current.value,
            fcMayor85: tasBorg12Ref.current.value,
            fc1erMin: fc1erMinRef.current.value,
            tas1erMin: tas1erMinRef.current.value,

            tad1erMin: tad1erMinRef.current.value,
            borg1erMin: borg1erMinRef.current.value,
            fc3erMin: fc3erMinRef.current.value,
            tas3erMin: tas3erMinRef.current.value,
            tad3erMin: tad3erMinRef.current.value,
            borg3erMin: borg3erMinRef.current.value,
            fc5toMin: fc5toMinRef.current.value,
            tas5toMin: tas5toMinRef.current.value,
            tad5toMin: tad5toMinRef.current.value,
            fc8voMin: fc8voMinRef.current.value,
            tas8voMin: tas8voMinRef.current.value,
            tad8voMin: tad8voMinRef.current.value,
            fcUisq: fcUisqRef.current.value,

            tasUisq: tasUisqRef.current.value,
            tadUisq: tadUisqRef.current.value,
            borgUisq: borgUisqRef.current.value,
            scoreAngina: scoreAnginaRef.current.value,
            arritmias: arritmiasRef.current.value,
            tipoArritmias: tipoArritmiasRef.current.value,
            positiva: positivaRef.current.value,
            tipoCambioE: tipoCambioERef.current.value,
            maxInfradesnivel: maxInfradesnivelRef.current.value,
            riesgo: riesgoRef.current.value,
            velBorg: velBorgRef.current.value,
            inclinBorg: inclinBorgRef.current.value,
            wattsCicloBorg: wattsCicloBRef.current.value,

            velmax: velmaxRef.current.value,
            inclMax: inclMaxRef.current.value,
            wattsCicloMax: wattsCicloMaxRef.current.value,
            velUmIsq: velUmIsqRef.current.value,
            inclUmIsq: inclUmIsqRef.current.value,
            wattsCicloUmIsq: wattsCicloUmIsqRef.current.value,
            vo2MaxGases: vo2MaxGasesRef.current.value,
            vo2picoGases: vo2picoGasesRef.current.value,
            vo2BorgGases: vo2BorgGasesRef.current.value,
            rQmax: rQmaxRef.current.value,
            umbralAer: umbralAerRef.current.value,
            poTeorico: poTeoricoRef.current.value,
            comentarios: comentariosRef.current.value,
            fecha: fechaRef.current.value

        }
        try {
            clienteAxios.post('/api/esfuerzo', {
                id,
                datos
            },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }).then(function (response) {
                    
                    setTimeout(function () {
                        window.location.href = '/dashboard';
                    }, 2000);
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Guardado Correctamente",
                        showConfirmButton: false,
                        timer: 1500
                      });  // 3000 milisegundos = 3 segundos
                })
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!"
              });
        }
    }


    

  return (
    <>
     <div className="">
            <form action="" onSubmit={onSubmit}>
            <h1 className="text-4xl font-bold">Prueba de Esfuerzo</h1>
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
                                    ref={fechaRef}
                                    required
                                    
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
                                    ref={numPruebaRef}
                                    required
                                    
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="genero"
                                    className="text-slate-800"
                                >
                                    ICC o digoxina :
                                </label>
                                <select id="difuncionDiastolica" name="difuncionDiastolica" className='mt-2 w-full p-3' ref={iccRef} >
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
                                    ref={feviRef}
                                    required
                                    
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="metodo"
                                    className="text-slate-800"
                                >
                                    Método:
                                </label>
                                <select id="metodo" name="metodo" className='mt-2 w-full p-3' ref={metodoRef}  required>
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
                                <select id="difuncionDiastolica" name="difuncionDiastolica" className='mt-2 w-full p-3' ref={disfuncionRef}required >
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
                                    ref={nyaRef}
                                    required
                                    
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
                                    ref={ccsRef}
                                    required
                                    
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="betabloqueador"
                                    className="text-slate-800"
                                >
                                    Betabloqueador:
                                </label>
                                <select id="betabloqueador" name="betabloqueador" className='mt-2 w-full p-3' ref={betabloqueadorRef}required >
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
                                <select id="iecas_atii" name="iecas_atii" className='mt-2 w-full p-3'ref={iecassRef} required >
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
                                <select id="nitratos" name="nitratos" className='mt-2 w-full p-3' ref={nitratosRef} required>
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
                                <select id="digoxina" name="digoxina" className='mt-2 w-full p-3' ref={digoxinaRef}required>
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
                                <select id="calcio_antag" name="calcio_antag" className='mt-2 w-full p-3 ' ref={calcioRef} required>
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
                                <select id="antiarritmicos" name="antiarritmicos" className='mt-2 w-full p-3' ref={antiarritmicosRef} required>
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
                                <select id="hipolipemiantes" name="hipolipemiantes" className='mt-2 w-full p-3' ref={hipolipemiantesRef} required>
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
                                <select id="diureticos" name="diureticos" className='mt-2 w-full p-3' ref={diureticosRef} required>
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
                                <select id="aldactone" name="aldactone" className='mt-2 w-full p-3' ref={aldactoneRef}required>
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
                                <select id="antiagregante" name="antiagregante" className='mt-2 w-full p-3' ref={antiagreganteRef} required>
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
                                <select id="otros" name="otros" className='mt-2 w-full p-3' ref={otrosRef} required>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            
                            <div className="mb-4">
                                <label
                                    htmlFor="confusor"
                                    className="text-slate-800"
                                >
                                    Confusor:
                                </label>
                                <select id="confusor" name="confusor" className='mt-2 w-full p-3' ref={confusorRef} required>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
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
                                    ref={especificidadRef}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="prueba_ingreso"
                                    className="text-slate-800"
                                >
                                    Prueba de Ingreso:
                                </label>
                                <select id="prueba_ingreso" name="prueba_ingreso" className='mt-2 w-full p-3' ref={pruebaIngresoRef} required>
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
                                <select id="prueba_fase_2" name="prueba_fase_2" className='mt-2 w-full p-3' ref={pruebaFin2Ref} required>
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
                                <select id="prueba_fase_3" name="prueba_fase_3" className='mt-2 w-full p-3' ref={pruebaFin3Ref} required>
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
                                    ref={pruebaInicioRef}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="balke"
                                    className="text-slate-800"
                                >
                                    Balke:
                                </label>
                                <select id="balke" name="balke" className='mt-2 w-full p-3' ref={balkeRef} required>
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
                                <select id="bruce" name="bruce" className='mt-2 w-full p-3' ref={bruceRef} required>
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
                                <select id="ciclo" name="ciclo" className='mt-2 w-full p-3' ref={cicloRef} required>
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
                                <select id="banda" name="banda" className='mt-2 w-full p-3' ref={bandaRef} required>
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
                                <select id="medicion_gases" name="medicion_gases" className='mt-2 w-full p-3' ref={medicionGasesRef} required onChange={handleRespuestaChange}>
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
                                    ref={fcBasalRef}
                                    required
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
                                    ref={tasBasalRef}
                                    required
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
                                    ref={tadBasalRef}
                                    required
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
                                    ref={fcBorg12Ref}
                                    required
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
                                    ref={tasBorg12Ref}
                                    required
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
                                    ref={tadBorg12Ref}
                                    required
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
                                    ref={w50Ref}
                                    required
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
                                    ref={fcw50Ref}
                                    required
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
                                    ref={tasw50Ref}
                                    required
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
                                    ref={tad50Ref}
                                    required
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
                                    ref={borgw50Ref}
                                    required
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
                                    ref={fcMaxRef}
                                    required
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
                                    ref={tasMaxRef}
                                    required
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
                                    ref={tadMaxRef}
                                    required
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
                                    ref={borgMaxRef}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="motivo_susp"
                                    className="text-slate-800"
                                >
                                    Motivo Susp.:
                                </label>
                                <select id="motivo_susp" name="motivo_susp" className='mt-2 w-full p-3' ref={motivoSuspRef} required>
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
                                <select id="pba_submax" name="pba_submax" className='mt-2 w-full p-3' ref={pbaSubmaxRef} required>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="fc_mayor_85"
                                    className="text-slate-800"
                                >
                                    FC  &gt;85%:
                                </label>
                                <select id="fc_mayor_85" name="fc_mayor_85" className='mt-2 w-full p-3' ref={fcMayor85Ref} required>
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
                                    ref={fc1erMinRef} 
                                    required
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
                                    ref={tas1erMinRef}
                                    required
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
                                    ref={tad1erMinRef}
                                    required
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
                                    ref={borg1erMinRef}
                                    required
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
                                    ref={fc3erMinRef}
                                    required
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
                                    ref={tas3erMinRef}
                                    required
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
                                    ref={tad3erMinRef}
                                    required
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
                                    ref={borg3erMinRef}
                                    required
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
                                    ref={fc5toMinRef}
                                    required
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
                                    ref={tas5toMinRef}
                                    required
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
                                    ref={tad5toMinRef}
                                    required
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
                                    ref={fc8voMinRef}
                                    required
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
                                    ref={tas8voMinRef}
                                    required
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
                                    ref={tad8voMinRef}
                                    required
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
                                    ref={fcUisqRef}
                                    required
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
                                    ref={tasUisqRef}
                                    required
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
                                    ref={tadUisqRef}
                                    required
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
                                    ref={borgUisqRef}
                                    required
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
                                    ref={scoreAnginaRef}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="arritmias"
                                    className="text-slate-800"
                                >
                                    Arritmias:
                                </label>
                                <select id="arritmias" name="arritmias" className='mt-2 w-full p-3' ref={arritmiasRef} required>
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
                                    ref={tipoArritmiasRef}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="arritmia_positiva"
                                    className="text-slate-800"
                                >
                                    Positiva:
                                </label>
                                <select id="arritmia_positiva" name="arritmia_positiva" className='mt-2 w-full p-3' ref={positivaRef} required>
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
                                    ref={tipoCambioERef}
                                    required
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
                                    ref={maxInfradesnivelRef}
                                    required
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
                                    ref={riesgoRef}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="ectopiaVen"
                                    className="text-slate-800"
                                >
                                    Ectopia ventricular frecuente:
                                </label>
                                <select id="ectopiaVen" name="ectopiaVen" className='mt-2 w-full p-3' ref={ectopiaVenRef} required>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
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
                                    ref={velBorgRef}
                                    required
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
                                    ref={inclinBorgRef}
                                    required
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
                                    ref={wattsCicloBRef}
                                    required
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
                                    ref={velmaxRef}
                                    required
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
                                    ref={inclMaxRef}
                                    required
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
                                    ref={wattsCicloMaxRef}
                                    required
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
                                    ref={velUmIsqRef}
                                    required
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
                                    ref={inclUmIsqRef}
                                    required
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
                                    ref={wattsCicloUmIsqRef}
                                    required
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
                                    ref={vo2MaxGasesRef}
                                    disabled={inputBloqueado}
                                
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
                                    ref={vo2picoGasesRef}
                                    disabled={inputBloqueado}
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
                                    ref={vo2BorgGasesRef}
                                    disabled={inputBloqueado}
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
                                    ref={rQmaxRef}
                                    disabled={inputBloqueado}
                                    
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
                                    ref={umbralAerRef}
                                    disabled={inputBloqueado}
                                    
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
                                    ref={poTeoricoRef}
                                    disabled={inputBloqueado}
                                    
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
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="comentarios"
                                    ref={comentariosRef}
                                    required
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
