import { FaHome, FaClinicMedical , FaBookMedical } from 'react-icons/fa';
import { RiMenu2Fill, RiMenu3Fill, RiLogoutBoxFill     } from "react-icons/ri";
import { useEffect, useState } from "react";
import { useStateContext } from '../contexts/contextProvider';
import axiosClient from '../axios-client';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';

export default function Sidebar() {

    const [showMenu, setShowMenu] = useState(false);

    const {logout, user} = useAuth()


  return (
    <>
    <aside className={`bg-[#0D3680] h-full fixed text-white lg:static w-[80%] sm:w-[40%] lg:w-full z-50 transition-all duration-300 ${showMenu ? "bottom-0" : "-bottom-full" } overflow-y-scroll no-scrollbar`}>
        <div className="flex flex-col items-center justify-center p-8 gap-2 h-[30vh]">
            <img 
                src="./img/logo-blanco.jpeg" 
                alt=""
                className="w-40 h-40 object-cover rounded-full ring-2 ring-[#071F4A] mt-10" 
            />
            <h1 className="lg:text-xl  font-semibold pt-3">Dr <span className=''> {user?.nombre} {user?.apellidoPat}</span></h1>
        </div>
        <div className="bg-[#124DBA] p-8 rounded-tr-[100px] h-[70vh] overflow-y-scroll no-scrollbar flex flex-col justify-between lg:text-md text-xl gap-8 mt-10">
            <nav className="flex flex-col gap-8">
                <a href="/dashboard" className="flex items-center gap-4 py-2 px-4 rounded-xl hover:bg-[#071F4A] transition-colors cursor-pointer">
                    <FaClinicMedical  /> Mis Pacientes
                </a>

                <a href="/expedientes" className="flex items-center gap-4 py-2 px-4 rounded-xl hover:bg-[#071F4A] transition-colors cursor-pointer">
                    <FaBookMedical  /> Mis Expedientes
                </a>
                <Link to={'/perfil/'+ user?.id} className="flex items-center gap-4 py-2 px-4 rounded-xl hover:bg-[#071F4A] transition-colors cursor-pointer">
                    <FaHome /> Mi perfil
                </Link>
                <a 
                    onClick={logout}
                    className="flex items-center gap-4 py-2 px-4 rounded-xl hover:bg-[#071F4A] transition-colors cursor-pointer"
                > <RiLogoutBoxFill /> Cerrar Sesión</a>
            </nav>
            
            <div className="">
                <h5 className='text-md'>© Todos los derechos reservados</h5>
            </div>
        </div>
        
    </aside>
    <button 
        onClick={() => setShowMenu(!showMenu)} 
        className="fixed lg:hidden right-4 bottom-4 text-2xl bg-[#0B2E6F] p-2.5 rounded-full text-white z-50"
        >
        {showMenu ? <RiMenu3Fill/> : <RiMenu2Fill  />}
    </button>
    </>
  )
}
