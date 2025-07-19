import { addDoc, collection, deleteDoc, doc, getDocs, Timestamp } from "firebase/firestore";
import { db } from "./Conexion";
import { Formulario, NuevoRegistro } from "../interfaces/Formulario";

export async function obtenerFormularios() {
    const querySnapshot = await getDocs(collection(db, "Formularios"));
    let listado:Formulario[] = []
    querySnapshot.forEach((doc) => {
      let Formulario:Formulario = {
        nombre : doc.data().nombre,
        participantes :doc.data().participantes,
        descripcion : doc.data().descripcion,
        tipo : doc.data().tipo,
        fecha : timestampToInputDate(doc.data().fecha),
        id : doc.id
      }
      listado.push(Formulario)
      console.log(doc.id, " => ", doc.data())
    });
    return listado
}

function timestampToInputDate(timestamp: Timestamp): string {
    return timestamp.toDate()
                    .toISOString()
                    .split("T")[0]
}

export async function registrarFormulario(evento:NuevoRegistro): Promise<Formulario> {
    const docRef = await addDoc(collection(db, "Formularios"), evento)
    return {...evento, id: docRef.id, fecha: timestampToInputDate(evento.fecha)}
}

export async function eliminarRegistro(id:string) {
  try {
    await deleteDoc(doc(db, "Formularios", id))
  } catch (error) {
    console.error("Error al eliminar: ", error)
  }
}
