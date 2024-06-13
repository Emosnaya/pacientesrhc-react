import React, { useEffect, useState } from 'react'
import { FaRegTrashCan ,FaPrint } from "react-icons/fa6";
import { FaEye, FaEdit  } from "react-icons/fa";
import { GrFormPrevious,  GrFormNext } from "react-icons/gr";
import ModalExpediente from '../components/ModalExpediente';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { useAuth } from '../hooks/useAuth';
import Header from '../components/Header';
import { RiSearch2Line } from "react-icons/ri";
import useSWR from 'swr';
import clienteAxios from '../axios-client';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';






export default function Expedientes() {

  const token = localStorage.getItem('AUTH_TOKEN')
  const [esfuerzo, setEsfuerzo] = useState([])
  const [estratificacion, setEstratificacion] = useState([])
  const [search, setSearch] = useState("")


  const fetcher = () => clienteAxios('/api/esfuerzo',
  {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(function (response) {
    setEsfuerzo(response.data.data)
  })

  const {data, error, isLoading} = useSWR('/api/esfuerzo', fetcher)

  const fetcherestrati = () => clienteAxios('/api/estratificacion',
  {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(function (response) {
    setEstratificacion(response.data.data)
  })

  const expedientes = esfuerzo.concat(estratificacion);

  const {dataest, errorest, isLoadingest} = useSWR('/api/estratificacion', fetcherestrati)

  let results = []
  const searcher = (e) => {
    setSearch(e.target.value)
  }

  if(!search){
    results =  expedientes;
  }else{
    results = expedientes.filter((dato) =>{
      return Object.values(dato).some(value =>
        typeof value === 'string' && value.toLowerCase().includes(search.toLowerCase()));
    }
    )
  }


    const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  
  const records = expedientes.slice(indexOfFirstItem, indexOfLastItem);
  const npage = Math.ceil(expedientes.length / itemsPerPage);

  const numbers = [...Array(npage + 1).keys()].slice(1);
  const [modal, setModal] = useState(false)


  const onDelete = expediente => {
    Swal.fire({
      title: "¿Quieres borrarlo?",
      text: "No podras revertir este cambio",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        const esfuerzo = `/api/esfuerzo/${expediente.id}`;
        const estrati = `/api/estratificacion/${expediente.id}`;
        const url = expediente.tipo_exp === 1?esfuerzo: estrati;
    try {
      clienteAxios.delete(url,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then( function (response) {
      setTimeout(function() {
        // Redireccionar a una página específica
        window.location.href = '/expedientes';
      }, 3000);
      Swal.fire({
        title: "Elimnado!",
        text: "Eliminado con éxito",
        icon: "success",
        timer: 1500
      });})
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Ocurrio un error!",
        });
      }
      }
    });
  }


  

  const handleClickModal= () => {
    setModal(!modal)
  }
  return (
    <>
    <Header titulo="Mis expedientes"/>
    <div className=" mt-5 md:p-5">
      <div className="flex justify-between">
      <form action="w-full md:w-auto ">
            <div className="relative">
                <RiSearch2Line 
                className="absolute top-1/2 -translate-y-1/2 left-2 "
                />
                <input type="text" 
                className='bg-gray-200 outline-none py-2 pl-8 pr-4 rounded-xl w-full md:w-auto'
                placeholder="Buscar Expedientes"
                onChange={searcher}
                />
      
            </div>
        </form>
      <button
        onClick={()=> {
          handleClickModal();
        }}
        className="bg-green-500 hover:bg-green-600 text-white mb-5 p-3 uppercase font-bold cursor-pointer"
      >Nuevo Expediente</button>
      </div>
          <table className="table md:w-full border-separate lg:border-collapse w-full">
              <thead className="">
                  <tr >
                      <th className="border-b-2 border-gray-200">ID</th>
                      <th className="border-b-2 border-gray-200">Tipo de expediente</th>
                      <th className="border-b-2 border-gray-200">Fecha</th>
                      <th className="border-b-2 border-gray-200">Acciones</th>
                  </tr>
              </thead>
              <tbody className="">
                  {records.map((expediente) => (
                      <tr key={expediente.id} className="text-center md:text-xl ">
                          <td className="border-b-2 border-gray-200 py-4">{(expediente.numPrueba)?expediente.numPrueba:expediente.id}</td>
                          <td className="border-b-2 border-gray-200">{(expediente.tipo_exp === 1)?'Prueba de esfuerzo':'Estratificación'}</td>
                          <td className="border-b-2 border-gray-200">{(expediente.fecha)?expediente.fecha:expediente.estrati_fecha}</td>
                          <td className="flex items-center justify-between border-b-2 border-gray-200 py-5">
                            {(expediente.tipo_exp ===1)? <Link to={'/prueba/'+ expediente.id}> <FaEdit className="action-icon edit hover:text-yellow-400" /></Link>
                            :<Link to={'/estrati/'+ expediente.id}> <FaEdit className="action-icon edit hover:text-yellow-400" /></Link>}
                            {(expediente.tipo_exp ===1)? <Link to={'/prueba/imprimir/'+ expediente.id}> <FaPrint className="action-icon edit hover:text-yellow-400" /></Link>
                            :<Link to={'/estrati/imprimir/'+ expediente.id}> <FaPrint className="action-icon edit hover:text-yellow-400" /></Link>}
                            <a onClick={ev => onDelete(expediente)} > <FaRegTrashCan className="action-icon delete hover:text-red-700" /> </a>
                          </td>
                      </tr>
                  ))}
              </tbody>
          </table>
          <nav className="mt-3">
            <div className="pagination flex items-center justify-center rounded-lg text-lg">
                  <button className="border-2 border-r-0 border-[#165CDF]/[0.3] h-8 w-8 hover:text-white hover:bg-[#165CDF]/[0.7]" onClick={prePage}>

                        <GrFormPrevious />
                  </button>
                  {
                    numbers.map((n, i) => (
                        <button className={`page-item ${currentPage === n ? 'active' : ''} border-2 border-[#165CDF]/[0.3] h-8 w-8 border-r-0 hover:text-white hover:bg-[#165CDF]/[0.7]` } key={i} onClick={() => changeCPage(n)}>
                            {n}
                        </button>
                    ))
                  }
                  <button className="border-2 border-[#165CDF]/[0.3] h-8 w-8 hover:text-white hover:bg-[#165CDF]/[0.7]" onClick={nextPage} >
                    <GrFormNext />
                  </button>
            </div>
          </nav>
    </div>

    {modal && 
    (
        <Modal open={modal} onClose={handleClickModal}>
            <ModalExpediente/>
        </Modal>
    )}
    </>
  )

  function prePage(){
    if(currentPage !== 1){
        setCurrentPage(currentPage - 1)
    }
  }

  function changeCPage(id){
    setCurrentPage(id)
  }
  function nextPage(){
    if(currentPage !== npage){
        setCurrentPage(currentPage + 1)
    }
  }
}
