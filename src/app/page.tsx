'use client'
import Image from "next/image";
import { Formulario } from "./interfaces/Formulario";
import { FormEvent, useEffect, useState } from "react";
import { json } from "stream/consumers";
import { MostrarDatos } from "./MostrarDatos";


const  initialStateFormulario:Formulario = {
  nombre : "",
  rut : 0,
  opcion : "",
  descripcion : "",
  fecha : "",
  id: 0
}


export default function Home() {
  const miStorage = window.localStorage
  const [formulario, setFormulario] = useState(initialStateFormulario)
  const [eventos, setEventos] = useState<Formulario[]>([])
  
  useEffect(()=>{
    let listado = JSON.parse(miStorage.getItem("formulario") || "[]")
    setEventos(listado);
    if (!miStorage.getItem("contador")) {
      miStorage.setItem("contador", "0");
    }
  },[])

  useEffect(() => {
    localStorage.setItem("formulario", JSON.stringify(eventos))
  }, [eventos])

  const handleFormularioCambio = (name:string, value:string) => {
    setFormulario(
      {...formulario, [name]: name === "rut" ? Number(value) : value }
    )
  }

  const handleRegistrar = (e: FormEvent)=> {
    e.preventDefault();
    const contador = parseInt(miStorage.getItem("contador") || "0");
    const nuevoEvento = { ...formulario, id: contador };
    miStorage.setItem("contador", (contador + 1).toString());
    const nuevosRegistros = [...eventos, nuevoEvento];

    setEventos(nuevosRegistros)
    localStorage.setItem("formulario", JSON.stringify(nuevosRegistros))
  }

  const handleActualizar = ()=>{
    alert("Falta esto")
  }

  return (
    <>
    <form className="border w-[70%] mx-auto"
      onSubmit={handleRegistrar}
    >
      <h1>Nombre {formulario.nombre} Rut {formulario.rut} descripcion {formulario.descripcion} Fecha{formulario.fecha} Sexo {formulario.opcion} </h1>
      <label>Nombre</label><br />
      <input
          name ="nombre"
          type="text" 
          placeholder="Nombre"
          onChange={(e)=>{handleFormularioCambio(e.currentTarget.name,e.currentTarget.value)}}/> <br />

      <label>Rut</label><br />
      <input
          name ="rut"
          type="number" 
          placeholder="Rut"
          onChange={(e)=>{handleFormularioCambio(e.currentTarget.name,e.currentTarget.value)}}/> <br />

      <label>descripcion</label><br />
      <textarea name="descripcion" id="" placeholder="Descripción"
          onChange={(e)=>{handleFormularioCambio(e.currentTarget.name, e.currentTarget.value)}}
      ></textarea>
      <label>fecha</label><br />
      <input
          name ="fecha"
          type="date" 
          placeholder="mm-dd-aaaa"
          onChange={(e)=>{handleFormularioCambio(e.currentTarget.name,e.currentTarget.value)}}/> <br />

      <label>Sexo</label>
      <select
          name="opcion"
          onChange={(e)=>{handleFormularioCambio(e.currentTarget.name,e.currentTarget.value)}}>
            <option value="">a que sexo pertenece</option>
            <option value="Hombre">Hombre</option>
            <option value="Mujer">Mujer</option>
            <option value="Otro">Otro</option>
          </select><br />

      <button type="submit">Registrar</button>
    </form>
    <MostrarDatos eventos={eventos} setEventos={setEventos} formulario={formulario} setFormulario={setFormulario}/>
  </>
  );
}
