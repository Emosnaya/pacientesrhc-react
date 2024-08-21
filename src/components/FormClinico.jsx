import React, { useRef, useState } from 'react'
import clienteAxios from '../axios-client'
import { useNavigate, useParams } from 'react-router-dom';
import useSWR from 'swr'
import Swal from "sweetalert2";

export default function FormClinico() {
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
  const [respuestaIm, setrespuestaIm] = useState('');
    const [inputBloqueadoIm, setInputBloqueadoIm] = useState('');
  
    const handleRespuestaChangeIm = (e) => {
      const valorRespuesta = e.target.value.toLowerCase().trim();
      setrespuestaIm(valorRespuesta);
  
      // Lógica para bloquear el segundo input
      if (valorRespuesta === 'false') {
        setInputBloqueadoIm(true);
      } else {
        setInputBloqueadoIm(false);
      }
    };
    const [respuestaImAp, setrespuestaImAp] = useState('');
    const [inputBloqueadoImAp, setInputBloqueadoImAp] = useState('');
  
    const handleRespuestaChangeImAp = (e) => {
      const valorRespuesta = e.target.value.toLowerCase().trim();
      setrespuestaImAp(valorRespuesta);
  
      // Lógica para bloquear el segundo input
      if (valorRespuesta === 'false') {
        setInputBloqueadoImAp(true);
      } else {
        setInputBloqueadoImAp(false);
      }
    };
    const [respuestaImLat, setrespuestaImLat] = useState('');
    const [inputBloqueadoImLat, setInputBloqueadoImLat] = useState('');
  
    const handleRespuestaChangeImLat = (e) => {
      const valorRespuesta = e.target.value.toLowerCase().trim();
      setrespuestaImLat(valorRespuesta);
  
      // Lógica para bloquear el segundo input
      if (valorRespuesta === 'false') {
        setInputBloqueadoImLat(true);
      } else {
        setInputBloqueadoImLat(false);
      }
    };
    const [respuestaImIn, setrespuestaImIn] = useState('');
    const [inputBloqueadoImIn, setInputBloqueadoImIn] = useState('');
  
    const handleRespuestaChangeImIn = (e) => {
      const valorRespuesta = e.target.value.toLowerCase().trim();
      setrespuestaImIn(valorRespuesta);
  
      // Lógica para bloquear el segundo input
      if (valorRespuesta === 'false') {
        setInputBloqueadoImIn(true);
      } else {
        setInputBloqueadoImIn(false);
      }
    };
     
    const [respuestaImdV, setrespuestaImdV] = useState('');
    const [inputBloqueadoImdV, setInputBloqueadoImdV] = useState('');
  
    const handleRespuestaChangeImdV = (e) => {
      const valorRespuesta = e.target.value.toLowerCase().trim();
      setrespuestaImdV(valorRespuesta);
  
      // Lógica para bloquear el segundo input
      if (valorRespuesta === 'false') {
        setInputBloqueadoImdV(true);
      } else {
        setInputBloqueadoImdV(false);
      }
    };
    const [respuestaImAI, setrespuestaImAI] = useState('');
    const [inputBloqueadoImAI, setInputBloqueadoImAI] = useState('');
  
    const handleRespuestaChangeImAI = (e) => {
      const valorRespuesta = e.target.value.toLowerCase().trim();
      setrespuestaImAI(valorRespuesta);
  
      // Lógica para bloquear el segundo input
      if (valorRespuesta === 'false') {
        setInputBloqueadoImAI(true);
      } else {
        setInputBloqueadoImAI(false);
      }
    };
    const [respuestaImAE, setrespuestaImAE] = useState('');
    const [inputBloqueadoImAE, setInputBloqueadoImAE] = useState('');
  
    const handleRespuestaChangeImAE = (e) => {
      const valorRespuesta = e.target.value.toLowerCase().trim();
      setrespuestaImAE(valorRespuesta);
  
      // Lógica para bloquear el segundo input
      if (valorRespuesta === 'false') {
        setInputBloqueadoImAE(true);
      } else {
        setInputBloqueadoImAE(false);
      }
    };
    const [respuestaCC, setrespuestaCC] = useState('');
    const [inputBloqueadoCC, setInputBloqueadoCC] = useState('');
  
    const handleRespuestaChangeCC = (e) => {
      const valorRespuesta = e.target.value.toLowerCase().trim();
      setrespuestaCC(valorRespuesta);
  
      // Lógica para bloquear el segundo input
      if (valorRespuesta === 'false') {
        setInputBloqueadoCC(true);
      } else {
        setInputBloqueadoCC(false);
      }
    };
    const [respuestaMS, setrespuestaMS] = useState('');
    const [inputBloqueadoMS, setInputBloqueadoMS] = useState('');
  
    const handleRespuestaChangeMS = (e) => {
      const valorRespuesta = e.target.value.toLowerCase().trim();
      setrespuestaMS(valorRespuesta);
  
      // Lógica para bloquear el segundo input
      if (valorRespuesta === 'false') {
        setInputBloqueadoMS(true);
      } else {
        setInputBloqueadoMS(false);
      }
    };

    const [respuestaCRVC, setrespuestaCRVC] = useState('');
    const [inputBloqueadoCRVC, setInputBloqueadoCRVC] = useState('');
  
    const handleRespuestaChangeCRV = (e) => {
      const valorRespuesta = e.target.value.toLowerCase().trim();
      setrespuestaCRVC(valorRespuesta);
  
      // Lógica para bloquear el segundo input
      if (valorRespuesta === 'false') {
        setInputBloqueadoCRVC(true);
      } else {
        setInputBloqueadoCRVC(false);
      }
    };


    const [respuestaTab, setrespuestaTab] = useState('');
    const [inputBloqueadoTab, setInputBloqueadoTab] = useState('');
  
    const handleRespuestaChangeTab = (e) => {
      const valorRespuesta = e.target.value.toLowerCase().trim();
      setrespuestaTab(valorRespuesta);
  
      // Lógica para bloquear el segundo input
      if (valorRespuesta === 'false') {
        setInputBloqueadoTab(true);
      } else {
        setInputBloqueadoTab(false);
      }
    };

    const [respuestaAF, setrespuestaAF] = useState('');
    const [inputBloqueadoAF, setInputBloqueadoAF] = useState('');
  
    const handleRespuestaChangeAF = (e) => {
      const valorRespuesta = e.target.value.toLowerCase().trim();
      setrespuestaAF(valorRespuesta);
  
      // Lógica para bloquear el segundo input
      if (valorRespuesta === 'false') {
        setInputBloqueadoAF(true);
      } else {
        setInputBloqueadoAF(false);
      }
    };
    const [respuestabH, setrespuestabH] = useState('');
    const [inputBloqueadobH, setInputBloqueadobH] = useState('');
  
    const handleRespuestaChangebH = (e) => {
      const valorRespuesta = e.target.value.toLowerCase().trim();
      setrespuestabH(valorRespuesta);
  
      // Lógica para bloquear el segundo input
      if (valorRespuesta === 'false') {
        setInputBloqueadobH(true);
      } else {
        setInputBloqueadobH(false);
      }
    };

    const [respuestaQs, setrespuestaQs] = useState('');
    const [inputBloqueadoQs, setInputBloqueadoQs] = useState('');
  
    const handleRespuestaChangeQs = (e) => {
      const valorRespuesta = e.target.value.toLowerCase().trim();
      setrespuestaQs(valorRespuesta);
  
      // Lógica para bloquear el segundo input
      if (valorRespuesta === 'false') {
        setInputBloqueadoQs(true);
      } else {
        setInputBloqueadoQs(false);
      }
    };

    const [respuestaEcg, setrespuestaEcg] = useState('');
    const [inputBloqueadoEcg, setInputBloqueadoEcg] = useState('');
  
    const handleRespuestaChangeEcg = (e) => {
      const valorRespuesta = e.target.value.toLowerCase().trim();
      setrespuestaEcg(valorRespuesta);
  
      // Lógica para bloquear el segundo input
      if (valorRespuesta === 'false') {
        setInputBloqueadoEcg(true);
      } else {
        setInputBloqueadoEcg(false);
      }
    };

    const [respuestaEco, setrespuestaEco] = useState('');
    const [inputBloqueadoEco, setInputBloqueadoEco] = useState('');
  
    const handleRespuestaChangeEco = (e) => {
      const valorRespuesta = e.target.value.toLowerCase().trim();
      setrespuestaEco(valorRespuesta);
  
      // Lógica para bloquear el segundo input
      if (valorRespuesta === 'false') {
        setInputBloqueadoEco(true);
      } else {
        setInputBloqueadoEco(false);
      }
    };
    const [respuestaMn, setrespuestaMn] = useState('');
    const [inputBloqueadoMn, setInputBloqueadoMn] = useState('');
  
    const handleRespuestaChangeMn = (e) => {
      const valorRespuesta = e.target.value.toLowerCase().trim();
      setrespuestaMn(valorRespuesta);
  
      // Lógica para bloquear el segundo input
      if (valorRespuesta === 'false') {
        setInputBloqueadoMn(true);
      } else {
        setInputBloqueadoMn(false);
      }
    };

    const [respuestaVR, setrespuestaVR] = useState('');
    const [inputBloqueadoVR, setInputBloqueadoVR] = useState('');
  
    const handleRespuestaChangeVR = (e) => {
      const valorRespuesta = e.target.value.toLowerCase().trim();
      setrespuestaVR(valorRespuesta);
  
      // Lógica para bloquear el segundo input
      if (valorRespuesta === 'false') {
        setInputBloqueadoVR(true);
      } else {
        setInputBloqueadoVR(false);
      }
    };

    const [respuestaHo, setrespuestaHo] = useState('');
    const [inputBloqueadoHo, setInputBloqueadoHo] = useState('');
  
    const handleRespuestaChangeHo = (e) => {
      const valorRespuesta = e.target.value.toLowerCase().trim();
      setrespuestaHo(valorRespuesta);
  
      // Lógica para bloquear el segundo input
      if (valorRespuesta === 'false') {
        setInputBloqueadoHo(true);
      } else {
        setInputBloqueadoHo(false);
      }
    };

    const [respuestaCa, setrespuestaCa] = useState('');
    const [inputBloqueadoCa, setInputBloqueadoCa] = useState('');
  
    const handleRespuestaChangeCa = (e) => {
      const valorRespuesta = e.target.value.toLowerCase().trim();
      setrespuestaCa(valorRespuesta);
  
      // Lógica para bloquear el segundo input
      if (valorRespuesta === 'false') {
        setInputBloqueadoCa(true);
      } else {
        setInputBloqueadoCa(false);
      }
    };
    const [respuestaVal, setrespuestaVal] = useState('');
    const [inputBloqueadoVal, setInputBloqueadoVal] = useState('');
  
    const handleRespuestaChangeValvulo = (e) => {
      const valorRespuesta = e.target.value.toLowerCase().trim();
      setrespuestaVal(valorRespuesta);
  
      // Lógica para bloquear el segundo input
      if (valorRespuesta === 'false') {
        setInputBloqueadoVal(true);
      } else {
        setInputBloqueadoVal(false);
      }
    };

  
    const fetcher = () => clienteAxios('/api/pacientes',
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(function (response) {
      setPacientes(response.data.data)
    })
    const {data, error, isLoading} = useSWR('/api/pacientes', fetcher)
  
    const handleInputChange = (event) => {
      setId(event.target.value);
      setPaciente(event.target.value);
    };

    const fechaRef = useRef();
    const fecha1vezRef = useRef();
    const horaRef = useRef();
    const imComplicadoRef= useRef();
    const imAnteriorRef= useRef();
    const imSeptalRef= useRef();
    const imApicalRef= useRef();
    const imLateralRef= useRef();
    const imInferiorRef= useRef();
    const imdelVdRef= useRef();
    const anginaInestableRef= useRef();
    const anginaEstableRef= useRef();
    const choqueCardRef= useRef();
    const mSubitaRef= useRef();
    const claseCcsRef= useRef();
    const fallaCardiacaRef= useRef();
    const sobrevivienteCprRef= useRef();
    const incapacidadEntrenarRef= useRef();
    const cfNyhaRef= useRef();
    const crvcRef= useRef();
    const crvcHemoRef= useRef();
    const insuArtPerRef= useRef();
    const vMitralRef= useRef();
    const vAorticaRef= useRef();
    const vTricuspideRef= useRef();
    const vPulmonarRef= useRef();
    const estratificacionRef= useRef();
    const inicioFase2Ref= useRef();
    const finFase2Ref= useRef();
    const tabaquismoRef= useRef();
    const cigxDiaRef= useRef();
    const cigxYearRef= useRef();
    const abadonoCigarroRef= useRef();
    const abandonoYearRef= useRef();
    const hipertensionYearsRef= useRef();
    const dmYearsRef= useRef();
    const actividadFisRef= useRef();
    const tipoActividadRef= useRef();
    const actividadHsmRef= useRef();
    const actividadYearsRef= useRef();
    const actividadYearsAbandonoRef= useRef();
    const estresYearsRef= useRef();
    const ansiedadYearsRef= useRef();
    const depresionYearsRef= useRef();
    const hipercolesterolemiaRef= useRef();
    const hipertrigliceridemiaRef= useRef();
    const diabetesYearsRef= useRef();
    const tiempoEvRef= useRef();
    const tratamientoRef= useRef();
    const fechaTraRef= useRef();
    const betabloqueadorRef= useRef();
    const nitratosRef= useRef();
    const calcioantaRef= useRef();
    const aspirinaRef= useRef();
    const anticoagulacionRef= useRef();
    const iecasRef= useRef();
    const atiiRef= useRef();
    const diureticosRef= useRef();
    const estatinasRef= useRef();
    const fibratosRef= useRef();
    const digoxinaRef= useRef();
    const antiarritmicosRef= useRef();
    const otroRef= useRef();
    const bhRef= useRef();
    const hbRef= useRef();
    const leucosRef= useRef();
    const plaquetasRef= useRef();
    const qsRef= useRef();
    const glucosaRef= useRef();
    const creatininaRef= useRef();
    const acUricoRef= useRef();
    const colesterolRef= useRef();
    const ldlRef= useRef();
    const hdlRef= useRef();
    const trigliceridosRef= useRef();
    const tpRef= useRef();
    const inrRef= useRef();
    const tptRef= useRef();
    const pcrasRef= useRef();
    const otroLabRef= useRef();
    const ecgFechaRef= useRef();
    const ritmoRef= useRef();
    const rrmmRef= useRef();
    const aPRef= useRef();
    const aQRSRef= useRef();
    const aTRef= useRef();
    const duracionQrsRef= useRef();
    const duracionPRef= useRef();
    const qtmRef= useRef();
    const prRef= useRef();
    const bavRef= useRef();
    const brihhRef= useRef();
    const brdhhRef= useRef();
    const qAsRef= useRef();
    const qInfRef= useRef();
    const qLatRef= useRef();
    const otrosEcgRef= useRef();
    const ecoFechaRef= useRef();
    const fePorRef= useRef();
    const ddPorRef= useRef();
    const dsPorRef= useRef();
    const triviPorRef= useRef();
    const relEARef= useRef();
    const otrosEcoRef= useRef();
    const mnFechaRef= useRef();
    const feporMnRef= useRef();
    const antImRef= useRef();
    const antIsqRef= useRef();
    const antRrRef= useRef();
    const septIMRef= useRef();
    const septIsqRef= useRef();
    const septRrRef= useRef();
    const latImRef= useRef();
    const latIsqRef= useRef();
    const latRrRef= useRef();
    const infIMRef= useRef();
    const infIsqRef= useRef();
    const infRrRef= useRef();
    const vrieRef= useRef();
    const vrieFechaRef= useRef();
    const feviBasalRef= useRef();
    const fevi10DobutaRef= useRef();
    const reservaInotARef= useRef();
    const reservaInotRRef= useRef();
    const vrieOtroRef= useRef();
    const vrieRiesgoRef= useRef();
    const holterRef= useRef();
    const holterFechaRef= useRef();
    const holterDiagnosticoRef= useRef();
    const holterRiesgoRef= useRef();
    const cateterismoRef= useRef();
    const catetFechaRef= useRef();
    const catetFeRef= useRef();
    const catetD2viRef= useRef();
    const catetTcoRef= useRef();
    const catetDaRef= useRef();
    const catetDaMedRef= useRef();
    const catetDaDistRef= useRef();
    const catet1aDRef= useRef();
    const catet2aDRef= useRef();
    const catetCxPRef= useRef();
    const catetCxDRef= useRef();
    const catetOmRef= useRef();
    const catetPlRef= useRef();
    const catetCdproxRef= useRef();
    const catetCdMedRef= useRef();
    const catetCdDistRef= useRef();
    const catetRVIzqRef= useRef();
    const catetDpRef= useRef();
    const catetOtroRef= useRef();
    const catetMovilidadRef= useRef();
    const catetRiesgoRef= useRef();
    const terminoRef= useRef();
    const semanasRef= useRef();
    const aprendioBorgRef= useRef();
    const muerteRef= useRef();
    const inestabilidadCardioRef= useRef();
    const hospitalizacionRef= useRef();
    const suspMotuPropioRef= useRef();
    const lesionOsteoRef= useRef();
    const resOtrosRef= useRef();
    const Vez1aFechaRef= useRef();
    const sintomasRef= useRef();
    const comerVestirseRef= useRef();
    const caminarCasaRef= useRef();
    const caminar2CuadrasRef= useRef();
    const subirPisoRef= useRef();
    const correrCortaRef= useRef();
    const lavarTrastesRef= useRef();
    const aspirarCasaRef= useRef();
    const trapearRef= useRef();
    const jardineriaRef= useRef();
    const relacionesRef= useRef();
    const jugarRef= useRef();
    const deportesExtenuantesRef= useRef();
    const TARef= useRef();
    const FCRef= useRef();
    const exploracionFisicaRef= useRef();
    const estudiosRef= useRef();
    const diagnosticoGeneralRef= useRef();
    const planRef= useRef();
    const congenitosRef= useRef();
    const valvulopatiaRef= useRef();

    const onSubmit = (e) => {
        e.preventDefault()

        const datos = {
            fecha: fechaRef.current.value,
            fecha_1vez: fecha1vezRef.current.value,
            congenitos: congenitosRef.current.value,
            hora: horaRef.current.value,
            imComplicado: imComplicadoRef.current.value,
            imAnterior: imAnteriorRef.current.value,
            imSeptal: imSeptalRef.current.value,
            imApical: imApicalRef.current.value,
            imLateral: imLateralRef.current.value,
            imInferior: imInferiorRef.current.value,
            imdelVd: imdelVdRef.current.value,
            anginaInestable: anginaInestableRef.current.value,
            anginaEstable: anginaEstableRef.current.value,
            choqueCard: choqueCardRef.current.value,
            mSubita: mSubitaRef.current.value,
            claseCcs: claseCcsRef.current.value,
            fallaCardiaca: fallaCardiacaRef.current.value,
            sobrevivienteCpr: sobrevivienteCprRef.current.value,
            incapacidadEntrenar: incapacidadEntrenarRef.current.value,
            cfNyha: cfNyhaRef.current.value,
            crvc: crvcRef.current.value,
            crvcHemo: crvcHemoRef.current.value,
            insuArtPer: insuArtPerRef.current.value,
            vMitral: vMitralRef.current.value,
            vAortica: vAorticaRef.current.value,
            vTricuspide: vTricuspideRef.current.value,
            vPulmonar: vPulmonarRef.current.value,
            estratificacion: estratificacionRef.current.value,
            inicioFase2: inicioFase2Ref.current.value,
            finFase2: finFase2Ref.current.value,
            tabaquismo: tabaquismoRef.current.value,
            cigxDia: cigxDiaRef.current.value,
            cigxYear: cigxYearRef.current.value,
            abadonoCigarro: abadonoCigarroRef.current.value,
            abandonoYear: abandonoYearRef.current.value,
            hipertensionYears: hipertensionYearsRef.current.value,
            dmYears: dmYearsRef.current.value,
            actividadFis: actividadFisRef.current.value,
            tipoActividad: tipoActividadRef.current.value,
            actividadHsm: actividadHsmRef.current.value,
            actividadYears: actividadYearsRef.current.value,
            actividadYearsAbandono: actividadYearsAbandonoRef.current.value,
            estresYears: estresYearsRef.current.value,
            ansiedadYears: ansiedadYearsRef.current.value,
            depresionYears: depresionYearsRef.current.value,
            hipercolesterolemia: hipercolesterolemiaRef.current.value,
            hipertrigliceridemia: hipertrigliceridemiaRef.current.value,
            diabetesYears: diabetesYearsRef.current.value,
            tiempoEv: tiempoEvRef.current.value,
            tratamiento: tratamientoRef.current.value,
            fechaTra: fechaTraRef.current.value,
            betabloqueador: betabloqueadorRef.current.value,
            nitratos: nitratosRef.current.value,
            calcioanta: calcioantaRef.current.value,
            aspirina: aspirinaRef.current.value,
            anticoagulacion: anticoagulacionRef.current.value,
            iecas: iecasRef.current.value,
            atii: atiiRef.current.value,
            diureticos: diureticosRef.current.value,
            estatinas: estatinasRef.current.value,
            fibratos: fibratosRef.current.value,
            digoxina: digoxinaRef.current.value,
            antiarritmicos: antiarritmicosRef.current.value,
            otro: otroRef.current.value,
            bh: bhRef.current.value,
            hb: hbRef.current.value,
            leucos: leucosRef.current.value,
            plaquetas: plaquetasRef.current.value,
            qs: qsRef.current.value,
            glucosa: glucosaRef.current.value,
            creatinina: creatininaRef.current.value,
            acUrico: acUricoRef.current.value,
            colesterol: colesterolRef.current.value,
            ldl: ldlRef.current.value,
            hdl: hdlRef.current.value,
            trigliceridos: trigliceridosRef.current.value,
            tp: tpRef.current.value,
            inr: inrRef.current.value,
            tpt: tptRef.current.value,
            pcras: pcrasRef.current.value,
            otroLab: otroLabRef.current.value,
            ecgFecha: ecgFechaRef.current.value,
            ritmo: ritmoRef.current.value,
            rrmm: rrmmRef.current.value,
            aP: aPRef.current.value,
            aQRS: aQRSRef.current.value,
            aT: aTRef.current.value,
            duracionQrs: duracionQrsRef.current.value,
            duracionP: duracionPRef.current.value,
            qtm: qtmRef.current.value,
            pr: prRef.current.value,
            bav: bavRef.current.value,
            brihh: brihhRef.current.value,
            brdhh: brdhhRef.current.value,
            qAs: qAsRef.current.value,
            qInf: qInfRef.current.value,
            qLat: qLatRef.current.value,
            otrosEcg: otrosEcgRef.current.value,
            ecoFecha: ecoFechaRef.current.value,
            fePor: fePorRef.current.value,
            ddPor: ddPorRef.current.value,
            dsPor: dsPorRef.current.value,
            triviPor: triviPorRef.current.value,
            relEA: relEARef.current.value,
            otrosEco: otrosEcoRef.current.value,
            mnFecha: mnFechaRef.current.value,
            feporMn: feporMnRef.current.value,
            antIm: antImRef.current.value,
            antIsq: antIsqRef.current.value,
            antRr: antRrRef.current.value,
            septIM: septIMRef.current.value,
            septIsq: septIsqRef.current.value,
            septRr: septRrRef.current.value,
            latIm: latImRef.current.value,
            latIsq: latIsqRef.current.value,
            latRr: latRrRef.current.value,
            infIM: infIMRef.current.value,
            infIsq: infIsqRef.current.value,
            infRr: infRrRef.current.value,
            vrie: vrieRef.current.value,
            vrieFecha: vrieFechaRef.current.value,
            feviBasal: feviBasalRef.current.value,
            fevi10Dobuta: fevi10DobutaRef.current.value,
            reservaInotA: reservaInotARef.current.value,
            reservaInotR: reservaInotRRef.current.value,
            vrieOtro: vrieOtroRef.current.value,
            vrieRiesgo: vrieRiesgoRef.current.value,
            holter: holterRef.current.value,
            holterFecha: holterFechaRef.current.value,
            holterDiagnostico: holterDiagnosticoRef.current.value,
            holterRiesgo: holterRiesgoRef.current.value,
            cateterismo: cateterismoRef.current.value,
            catetFecha: catetFechaRef.current.value,
            catetFe: catetFeRef.current.value,
            catetD2vi: catetD2viRef.current.value,
            catetTco: catetTcoRef.current.value,
            catetDa: catetDaRef.current.value,
            catetDaMed: catetDaMedRef.current.value,
            catetDaDist: catetDaDistRef.current.value,
            catet1aD: catet1aDRef.current.value,
            catet2aD: catet2aDRef.current.value,
            catetCxP: catetCxPRef.current.value,
            catetCxD: catetCxDRef.current.value,
            catetOm: catetOmRef.current.value,
            catetPl: catetPlRef.current.value,
            catetCdprox: catetCdproxRef.current.value,
            catetCdMed: catetCdMedRef.current.value,
            catetCdDist: catetCdDistRef.current.value,
            catetRVIzq: catetRVIzqRef.current.value,
            catetDp: catetDpRef.current.value,
            catetOtro: catetOtroRef.current.value,
            catetMovilidad: catetMovilidadRef.current.value,
            catetRiesgo: catetRiesgoRef.current.value,
            termino: terminoRef.current.value,
            semanas: semanasRef.current.value,
            aprendioBorg: aprendioBorgRef.current.value,
            muerte: muerteRef.current.value,
            inestabilidadCardio: inestabilidadCardioRef.current.value,
            hospitalizacion: hospitalizacionRef.current.value,
            suspMotuPropio: suspMotuPropioRef.current.value,
            lesionOsteo: lesionOsteoRef.current.value,
            resOtros: resOtrosRef.current.value,
            Vez1aFecha: Vez1aFechaRef.current.value,
            sintomas: sintomasRef.current.value,
            comerVestirse: comerVestirseRef.current.value,
            caminarCasa: caminarCasaRef.current.value,
            caminar2Cuadras: caminar2CuadrasRef.current.value,
            subirPiso: subirPisoRef.current.value,
            correrCorta: correrCortaRef.current.value,
            lavarTrastes: lavarTrastesRef.current.value,
            aspirarCasa: aspirarCasaRef.current.value,
            trapear: trapearRef.current.value,
            jardineria: jardineriaRef.current.value,
            relaciones: relacionesRef.current.value,
            jugar: jugarRef.current.value,
            deportesExtenuantes: deportesExtenuantesRef.current.value,
            TA: TARef.current.value,
            FC: FCRef.current.value,
            exploracionFisica: exploracionFisicaRef.current.value,
            estudios: estudiosRef.current.value,
            diagnosticoGeneral: diagnosticoGeneralRef.current.value,
            plan: planRef.current.value,
            valvulopatia: valvulopatiaRef.current.value,
        }
        try {
            clienteAxios.post('/api/clinico', {
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
            <form action="" onSubmit={onSubmit}>
            <h1 className="text-4xl font-bold">Expediente Clínico</h1>
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
                                    
                                    
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="fecha_1vez"
                                    className="text-slate-800"
                                >
                                    Fecha 1vez:
                                </label>
                                <input
                                    type="date"
                                    id="fecha_1vez"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="fecha_1vez"
                                    ref={fecha1vezRef}
                                    
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="hora"
                                    className="text-slate-800"
                                >
                                    Hora:
                                </label>
                                <input
                                    type="time"
                                    id="hora"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="hora"
                                    ref={horaRef}
                                    
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="im_complicado"
                                    className="text-slate-800"
                                >
                                    IM Complicado:
                                </label>
                                <select id="im_complicado" name="im_complicado" className='mt-2 w-full p-3' ref={imComplicadoRef} >
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="im_anterior_op"
                                    className="text-slate-800"
                                >
                                    IM Anterior:
                                </label>
                                <select id="im_anterior_op" name="im_anterior_op" className='mt-2 w-full p-3' onChange={handleRespuestaChange} >
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="im_anterior"
                                    className="text-slate-800"
                                >
                                    IM Anterior:
                                </label>
                                <input
                                    type="date"
                                    id="im_anterior"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="im_anterior"
                                    ref={imAnteriorRef}
                                    disabled={inputBloqueado}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="im_septal_op"
                                    className="text-slate-800"
                                >
                                    IM Septal:
                                </label>
                                <select id="im_septal_op" name="im_septal_op" className='mt-2 w-full p-3' onChange={handleRespuestaChangeIm} >
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>

                            <div className="mb-4">
                                <label
                                    htmlFor="im_septal"
                                    className="text-slate-800"
                                >
                                    IM Septal:
                                </label>
                                <input
                                    type="date"
                                    id="im_septal"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="im_septal"
                                    ref={imSeptalRef}
                                    disabled={inputBloqueadoIm}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="im_apical_op"
                                    className="text-slate-800"
                                >
                                    IM Apical:
                                </label>
                                <select id="im_apical_op" name="im_apical_op" className='mt-2 w-full p-3' onChange={handleRespuestaChangeImAp} >
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>

                            <div className="mb-4">
                                <label
                                    htmlFor="im_apical"
                                    className="text-slate-800"
                                >
                                    IM Apical:
                                </label>
                                <input
                                    type="date"
                                    id="im_apical"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="im_apical"
                                    ref={imApicalRef}
                                    disabled={inputBloqueadoImAp}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="im_lateral_op"
                                    className="text-slate-800"
                                >
                                    IM Lateral:
                                </label>
                                <select id="im_lateral_op" name="im_lateral_op" className='mt-2 w-full p-3' onChange={handleRespuestaChangeImLat} >
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="im_lateral"
                                    className="text-slate-800"
                                >
                                    IM Lateral:
                                </label>
                                <input
                                    type="date"
                                    id="im_lateral"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="im_lateral"
                                    ref={imLateralRef}
                                    disabled={inputBloqueadoImLat}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="im_inferior_op"
                                    className="text-slate-800"
                                >
                                    IM Inferior:
                                </label>
                                <select id="im_inferior_op" name="im_inferior_op" className='mt-2 w-full p-3' onChange={handleRespuestaChangeImIn} >
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="im_inferior"
                                    className="text-slate-800"
                                >
                                    IM Inferior:
                                </label>
                                <input
                                    type="date"
                                    id="im_inferior"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="im_inferior"
                                    ref={imInferiorRef}
                                    disabled={inputBloqueadoImIn}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="im_delvd_op"
                                    className="text-slate-800"
                                >
                                    IM del VD:
                                </label>
                                <select id="im_delvd_op" name="im_delvd_op" className='mt-2 w-full p-3' onChange={handleRespuestaChangeImdV} >
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="im_delvd"
                                    className="text-slate-800"
                                >
                                    IM del VD:
                                </label>
                                <input
                                    type="date"
                                    id="im_delvd"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="im_delvd"
                                    ref={imdelVdRef}
                                    disabled={inputBloqueadoImdV}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="angina_inestbale_op"
                                    className="text-slate-800"
                                >
                                    Angina Inestable:
                                </label>
                                <select id="angina_inestbale_op" name="angina_inestbale_op" className='mt-2 w-full p-3' onChange={handleRespuestaChangeImAI} >
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="angina_inestbale"
                                    className="text-slate-800"
                                >
                                    Angina Inestable:
                                </label>
                                <input
                                    type="date"
                                    id="angina_inestbale"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="angina_inestbale"
                                    ref={anginaInestableRef}
                                    disabled={inputBloqueadoImAI}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="angina_estable_op"
                                    className="text-slate-800"
                                >
                                    Angina Estable:
                                </label>
                                <select id="angina_estable_op" name="angina_estable_op" className='mt-2 w-full p-3' onChange={handleRespuestaChangeImAE} >
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="angina_estable"
                                    className="text-slate-800"
                                >
                                    Angina Estable:
                                </label>
                                <input
                                    type="date"
                                    id="angina_estable"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="angina_estable"
                                    ref={anginaEstableRef}
                                    disabled={inputBloqueadoImAE}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="choque_card_op"
                                    className="text-slate-800"
                                >
                                    Choque Card:
                                </label>
                                <select id="choque_card_op" name="choque_card_op" className='mt-2 w-full p-3' onChange={handleRespuestaChangeCC} >
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="choque_card"
                                    className="text-slate-800"
                                >
                                    Choque Card:
                                </label>
                                <input
                                    type="date"
                                    id="choque_card"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="choque_card"
                                    ref={choqueCardRef}
                                    disabled={inputBloqueadoCC}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="m_subita_op"
                                    className="text-slate-800"
                                >
                                    M. Súbita:
                                </label>
                                <select id="m_subita_op" name="m_subita_op" className='mt-2 w-full p-3' onChange={handleRespuestaChangeMS}  >
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>

                            <div className="mb-4">
                                <label
                                    htmlFor="m_subita"
                                    className="text-slate-800"
                                >
                                    M. súbita:
                                </label>
                                <input
                                    type="date"
                                    id="m_subita"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="m_subita"
                                    ref={mSubitaRef}
                                    disabled={inputBloqueadoMS}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="clase_ccs"
                                    className="text-slate-800"
                                >
                                    Clase F CCS:
                                </label>
                                <select id="clase_ccs" name="clase_ccs" className='mt-2 w-full p-3' ref={claseCcsRef}  >
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="falla_cardiaca"
                                    className="text-slate-800"
                                >
                                    Falla Cardiaca:
                                </label>
                                <select id="falla_cardiaca" name="falla_cardiaca" className='mt-2 w-full p-3' ref={fallaCardiacaRef}  >
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="sobreviviente_cpr"
                                    className="text-slate-800"
                                >
                                    Sobreviviente CPR:
                                </label>
                                <select id="sobreviviente_cpr" name="sobreviviente_cpr" className='mt-2 w-full p-3' ref={sobrevivienteCprRef} >
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="incapacidad_entrenar"
                                    className="text-slate-800"
                                >
                                    Incapacidad Entrenar:
                                </label>
                                <select id="incapacidad_entrenar" name="incapacidad_entrenar" className='mt-2 w-full p-3' ref={incapacidadEntrenarRef}  >
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="cf_nyha"
                                    className="text-slate-800"
                                >
                                    CF NYHA:
                                </label>
                                <select id="cf_nyha" name="cf_nyha" className='mt-2 w-full p-3' ref={cfNyhaRef} >
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="crvc_op"
                                    className="text-slate-800"
                                >
                                    CRVC:
                                </label>
                                <select id="crvc_op" name="crvc_op" className='mt-2 w-full p-3' onChange={handleRespuestaChangeCRV} >
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="crvc"
                                    className="text-slate-800"
                                >
                                    CRVC:
                                </label>
                                <input
                                    type="date"
                                    id="crvc"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="crvc"
                                    ref={crvcRef}
                                    disabled={inputBloqueadoCRVC}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="crvc_hemo"
                                    className="text-slate-800"
                                >
                                    CRVC Hemoductos:
                                </label>
                                <input
                                    type="text"
                                    id="crvc_hemo"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="crvc_hemo"
                                    ref={crvcHemoRef}
                                    disabled={inputBloqueadoCRVC}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="insu_art_per"
                                    className="text-slate-800"
                                >
                                    Insuficiencia Arterial Periférica:
                                </label>
                                <select id="insu_art_per" name="insu_art_per" className='mt-2 w-full p-3' ref={insuArtPerRef} >
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="v_mitral"
                                    className="text-slate-800"
                                >
                                    V. Mitral:
                                </label>
                                <select id="v_mitral" name="v_mitral" className='mt-2 w-full p-3' ref={vMitralRef} >
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="v_aortica"
                                    className="text-slate-800"
                                >
                                    V. Aórtica:
                                </label>
                                <select id="v_aortica" name="v_aortica" className='mt-2 w-full p-3' ref={vAorticaRef} >
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="v_tricuspide"
                                    className="text-slate-800"
                                >
                                    V. Tricúspide:
                                </label>
                                <select id="v_tricuspide" name="v_tricuspide" className='mt-2 w-full p-3' ref={vTricuspideRef} >
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="v_pulmonar"
                                    className="text-slate-800"
                                >
                                    V. Pulmonar:
                                </label>
                                <select id="v_pulmonar" name="v_pulmonar" className='mt-2 w-full p-3' ref={vPulmonarRef}  >
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="congenitos"
                                    className="text-slate-800"
                                >
                                    Congenitos:
                                </label>
                                <select id="congenitos" name="congenitos" className='mt-2 w-full p-3' ref={congenitosRef} >
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="estratificacion"
                                    className="text-slate-800"
                                >
                                    Estratificación:
                                </label>
                                <input
                                    type="date"
                                    id="estratificacion"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="estratificacion"
                                    ref={estratificacionRef}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="inicio_fase_2"
                                    className="text-slate-800"
                                >
                                    Inicio Fase 2:
                                </label>
                                <input
                                    type="date"
                                    id="inicio_fase_2"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="inicio_fase_2"
                                    ref={inicioFase2Ref}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="fin_fase_2"
                                    className="text-slate-800"
                                >
                                    Fin Fase 2:
                                </label>
                                <input
                                    type="date"
                                    id="fin_fase_2"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="fin_fase_2"
                                    ref={finFase2Ref}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="tabaquismo"
                                    className="text-slate-800"
                                >
                                    Tabaquismo:
                                </label>
                                <select id="tabaquismo" name="tabaquismo" className='mt-2 w-full p-3' ref={tabaquismoRef}  onChange={handleRespuestaChangeTab} >
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="cig_x_dia"
                                    className="text-slate-800"
                                >
                                    Cig por día:
                                </label>
                                <input
                                    type="number"
                                    id="cig_x_dia"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="cig_x_dia"
                                    ref={cigxDiaRef}
                                    disabled={inputBloqueadoTab}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="cig_x_year"
                                    className="text-slate-800"
                                >
                                    Fumó por años:
                                </label>
                                <input
                                    type="number"
                                    id="cig_x_year"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="cig_x_year"
                                    ref={cigxYearRef}
                                    disabled={inputBloqueadoTab}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="abadono_cigarro"
                                    className="text-slate-800"
                                >
                                    Abandonó Cigarro:
                                </label>
                                <select id="abadono_cigarro" name="abadono_cigarro" className='mt-2 w-full p-3' ref={abadonoCigarroRef}  disabled={inputBloqueadoTab} >
                                    <option value="false">No</option>
                                    <option value="true">Si</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="abandono_year"
                                    className="text-slate-800"
                                >
                                    Años abadono:
                                </label>
                                <input
                                    type="number"
                                    id="abandono_year"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="abandono_year"
                                    ref={abandonoYearRef}
                                    disabled={inputBloqueadoTab}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="hipertension_years"
                                    className="text-slate-800"
                                >
                                    Hipertensión (años):
                                </label>
                                <input
                                    type="number"
                                    id="hipertension_years"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="hipertension_years"
                                    ref={hipertensionYearsRef}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="dm_years"
                                    className="text-slate-800"
                                >
                                    DM (años):
                                </label>
                                <input
                                    type="number"
                                    id="dm_years"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="dm_years"
                                    ref={dmYearsRef}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="actividad_fis"
                                    className="text-slate-800"
                                >
                                    Actividad Física:
                                </label>
                                <select id="actividad_fis" name="actividad_fis" className='mt-2 w-full p-3' ref={actividadFisRef}  onChange={handleRespuestaChangeAF}>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="tipo_actividad"
                                    className="text-slate-800"
                                >
                                    Tipo Actividad:
                                </label>
                                <input
                                    type="text"
                                    id="tipo_actividad"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="tipo_actividad"
                                    ref={tipoActividadRef}
                                    disabled={inputBloqueadoAF}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="actividad_hsm"
                                    className="text-slate-800"
                                >
                                    Actividad HRS/Semana:
                                </label>
                                <input
                                    type="number"
                                    id="actividad_hsm"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="actividad_hsm"
                                    ref={actividadHsmRef}
                                    disabled={inputBloqueadoAF}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="actividad_years"
                                    className="text-slate-800"
                                >
                                    Actividad Años:
                                </label>
                                <input
                                    type="number"
                                    id="actividad_years"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="actividad_years"
                                    ref={actividadYearsRef}
                                    disabled={inputBloqueadoAF}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="actividad_years_abandono"
                                    className="text-slate-800"
                                >
                                    Actividad Años Abandono:
                                </label>
                                <input
                                    type="number"
                                    id="actividad_years_abandono"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="actividad_years_abandono"
                                    ref={actividadYearsAbandonoRef}
                                    disabled={inputBloqueadoAF}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="estres_years"
                                    className="text-slate-800"
                                >
                                    Estrés Años:
                                </label>
                                <input
                                    type="number"
                                    id="estres_years"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="estres_years"
                                    ref={estresYearsRef}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="ansiedad_years"
                                    className="text-slate-800"
                                >
                                    Ansiedad Años:
                                </label>
                                <input
                                    type="number"
                                    id="ansiedad_years"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="ansiedad_years"
                                    ref={ansiedadYearsRef}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="depresion_years"
                                    className="text-slate-800"
                                >
                                    Depresion Años:
                                </label>
                                <input
                                    type="number"
                                    id="depresion_years"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="depresion_years"
                                    ref={depresionYearsRef}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="hipercolesterolemia_years"
                                    className="text-slate-800"
                                >
                                    Hipercolesterolemia Años:
                                </label>
                                <input
                                    type="number"
                                    id="hipercolesterolemia_years"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="hipercolesterolemia_years"
                                    ref={hipercolesterolemiaRef}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="hipertrigliceridemia_years"
                                    className="text-slate-800"
                                >
                                    Hipertrigliceridemia Años:
                                </label>
                                <input
                                    type="number"
                                    id="hipertrigliceridemia_years"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="hipertrigliceridemia_years"
                                    ref={hipertrigliceridemiaRef}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="diabetes_years"
                                    className="text-slate-800"
                                >
                                    Diabetes Años:
                                </label>
                                <input
                                    type="number"
                                    id="diabetes_years"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="diabetes_years"
                                    ref={diabetesYearsRef}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="tiempo_ev"
                                    className="text-slate-800"
                                >
                                    Tiempo evolución:
                                </label>
                                <input
                                    type="text"
                                    id="tiempo_ev"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="tiempo_ev"
                                    ref={tiempoEvRef}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="tratamiento"
                                    className="text-slate-800"
                                >
                                    Tratamiento:
                                </label>
                                <input
                                    type="text"
                                    id="tratamiento"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="tratamiento"
                                    ref={tratamientoRef}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="fecha_tra"
                                    className="text-slate-800"
                                >
                                    Fecha:
                                </label>
                                <input
                                    type="date"
                                    id="fecha_tra"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="fecha_tra"
                                    ref={fechaTraRef}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="betabloqueador"
                                    className="text-slate-800"
                                >
                                    Betabloqueador Nombre/dosis:
                                </label>
                                <input
                                    type="text"
                                    id="betabloqueador"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="betabloqueador"
                                    ref={betabloqueadorRef}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="nitratos"
                                    className="text-slate-800"
                                >
                                    Nitratos Nombre/dosis:
                                </label>
                                <input
                                    type="text"
                                    id="nitratos"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="nitratos"
                                    ref={nitratosRef}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="calcioant"
                                    className="text-slate-800"
                                >
                                    Calcioant. Nombre/dosis:
                                </label>
                                <input
                                    type="text"
                                    id="calcioant"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="calcioant"
                                    ref={calcioantaRef}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="aspirina"
                                    className="text-slate-800"
                                >
                                    Aspirina. Nombre/dosis:
                                </label>
                                <input
                                    type="text"
                                    id="aspirina"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="aspirina"
                                    ref={aspirinaRef}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="anticoagulacion"
                                    className="text-slate-800"
                                >
                                    Anticoagulacion Nombre/dosis:
                                </label>
                                <input
                                    type="text"
                                    id="anticoagulacion"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="anticoagulacion"
                                    ref={anticoagulacionRef}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="iecas"
                                    className="text-slate-800"
                                >
                                    IECAS Nombre/dosis:
                                </label>
                                <input
                                    type="text"
                                    id="iecas"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="iecas"
                                    ref={iecasRef}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="atii"
                                    className="text-slate-800"
                                >
                                    ATII Nombre/dosis:
                                </label>
                                <input
                                    type="text"
                                    id="atii"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="atii"
                                    ref={atiiRef}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="diureticos"
                                    className="text-slate-800"
                                >
                                    Diuréticos Nombre/dosis:
                                </label>
                                <input
                                    type="text"
                                    id="diureticos"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="diureticos"
                                    ref={diureticosRef}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="estatinas"
                                    className="text-slate-800"
                                >
                                    Estatinas Nombre/dosis:
                                </label>
                                <input
                                    type="text"
                                    id="estatinas"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="estatinas"
                                    ref={estatinasRef}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="fibratos"
                                    className="text-slate-800"
                                >
                                    Fibratos Nombre/dosis:
                                </label>
                                <input
                                    type="text"
                                    id="fibratos"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="fibratos"
                                    ref={fibratosRef}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="digoxina"
                                    className="text-slate-800"
                                >
                                    Digoxina Nombre/dosis:
                                </label>
                                <input
                                    type="text"
                                    id="digoxina"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="digoxina"
                                    ref={digoxinaRef}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="antiarritmicos"
                                    className="text-slate-800"
                                >
                                    Antiarrítmicos Nombre/dosis:
                                </label>
                                <input
                                    type="text"
                                    id="antiarritmicos"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="antiarritmicos"
                                    ref={antiarritmicosRef}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="otro"
                                    className="text-slate-800"
                                >
                                    Otro Nombre/dosis:
                                </label>
                                <input
                                    type="text"
                                    id="otro"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="otro"
                                    ref={otroRef}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="bh_op"
                                    className="text-slate-800"
                                >
                                    BH:
                                </label>
                                <select id="bh_op" name="bh_op" className='mt-2 w-full p-3' onChange={handleRespuestaChangebH} >
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="bh"
                                    className="text-slate-800"
                                >
                                    BH:
                                </label>
                                <input
                                    type="date"
                                    id="bh"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="bh"
                                    ref={bhRef}
                                    disabled={inputBloqueadobH}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="hb"
                                    className="text-slate-800"
                                >
                                    Hb:
                                </label>
                                <input
                                    type="number"
                                    id="hb"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="hb"
                                    ref={hbRef}
                                    disabled={inputBloqueadobH}
                                    step="0.01"
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="leucos"
                                    className="text-slate-800"
                                >
                                    Leucos:
                                </label>
                                <input
                                    type="number"
                                    id="leucos"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="leucos"
                                    ref={leucosRef}
                                    disabled={inputBloqueadobH}
                                    step="0.01"
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="plaquetas"
                                    className="text-slate-800"
                                >
                                    Plaquetas:
                                </label>
                                <input
                                    type="number"
                                    id="plaquetas"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="plaquetas"
                                    ref={plaquetasRef}
                                    disabled={inputBloqueadobH}
                                    step="0.01"
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="qs_op"
                                    className="text-slate-800"
                                >
                                    QS:
                                </label>
                                <select id="qs_op" name="qs_op" className='mt-2 w-full p-3' onChange={handleRespuestaChangeQs} >
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>

                            <div className="mb-4">
                                <label
                                    htmlFor="qs"
                                    className="text-slate-800"
                                >
                                    QS:
                                </label>
                                <input
                                    type="date"
                                    id="qs"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="qs"
                                    ref={qsRef}
                                    disabled={inputBloqueadoQs}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="glucosa"
                                    className="text-slate-800"
                                >
                                    Glucosa:
                                </label>
                                <input
                                    type="number"
                                    id="glucosa"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="glucosa"
                                    ref={glucosaRef}
                                    disabled={inputBloqueadoQs}
                                    step="0.01"
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="creatinina"
                                    className="text-slate-800"
                                >
                                    Creatinina:
                                </label>
                                <input
                                    type="number"
                                    id="creatinina"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="creatinina"
                                    ref={creatininaRef}
                                    disabled={inputBloqueadoQs}
                                    step="0.01"
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="ac_urico"
                                    className="text-slate-800"
                                >
                                    Ac. úrico:
                                </label>
                                <input
                                    type="number"
                                    id="ac_urico"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="ac_urico"
                                    ref={acUricoRef}
                                    disabled={inputBloqueadoQs}
                                    step="0.01"
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="colesterol"
                                    className="text-slate-800"
                                >
                                    Colesterol:
                                </label>
                                <input
                                    type="number"
                                    id="colesterol"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="colesterol"
                                    ref={colesterolRef}
                                    disabled={inputBloqueadoQs}
                                    step="0.01"
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
                                    ref={ldlRef}
                                    disabled={inputBloqueadoQs}
                                    step="0.01"
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
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="hdl"
                                    ref={hdlRef}
                                    disabled={inputBloqueadoQs}
                                    step="0.01"
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="trigliceridos"
                                    className="text-slate-800"
                                >
                                    Triglicéridos:
                                </label>
                                <input
                                    type="number"
                                    id="trigliceridos"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="trigliceridos"
                                    ref={trigliceridosRef}
                                    disabled={inputBloqueadoQs}
                                    step="0.01"
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="tp"
                                    className="text-slate-800"
                                >
                                    TP:
                                </label>
                                <input
                                    type="number"
                                    id="tp"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="tp"
                                    ref={tpRef}
                                    disabled={inputBloqueadoQs}
                                    step="0.01"
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="inr"
                                    className="text-slate-800"
                                >
                                    INR:
                                </label>
                                <input
                                    type="number"
                                    id="inr"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="inr"
                                    ref={inrRef}
                                    disabled={inputBloqueadoQs}
                                    step="0.01"
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="tpt"
                                    className="text-slate-800"
                                >
                                    TPT:
                                </label>
                                <input
                                    type="number"
                                    id="tpt"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="tpt"
                                    ref={tptRef}
                                    disabled={inputBloqueadoQs}
                                    step="0.01"
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="pcras"
                                    className="text-slate-800"
                                >
                                    PCRas:
                                </label>
                                <input
                                    type="number"
                                    id="pcras"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="tppcrast"
                                    ref={pcrasRef}
                                    disabled={inputBloqueadoQs}
                                    step="0.01"
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="otro_lab"
                                    className="text-slate-800"
                                >
                                    Otro Lab:
                                </label>
                                <input
                                    type="number"
                                    id="otro_lab"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="otro_lab"
                                    ref={otroLabRef}
                                    disabled={inputBloqueadoQs}
                                    step="0.01"
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="ecg_op"
                                    className="text-slate-800"
                                >
                                    ECG:
                                </label>
                                <select id="ecg_op" name="ecg_op" className='mt-2 w-full p-3' onChange={handleRespuestaChangeEcg} >
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>

                            <div className="mb-4">
                                <label
                                    htmlFor="ecg_fecha"
                                    className="text-slate-800"
                                >
                                    ECG fecha:
                                </label>
                                <input
                                    type="date"
                                    id="ecg_fecha"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="ecg_fecha"
                                    ref={ecgFechaRef}
                                    disabled={inputBloqueadoEcg}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="ritmo"
                                    className="text-slate-800"
                                >
                                    Ritmo:
                                </label>
                                <input
                                    type="text"
                                    id="ritmo"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="ritmo"
                                    ref={ritmoRef}
                                    disabled={inputBloqueadoEcg}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="r_r_mm"
                                    className="text-slate-800"
                                >
                                    R-R (mm):
                                </label>
                                <input
                                    type="number"
                                    id="r_r_mm"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="r_r_mm"
                                    ref={rrmmRef}
                                    disabled={inputBloqueadoEcg}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="aP"
                                    className="text-slate-800"
                                >
                                    aP:
                                </label>
                                <input
                                    type="number"
                                    id="aP"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="aP"
                                    ref={aPRef}
                                    disabled={inputBloqueadoEcg}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="aQRS"
                                    className="text-slate-800"
                                >
                                    aQRS:
                                </label>
                                <input
                                    type="number"
                                    id="aQRS"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="aQRS"
                                    ref={aQRSRef}
                                    disabled={inputBloqueadoEcg}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="aT"
                                    className="text-slate-800"
                                >
                                    aT:
                                </label>
                                <input
                                    type="number"
                                    id="aT"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="aT"
                                    ref={aTRef}
                                    disabled={inputBloqueadoEcg}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="duracion_qrs"
                                    className="text-slate-800"
                                >
                                    Duración QRS:
                                </label>
                                <input
                                    type="number"
                                    id="duracion_qrs"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="duracion_qrs"
                                    ref={duracionQrsRef}
                                    disabled={inputBloqueadoEcg}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="duracion_p"
                                    className="text-slate-800"
                                >
                                    Duración P:
                                </label>
                                <input
                                    type="number"
                                    id="duracion_p"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="duracion_p"
                                    ref={duracionPRef}
                                    disabled={inputBloqueadoEcg}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="qtm"
                                    className="text-slate-800"
                                >
                                    Qtm:
                                </label>
                                <input
                                    type="number"
                                    id="qtm"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="qtm"
                                    ref={qtmRef}
                                    disabled={inputBloqueadoEcg}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="pr"
                                    className="text-slate-800"
                                >
                                    PR:
                                </label>
                                <input
                                    type="number"
                                    id="pr"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="pr"
                                    ref={prRef}
                                    disabled={inputBloqueadoEcg}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="bav"
                                    className="text-slate-800"
                                >
                                    BAV (1,2,3):
                                </label>
                                <input
                                    type="number"
                                    id="bav"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="bav"
                                    ref={bavRef}
                                    disabled={inputBloqueadoEcg}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="brihh"
                                    className="text-slate-800"
                                >
                                    BRIHH:
                                </label>
                                <select id="brihh" name="brihh" className='mt-2 w-full p-3' ref={brihhRef} disabled={inputBloqueadoEcg} >
                                <option value="false">No</option>
                                    <option value="true">Si</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="brdhh"
                                    className="text-slate-800"
                                >
                                    BRDHH:
                                </label>
                                <select id="brdhh" name="brdhh" className='mt-2 w-full p-3' ref={brdhhRef} disabled={inputBloqueadoEcg}>
                                    <option value="false">No</option>
                                    <option value="true">Si</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="q_as"
                                    className="text-slate-800"
                                >
                                    Q AS:
                                </label>
                                <select id="q_as" name="q_as" className='mt-2 w-full p-3' ref={qAsRef} disabled={inputBloqueadoEcg}>
                                    <option value="false">No</option>
                                    <option value="true">Si</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="q_inf"
                                    className="text-slate-800"
                                >
                                    Q inf:
                                </label>
                                <select id="q_inf" name="q_inf" className='mt-2 w-full p-3' ref={qInfRef} disabled={inputBloqueadoEcg}>
                                    <option value="false">No</option>
                                    <option value="true">Si</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="q_lat"
                                    className="text-slate-800"
                                >
                                    Q lat:
                                </label>
                                <select id="q_lat" name="q_lat" className='mt-2 w-full p-3' ref={qLatRef} disabled={inputBloqueadoEcg}>
                                    <option value="false">No</option>
                                    <option value="true">Si</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="otros_ecg"
                                    className="text-slate-800"
                                >
                                    Otros Ecg:
                                </label>
                                <input
                                    type="text"
                                    id="otros_ecg"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="otros_ecg"
                                    ref={otrosEcgRef}
                                    disabled={inputBloqueadoEcg}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="eco_op"
                                    className="text-slate-800"
                                >
                                    ECO:
                                </label>
                                <select id="eco_op" name="eco_op" className='mt-2 w-full p-3' onChange={handleRespuestaChangeEco} >
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>

                            <div className="mb-4">
                                <label
                                    htmlFor="eco_fecha"
                                    className="text-slate-800"
                                >
                                    ECO Fecha:
                                </label>
                                <input
                                    type="date"
                                    id="eco_fecha"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="eco_fecha"
                                    ref={ecoFechaRef}
                                    disabled={inputBloqueadoEco}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="fe_por"
                                    className="text-slate-800"
                                >
                                    FE%:
                                </label>
                                <input
                                    type="number"
                                    id="fe_por"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="fe_por"
                                    ref={fePorRef}
                                    disabled={inputBloqueadoEco}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="dd_por"
                                    className="text-slate-800"
                                >
                                    SGL:
                                </label>
                                <input
                                    type="number"
                                    id="dd_por"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="dd_por"
                                    ref={ddPorRef}
                                    disabled={inputBloqueadoEco}
                                    step="0.01"
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="ds_por"
                                    className="text-slate-800"
                                >
                                    PSAP:
                                </label>
                                <input
                                    type="number"
                                    id="ds_por"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="ds_por"
                                    ref={dsPorRef}
                                    disabled={inputBloqueadoEco}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="trivi_por"
                                    className="text-slate-800"
                                >
                                    Movilidad:
                                </label>
                                <input
                                    type="text"
                                    id="trivi_por"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="trivi_por"
                                    ref={triviPorRef}
                                    disabled={inputBloqueadoEco}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="rel_e_a"
                                    className="text-slate-800"
                                >
                                    Tapse:
                                </label>
                                <input
                                    type="number"
                                    id="rel_e_a"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="rel_e_a"
                                    ref={relEARef}
                                    disabled={inputBloqueadoEco}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="valvulopatia"
                                    className="text-slate-800"
                                >
                                    Valvulopatía:
                                </label>
                                <select id="valvulopatia" name="valvulopatia" className='mt-2 w-full p-3' ref={valvulopatiaRef} >
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="otros_eco"
                                    className="text-slate-800"
                                >
                                    Otros ECO:
                                </label>
                                <input
                                    type="text"
                                    id="otros_eco"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="otros_eco"
                                    ref={otrosEcoRef}
                                    disabled={inputBloqueadoEco}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="mn_op"
                                    className="text-slate-800"
                                >
                                    MN:
                                </label>
                                <select id="mn_op" name="mn_op" className='mt-2 w-full p-3' onChange={handleRespuestaChangeMn} >
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            
                            <div className="mb-4">
                                <label
                                    htmlFor="mn_fecha"
                                    className="text-slate-800"
                                >
                                    MN Fecha:
                                </label>
                                <input
                                    type="date"
                                    id="mn_fecha"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="mn_fecha"
                                    ref={mnFechaRef}
                                    disabled={inputBloqueadoMn}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="fe_por_mn"
                                    className="text-slate-800"
                                >
                                    FE(%):
                                </label>
                                <input
                                    type="number"
                                    id="fe_por_mn"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="fe_por_mn"
                                    ref={feporMnRef}
                                    disabled={inputBloqueadoMn}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="ant_im"
                                    className="text-slate-800"
                                >
                                    Ant (IM):
                                </label>
                                <select id="ant_im" name="ant_im" className='mt-2 w-full p-3' ref={antImRef} disabled={inputBloqueadoMn}>
                                    <option value="false">No</option>
                                    <option value="true">Si</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="ant_isq"
                                    className="text-slate-800"
                                >
                                    Ant (isq):
                                </label>
                                <select id="ant_isq" name="ant_isq" className='mt-2 w-full p-3' ref={antIsqRef} disabled={inputBloqueadoMn}>
                                    <option value="false">No</option>
                                    <option value="true">Si</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="ant_rr"
                                    className="text-slate-800"
                                >
                                    Ant (RR):
                                </label>
                                <select id="ant_rr" name="ant_rr" className='mt-2 w-full p-3' ref={antRrRef} disabled={inputBloqueadoMn}>
                                    <option value="false">No</option>
                                    <option value="true">Si</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="sept_im"
                                    className="text-slate-800"
                                >
                                    Sept (IM):
                                </label>
                                <select id="sept_im" name="sept_im" className='mt-2 w-full p-3' ref={septIMRef} disabled={inputBloqueadoMn}>                             
                                    <option value="false">No</option>
                                    <option value="true">Si</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="sept_isq"
                                    className="text-slate-800"
                                >
                                    Sept (isq):
                                </label>
                                <select id="sept_isq" name="sept_isq" className='mt-2 w-full p-3' ref={septIsqRef} disabled={inputBloqueadoMn}>
                                    <option value="false">No</option>
                                    <option value="true">Si</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="sept_rr"
                                    className="text-slate-800"
                                >
                                    Sept (RR):
                                </label>
                                <select id="sept_rr" name="sept_rr" className='mt-2 w-full p-3' ref={septRrRef} disabled={inputBloqueadoMn}>
                                    <option value="false">No</option>
                                    <option value="true">Si</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="lat_im"
                                    className="text-slate-800"
                                >
                                    Lat (IM):
                                </label>
                                <select id="lat_im" name="lat_im" className='mt-2 w-full p-3' ref={latImRef} disabled={inputBloqueadoMn}>
                                    <option value="false">No</option>
                                    <option value="true">Si</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="lat_isq"
                                    className="text-slate-800"
                                >
                                    Lat (isq):
                                </label>
                                <select id="lat_isq" name="lat_isq" className='mt-2 w-full p-3' ref={latIsqRef} disabled={inputBloqueadoMn}>
                                    <option value="false">No</option>
                                    <option value="true">Si</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="lat_rr"
                                    className="text-slate-800"
                                >
                                    Lat (RR):
                                </label>
                                <select id="lat_rr" name="lat_rr" className='mt-2 w-full p-3' ref={latRrRef} disabled={inputBloqueadoMn}>
                                    <option value="false">No</option>
                                    <option value="true">Si</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="inf_im"
                                    className="text-slate-800"
                                >
                                    Inf (IM):
                                </label>
                                <select id="inf_im" name="inf_im" className='mt-2 w-full p-3' ref={infIMRef} disabled={inputBloqueadoMn}>
                                    <option value="false">No</option>
                                    <option value="true">Si</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="inf_isq"
                                    className="text-slate-800"
                                >
                                    Inf (isq):
                                </label>
                                <select id="inf_isq" name="inf_isq" className='mt-2 w-full p-3' ref={infIsqRef} disabled={inputBloqueadoMn}>
                                    <option value="false">No</option>
                                    <option value="true">Si</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="inf_rr"
                                    className="text-slate-800"
                                >
                                    Inf (RR):
                                </label>
                                <select id="inf_rr" name="inf_rr" className='mt-2 w-full p-3' ref={infRrRef} disabled={inputBloqueadoMn}>
                                    <option value="false">No</option>
                                    <option value="true">Si</option>
                                </select>
                            </div>

                            <div className="mb-4">
                                <label
                                    htmlFor="vrie_op"
                                    className="text-slate-800"
                                >
                                    VRIE:
                                </label>
                                <select id="vrie_op" name="vrie_op" className='mt-2 w-full p-3' ref={vrieRef} onChange={handleRespuestaChangeVR}>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="vrie_fcha"
                                    className="text-slate-800"
                                >
                                    VRIE Fecha:
                                </label>
                                <input
                                    type="date"
                                    id="vrie_fcha"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="vrie_fcha"
                                    ref={vrieFechaRef}
                                    disabled={inputBloqueadoVR}
                                />
                                
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="fevi_basal"
                                    className="text-slate-800"
                                >
                                    FEVI basal:
                                </label>
                                <input
                                    type="number"
                                    id="fevi_basal"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="fevi_basal"
                                    ref={feviBasalRef}
                                    disabled={inputBloqueadoVR}
                                />
                                
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="fevi_10_dobuta"
                                    className="text-slate-800"
                                >
                                    FEVI (10dobuta):
                                </label>
                                <input
                                    type="number"
                                    id="fevi_10_dobuta"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="fevi_10_dobuta"
                                    ref={fevi10DobutaRef}
                                    disabled={inputBloqueadoVR}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="reserva_inot_absolut"
                                    className="text-slate-800"
                                >
                                    Reserva Inot Abs.:
                                </label>
                                <input
                                    type="number"
                                    id="reserva_inot_absolut"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="reserva_inot_absolut"
                                    ref={reservaInotARef}
                                    disabled={inputBloqueadoVR}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="reserva_inot_relat"
                                    className="text-slate-800"
                                >
                                    Reserva Inot Rel.:
                                </label>
                                <input
                                    type="number"
                                    id="reserva_inot_relat"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="reserva_inot_relat"
                                    ref={reservaInotRRef}
                                    disabled={inputBloqueadoVR}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="vrie_otros"
                                    className="text-slate-800"
                                >
                                    VRIE otro:
                                </label>
                                <input
                                    type="number"
                                    id="vrie_otros"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="vrie_otros"
                                    ref={vrieOtroRef}
                                    disabled={inputBloqueadoVR}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="vrie_riesgo"
                                    className="text-slate-800"
                                >
                                    VRIE riesgo:
                                </label>
                                <input
                                    type="number"
                                    id="vrie_riesgo"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="vrie_riesgo"
                                    ref={vrieRiesgoRef}
                                    disabled={inputBloqueadoVR}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="holter_op"
                                    className="text-slate-800"
                                >
                                    Holter:
                                </label>
                                <select id="holter_op" name="holter_op" className='mt-2 w-full p-3' ref={holterRef} onChange={handleRespuestaChangeHo}>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="holter_fecha"
                                    className="text-slate-800"
                                >
                                    Holter Fecha:
                                </label>
                                <input
                                    type="date"
                                    id="holter_fecha"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="holter_fecha"
                                    ref={holterFechaRef}
                                    disabled={inputBloqueadoHo}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="holter_dignostico"
                                    className="text-slate-800"
                                >
                                    Holter Diagnostico:
                                </label>
                                <input
                                    type="text"
                                    id="holter_dignostico"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="holter_dignostico"
                                    ref={holterDiagnosticoRef}
                                    disabled={inputBloqueadoHo}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="holter_riesgo"
                                    className="text-slate-800"
                                >
                                    Holter Riesgo:
                                </label>
                                <input
                                    type="text"
                                    id="holter_riesgo"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="holter_riesgo"
                                    ref={holterRiesgoRef}
                                    disabled={inputBloqueadoHo}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="cateterismo"
                                    className="text-slate-800"
                                >
                                    Cateterismo / Angiotac:
                                </label>
                                <select id="cateterismo" name="cateterismo" className='mt-2 w-full p-3' ref={cateterismoRef} onChange={handleRespuestaChangeCa}>
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="catet_fecha"
                                    className="text-slate-800"
                                >
                                    Cateterismo / Angiotac Fecha:
                                </label>
                                <input
                                    type="date"
                                    id="catet_fecha"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="catet_fecha"
                                    ref={catetFechaRef}
                                    disabled={inputBloqueadoCa}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="catet_fe"
                                    className="text-slate-800"
                                >
                                    Cateterismo FE:
                                </label>
                                <input
                                    type="number"
                                    id="catet_fe"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="catet_fe"
                                    ref={catetFeRef}
                                    disabled={inputBloqueadoCa}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="catet_d2vi"
                                    className="text-slate-800"
                                >
                                    D2VI:
                                </label>
                                <input
                                    type="number"
                                    id="catet_d2vi"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="catet_d2vi"
                                    ref={catetD2viRef}
                                    disabled={inputBloqueadoCa}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="catet_tco"
                                    className="text-slate-800"
                                >
                                    TCO:
                                </label>
                                <input
                                    type="number"
                                    id="catet_tco"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="catet_tco"
                                    ref={catetTcoRef}
                                    disabled={inputBloqueadoCa}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="catet_da_prox"
                                    className="text-slate-800"
                                >
                                    DA prox:
                                </label>
                                <input
                                    type="text"
                                    id="catet_da_prox"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="catet_da_prox"
                                    ref={catetDaRef}
                                    disabled={inputBloqueadoCa}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="catet_da_med"
                                    className="text-slate-800"
                                >
                                    DA 1/2:
                                </label>
                                <input
                                    type="text"
                                    id="catet_da_med"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="catet_da_med"
                                    ref={catetDaMedRef}
                                    disabled={inputBloqueadoCa}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="catet_da_dist"
                                    className="text-slate-800"
                                >
                                    DA dist:
                                </label>
                                <input
                                    type="text"
                                    id="catet_da_dist"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="catet_da_dist"
                                    ref={catetDaDistRef}
                                    disabled={inputBloqueadoCa}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="catet_1a_d"
                                    className="text-slate-800"
                                >
                                    1a D:
                                </label>
                                <input
                                    type="number"
                                    id="catet_1a_d"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="catet_1a_d"
                                    ref={catet1aDRef}
                                    disabled={inputBloqueadoCa}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="catet_2a_d"
                                    className="text-slate-800"
                                >
                                    2a D:
                                </label>
                                <input
                                    type="number"
                                    id="catet_2a_d"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="catet_2a_d"
                                    ref={catet2aDRef}
                                    disabled={inputBloqueadoCa}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="catet_cx_prox"
                                    className="text-slate-800"
                                >
                                    Cx prox:
                                </label>
                                <input
                                    type="text"
                                    id="catet_cx_prox"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="catet_cx_prox"
                                    ref={catetCxPRef}
                                    disabled={inputBloqueadoCa}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="catet_cx_dist"
                                    className="text-slate-800"
                                >
                                    Cx dist:
                                </label>
                                <input
                                    type="number"
                                    id="catet_cx_dist"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="catet_cx_dist"
                                    ref={catetCxDRef}
                                    disabled={inputBloqueadoCa}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="catet_om"
                                    className="text-slate-800"
                                >
                                    OM:
                                </label>
                                <input
                                    type="number"
                                    id="catet_om"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="catet_om"
                                    ref={catetOmRef}
                                    disabled={inputBloqueadoCa}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="catet_pl"
                                    className="text-slate-800"
                                >
                                    PL:
                                </label>
                                <input
                                    type="number"
                                    id="catet_pl"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="catet_pl"
                                    ref={catetPlRef}
                                    disabled={inputBloqueadoCa}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="catet_cd_aprox"
                                    className="text-slate-800"
                                >
                                    CD prox:
                                </label>
                                <input
                                    type="text"
                                    id="catet_cd_aprox"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="catet_cd_aprox"
                                    ref={catetCdproxRef}
                                    disabled={inputBloqueadoCa}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="catet_cd_med"
                                    className="text-slate-800"
                                >
                                    CD 1/2:
                                </label>
                                <input
                                    type="text"
                                    id="catet_cd_med"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="catet_cd_med"
                                    ref={catetCdMedRef}
                                    disabled={inputBloqueadoCa}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="catet_cd_dist"
                                    className="text-slate-800"
                                >
                                    CD dist:
                                </label>
                                <input
                                    type="text"
                                    id="catet_cd_dist"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="catet_cd_dist"
                                    ref={catetCdDistRef}
                                    disabled={inputBloqueadoCa}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="catet_r_vent_izq"
                                    className="text-slate-800"
                                >
                                    R. Vent. Izq:
                                </label>
                                <input
                                    type="number"
                                    id="catet_r_vent_izq"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="catet_r_vent_izq"
                                    ref={catetRVIzqRef}
                                    disabled={inputBloqueadoCa}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="catet_dp"
                                    className="text-slate-800"
                                >
                                    DP:
                                </label>
                                <input
                                    type="number"
                                    id="catet_dp"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="catet_dp"
                                    ref={catetDpRef}
                                    disabled={inputBloqueadoCa}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="catet_otros"
                                    className="text-slate-800"
                                >
                                    Otros:
                                </label>
                                <input
                                    type="text"
                                    id="catet_otros"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="catet_otros"
                                    ref={catetOtroRef}
                                    disabled={inputBloqueadoCa}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="catet_movilidad"
                                    className="text-slate-800"
                                >
                                    Movilidad:
                                </label>
                                <input
                                    type="text"
                                    id="catet_movilidad"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="catet_movilidad"
                                    ref={catetMovilidadRef}
                                    disabled={inputBloqueadoCa}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="catet_riesgo"
                                    className="text-slate-800"
                                >
                                    Riesgo:
                                </label>
                                <select id="catet_riesgo" name="catet_riesgo" className='mt-2 w-full p-3' ref={catetRiesgoRef}  disabled={inputBloqueadoCa}>
                                    <option value="bajo">Bajo</option>
                                    <option value="medio">Medio</option>
                                    <option value="alto">Alto</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="termino"
                                    className="text-slate-800"
                                >
                                    Terminó:
                                </label>
                                <select id="termino" name="termino" className='mt-2 w-full p-3' ref={terminoRef} >
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="semanas"
                                    className="text-slate-800"
                                >
                                    Semanas:
                                </label>
                                <input
                                    type="number"
                                    id="semanas"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="semanas"
                                    ref={semanasRef}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="aprendio_borg"
                                    className="text-slate-800"
                                >
                                    Aprendió Borg:
                                </label>
                                <select id="aprendio_borg" name="aprendio_borg" className='mt-2 w-full p-3' ref={aprendioBorgRef} >
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="muerte"
                                    className="text-slate-800"
                                >
                                    Muerte:
                                </label>
                                <select id="muerte" name="muerte" className='mt-2 w-full p-3' ref={muerteRef} >
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="inestabilidad_cardio"
                                    className="text-slate-800"
                                >
                                    Inestabilidad cardiovascular:
                                </label>
                                <select id="inestabilidad_cardio" name="inestabilidad_cardio" className='mt-2 w-full p-3' ref={inestabilidadCardioRef} >
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="hospitalizacion"
                                    className="text-slate-800"
                                >
                                    Hospitalización:
                                </label>
                                <select id="hospitalizacion" name="hospitalizacion" className='mt-2 w-full p-3' ref={hospitalizacionRef} >
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="susp_motu_propio"
                                    className="text-slate-800"
                                >
                                    Suspendió por "muto propio":
                                </label>
                                <select id="susp_motu_propio" name="susp_motu_propio" className='mt-2 w-full p-3' ref={suspMotuPropioRef} >
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="lesion_osteo"
                                    className="text-slate-800"
                                >
                                    Lesión Osteomuscular:
                                </label>
                                <select id="lesion_osteo" name="lesion_osteo" className='mt-2 w-full p-3' ref={lesionOsteoRef} >
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="res_otros"
                                    className="text-slate-800"
                                >
                                    Otros:
                                </label>
                                <select id="res_otros" name="res_otros" className='mt-2 w-full p-3' ref={resOtrosRef} >
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="1a_vez_fecha"
                                    className="text-slate-800"
                                >
                                    Nota de 1a vez:
                                </label>
                                <input
                                    type="date"
                                    id="1a_vez_fecha"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="1a_vez_fecha"
                                    ref={Vez1aFechaRef}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="sintomas"
                                    className="text-slate-800"
                                >
                                    Síntomas:
                                </label>
                                <input
                                    type="text"
                                    id="sintomas"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="sintomas"
                                    ref={sintomasRef}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="comer_vestirse"
                                    className="text-slate-800"
                                >
                                    ¿Puede comer, bañarse, vestirse o ir al baño?
                                </label>
                                <select id="comer_vestirse" name="comer_vestirse" className='mt-2 w-full p-3' ref={comerVestirseRef} >
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="caminar_casa"
                                    className="text-slate-800"
                                >
                                    ¿Puede caminar dentro de casa?
                                </label>
                                <select id="caminar_casa" name="caminar_casa" className='mt-2 w-full p-3' ref={caminarCasaRef} >
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="caminar_2_cuadras"
                                    className="text-slate-800"
                                >
                                    ¿Puede caminar 2 cuadras en plano?
                                </label>
                                <select id="caminar_2_cuadras" name="caminar_2_cuadras" className='mt-2 w-full p-3' ref={caminar2CuadrasRef} >
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="subir_piso"
                                    className="text-slate-800"
                                >
                                    ¿Puede subir un piso de escaleras?
                                </label>
                                <select id="subir_piso" name="subir_piso" className='mt-2 w-full p-3' ref={subirPisoRef} >
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="correr_corta"
                                    className="text-slate-800"
                                >
                                    ¿Puede correr una distancia corta?
                                </label>
                                <select id="correr_corta" name="correr_corta" className='mt-2 w-full p-3' ref={correrCortaRef} >
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="lavar_trastes"
                                    className="text-slate-800"
                                >
                                    ¿Puede lavar los trastes ó sacudir el polvo?
                                </label>
                                <select id="lavar_trastes" name="lavar_trastes" className='mt-2 w-full p-3' ref={lavarTrastesRef} >
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="aspirar_casa"
                                    className="text-slate-800"
                                >
                                    ¿Puede aspirar la casa ó cargar el mandado?
                                </label>
                                <select id="aspirar_casa" name="aspirar_casa" className='mt-2 w-full p-3' ref={aspirarCasaRef} >
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="trapear"
                                    className="text-slate-800"
                                >
                                    ¿Puede trapear los pisos ó cargar cosas pesadas?
                                </label>
                                <select id="trapear" name="trapear" className='mt-2 w-full p-3' ref={trapearRef} >
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="jardineria"
                                    className="text-slate-800"
                                >
                                    ¿Puede hacer jardinería (podar el pasto, levantar las hojas secas)?
                                </label>
                                <select id="jardineria" name="jardineria" className='mt-2 w-full p-3' ref={jardineriaRef} >
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="relaciones"
                                    className="text-slate-800"
                                >
                                    ¿Tiene relaciones sexuales?
                                </label>
                                <select id="relaciones" name="relaciones" className='mt-2 w-full p-3' ref={relacionesRef} >
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="jugar"
                                    className="text-slate-800"
                                >
                                    ¿Juega golf, boliche, baila, juega tenis (dobles), futbol, ó beisbol?
                                </label>
                                <select id="jugar" name="jugar" className='mt-2 w-full p-3' ref={jugarRef} >
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="deportes_extenuantes"
                                    className="text-slate-800"
                                >
                                    ¿Juega deportes extenuantes como natación, tenis (singles), futbol, basquetbol?
                                </label>
                                <select id="deportes_extenuantes" name="deportes_extenuantes" className='mt-2 w-full p-3' ref={deportesExtenuantesRef} >
                                    <option value="true">Si</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="TA"
                                    className="text-slate-800"
                                >
                                    TA:
                                </label>
                                <input
                                    type="text"
                                    id="TA"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="TA"
                                    ref={TARef}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="fc"
                                    className="text-slate-800"
                                >
                                    FC:
                                </label>
                                <input
                                    type="number"
                                    id="fc"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="fc"
                                    ref={FCRef}
                                />
                            </div>
                            <div className="mb-4 col-start-1 lg:col-end-5">
                                <label
                                    htmlFor="exploracion_fisica"
                                    className="text-slate-800"
                                >
                                    Exploración Física:
                                </label>
                                <input
                                    type="text"
                                    id="exploracion_fisica"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="exploracion_fisica"
                                    ref={exploracionFisicaRef}
                                />
                            </div>
                            <div className="mb-4 col-start-1 lg:col-end-5">
                                <label
                                    htmlFor="estudios"
                                    className="text-slate-800"
                                >
                                    Estudios a solicitar:
                                </label>
                                <input
                                    type="text"
                                    id="estudios"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="estudios"
                                    ref={estudiosRef}
                                />
                            </div>
                            <div className="mb-4 col-start-1 lg:col-end-5">
                                <label
                                    htmlFor="diagnostico_general"
                                    className="text-slate-800"
                                >
                                    Diagnóstico:
                                </label>
                                <input
                                    type="text"
                                    id="diagnostico_general"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="diagnostico_general"
                                    ref={diagnosticoGeneralRef}
                                />
                            </div>
                            <div className="mb-4 col-start-1 lg:col-end-5">
                                <label
                                    htmlFor="plan"
                                    className="text-slate-800"
                                >
                                    Plan:
                                </label>
                                <input
                                    type="text"
                                    id="plan"
                                    className="mt-2 w-full p-3 bg-gray-50"
                                    name="plan"
                                    ref={planRef}
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
