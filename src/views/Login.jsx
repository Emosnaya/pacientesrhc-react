import {Link} from 'react-router-dom'
import { useRef, useState } from 'react'
import axiosClient from '../axios-client';
import { useStateContext } from '../contexts/contextProvider';
import { useAuth } from '../hooks/useAuth';
import Alerta from '../components/Alerta';

export default function Login() {

    const cedulaRef = useRef();
    const passwordRef = useRef();

    const [errores, setErrores] = useState([])
    const { login } = useAuth()

    const onSubmit = (e) => {
        e.preventDefault()

        const datos = {
            cedula: cedulaRef.current.value,
            password: passwordRef.current.value,

        }
        login(datos, setErrores)
    }
  return (
    <>
    <h1 className="text-4xl font-bold">Iniciar Sesión</h1>
        <p>Administra tus pacientes accediendo a tu cuenta</p>

        <div className="bg-white shadow-md rounded-md mt-10 px-5 py-10">
            <form action="" onSubmit={onSubmit}>
            { errores ? Object.entries(errores).map(([key, arreglo]) => (<div key={key}>{arreglo.map((error, index) => (<Alerta key={index}>{error}</Alerta>))}</div>)): null}
                <div className="mb-4">
                    <label 
                    htmlFor="cedula"
                    className="text-slate-800"
                    >
                        Cédula*:
                    </label>
                    <input 
                        type="text"
                        id="cedula"
                        className="mt-2 w-full p-3 bg-gray-50" 
                        name="cedula"
                        placeholder="Cédula"
                        ref={cedulaRef}
                    />
                </div>
                <div className="mb-4">
                    <label 
                    htmlFor="password"
                    className="text-slate-800"
                    >
                        Password*:
                    </label>
                    <input 
                        type="password"
                        id="password"
                        className="mt-2 w-full p-3 bg-gray-50" 
                        name="password"
                        placeholder="password"
                        ref={passwordRef}
                    />
                </div>

                <input 
                    type="submit" 
                    value="Iniciar Sesión"
                    className="bg-[#007bff] hover:bg-blue-600 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
                />
            </form>
        </div>

        <nav className="mt-5 flex gap-3 "> 
            <Link to="/crear-cuenta" className='hover:text-blue-400'>
                ¿No tienes cuenta? Crea una
            </Link>
        </nav>
    </>
  )
}
