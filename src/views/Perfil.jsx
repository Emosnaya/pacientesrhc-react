import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { useAuth } from '../hooks/useAuth'
import { Link, useParams } from 'react-router-dom'
import clienteAxios from '../axios-client'

export default function Perfil() {
  const token = localStorage.getItem('AUTH_TOKEN')
  const [usuario,setUsuario] = useState()
  const {id} = useParams()


  if(id) {
    useEffect(() => {
      clienteAxios.get(`/api/users/${id}`,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    .then(({data}) => {
      setUsuario(data)
    })
    }, [])
}

const onSubmit = (e) => {
  e.preventDefault()
    try {
        clienteAxios.put(`/api/users/${usuario.id}`, usuario,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        }).then(function (response) {
          // Redireccionar a una página específica
          setTimeout(function() {
              // Redireccionar a una página específica
              window.location.href = '/dashboard';
          }, 3000);
          
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
    <Header titulo ="Editar Perfil"/>
    <div>
        <div className=" mt-5 px-5 py-10">
            <form action="" className='grid lg:grid-cols-2 grid-cols-1 gap-2' onSubmit={onSubmit} >
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
                        value={usuario?.nombre}
                        onChange={ev => setUsuario({...usuario,nombre: ev.target.value})}
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
                        value={usuario?.apellidoPat}
                        onChange={ev => setUsuario({...usuario,apellidoPat: ev.target.value})}
                        
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
                        value={usuario?.apellidoMat}
                        onChange={ev => setUsuario({...usuario,apellidoMat: ev.target.value})}
                        
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
                        value={usuario?.cedula}
                        onChange={ev => setUsuario({...usuario,cedula: ev.target.value})}
                    />
                </div>
                <div className="mb-4">
                    <label 
                    htmlFor="email"
                    className="text-slate-800"
                    >
                        Email:
                    </label>
                    <input 
                        type="email"
                        id="email"
                        className="mt-2 w-full p-3 bg-gray-50" 
                        name="email"
                        value={usuario?.email}
                        onChange={ev => setUsuario({...usuario,email: ev.target.value})}
                    />
                </div>

                <div className="mb-4">
                    <label 
                    htmlFor="password"
                    className="text-slate-800"
                    >
                        Pasword:
                    </label>
                    <input 
                        type="password"
                        id="password"
                        className="mt-2 w-full p-3 bg-gray-50" 
                        name="password"
                        onChange={ev => setUsuario({...usuario,password: ev.target.value})}
                    />
                </div>
                
                <input 
                    type="submit" 
                    value="Guardar"
                    className="bg-green-500 hover:bg-green-600 col-start-1 text-white  m-5 p-3 uppercase font-bold cursor-pointer"
                />
                <Link className="bg-red-500 hover:bg-red-600 text-white m-5 text-center p-3 uppercase font-bold cursor-pointer" to="/dashboard"> Cancelar</Link>
            </form>
            
        </div>
    </div>

    </>
  )
}
