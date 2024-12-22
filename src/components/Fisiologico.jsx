import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import clienteAxios from '../axios-client'
import { IoCloudUploadOutline } from "react-icons/io5";
import Swal from "sweetalert2";

export default function Fisiologico() {
        const token = localStorage.getItem('AUTH_TOKEN')
        const { id } = useParams();
        const [selectedFile, setSelectedFile] = useState(null);
        const [isUploading, setIsUploading] = useState(false);
      
        // Maneja el cambio de selección de archivo
        const handleFileChange = (event) => {
          setSelectedFile(event.target.files[0]); // Solo selecciona un archivo
        };
      
        // Simula la subida del archivo (aquí podrías integrar una API)
        const handleUpload = () => {
          if (!selectedFile) {
            alert('Por favor, selecciona un archivo.');
            return;
          }
          setIsUploading(true);

          try {
            // Crear el FormData y agregar los campos necesarios
            const formData = new FormData();
            formData.append('archivo', selectedFile); // Clave 'file' para el archivo
            formData.append('paciente_id', id); // Agregar ID como parte de los datos

            // Realizar la solicitud POST al backend
            const response = clienteAxios.post('/api/fis', formData, {
                headers: {
                     Authorization: `Bearer ${token}`,
                },
            });
        } catch (error) {
            alert('Hubo un error al subir el archivo.');
        } finally {
            setIsUploading(false);
            setSelectedFile(null);
            setTimeout(function () {
              window.location.reload()
          }, 2000);
          Swal.fire({
              position: "center",
              icon: "success",
              title: "Guardado Correctamente",
              showConfirmButton: false,
              timer: 1500
            });
        }
        }
  return (
    <>
    <div className='mt-5'>
            <div>
                <label htmlFor="file" className='text-slate-800 font-bold'>Selecciona un archivo:</label>
                <label htmlFor="dragdrop-file" className='flex flex-col items-center justify-center w-[300px] h-[200px] border-2 border-dashed rounded-lg border-gray-400 cursor-pointer bg-gray-50'>
                    <div className="dlex flex-col items-center justify-center pt-5 pb-6 text-8xl text-blue-400 hover:text-blue-600">
                        <IoCloudUploadOutline/>
                    </div>
                </label>
             </div>
             {selectedFile && (
                <h1 className='text-justify'>Archvio seleccionado : {selectedFile.name}</h1>)}
        <input id='dragdrop-file' type="file" hidden onChange={handleFileChange}/>
        <div className='flex justify-between'>
            <button onClick={handleUpload} className='mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Guardar</button>
            <button onClick={() => {
              setSelectedFile(null)
              window.location.reload()
            }} className='mt-5 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded '>Cancelar</button>
        </div>
        
    </div>
    </>
  );
}
