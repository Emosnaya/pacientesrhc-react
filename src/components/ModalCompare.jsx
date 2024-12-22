import React, { useRef, useState } from 'react'

export default function ModalCompare({esfuerzos}) {
    const [esfuerzoUno, setEsfuerzoUno] = useState([])
    const [esfuerzoDos, setEsfuerzoDos] = useState([])
    const [id, setId] = useState({})

    const handleInputChangeUno = (event) => {
        setId(event.target.value);
        setEsfuerzoUno(event.target.value);
      };

      const handleInputChangeDos = (event) => {
        setId(event.target.value);
        setEsfuerzoDos(event.target.value);
      };

  return (
    <>
    </>
  )
}
