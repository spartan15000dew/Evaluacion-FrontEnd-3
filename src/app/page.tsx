'use client'
import Image from "next/image";
import { Formulario } from "./interfaces/Formulario";
import { useState } from "react";


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
  const [eNombre, setENombre] = useState("")

  const handleFormulario = (name:string,value:string)=>{
    setFormulario(
      { ...formulario, [name] : value  }
    )
  }
  return (
    <>
    <form>
      <h1>Nombre {formulario.nombre} Rut {formulario.rut} descripcion {formulario.descripcion} Fecha{formulario.fecha} Sexo {formulario.opcion} </h1>
      <label>Nombre</label><br />
      <input
          name ="nombre"
          type="text" 
          placeholder="Nombre"
          onChange={(e)=>{handleFormulario(e.currentTarget.name,e.currentTarget.value)}}/> <br />

      <label>Rut</label><br />
      <input
          name ="rut"
          type="number" 
          placeholder="Rut"
          onChange={(e)=>{handleFormulario(e.currentTarget.name,e.currentTarget.value)}}/> <br />

      <label>descripcion</label><br />
      <input
          name ="descripcion"
          type="text" 
          placeholder="Descripcion"
          onChange={(e)=>{handleFormulario(e.currentTarget.name,e.currentTarget.value)}}/> <br />

      <label>fecha</label><br />
      <input
          name ="fecha"
          type="date" 
          placeholder="mm-dd-aaaa"
          onChange={(e)=>{handleFormulario(e.currentTarget.name,e.currentTarget.value)}}/> <br />

      <label>Sexo</label>
      <select
          name="opcion"
          onChange={(e)=>{handleFormulario(e.currentTarget.name,e.currentTarget.value)}}>
            <option value="">a que sexo pertenece</option>
            <option value="Hombre">Hombre</option>
            <option value="Mujer">Mujer</option>
            <option value="Otro">Otro</option>
          </select>




  </form>
  </>
  );
}
