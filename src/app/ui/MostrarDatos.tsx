import { ChangeEvent } from "react"
import { Formulario, NuevoRegistro } from "../interfaces/Formulario"
import { actualizarFormulario, eliminarRegistro } from "../lib/AccionesFormulario"
import { Timestamp } from "firebase/firestore"

interface Props{
  eventos: Formulario[]
  setEventos: (React.Dispatch<React.SetStateAction<Formulario[]>>)
}

export const MostrarDatos = ({ eventos, setEventos } : Props) => {

  async function eliminarDeLaLista(eventoId: string) {
    await eliminarRegistro(eventoId);
    setEventos(prevEventos =>
      prevEventos.filter(evento => evento.id !== eventoId)
    )
  }

  async function handleChange(id: string, evento: ChangeEvent<HTMLInputElement|HTMLSelectElement>) {
    const nombreCampo = evento.target.name
    const valor = evento.target.type === 'number' ? parseInt(evento.target.value) : evento.target.value
    let eventosActualizados = eventos.map(evento =>
      evento.id === id ? { ...evento, [nombreCampo]: valor } : evento
    )
    setEventos(eventosActualizados)

    let eventoTarget = eventosActualizados.find(evento => evento.id === id)
    if (eventoTarget) await actualizarFormulario(id, eventoTarget)
  }
  
  let elementosEventos = eventos.map((evento, i) =>
    <tr key={i}>
      <td><input name="nombre" type="text" value={evento.nombre} onChange={(e) => handleChange(evento.id, e)}/></td>
      <td><input name="participantes" type="number" value={evento.participantes} onChange={(e) => handleChange(evento.id, e)}/></td>
      <td><input name="descripcion" type="text" value={evento.descripcion} onChange={(e) => handleChange(evento.id, e)}/></td>
      <td>
        <select name="tipo" value={evento.tipo} onChange={(e) => handleChange(evento.id, e)}>
        <option value="conference" className="text-neutral-900">Conferencia</option>
        <option value="workshop" className="text-neutral-900">Taller</option>
        <option value="party" className="text-neutral-900">Fiesta</option>
        <option value="meeting" className="text-neutral-900">Reunión</option>
        </select>
      </td>
      <td><input name="fecha" type="date" value={evento.fecha} onChange={(e) => handleChange(evento.id, e)}/></td>
      <td><button onClick={() => eliminarDeLaLista(evento.id)}
        className="bg-red-500 rounded-md px-3 py-2"
      >Borrar</button></td>
    </tr>
  )
  
  
  return (
    <>
      <table className="w-[90%] mx-auto">
        <thead>
          <tr>
            <td>Nombre de evento</td>
            <td>Número de participantes</td>
            <td>Descripción del evento</td>
            <td>Tipo de evento</td>
            <td>Fecha del evento</td>
          </tr>
        </thead>
        <tbody>
          {elementosEventos}
        </tbody>
      </table>
    </>
  )
}

export default MostrarDatos