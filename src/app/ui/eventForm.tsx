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
        participantes : 0,
        tipo : "",
        descripcion : "",
        fecha : "",
        id: 0
    }

    const [formulario, setFormulario] = useState<Formulario>(valoresPorDefecto)


    const handleFormularioCambio = (name:string, value:string) => {
        setFormulario(
        {...formulario, [name]: name === "participantes-num" ? Number(value) : value }
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
        <div className="w-full">
        <form className="
                border rounded-md w-[30rem] mx-auto flex flex-col items-start 
                px-7 py-5 gap-y-1
            "
            onSubmit={handleRegistrar}
        >
        <h1 className="self-center">Agendar evento</h1>
        <label htmlFor="nombre-evento">Nombre del evento</label>
        <input
            required
            id="nombre-evento"
            name ="nombre"
            type="text" 
            placeholder="ej. Taller de tejido"
            className="border border-emerald-800"
            onChange={(e)=>{handleFormularioCambio(e.currentTarget.name,e.currentTarget.value)}}
        />
        <label htmlFor="participantes-num">Número de participantes</label>
        <input
            required
            min={1}
            max={20000}
            className="border border-emerald-800"
            id="participantes-num"
            name ="participantes"
            type="number" 
            placeholder="ej. 50"
            onChange={(e)=>{handleFormularioCambio(e.currentTarget.name,e.currentTarget.value)}}
        />
        <label htmlFor="descripcion-evento">Descripción</label>
        <textarea name="descripcion" id="descripcion-evento"
            placeholder="Planificación del evento, objetivos, etc."
            className="border border-emerald-800"
            onChange={(e)=>{handleFormularioCambio(e.currentTarget.name, e.currentTarget.value)}}
        ></textarea>
        <label htmlFor="tipo-evento">Tipo</label>
        <select
            required
            id="tipo-evento"
            name="tipo"
            className="border border-emerald-800"
            onChange={(e)=>{handleFormularioCambio(e.currentTarget.name,e.currentTarget.value)}}>
                    <option value="conference" className="text-neutral-900">Conferencia</option>
                    <option value="workshop" className="text-neutral-900">Taller</option>
                    <option value="party" className="text-neutral-900">Fiesta</option>
                    <option value="meeting" className="text-neutral-900">Reunión</option>
        </select>
        <label htmlFor="fecha-evento">Fecha</label>
        <input
            required
            id="fecha-evento"
            name ="fecha"
            type="date" 
            placeholder="mm-dd-aaaa"
            onChange={(e)=>{handleFormularioCambio(e.currentTarget.name,e.currentTarget.value)}}/>

        <button type="submit" className="
                    bg-emerald-900 px-3 py-2 rounded self-center
                "
            >Registrar</button>
        </form>
        </div>
    )
}
