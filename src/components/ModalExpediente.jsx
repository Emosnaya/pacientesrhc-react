
import { useState } from 'react';
import Estratificacion from './Estratificacion';
import PruebaE from './PruebaE';
import Clinico from './Clinico';

export default function ModalExpediente() {

    const [expediente, setExpediente] = useState(null);

  // Función para manejar el cambio de la fruta seleccionada
  const handleExpediente = (event) => {
    setExpediente(event.target.value);
  };

  // Componente a mostrar según la fruta seleccionada
  let componenteExpediente;
  if (expediente === 'estratifiacion') {
    componenteExpediente = <Estratificacion />;
  } else if (expediente === 'prueba') {
    componenteExpediente = <PruebaE />;
  }else if (expediente ===  'clinico'){
    componenteExpediente = <Clinico/>
  }
  return (
    <>
    {!componenteExpediente && (
        <div>
        <label htmlFor="expedientes" className='text-slate-800'>Selecciona un tipo de Expediente:</label>
        <select id="expedientes" name="expedientes" value={expediente} onChange={handleExpediente} className="mt-2 w-full p-3 bg-gray-50" >
          <option value=""></option>
          <option value="prueba">Prueba de Esfuerzo</option>
          <option value="estratifiacion">Estratificación</option>
          <option value="clinico">Expediente Clinico</option>
        </select>
      </div>
    )
    }
    {componenteExpediente}
    </>
  )
}
