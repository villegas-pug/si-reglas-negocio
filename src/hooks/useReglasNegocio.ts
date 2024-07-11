import { CONTROL_MIGRATORIO, TRAMITE_INMIGRACION } from '../consts'
import reglasNegocioDb from '../db/reglas-negocio.json'

export const useReglasNegocio = () => {
   const procesosNegocio = reglasNegocioDb['Procesos Negocio']
   const controlMigratorio = reglasNegocioDb['Control Migratorio']
   const tramitesInmigracion = reglasNegocioDb['Trámites Inmigración']

   const totalCorrectosControlMigratorio = procesosNegocio.find((proceso) => proceso.procesoNegocio === CONTROL_MIGRATORIO)?.totalRegCorrectos
   const totalIncorrectosControlMigratorio = controlMigratorio.reduce((acc, { totalRegIncorrectos }) => (acc += totalRegIncorrectos), 0)
   const totalCorrectosTramitesInmigracion = procesosNegocio.find((proceso) => proceso.procesoNegocio === TRAMITE_INMIGRACION)?.totalRegCorrectos
   const totalIncorrectosTramitesInmigracion = tramitesInmigracion.reduce((acc, { totalRegIncorrectos }) => (acc += totalRegIncorrectos), 0)

   return {
      procesosNegocio,
      controlMigratorio,
      tramitesInmigracion,
      totalCorrectosControlMigratorio,
      totalIncorrectosControlMigratorio,
      totalCorrectosTramitesInmigracion,
      totalIncorrectosTramitesInmigracion
   }
}
