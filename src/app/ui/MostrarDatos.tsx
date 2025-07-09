import { ChangeEvent } from "react"
import { Formulario } from "../interfaces/Formulario"

interface Props{
  eventos: Formulario[]
  setEventos: (React.Dispatch<React.SetStateAction<Formulario[]>>)
}

export const MostrarDatos = ({ eventos, setEventos } : Props) => {

  function eliminarDeLaLista(eventoId: number) {
    setEventos(prevEventos =>
      prevEventos.filter(evento => evento.id !== eventoId)
    )
  }

  function handleChange(id: number, evento: ChangeEvent<HTMLInputElement|HTMLSelectElement>) {
    const nombreCampo = evento.target.name
    const valor = evento.target.type === 'number' ? parseInt(evento.target.value) : evento.target.value
    const eventosActualizados = eventos.map(evento =>
      evento.id === id ? { ...evento, [nombreCampo]: valor } : evento
    )
    setEventos(eventosActualizados)
  }
  
  let elementosEventos = eventos.map((evento, i) =>
    <tr key={i}>
      <td><input type="text" value={evento.nombre} onChange={(e) => handleChange(evento.id, e)}/></td>
      <td><input type="number" value={evento.participantes} onChange={(e) => handleChange(evento.id, e)}/></td>
      <td><input type="text" value={evento.descripcion} onChange={(e) => handleChange(evento.id, e)}/></td>
      <td>
        <select name="opcion" value={evento.tipo} onChange={(e) => handleChange(evento.id, e)}>
        <option value="conference" className="text-neutral-900">Conferencia</option>
        <option value="workshop" className="text-neutral-900">Taller</option>
        <option value="party" className="text-neutral-900">Fiesta</option>
        <option value="meeting" className="text-neutral-900">Reunión</option>
        </select>
      </td>
      <td><input type="date" value={evento.fecha} onChange={(e) => handleChange(evento.id, e)}/></td>
      <td><button onClick={() => eliminarDeLaLista(evento.id)}>Borrar</button></td>
    </tr>
  )
  
  
  return (
    <>
      <table>
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