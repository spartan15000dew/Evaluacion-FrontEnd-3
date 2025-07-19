import { Timestamp } from "firebase/firestore"

export interface Formulario{
    nombre : string,
    participantes : number,
    descripcion : string,
    tipo : string,
    fecha : string,
    id: string
}

export interface NuevoRegistro {
    nombre: string,
    participantes: number,
    descripcion: string,
    tipo: string,
    fecha: Timestamp
}

export const defaultNuevoRegistro: NuevoRegistro = {
  nombre: "",
  participantes: 0,
  descripcion: "",
  tipo: "",
  fecha: Timestamp.now()
}
