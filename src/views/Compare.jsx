import React, { useEffect } from 'react'
import Header from '../components/Header'
import { useRef, useState } from 'react'
import { FaRegTrashCan, FaPrint } from "react-icons/fa6";
import { FaEye, FaEdit } from "react-icons/fa";
import clienteAxios from '../axios-client';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import useSWR from 'swr';
import ModalCompare from '../components/ModalCompare';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { differenceInDays } from 'date-fns';

export default function Compare() {
    const token = localStorage.getItem('AUTH_TOKEN')
    const { id } = useParams()
    const [errores, setErrores] = useState(null)
    const navigate = useNavigate()
    const [esfuerzo, setEsfuerzo] = useState([])
    const [esfuerzoUno, setEsfuerzoUno] = useState([])
    const [esfuerzoUnoid, setEsfuerzoUnoid] = useState([])
    const [esfuerzoDos, setEsfuerzoDos] = useState([])
    const [esfuerzoDosid, setEsfuerzoDosid] = useState([])

    const fechaRef = useRef();
    const fcBasalRef = useRef();
    const dpBasalRef = useRef();
    const fcMaxRef = useRef();
    const dpMaxRef = useRef();
    const fcBorg12Ref = useRef();
    const dpBorg12Ref = useRef();
    const metsMaxRef = useRef();
    const vo2AlcanzadoRef = useRef();
    const tiempoEsfuerzoRef = useRef();
    const fcmaxFerRef = useRef();
    const metsUisqRef = useRef();
    const fcUisqRef = useRef();
    const MaxInfraRef = useRef();
    const indiceTasRef = useRef();
    const recuptasRef = useRef();
    const respCronoRef = useRef();
    const iemRef = useRef();
    const pceRef = useRef();
    const dukeRef = useRef();
    const veteranosRef = useRef();
    const scoreAnginaRef = useRef();


    const [modal, setModal] = useState(true)

    const fetcher = () => clienteAxios(`/api/esfuerzos/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(function (response) {
            setEsfuerzo(response.data.data)
        })

    const { data, error, isLoading } = useSWR(`/api/esfuerzos/${id}`, fetcher)


    const [paciente, setPaciente] = useState({
        id: null,
        nombre: '',
        apellidoPat: '',
        apellidoMat: '',
        telefono: '',
        fechaNacimiento: '',
        genero: '',
        estadoCivil: '',
        profesion: '',
        registro: '',
        domicilio: '',
        talla: '',
        peso: '',
        cintura: '',
        diagnostico: '',
        medicamentos: ''
    })


    if (id) {
        useEffect(() => {
            clienteAxios.get(`/api/pacientes/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(({ data }) => {
                    setPaciente(data)
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


    const handleInputChangeUno = (event) => {
        setEsfuerzoUnoid(event.target.value)
        const id =(event.target.value);
        const esfuerzouno = clienteAxios.get(`/api/esfuerzo/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(({ data }) => {
                setEsfuerzoUno(data)
            })
            .catch(error => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Ocurrió un error!",
                });
            });

    };

    const handleInputChangeDos = (event) => {
        setEsfuerzoDosid(event.target.value)
        const id =(event.target.value);
        const esfuerzouno = clienteAxios.get(`/api/esfuerzo/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(({ data }) => {
                setEsfuerzoDos(data)
            })
            .catch(error => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Ocurrió un error!",
                });
            });

    };

    const onSubmit= (e) => {
        e.preventDefault()

        const datos = {
            fecha: fechaRef.current.value,
            fcBasal: fcBasalRef.current.value,
            dpBasal: dpBasalRef.current.value,
            fcMax: fcMaxRef.current.value,
            dpMax: dpMaxRef.current.value,
            fcBorg12: fcBorg12Ref.current.value,
            dpBorg12: dpBorg12Ref.current.value,
            metsMax: metsMaxRef.current.value,
            vo2Alcanzado: vo2AlcanzadoRef.current.value,
            tiempoEsfuerzo: tiempoEsfuerzoRef.current.value,
            fcmaxFer: fcmaxFerRef.current.value,
            metsUisq: metsUisqRef.current.value,
            fcUisq: fcUisqRef.current.value,
            MaxInfra: MaxInfraRef.current.value,
            indiceTas: indiceTasRef.current.value,
            respCrono: respCronoRef.current.value,
            iem: iemRef.current.value,
            pce: pceRef.current.value,
            duke: dukeRef.current.value,
            veteranos: veteranosRef.current.value,
            scoreAngina: scoreAnginaRef.current.value,
            fechaFin: esfuerzoDos.fecha,
            fechaIni: esfuerzoUno.fecha,
            recuptas: recuptasRef.current.value
        }


        try {
            clienteAxios.post('/api/reporte', {
                datos,
                esfuerzoUnoid,
                esfuerzoDosid
            },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }).then(function (response) {
                
                    
                    setTimeout(function () {
                        window.location.href = `/paciente/${id}`;
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
            <Header titulo={`Comparar Expedientes`} />
            <div className="mt-3 mb-4">
                <label
                    htmlFor="exp_uno"
                    className="text-slate-800 text-xl"
                >
                    Selecciona el Expediente 1:
                </label>
                <select className='mt-2 w-full p-3' id="exp_uno" value={esfuerzoUnoid} onChange={handleInputChangeUno} >
                    <option value="">Seleccione una opción</option>
                    {esfuerzo.map((esfuerzobd) => (
                        <option key={esfuerzobd.id} value={esfuerzobd.id} >{esfuerzobd.numPrueba} - {esfuerzobd.fecha}</option>
                    ))}
                </select>
            </div>
            <div className="mb-5">
                <label
                    htmlFor="exp_dos"
                    className="text-slate-800 text-xl"
                >
                    Selecciona el Expediente 2:
                </label>
                <select className='mt-2 w-full p-3' id="exp_dos" value={esfuerzoDosid} onChange={handleInputChangeDos} >
                    <option value="">Seleccione una opción</option>
                    {esfuerzo
                        .filter((esfuerzobd) => esfuerzobd.id != esfuerzoUnoid)
                        .map((esfuerzobd) => (
                            <option key={esfuerzobd.id} value={esfuerzobd.id} >{esfuerzobd.numPrueba} - {esfuerzobd.fecha}</option>
                        ))}
                </select>
            </div>
            <form action="" onSubmit={onSubmit}>
            <div className='mt-3'>
            <table className="table md:w-full w-full border-separate lg:border-collapse">
              <thead className="">
                  <tr >
                      <th className="border-b-2 border-gray-200">Rubro</th>
                      <th className="border-b-2 border-gray-200">Primera Prueba</th>
                      <th className="border-b-2 border-gray-200">Segunda Prueba</th>
                      <th className="border-b-2 border-gray-200">Variación (%)</th>
                  </tr>
              </thead>
              <tbody className="">
                      <tr className="text-center md:text-xl ">
                        <td>Fecha</td>
                          <td className="border-b-2 border-gray-200 py-4">{esfuerzoUno.fecha}</td>
                          <td className="border-b-2 border-gray-200">{esfuerzoDos.fecha}</td>
                          <td className="border-b-2 border-gray-200"> <input type="text" className="text-center" value={differenceInDays(esfuerzoDos.fecha, esfuerzoUno.fecha)}  ref={fechaRef} disabled/></td>
                      </tr>
                      <tr className="text-center md:text-xl ">
                        <td>Fc basal</td>
                          <td className="border-b-2 border-gray-200 py-4">{esfuerzoUno.fcBasal}</td>
                          <td className="border-b-2 border-gray-200">{esfuerzoDos.fcBasal}</td>
                          <td className="border-b-2 border-gray-200"><input type="text" className="text-center" value={     parseFloat((((esfuerzoDos.fcBasal*100)/esfuerzoUno.fcBasal)-100).toFixed(2))}  ref={fcBasalRef} disabled/></td>
                      </tr>
                      <tr className="text-center md:text-xl ">
                        <td>Doble Producto Basal</td>
                          <td className="border-b-2 border-gray-200 py-4">{esfuerzoUno.dapBasal}</td>
                          <td className="border-b-2 border-gray-200">{esfuerzoDos.dapBasal}</td>
                          <td className="border-b-2 border-gray-200"><input type="text" className="text-center" value={  parseFloat((((esfuerzoDos.dapBasal*100)/esfuerzoUno.dapBasal)-100).toFixed(2))}  ref={dpBasalRef} disabled/></td>
                      </tr>
                      <tr className="text-center md:text-xl ">
                        <td>Fc máxima</td>
                          <td className="border-b-2 border-gray-200 py-4">{esfuerzoUno.fcMax}</td>
                          <td className="border-b-2 border-gray-200">{esfuerzoDos.fcMax}</td>
                          <td className="border-b-2 border-gray-200"><input type="text" className="text-center" value={  parseFloat((((esfuerzoDos.fcMax*100)/esfuerzoUno.fcMax)-100).toFixed(2))}  ref={fcMaxRef} disabled/></td>
                      </tr>
                      <tr className="text-center md:text-xl ">
                        <td>Doble Producto máximo</td>
                          <td className="border-b-2 border-gray-200 py-4">{esfuerzoUno.dpMax}</td>
                          <td className="border-b-2 border-gray-200">{esfuerzoDos.dpMax}</td>
                          <td className="border-b-2 border-gray-200"><input type="text" className="text-center" value={  parseFloat((((esfuerzoDos.dpMax*100)/esfuerzoUno.dpMax)-100).toFixed(2))}  ref={dpMaxRef} disabled/></td>
                      </tr>
                      <tr className="text-center md:text-xl ">
                        <td>Fc Borg 12</td>
                          <td className="border-b-2 border-gray-200 py-4">{esfuerzoUno.fcBorg12}</td>
                          <td className="border-b-2 border-gray-200">{esfuerzoDos.fcBorg12}</td>
                          <td className="border-b-2 border-gray-200"><input type="text" className="text-center" value={   parseFloat((((esfuerzoDos.fcBorg12*100)/esfuerzoUno.fcBorg12)-100).toFixed(2))}  ref={fcBorg12Ref} disabled/></td>
                      </tr>
                      <tr className="text-center md:text-xl ">
                        <td>Doble Producto Borg 12</td>
                          <td className="border-b-2 border-gray-200 py-4">{esfuerzoUno.dpBorg12}</td>
                          <td className="border-b-2 border-gray-200">{esfuerzoDos.dpBorg12}</td>
                          <td className="border-b-2 border-gray-200"><input type="text" className="text-center" value={   parseFloat((((esfuerzoDos.dpBorg12*100)/esfuerzoUno.dpBorg12)-100).toFixed(2))}  ref={dpBorg12Ref} disabled/></td>
                      </tr>
                      <tr className="text-center md:text-xl ">
                        <td>Carga máxima (METs)</td>
                          <td className="border-b-2 border-gray-200 py-4">{  Math.round(esfuerzoUno.mets_max*100)/100}</td>
                          <td className="border-b-2 border-gray-200">{ Math.round(esfuerzoDos.mets_max*100)/100}</td>
                          <td className="border-b-2 border-gray-200"><input type="text" className="text-center" value={  parseFloat((((esfuerzoDos.mets_max*100)/esfuerzoUno.mets_max)-100).toFixed(2))} ref={metsMaxRef} disabled/></td>
                      </tr>
                      <tr className="text-center md:text-xl ">
                        <td>% METs alcanzado</td>
                          <td className="border-b-2 border-gray-200 py-4">{ Math.round(esfuerzoUno.vo2_alcanzado *100)/100}</td>
                          <td className="border-b-2 border-gray-200">{ Math.round(esfuerzoDos.vo2_alcanzado*100)/100}</td>
                          <td className="border-b-2 border-gray-200"><input type="text" className="text-center" value={   parseFloat((((esfuerzoDos.vo2_alcanzado*100)/esfuerzoUno.vo2_alcanzado)-100).toFixed(2))}  ref={vo2AlcanzadoRef} disabled/></td>
                      </tr>
                      <tr className="text-center md:text-xl ">
                        <td>Tiempo de ejercicio (min)</td>
                          <td className="border-b-2 border-gray-200 py-4">{ Math.round(esfuerzoUno.tiempoEsfuerzo)}</td>
                          <td className="border-b-2 border-gray-200">{ Math.round(esfuerzoDos.tiempoEsfuerzo)}</td>
                          <td className="border-b-2 border-gray-200"><input type="text" className="text-center" value={ parseFloat((((esfuerzoDos.tiempoEsfuerzo*100)/esfuerzoUno.tiempoEsfuerzo)-100).toFixed(2))}  ref={tiempoEsfuerzoRef} disabled/></td>
                      </tr>
                      <tr className="text-center md:text-xl ">
                        <td>Recuperación de la FC 1'(lpm)</td>
                          <td className="border-b-2 border-gray-200 py-4">{ Math.round(esfuerzoUno.fcmax_fc1er)}</td>
                          <td className="border-b-2 border-gray-200">{ Math.round(esfuerzoDos.fcmax_fc1er)}</td>
                          <td className="border-b-2 border-gray-200"><input type="text" className="text-center" value={   parseFloat((((esfuerzoDos.fcmax_fc1er*100)/esfuerzoUno.fcmax_fc1er)-100).toFixed(2))}  ref={fcmaxFerRef} disabled/></td>
                      </tr>
                      <tr className="text-center md:text-xl ">
                        <td>Umbral Isquémico (METs)</td>
                          <td className="border-b-2 border-gray-200 py-4">{ Math.round(esfuerzoUno.mets_U_isq)}</td>
                          <td className="border-b-2 border-gray-200">{ Math.round(esfuerzoDos.mets_U_isq)}</td>
                          <td className="border-b-2 border-gray-200"><input type="text" className="text-center" value={  parseFloat((((esfuerzoDos.mets_U_isq*100)/esfuerzoUno.mets_U_isq)-100).toFixed(2))}  ref={metsUisqRef} disabled/></td>
                      </tr>
                      <tr className="text-center md:text-xl ">
                        <td>Umbral Isquémico (FC)</td>
                          <td className="border-b-2 border-gray-200 py-4">{ Math.round(esfuerzoUno.fc_U_isq)}</td>
                          <td className="border-b-2 border-gray-200">{ Math.round(esfuerzoDos.fc_U_isq)}</td>
                          <td className="border-b-2 border-gray-200"><input type="text" className="text-center" value={ esfuerzoDos.fc_U_isq!=null && esfuerzoDos.fc_U_isq!= 0 && esfuerzoUno.fc_U_isq!=null && esfuerzoUno.fc_U_isq!= 0 ? parseFloat((((esfuerzoDos.fc_U_isq*100)/esfuerzoUno.fc_U_isq)-100).toFixed(2)):0}  ref={fcUisqRef} disabled/></td>
                      </tr>
                      <tr className="text-center md:text-xl ">
                        <td>Máximo Desnivel ST</td>
                          <td className="border-b-2 border-gray-200 py-4">{ Math.round(esfuerzoUno.MaxInfra)}</td>
                          <td className="border-b-2 border-gray-200">{ Math.round(esfuerzoDos.MaxInfra)}</td>
                          <td className="border-b-2 border-gray-200"><input type="text" className="text-center" value={ esfuerzoDos.MaxInfra!=null && esfuerzoDos.MaxInfra!= 0 && esfuerzoUno.MaxInfra!= 0 && esfuerzoUno.MaxInfra!= null? parseFloat((((esfuerzoDos.MaxInfra*100)/esfuerzoUno.MaxInfra)-100).toFixed(2)):0}  ref={MaxInfraRef} disabled/></td>
                      </tr>
                      <tr className="text-center md:text-xl ">
                        <td>Índice TA en esfuerzo</td>
                          <td className="border-b-2 border-gray-200 py-4">{ Math.round(esfuerzoUno.indice_tas)}</td>
                          <td className="border-b-2 border-gray-200">{ Math.round(esfuerzoDos.indice_tas)}</td>
                          <td className="border-b-2 border-gray-200"><input type="text" className="text-center" value={esfuerzoDos.indice_tas!=null && esfuerzoDos.indice_tas!= 0? parseFloat((((esfuerzoDos.indice_tas*100)/esfuerzoUno.indice_tas)-100).toFixed(2)):0}  ref={indiceTasRef} disabled/></td>
                      </tr>
                      <tr className="text-center md:text-xl ">
                        <td>Recuperación de la TAS 1/3</td>
                          <td className="border-b-2 border-gray-200 py-4">{ Math.round(esfuerzoUno.recup_tas)}</td>
                          <td className="border-b-2 border-gray-200">{ Math.round(esfuerzoDos.recup_tas)}</td>
                          <td className="border-b-2 border-gray-200"><input type="text" className="text-center" value={esfuerzoDos.recup_tas!=null && esfuerzoDos.recup_tas!= 0? parseFloat((((esfuerzoDos.recup_tas*100)/esfuerzoUno.recup_tas)-100).toFixed(2)):0}  ref={recuptasRef} disabled/></td>
                      </tr>
                      <tr className="text-center md:text-xl ">
                        <td>Resp. Cronotrópica (lpm/MET)</td>
                          <td className="border-b-2 border-gray-200 py-4">{ Math.round(esfuerzoUno.resp_crono)}</td>
                          <td className="border-b-2 border-gray-200">{ Math.round(esfuerzoDos.resp_crono)}</td>
                          <td className="border-b-2 border-gray-200"><input type="text" className="text-center" value={esfuerzoDos.resp_crono!=null && esfuerzoDos.resp_crono!= 0?parseFloat((((esfuerzoDos.resp_crono*100)/esfuerzoUno.resp_crono)-100).toFixed(2)):0} ref={respCronoRef} disabled/></td>
                      </tr>
                      <tr className="text-center md:text-xl ">
                        <td>IEM</td>
                          <td className="border-b-2 border-gray-200 py-4">{ Math.round(esfuerzoUno.iem)}</td>
                          <td className="border-b-2 border-gray-200">{ Math.round(esfuerzoDos.iem)}</td>
                          <td className="border-b-2 border-gray-200"><input type="text" className="text-center" value={esfuerzoDos.iem!=null && esfuerzoDos.iem!= 0?parseFloat((((esfuerzoDos.iem*100)/esfuerzoUno.iem)-100).toFixed(2)):0}  ref={iemRef} disabled/></td>
                      </tr>
                      <tr className="text-center md:text-xl ">
                        <td>Poder Cardiaco en ejercicio</td>
                          <td className="border-b-2 border-gray-200 py-4">{ Math.round(esfuerzoUno.pce)}</td>
                          <td className="border-b-2 border-gray-200">{ Math.round(esfuerzoDos.pce)}</td>
                          <td className="border-b-2 border-gray-200"><input type="text" className="text-center" value={esfuerzoDos.pce!=null && esfuerzoDos.pce!= 0?parseFloat((((esfuerzoDos.pce*100)/esfuerzoUno.pce)-100).toFixed(2)):0}  ref={pceRef} disabled/></td>
                      </tr>
                      <tr className="text-center md:text-xl ">
                        <td>Puntuación de Duke</td>
                          <td className="border-b-2 border-gray-200 py-4">{ Math.round(esfuerzoUno.duke)}</td>
                          <td className="border-b-2 border-gray-200">{ Math.round(esfuerzoDos.duke)}</td>
                          <td className="border-b-2 border-gray-200"><input type="text" className="text-center" value={esfuerzoDos.duke!=null && esfuerzoDos.duke!= 0?parseFloat((esfuerzoDos.duke-esfuerzoUno.duke).toFixed(2)):0}  ref={dukeRef} disabled/></td>
                      </tr>
                      <tr className="text-center md:text-xl ">
                        <td>Puntuación de Veteranos</td>
                          <td className="border-b-2 border-gray-200 py-4">{ Math.round(esfuerzoUno.veteranos)}</td>
                          <td className="border-b-2 border-gray-200">{ Math.round(esfuerzoDos.veteranos)}</td>
                          <td className="border-b-2 border-gray-200"><input type="text" className="text-center" value={esfuerzoDos.veteranos!=null && esfuerzoDos.veteranos!= 0?parseFloat((esfuerzoDos.veteranos-esfuerzoUno.veteranos).toFixed(2)):0}  ref={veteranosRef} disabled/></td>
                      </tr>
                      <tr className="text-center md:text-xl ">
                        <td>Score de Angor</td>
                          <td className="border-b-2 border-gray-200 py-4">{ Math.round(esfuerzoUno.scoreAngina)}</td>
                          <td className="border-b-2 border-gray-200">{ Math.round(esfuerzoDos.scoreAngina)}</td>
                          <td className="border-b-2 border-gray-200"><input type="text" className="text-center" value={  esfuerzoDos.scoreAngina!=null && esfuerzoDos.scoreAngina!= 0?parseFloat((esfuerzoDos.scoreAngina-esfuerzoUno.scoreAngina).toFixed(2)):0}  ref={scoreAnginaRef} disabled/></td>
                      </tr>
                      <tr className="text-center md:text-xl ">
                        <td>Ectopia Ventricular Frecuente</td>
                          <td className="border-b-2 border-gray-200 py-4">{ esfuerzoUno.ectopia_ventricular===1?"si":"no"}</td>
                          <td className="border-b-2 border-gray-200">{ esfuerzoDos.ectopia_ventricular===1?"si":"no"}</td>
                          <td className="border-b-2 border-gray-200"></td>
                      </tr>
              </tbody>
          </table>
            </div>
            <div className='flex justify-end'>
                            <input
                                type="submit"
                                value="Guardar"
                                className="bg-green-500 hover:bg-green-600 text-white m-5 p-3 uppercase font-bold cursor-pointer"
                            />
                            <Link className="bg-red-500 hover:bg-red-600 text-white m-5 text-center p-3 uppercase font-bold cursor-pointer" to="/dashboard"> Cancelar</Link>
                            
            </div>
        </form>
        </>
    )
}
