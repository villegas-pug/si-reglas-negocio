import { pages } from '../consts'
import reglasNegocioDb from '../db/reglas-negocio.json'

const { SUB_PAG } = pages

export const useReglasNegocio = () => {
   const procesosNegocio = reglasNegocioDb['Procesos Negocio']
   const controlMigratorio = reglasNegocioDb['Control Migratorio']
   const tramitesInmigracion = reglasNegocioDb['Trámites Inmigración']

   const totalCorrectosControlMigratorio = procesosNegocio.find((proceso) => proceso.procesoNegocio === SUB_PAG.CONTROL_MIGRATORIO)?.totalRegCorrectos
   const totalIncorrectosControlMigratorio = controlMigratorio.reduce((acc, { totalRegIncorrectos }) => (acc += totalRegIncorrectos), 0)
   const totalCorrectosTramitesInmigracion = procesosNegocio.find((proceso) => proceso.procesoNegocio === SUB_PAG.TRAMITE_INMIGRACION)?.totalRegCorrectos
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
