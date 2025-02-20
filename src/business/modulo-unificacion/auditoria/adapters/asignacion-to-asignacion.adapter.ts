import { AsignacionNormalize } from './../../asignacion/models/asignacion.model'
import { Asignacion } from '../../asignacion/models'

const KEYS_NORMALIZE: { [key: string]: any } = {
   idAsignacion: 'Id Asignacion',
   sIdPaisNacionalidad: 'Id PaisNacionalidad',
   dFechaNacimiento: 'Fecha Nacimiento',
   dFechaAsignacion: 'Fecha Asignacion',
   sSexo: 'Sexo',
   sPaterno: 'Paterno',
   sNombre: 'Nombre',
   sMaterno: 'Materno',
   nobservacion: 'Observacion'
}

export const adaptNormalizeKeysFromAsignacion = (assig: Asignacion) => {
   const asignacionNormalize: { [key: string]: any } = {} as AsignacionNormalize

   Object.entries(assig).forEach(([key, value]) => {
      const newKey = KEYS_NORMALIZE[key]

      if (newKey) {
         asignacionNormalize[KEYS_NORMALIZE[key]] = value
      }
   })

   return Object.entries(asignacionNormalize)
}
