import { useRef, useState } from "react";
import clienteAxios from "../axios-client";
import Swal from "sweetalert2";


export default function PacienteEstrati() {
    const token = localStorage.getItem('AUTH_TOKEN')
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

    const nombreRef = useRef();
    const apellidoPatRef = useRef();
    const apellidoMatRef = useRef();
    const telefonoRef = useRef();
    const fechaNacimientoRef = useRef();
    const generoRef = useRef();
    const estadoCivilRef = useRef();
    const profesionRef = useRef();
    const domicilioRef = useRef();
    const diagnosticoRef = useRef();
    const medicamentosRef = useRef();

    const tallaRef = useRef();
    const pesoRef = useRef();
    const cinturaRef = useRef();

    const rhc_1_fechaREF= useRef();
    const peRef= useRef();
    const estratiRef= useRef();
    const cIsquemiaRef= useRef();
    const imRef= useRef();

    const imaRef= useRef();
    const imasRef= useRef();
    const imaaRef= useRef();
    const imalRef= useRef();
    const imaeRef= useRef();
    const imInfRef= useRef();

    const impiVdRef= useRef();
    const imLatRef= useRef();
    const imSesstRef= useRef();
    const imComplicadoRef= useRef();
    const valvularRef= useRef();
    const mcdRef= useRef();

    const iccRef= useRef();
    const reanimacionRef= useRef();
    const fallaEntrenarRef= useRef();
    const tabaquismoRef= useRef();
    const dislipidemiaRef= useRef();
    const dmRef= useRef();


    const hasRef= useRef();
    const obesidadRef= useRef();
    const estresRef= useRef();
    const sedentarismoRef= useRef();
    const otroFactorRef= useRef();
    const depresionRef= useRef();

    const ansiedadRef= useRef();
    const sintomatologiaRef= useRef();
    const puntuacionAtpRef= useRef();
    const heartScoreRef= useRef();
    const colTotalRef= useRef();
    const ldlRef= useRef();

    const hdlRef= useRef();
    const tgRef= useRef();
    const feviRef= useRef();
    const pcrRef= useRef();
    const enfCoronariaRef= useRef();
    const isquemiaRef= useRef();

    const holterRef= useRef();
    const capacidadPeRef= useRef();
    const fcBasalRef= useRef();
    const fcMaxRef= useRef();
    const fcBorg12Ref= useRef();
    const dpBorg12Ref= useRef();

    
    const metsBorg12Ref= useRef();
    const carga_maximaRef= useRef();
    const tolerancia_esfuerzoRef= useRef();
    const respuestaPreRef= useRef();
    const indiceTaRef= useRef();
    const porcentajeFCRef= useRef();

    const cronotrRef= useRef();
    const poderCardiacoRef= useRef();
    const recuperacionTasRef= useRef();
    const recuperacionFcRef= useRef();
    const dukeRef= useRef();
    const veteranosRef= useRef();

    const ectopiaVenRef= useRef();
    const supradesnivelRef= useRef();
    const infra135Ref= useRef();
    const infra5Ref= useRef();
    const riesgoGlobalRef= useRef();
    const grupoRef= useRef();

    const semanasRef= useRef();
    const sesionesRef = useRef();
    const borgRef= useRef();
    const fcDianaRef= useRef();
    const dpDianaRef= useRef();
    const otroRef= useRef();
    const umbraIsqueRef= useRef();
    const comentariosRef= useRef();
    const impiRef = useRef();
    const registroRef = useRef();
    const isquemiaIrmRef = useRef();
    const ecoRef = useRef();

    const onSubmit = (e) => {
        e.preventDefault()
        const paciente = {
            nombre: nombreRef.current.value,
            apellidoPat: apellidoPatRef.current.value,
            apellidoMat: apellidoMatRef.current.value,
            telefono: telefonoRef.current.value,
            fechaNacimiento: fechaNacimientoRef.current.value,
            genero: generoRef.current.value,
            estadoCivil: estadoCivilRef.current.value,
            profesion: profesionRef.current.value,
            domicilio: domicilioRef.current.value,
            talla: tallaRef.current.value,
            peso: pesoRef.current.value,
            cintura: cinturaRef.current.value,
            registro: registroRef.current.value,
            medicamentos : medicamentosRef.current.value,
            diagnostico : diagnosticoRef.current.value
        }
        const datos = {
            rhc_1_fecha: rhc_1_fechaREF.current.value,
            pe: peRef.current.value,
            estrati: estratiRef.current.value,
            cIsquemia: cIsquemiaRef.current.value,
            im: imRef.current.value,
            ima: imaRef.current.value,
            imas: imasRef.current.value,
            imaa: imaaRef.current.value,
            imal: imalRef.current.value,
            imae: imaeRef.current.value,
            imInf: imInfRef.current.value,
            impi: impiRef.current.value,
            impiVd: impiVdRef.current.value,
            imLat: imLatRef.current.value,
            imSesst: imSesstRef.current.value,
            imComplicado: imComplicadoRef.current.value,
            valvular: valvularRef.current.value,
            otro: otroRef.current.value,

            mcd: mcdRef.current.value,
            icc: iccRef.current.value,
            reanimacion: reanimacionRef.current.value,
            fallaEntrenar: fallaEntrenarRef.current.value,
            tabaquismo: tabaquismoRef.current.value,
            dislipidemia: dislipidemiaRef.current.value,
            dm: dmRef.current.value,
            has: hasRef.current.value,

            obesidad: obesidadRef.current.value,
            estres: estresRef.current.value,
            sesiones: sesionesRef.current.value,
            
            sedentarismo: sedentarismoRef.current.value,
            otroFactor: otroFactorRef.current.value,
            depresion: depresionRef.current.value,
            ansiedad: ansiedadRef.current.value,
            sintomatologia: sintomatologiaRef.current.value,
            puntuacionAtp: puntuacionAtpRef.current.value,


            heartScore: heartScoreRef.current.value,
            colTotal: colTotalRef.current.value,
            ldl: ldlRef.current.value,
            hdl: hdlRef.current.value,
            tg: tgRef.current.value,
            fevi: feviRef.current.value,
            pcr: pcrRef.current.value,

            enfCoronaria: enfCoronariaRef.current.value,
            isquemia: isquemiaRef.current.value,
            holter: holterRef.current.value,
            capacidadPe: capacidadPeRef.current.value,
            fcBasal: fcBasalRef.current.value,
            fcMax: fcMaxRef.current.value,
            fcBorg12: fcBorg12Ref.current.value,
            dpBorg12: dpBorg12Ref.current.value,
            metsBorg12: metsBorg12Ref.current.value,
            carga_maxima: carga_maximaRef.current.value,
            tolerancia_esfuerzo: tolerancia_esfuerzoRef.current.value,
            respuestaPre: respuestaPreRef.current.value,
            indiceTa: indiceTaRef.current.value,

            porcentajeFC: porcentajeFCRef.current.value,
            cronotr: cronotrRef.current.value,
            poderCardiaco: poderCardiacoRef.current.value,
            recuperacionTas: recuperacionTasRef.current.value,
            recuperacionFc: recuperacionFcRef.current.value,
            duke: dukeRef.current.value,
            veteranos: veteranosRef.current.value,
            ectopiaVen: ectopiaVenRef.current.value,

            umbralIs : umbraIsqueRef.current.value,
            supradesnivel: supradesnivelRef.current.value,


            infra135: infra135Ref.current.value,
            infra5: infra5Ref.current.value,
            riesgoGlobal: riesgoGlobalRef.current.value,
            grupo: grupoRef.current.value,

            semanas: semanasRef.current.value,
            borg: borgRef.current.value,
            fcDiana: fcDianaRef.current.value,
            dpDiana: dpDianaRef.current.value,
            comentarios: comentariosRef.current.value,
            isquemiaIrm : isquemiaIrmRef.current.value,
            eco :ecoRef.current.value

        }
        try {
            clienteAxios.post('/api/estratificacion', {
                paciente,
                datos
            },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }).then(function (response) {
                    
                    setTimeout(function () {
                        
                        window.location.href = '/dashboard';
                    }, 3000);
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
                text: "Ocurrio un error!"
              });
        }
    }



    return (
        <>
              <div className="">
                    <form action="" onSubmit={onSubmit}>
                        <h1 className="text-4xl font-bold">Nuevo Paciente</h1>
                        <p>Completa la informacion para guardar un Paciente</p>

                        <div className='grid lg:grid-cols-4 grid-cols-1 mt-5 px-5 py-10 gap-2'>

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
                                ref={registroRef}
                                required
                                
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
                                    ref={nombreRef}
                                    required
                                    
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
                                    ref={apellidoPatRef}
                                    required
                                    
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
                                    ref={apellidoMatRef}
                                    required
                                    
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
                                    ref={telefonoRef}
                                    required
                                    
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
                                    ref={fechaNacimientoRef}
                                    required
                                    
                                />
                            </div>

                            <div className="mb-4">
                                <label
                                    htmlFor="genero"
                                    className="text-slate-800"
                                >
                                    Género:
                                </label>
                                <select id="genero" name="genero" className='mt-2 w-full p-3' ref={generoRef} required>
                                    <option value="masculino">Hombre</option>
                                    <option value="femenino">Mujer</option>
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
                                <select id="estadoCivil" name="estadoCivil" className='mt-2 w-full p-3' ref={estadoCivilRef}required >
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
                                    ref={profesionRef}
                                    required
                                    
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
                                    ref={domicilioRef}
                                    required
                                    
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
                                    ref={tallaRef}
                                    required
                                    
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
                                    ref={pesoRef}
                                    required
                                    
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
                                    ref={cinturaRef}
                                    required
                                    
                                />
                            </div>
                        <div className="mb-4">
                            <label
                                htmlFor="diagnostico"
                                className="text-slate-800"
                            >
                                Diagnóstico:
                            </label>
                            <input
                                type="text"
                                id="diagnostico"
                                className="mt-2 w-full p-3 bg-gray-50"
                                name="diagnostico"
                                ref={diagnosticoRef}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="medicamentos"
                                className="text-slate-800"
                            >
                                Medicamentos:
                            </label>
                            <input
                                type="text"
                                id="medicamentos"
                                className="mt-2 w-full p-3 bg-gray-50"
                                name="medicamentos"
                                ref={medicamentosRef}
                                required
                            />
                        </div>
                        </div>

                        <h1 className="text-4xl font-bold">Estratificación</h1>
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
                                    ref={rhc_1_fechaREF}
                                    required
                                    
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
                                    ref={peRef}
                                    required
                                    
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
                                    ref={estratiRef}
                                    required
                                    
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="c_isquemia"
                                    className="text-slate-800"
                                >
                                    C. Isquémica:
                                </label>
                                <select id="c_isquemia" name="c_isquemia" className='mt-2 w-full p-3' ref={cIsquemiaRef} required onChange={handleRespuestaChange}>
                                    <option value="false">No</option>
                                    <option value="true">Si</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="im"
                                    className="text-slate-800"
                                >
                                    IM:
                                </label>
                                <select id="im" name="im" className='mt-2 w-full p-3' ref={imRef}  disabled={inputBloqueado} defaultValue="false">
                                <option value="false">No</option>
                                <option value="true">Si</option>
                                    
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="ima"
                                    className="text-slate-800"
                                >
                                    IMA:
                                </label>
                                <select id="ima" name="ima" className='mt-2 w-full p-3' ref={imaRef} disabled={inputBloqueado}>
                                <option value="false">No</option>
                                <option value="true">Si</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="imas"
                                    className="text-slate-800"
                                >
                                    IMAS:
                                </label>
                                <select id="imas" name="imas" className='mt-2 w-full p-3' ref={imasRef} disabled={inputBloqueado}>
                                <option value="false">No</option>
                                <option value="true">Si</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="imaa"
                                    className="text-slate-800"
                                >
                                    IMAA:
                                </label>
                                <select id="imaa" name="imaa" className='mt-2 w-full p-3' ref={imaaRef} disabled={inputBloqueado}>
                                <option value="false">No</option>
                                <option value="true">Si</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="imal"
                                    className="text-slate-800"
                                >
                                    IMAL:
                                </label>
                                <select id="imaa" name="imaa" className='mt-2 w-full p-3' ref={imalRef} disabled={inputBloqueado}>
                                <option value="false">No</option>
                                <option value="true">Si</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="imae"
                                    className="text-slate-800"
                                >
                                    IMAE:
                                </label>
                                <select id="imae" name="imae" className='mt-2 w-full p-3' ref={imaeRef} disabled={inputBloqueado}>
                                <option value="false">No</option>
                                <option value="true">Si</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="im_inf"
                                    className="text-slate-800"
                                >
                                    IMInf:
                                </label>
                                <select id="im_inf" name="im_inf" className='mt-2 w-full p-3' ref={imInfRef} disabled={inputBloqueado}>
                                <option value="false">No</option>
                                <option value="true">Si</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="impi"
                                    className="text-slate-800"
                                >
                                    IMPI:
                                </label>
                                <select id="impi" name="impi" className='mt-2 w-full p-3' ref={impiRef} disabled={inputBloqueado}>
                                <option value="false">No</option>
                                <option value="true">Si</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="impi_vd"
                                    className="text-slate-800"
                                >
                                    IMPI+VD:
                                </label>
                                <select id="impi_vd" name="impi_vd" className='mt-2 w-full p-3' ref={impiVdRef} disabled={inputBloqueado}>
                                <option value="false">No</option>
                                <option value="true">Si</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="imlat"
                                    className="text-slate-800"
                                >
                                    IMLat:
                                </label>
                                <select id="imlat" name="imlat" className='mt-2 w-full p-3' ref={imLatRef} disabled={inputBloqueado}>
                                <option value="false">No</option>
                                <option value="true">Si</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="imsesst"
                                    className="text-slate-800"
                                >
                                    IMSESST:
                                </label>
                                <select id="imsesst" name="imsesst" className='mt-2 w-full p-3' ref={imSesstRef} disabled={inputBloqueado}>
                                <option value="false">No</option>
                                <option value="true">Si</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="imcomplicado"
                                    className="text-slate-800"
                                >
                                    IMComplicado:
                                </label>
                                <select id="imcomplicado" name="imcomplicado" className='mt-2 w-full p-3' ref={imComplicadoRef} disabled={inputBloqueado}>
                                <option value="false">No</option>
                                <option value="true">Si</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="valvular"
                                    className="text-slate-800"
                                >
                                    Valvular:
                                </label>
                                <select id="valvular" name="valvular" className='mt-2 w-full p-3' ref={valvularRef} required> 
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
                                <select id="otro" name="otro" className='mt-2 w-full p-3' ref={otroRef} required >
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
                                <select id="mcd" name="mcd" className='mt-2 w-full p-3' ref={mcdRef} required>
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
                                <select id="icc" name="icc" className='mt-2 w-full p-3' ref={iccRef} required>
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
                                <select id="reanimacion" name="reanimacion" className='mt-2 w-full p-3' ref={reanimacionRef} required>
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
                                <select id="fallaEntrenar" name="fallaEntrenar" className='mt-2 w-full p-3' ref={fallaEntrenarRef} required>
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
                                <select id="tabaquismo" name="tabaquismo" className='mt-2 w-full p-3' ref={tabaquismoRef} required>
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
                                <select id="dislipidemia" name="dislipidemia" className='mt-2 w-full p-3' ref={dislipidemiaRef} required>
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
                                <select id="dm" name="dm" className='mt-2 w-full p-3' ref={dmRef} required> 
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
                                <select id="has" name="has" className='mt-2 w-full p-3' ref={hasRef} required>
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
                                <select id="obesidad" name="obesidad" className='mt-2 w-full p-3' ref={obesidadRef} required>
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
                                <select id="estres" name="estres" className='mt-2 w-full p-3' ref={estresRef} required>
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
                                <select id="sedentarismo" name="sedentarismo" className='mt-2 w-full p-3' ref={sedentarismoRef} required>
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
                                <select id="otro_factor" name="otro_factor" className='mt-2 w-full p-3' ref={otroFactorRef} required>
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
                                <select id="depresion" name="depresion" className='mt-2 w-full p-3' ref={depresionRef}required >
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
                                <select id="ansiedad" name="ansiedad" className='mt-2 w-full p-3' ref={ansiedadRef}required >
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
                                <select id="sintomatologia" name="sintomatologia" className='mt-2 w-full p-3' ref={sintomatologiaRef} required>
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
                                    ref={puntuacionAtpRef}
                                    required
                                    
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
                                    ref={heartScoreRef}
                                    required
                                    
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
                                    ref={colTotalRef}
                                    required
                                    
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
                                    ref={ldlRef}
                                    required
                                    
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
                                    ref={hdlRef}
                                    required
                                    
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
                                    ref={tgRef}
                                    required
                                    
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
                                    ref={feviRef}
                                    required
                                    
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
                                    ref={pcrRef}
                                    required
                                    
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="enfCoronaria"
                                    className="text-slate-800"
                                >
                                    Enf Coronaria:
                                </label>
                                <select id="enfCoronaria" name="enfCoronaria" className='mt-2 w-full p-3' ref={enfCoronariaRef}required >
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
                                    Isquemia MN:
                                </label>
                                <select id="isquemia" name="isquemia" className='mt-2 w-full p-3' ref={isquemiaRef} required>
                                    <option value="bajo">Bajo</option>
                                    <option value="medio">Medio</option>
                                    <option value="alto">Alto</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="isquemia_irm"
                                    className="text-slate-800"
                                >
                                    Isquemia IRM:
                                </label>
                                <select id="isquemia_irm" name="isquemia_irm" className='mt-2 w-full p-3' ref={isquemiaIrmRef} required>
                                    <option value="bajo">Bajo</option>
                                    <option value="medio">Medio</option>
                                    <option value="alto">Alto</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="eco_estres"
                                    className="text-slate-800"
                                >
                                    ECO:
                                </label>
                                <select id="eco_estres" name="eco_estres" className='mt-2 w-full p-3' ref={ecoRef} required>
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
                                <select id="holter" name="holter" className='mt-2 w-full p-3' ref={holterRef} required>
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
                                <select id="capacidadPe" name="capacidadPe" className='mt-2 w-full p-3' ref={capacidadPeRef}required >
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
                                    ref={fcBasalRef}
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
                                    step="0.01"
                                    id="fc_max"
                                    className="mt-2 w-full p-3 bg-gray-50 "
                                    name="fc_max"
                                    ref={fcMaxRef}
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
                                    step="0.01"
                                    ref={fcBorg12Ref}
                                    required
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
                                    ref={dpBorg12Ref}
                                    required
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
                                    ref={metsBorg12Ref}
                                    required
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
                                    ref={carga_maximaRef}
                                    required
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
                                    ref={tolerancia_esfuerzoRef}
                                    required
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
                                    ref={respuestaPreRef}
                                    required
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
                                    ref={indiceTaRef}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="porcentajeFC"
                                    className="text-slate-800"
                                >
                                    % de la FC predicha:
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    id="porcentajeFC"
                                    className="mt-2 w-full p-3 bg-gray-50 "
                                    name="porcentajeFC"
                                    ref={porcentajeFCRef}
                                    required
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
                                    ref={cronotrRef}
                                    required
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
                                    ref={poderCardiacoRef}
                                    required
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
                                    ref={recuperacionTasRef}
                                    required
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
                                    ref={recuperacionFcRef}
                                    required
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
                                    ref={dukeRef}
                                    required
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
                                    ref={veteranosRef}
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
                                    htmlFor="umbraIsque"
                                    className="text-slate-800"
                                >
                                    Umbral isquémico:
                                </label>
                                <select id="umbraIsque" name="umbraIsque" className='mt-2 w-full p-3' ref={umbraIsqueRef} required>
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
                                <select id="supradesnivel" name="supradesnivel" className='mt-2 w-full p-3' ref={supradesnivelRef} required>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="infra135"
                                    className="text-slate-800"
                                >
                                    InfraST  &gt; 2mm:
                                </label>
                                <select id="infra135" name="infra135" className='mt-2 w-full p-3' ref={infra135Ref}required >
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
                                    InfraST  &gt; 2mm:
                                </label>
                                <select id="infra5" name="infra5" className='mt-2 w-full p-3' ref={infra5Ref} required>
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
                                <select id="riesgoGlobal" name="riesgoGlobal" className='mt-2 w-full p-3' ref={riesgoGlobalRef} required>
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
                                <select id="grupo" name="grupo" className='mt-2 w-full p-3' ref={grupoRef} required>
                                    <option value="a">A</option>
                                    <option value="b">B</option>
                                    <option value="c">C</option>
                                    <option value="d">D</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="semanas"
                                    className="text-slate-800"
                                >
                                    Semanas:
                                </label>
                                <select id="semanas" name="semanas" className='mt-2 w-full p-3' ref={semanasRef} required>
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
                                    ref={sesionesRef}
                                />
                                
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="borg"
                                    className="text-slate-800"
                                >
                                    Borg:
                                </label>
                                <select id="borg" name="borg" className='mt-2 w-full p-3' ref={borgRef} required>
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
                                <select id="fcDiana" name="fcDiana" className='mt-2 w-full p-3' ref={fcDianaRef} required>
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
                                    ref={dpDianaRef}
                                    required
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
                                    ref={comentariosRef}
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
