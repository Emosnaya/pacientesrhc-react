import { useRef, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import Alerta from '../components/Alerta';
import { useAuth } from '../hooks/useAuth';

export default function Signup() {

    const nombreRef = useRef();
    const apellidoPatRef = useRef();
    const apellidoMatRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();
    const cedulaRef = useRef();
    const [errores, setErrores] = useState([])

    const {registro} = useAuth()


    const onSubmit = (e) => {
        e.preventDefault()

        const datos = {
            nombre: nombreRef.current.value,
            apellidoPat: apellidoPatRef.current.value,
            apellidoMat: apellidoMatRef.current.value,
            cedula: cedulaRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value

        }
        registro(datos, setErrores)
        console.log(errores)
        
    }

  return (
    <>
    <h1 className="text-4xl font-bold">Crea tu Cuenta</h1>
        <p>Crea tu cuenta llenando el formulario</p>
        { errores ? Object.entries(errores).map(([key, arreglo]) => (<div key={key}>{arreglo.map((error, index) => (<Alerta key={index}>{error}</Alerta>))}</div>)): null}
        <div className="bg-white shadow-md rounded-md mt-5 px-5 py-10">
            <form action="" onSubmit={onSubmit}>
                <div className="mb-4">
                    <label 
                    htmlFor="nombre"
                    className="text-slate-800"
                    >
                        Nombre(s)*:
                    </label>
                    <input 
                        type="text"
                        id="nombre"
                        className="mt-2 w-full p-3 bg-gray-50" 
                        name="nombre"
                        placeholder="Nombre(s)"
                        ref={nombreRef}
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
                        ref={apellidoPatRef}
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
                        ref={apellidoMatRef}
                    />
                </div>

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
                    htmlFor="email"
                    className="text-slate-800"
                    >
                        Email*:
                    </label>
                    <input 
                        type="email"
                        id="email"
                        className="mt-2 w-full p-3 bg-gray-50" 
                        name="email"
                        placeholder="Email"
                        ref={emailRef}
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

                <div className="mb-4">
                    <label 
                    htmlFor="password_confirmation"
                    className="text-slate-800"
                    >
                         Repetir Password*:
                    </label>
                    <input 
                        type="password"
                        id="password_confirmation"
                        className="mt-2 w-full p-3 bg-gray-50" 
                        name="password_confirmation"
                        placeholder=" Repetir Password"
                        ref={passwordConfirmationRef}
                    />
                </div>

                <input 
                    type="submit" 
                    value="Crear Cuenta"
                    className="bg-[#007bff] hover:bg-blue-600 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
                />
                
            </form>
        </div>

        <nav className="mt-5"> 
            <Link to="/login">
                ¿Ya tienes cuenta? Inicia Sesión
            </Link>
        </nav>
    </>
  )
}
