'use client'

import { useState, FormEvent } from "react"
import { Formulario, NuevoRegistro } from "../interfaces/Formulario"
import { registrarFormulario } from "../lib/AccionesFormulario"
import { Timestamp } from "firebase/firestore"

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
        fecha : Timestamp.fromDate(new Date())
    }

    const [formulario, setFormulario] = useState<NuevoRegistro>(valoresPorDefecto)

    const handleFormularioCambio = (name:string, value:string) => {
        setFormulario(
        {...formulario, [name]: name === "participantes-num" ? Number(value) : value }
        )
    }

    const handleCambioFecha = (name:string, value:string) => {
        setFormulario(
            {...formulario, [name]: Timestamp.fromDate(new Date(value))}
        )
    }

    async function handleRegistrar(e: FormEvent) {
        e.preventDefault();
        setEventos([...eventos, await registrarFormulario({...formulario})])
    }

    return (
        <div className="w-full">
        <form className="
                border rounded-md w-[30rem] mx-auto flex flex-col items-start 
                px-7 py-5 gap-y-1
            "
            onSubmit={handleRegistrar}
        >
        <h1 className="self-center">Agenda de eventos</h1>
        <label htmlFor="nombre-evento">Nombre del evento</label>
        <input
            className="border border-emerald-800"
            required
            id="nombre-evento"
            name ="nombre"
            type="text" 
            placeholder="ej. Taller de tejido"
            onChange={(e)=>{handleFormularioCambio(e.currentTarget.name,e.currentTarget.value)}}
        />
        <label htmlFor="participantes-num">Número de participantes</label>
        <input
            className="border border-emerald-800"
            required
            min={1}
            max={20000}
            id="participantes-num"
            name ="participantes"
            type="number" 
            placeholder="ej. 50"
            onChange={(e)=>{handleFormularioCambio(e.currentTarget.name,e.currentTarget.value)}}
        />
        <label htmlFor="descripcion-evento">Descripción</label>
        <textarea name="descripcion" id="descripcion-evento" className="border border-emerald-800"
            placeholder="Planificación del evento, objetivos, etc."
            onChange={(e)=>{handleFormularioCambio(e.currentTarget.name, e.currentTarget.value)}}
        ></textarea>
        <label htmlFor="tipo-evento">Tipo</label>
        <select
            required
            id="tipo-evento"
            name="tipo"
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
            onChange={(e)=>{handleCambioFecha(e.currentTarget.name,e.currentTarget.value)}}/>

        <button type="submit" className="
                    bg-emerald-900 px-3 py-2 rounded self-center
                "
            >Registrar</button>
        </form>
        </div>
    )
}