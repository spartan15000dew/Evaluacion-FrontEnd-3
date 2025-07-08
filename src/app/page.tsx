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
  fecha : ""
}


export default function Home() {
  const miStorage = window.localStorage
  const [formulario, setFormulario] = useState(initialStateFormulario)
  const [formularioA, setFormularioA] = useState(initialStateFormulario)
  const [formularios, setformularios] = useState<Formulario[]>([])
  const [editando, setEditando] = useState(false);

  useEffect(()=>{
    let listado = JSON.parse(miStorage.getItem("formulario") || "[]")
    setformularios(listado)
  },[]) 

  const handleFormularioCambio = (name:string, value:string) => {
    setFormulario(
      {...formulario, [name]: name === "rut" ? Number(value) : value }
    )
  }

  const handleRegistrar = (e: FormEvent)=> {
    e.preventDefault();
    const listadoDeRegistros = JSON.parse(localStorage.getItem("formulario") || "[]")
    miStorage.setItem("formulario",JSON.stringify([...formularios,formulario]))
  }

  const handleActualizar = ()=>{
    alert("Falta esto")
  }
  const traerformulario = (f:Formulario)=>{
    setFormularioA({...f})
    setEditando(true)
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
  <MostrarDatos vista="hola" traerformulario={traerformulario}/>
  <form >
    <h1>{formulario.nombre}</h1>
      <label>Nombre</label><br />
      <input
          name ="nombre"
          type="text" 
          placeholder="Nombre"
          value={formularioA.nombre}
          onChange={(e)=>{handleFormularioCambio(e.currentTarget.name,e.currentTarget.value)}}/> <br />
          <button 
          onClick={()=>{handleActualizar()}}>Editar</button>  


  </form>

  </>
  );
}
