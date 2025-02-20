export interface Asignacion {
   idAsignacion: number;
   sIdPaisNacionalidad: string;
   dFechaNacimiento: Date;
   dFechaAsignacion: Date;
   sSexo: string;
   sPaterno: string;
   sNombre: string;
   sMaterno: string;
   nidJustifica: number | null;
   nidEstado: number;
   nobservacion: null | string;
   btrabajado: boolean
}

export interface AsignacionNormalize {
   'Id Asignacion': number;
   'Id PaisNacionalidad': string;
   'Fecha Nacimiento': Date;
   'Fecha Asignacion': Date;
   'Sexo': string;
   'Paterno': string;
   'Nombre': string;
   'Materno': string;
   'Observacion': null | string;
}
