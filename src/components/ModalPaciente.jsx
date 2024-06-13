import { useRef, useState } from 'react'
import axiosClient from '../axios-client';
import { useStateContext } from '../contexts/contextProvider';
import clienteAxios from '../axios-client';
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function ModalPaciente() {

    const token = localStorage.getItem('AUTH_TOKEN')

    const [errores, setErrores] = useState(null)

    const registroRef = useRef();
    const nombreRef = useRef();
    const apellidoPatRef = useRef();
    const apellidoMatRef = useRef();
    const telefonoRef = useRef();
    const fechaNacimientoRef = useRef();
    const generoRef = useRef();
    const estadoCivilRef = useRef();
    const profesionRef = useRef();
    const domicilioRef = useRef();

    const tallaRef = useRef();
    const pesoRef = useRef();
    const cinturaRef = useRef();

    const onSubmit = (e) => {
        e.preventDefault()

        const datos = {
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
            registro: registroRef.current.value
        }
        try {
            clienteAxios.post('/api/pacientes',datos,
        {
            headers:{
                Authorization: `Bearer ${token}`
            }
        }).then(function (response) {
            // Redireccionar a una página específica
            setTimeout(function() {
                // Redireccionar a una página específica
                window.location.href = '/dashboard';
            }, 2000);
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Guardado Correctamente",
                showConfirmButton: false,
                timer: 1500
              }); // 3000 milisegundos = 3 segundos
        })
        
            
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
                footer: '<a href="#">Why do I have this issue?</a>'
              });
        }
    }
  return (
    <>
    <div className=''>
    <h1 className="text-4xl font-bold">Nuevo Paciente</h1>
        <p>Completa la informacion para guardar un Paciente</p>

        <div className=" mt-5 px-5 py-10">
            <form action="" className='grid lg:grid-cols-3' onSubmit={onSubmit}>
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
                    <select id="genero" name="genero" className='mt-2 w-full p-3' ref={generoRef}>
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
                    <select id="estadoCivil" name="estadoCivil" className='mt-2 w-full p-3' ref={estadoCivilRef} required>
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
                
                
                <input 
                    type="submit" 
                    value="Guardar"
                    className="bg-green-500 hover:bg-green-600 col-start-3 text-white  m-5 p-3 uppercase font-bold cursor-pointer"
                />
            </form>
        </div>
    </div>
    </>

  )
}
