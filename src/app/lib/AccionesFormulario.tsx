import { addDoc, collection, getDocs, Timestamp } from "firebase/firestore";
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
        id : doc.data().id
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