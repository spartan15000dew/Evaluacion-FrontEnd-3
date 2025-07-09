'use client'

import { Formulario } from "./interfaces/Formulario";
import { useEffect, useState } from "react";
import MostrarDatos from "./ui/MostrarDatos";
import EventForm from "./ui/eventForm";

export default function Home() {
  const [eventos, setEventos] = useState<Formulario[]>([])
  
  useEffect(()=>{
    let listado = JSON.parse(localStorage.getItem("formulario") || "[]")
    setEventos(listado);
    if (!localStorage.getItem("contador")) {
      localStorage.setItem("contador", "0");
    }
  },[])

  useEffect(() => {
    localStorage.setItem("formulario", JSON.stringify(eventos))
  }, [eventos])

  return (
    <div className="flex flex-col gap-y-6">
    <EventForm eventos={eventos} setEventos={setEventos}/>
    <MostrarDatos eventos={eventos} setEventos={setEventos}/>
    </div>
  );
}
