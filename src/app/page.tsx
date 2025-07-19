'use client'

import { Formulario } from "./interfaces/Formulario";
import { useEffect, useState } from "react";
import MostrarDatos from "./ui/MostrarDatos";
import EventForm from "./ui/eventForm";
import { obtenerFormularios } from "./lib/AccionesFormulario";

export default function Home() {
  const [eventos, setEventos] = useState<Formulario[]>([])

  useEffect(()=>{
    obtenerFormularios().then((listado)=>{
      setEventos(listado)
    }).catch((e)=>{
      alert(e)
    })
  },[]) 

  useEffect(() => {
    localStorage.setItem("formulario", JSON.stringify(eventos))
  }, [eventos])

  return (
    <div className="flex flex-col gap-y-3">
    <EventForm eventos={eventos} setEventos={setEventos}/>
    <MostrarDatos eventos={eventos} setEventos={setEventos}/>
    </div>
  );
}
