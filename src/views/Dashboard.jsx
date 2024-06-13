import { useState } from 'react'
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { FaRegTrashCan } from "react-icons/fa6";
import { FaEye, FaEdit  } from "react-icons/fa";
import { GrFormPrevious,  GrFormNext } from "react-icons/gr";
import ModalPaciente from '../components/ModalPaciente';
import useSWR from 'swr';
import { useAuth } from '../hooks/useAuth';
import clienteAxios from '../axios-client';
import {Link} from 'react-router-dom'
import Header from '../components/Header';
import { RiSearch2Line } from "react-icons/ri";
import Swal from 'sweetalert2';




export default function Dashboard() {

  const token = localStorage.getItem('AUTH_TOKEN')
  const [pacientes, setPacientes] = useState([])
  const [search, setSearch] = useState("")

  const fetcher = () => clienteAxios('/api/pacientes',
  {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(function (response) {
    setPacientes(response.data.data)
  })

  const {data, error, isLoading} = useSWR('/api/pacientes', fetcher)
    
  const [loading, setLoading] = useState(false)

  const [currentPage, setCurrentPage] = useState(1);
  let results = []
  const searcher = (e) => {
    setSearch(e.target.value)
  }

  if(!search){
    results =  pacientes;
  }else{
    results = pacientes.filter((dato) =>{
      return Object.values(dato).some(value =>
        typeof value === 'string' && value.toLowerCase().includes(search.toLowerCase()));
    }
    )
  }

   

  const itemsPerPage = 15;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  
  const records = results.slice(indexOfFirstItem, indexOfLastItem);
  const npage = Math.ceil(results.length / itemsPerPage);

  const numbers = [...Array(npage + 1).keys()].slice(1);
  const [modal, setModal] = useState(false)

  const handleClickModal= () => {
    setModal(!modal)
  }

  const onDelete = paciente => {
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
        try {
          clienteAxios.delete(`/api/pacientes/${paciente.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }).then( function (response) {
          setTimeout(function() {
            // Redireccionar a una página específica
            window.location.href = '/dashboard';
          }, 3000);
          Swal.fire({
            title: "Eliminado!",
            text: "El paciente fue eliminado",
            icon: "success",
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
    });
    
  }
 



  return (
    <>
    <Header titulo="Mis pacientes"></Header>
    <div className=" mt-5 md:p-5">
      <div className="flex justify-between">
      <form action="w-full md:w-auto ">
            <div className="relative">
                <RiSearch2Line 
                className="absolute top-1/2 -translate-y-1/2 left-2 "
                />
                <input type="text" 
                className='bg-gray-200 outline-none py-2 pl-8 pr-4 rounded-xl w-full md:w-auto'
                placeholder="Buscar Pacientes"
                onChange={searcher}
                />
      
            </div>
        </form>
      <button
        onClick={()=> {
          handleClickModal();
        }}
        className="bg-green-500 hover:bg-green-600 text-white mb-5 p-3 uppercase font-bold cursor-pointer"
      >Nuevo Paciente</button>
      </div>
          <table className="table md:w-full w-full border-separate lg:border-collapse">
              <thead className="">
                  <tr >
                      <th className="border-b-2 border-gray-200">Registro</th>
                      <th className="border-b-2 border-gray-200">Nombre</th>
                      <th className="border-b-2 border-gray-200">Apellido Paterno</th>
                      <th className="border-b-2 border-gray-200">Apellido Materno</th>
                      <th className="border-b-2 border-gray-200">Acciones</th>
                  </tr>
              </thead>
              <tbody className="">
                  {records.map((paciente) => (
                      <tr key={paciente.id} className="text-center md:text-xl ">
                          <td className="border-b-2 border-gray-200 py-4">{paciente.registro}</td>
                          <td className="border-b-2 border-gray-200">{paciente.nombre}</td>
                          <td className="border-b-2 border-gray-200">{paciente.apellidoPat}</td>
                          <td className="border-b-2 border-gray-200">{paciente.apellidoMat}</td>
                          <td className="flex items-center justify-around border-b-2 border-gray-200 py-5">
                            <Link to={'/paciente/'+ paciente.id}> <FaEye className="action-icon info hover:text-[#165CDF]" /></Link>
                            <a onClick={ev => onDelete(paciente)} > <FaRegTrashCan className="action-icon delete hover:text-red-700" /> </a>
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
            <ModalPaciente/>
        </Modal>
    )


    
    }
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
