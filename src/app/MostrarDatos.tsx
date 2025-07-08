import { useEffect, useState } from "react"
import { Formulario } from "./interfaces/Formulario"

interface Props{
  vista : string
  traerformulario: (f:Formulario) => void
}

export const MostrarDatos = (props:Props) => {
    const miStorage = window.localStorage
    const [formulario, setFormulario] = useState<Formulario[]>([])
      useEffect(()=>{
        let listadoStr = miStorage.getItem("formulario")
        if(listadoStr != null){
            let listado = JSON.parse(listadoStr)
            setFormulario(listado)
        }
    },[])
    const Editar = (index:number) => {
        alert("le diste a"+index )
        props.traerformulario(formulario[index])
    }
  return (
    <>
    <h1>{props.vista}</h1>
      <table>
        <thead>
          <tr>
            <th>Nombre </th>
            <th>rut </th>
            <th>accion </th>
          </tr>
        </thead>
        <tbody>
          {formulario.map((f,index)=>{
            return(
              <tr key={index}>
                <td>{f.nombre}</td>
                <td>{f.rut}</td>
                <td><button 
                  onClick={()=>Editar(index)}>Editar</button><button>eliminar</button></td>
              </tr>
              )
            })}
        </tbody>
      </table>
    </>     


  )
}
export default MostrarDatos