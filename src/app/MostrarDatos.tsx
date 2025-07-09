import { useEffect, useState } from "react"
import { Formulario } from "./interfaces/Formulario"

interface Props{
  formulario: Formulario
  eventos: Formulario[]
  setFormulario: (f:Formulario) => void
  setEventos: (React.Dispatch<React.SetStateAction<Formulario[]>>)
}

export const MostrarDatos = ({ eventos, setEventos, formulario, setFormulario } : Props) => {

  const miStorage = window.localStorage
      useEffect(()=>{
        let listadoStr = miStorage.getItem("formulario")
        if(listadoStr != null){
            let listado = JSON.parse(listadoStr)
            setFormulario(listado)
        }
  },[])

  function eliminarDeLaLista(eventoId: number) {
    setEventos(prevEventos =>
      prevEventos.filter(evento => evento.id !== eventoId)
    )
  }

  function handleChange(id: number, value: string) {
    const eventosActualizados = eventos.map(evento =>
      evento.id === id ? { ...evento, "nombre": value } : evento
    )
    setEventos(eventosActualizados)
  }
  
  let elementosEventos = eventos.map((evento, i) =>
    <li key={i}>
      <input type="text" value={evento.nombre} onChange={(e) => handleChange(evento.id, e.target.value)}/>
      <button onClick={() => eliminarDeLaLista(evento.id)}>Borrar</button>
    </li>
  )
  
  
  return (
    <>
      <ul>{elementosEventos}</ul>
    </>
  )
}

export default MostrarDatos