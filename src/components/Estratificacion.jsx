import ModalPaciente from "./ModalPaciente";
import { useState } from "react";
import PacienteEstrati from "./PacienteEstrati";
import FormEstarti from "./FormEstarti";


export default function Estratificacion() {
    const [paciente, setPaciente] = useState(null);

    // Función para manejar el cambio de la fruta seleccionada
    const handlePaciente = (event) => {
        setPaciente(event.target.value);
    };
  
    // Componente a mostrar según la fruta seleccionada
    let componentePaciente;
    if (paciente === 'true') {
        componentePaciente = <PacienteEstrati />;
    }else if(paciente == 'false'){
        componentePaciente = <FormEstarti/>;
    }

  return (
    < >
      {!componentePaciente && (
                <>
                <h2>¿Nuevo Paciente?</h2>
                <div className="grid grid-cols-2">
                  <div className="m-5">
                    <label 
                    htmlFor="true"
                    className="text-slate-800"
                    >
                        Si:
                    </label>
                    <input 
                        type="radio"
                        id="true"
                        className=" ml-2" 
                        name="paciente"
                        value="true" checked={paciente === 'true'} onChange={handlePaciente} 
                    />
                </div>
                <div className="m-5">
                    <label 
                    htmlFor="nombre"
                    className="text-slate-800"
                    >
                        No:
                    </label>
                    <input 
                        type="radio"
                        id="false"
                        className="ml-2" 
                        name="paciente"
                        value="false" checked={paciente === 'false'} onChange={handlePaciente} 
                    />
                </div>
              </div>
                </>
      )
      }
      {componentePaciente}
    </>
  )
}
