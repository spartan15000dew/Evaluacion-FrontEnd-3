'use client'

import { useState, FormEvent } from "react"
import { Formulario } from "../interfaces/Formulario"

interface EventFormProps {
    eventos: Formulario[]
    setEventos: (React.Dispatch<React.SetStateAction<Formulario[]>>)
}

export default function EventForm( {eventos, setEventos} : EventFormProps) {
    let valoresPorDefecto = {
        nombre : "",
        rut : 0,
        opcion : "",
        descripcion : "",
        fecha : "",
        id: 0
    }

    const [formulario, setFormulario] = useState<Formulario>(valoresPorDefecto)


    const handleFormularioCambio = (name:string, value:string) => {
        setFormulario(
        {...formulario, [name]: name === "rut" ? Number(value) : value }
        )
    }

    const handleRegistrar = (e: FormEvent)=> {
        e.preventDefault();
        const contador = parseInt(localStorage.getItem("contador") || "0");
        const nuevoEvento = { ...formulario, id: contador };
        localStorage.setItem("contador", (contador + 1).toString());
        const nuevosRegistros = [...eventos, nuevoEvento];

        setEventos(nuevosRegistros)
        localStorage.setItem("formulario", JSON.stringify(nuevosRegistros))
    }

    return (
        <form className="border w-[70%] mx-auto"
            onSubmit={handleRegistrar}
        >
        <h1>Agendar evento</h1>
        <label htmlFor="nombre-evento">Nombre del evento</label>
        <input
            id="nombre-evento"
            name ="nombre"
            type="text" 
            placeholder="Nombre"
            onChange={(e)=>{handleFormularioCambio(e.currentTarget.name,e.currentTarget.value)}}/>

        <label htmlFor="participantes-num">Número de participantes</label>
        <input
            id="participantes-num"
            name ="rut"
            type="number" 
            placeholder="Rut"
            onChange={(e)=>{handleFormularioCambio(e.currentTarget.name,e.currentTarget.value)}}/>

        <label htmlFor="descripcion-evento">Descripción</label>
        <textarea name="descripcion" id="descripcion-evento" placeholder="Descripción"
            onChange={(e)=>{handleFormularioCambio(e.currentTarget.name, e.currentTarget.value)}}
        ></textarea>
        <label htmlFor="fecha-evento">Fecha</label>
        <input
            id="fecha-evento"
            name ="fecha"
            type="date" 
            placeholder="mm-dd-aaaa"
            onChange={(e)=>{handleFormularioCambio(e.currentTarget.name,e.currentTarget.value)}}/>

        <label htmlFor="tipo-evento">Tipo</label>
        <select
            id="tipo-evento"
            name="opcion"
            onChange={(e)=>{handleFormularioCambio(e.currentTarget.name,e.currentTarget.value)}}>
                    <option value="conference" className="text-neutral-900">Conferencia</option>
                    <option value="workshop" className="text-neutral-900">Taller</option>
                    <option value="party" className="text-neutral-900">Fiesta</option>
                    <option value="meeting" className="text-neutral-900">Reunión</option>
        </select>

        <button type="submit">Registrar</button>
        </form>
    )
}