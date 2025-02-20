import { lazy, ReactElement } from 'react'

import { pages as namePages } from '../consts'

// ► Pages
const ReglasConsistenciaPage = lazy(() => import('../business/reglas-consistencia/ReglasConsistenciaPage'))
const MonitoreoCalidadDatoPage = lazy(() => import('../business/monitoreo-calidad-datos/pages/MonitoreoCalidadDatoPage'))

// ► Subpag
const ControlMigratorioSubpag = lazy(() => import('../business/control-migratorio/pages/ControlMigratorioSubpag'))
const AlertasSubpag = lazy(() => import('../business/alertas/AlertasSubpag'))
const TramitesInmigracionSubpag = lazy(() => import('../business/inmigracion/TramitesInmigracionSubpag'))
const NacionalizacionSubpag = lazy(() => import('../business/nacionalizacion/NacionalizacionSubpag'))
const EmisionDocViaje = lazy(() => import('../business/emision-doc-viaje/EmisionDocViaje'))
const MonitoreoControlMigratorioJZSubPag = lazy(() => import('../business/monitoreo-control-migratorio/pages/MonitoreoControlMigratorioJZSubPag'))
const ControlAsignacionSubpag = lazy(() => import('../business/modulo-unificacion/pages/ControlAsignacionSubpag'))
const AuditoriaRegistrosSubpag = lazy(() => import('../business/modulo-unificacion/pages/AuditoriaRegistrosSubpag'))

const { PAG, SUB_PAG } = namePages

const {
   REGLAS_CONSISTENCIA,
   SEGUIMIENTO_CALIDAD_DATOS
} = PAG

const {
   CONTROL_MIGRATORIO,
   TRAMITE_INMIGRACION,
   NACIONALIZACION,
   EMISION_DOC_VIAJE,
   ALERTAS,
   SEGUIMIENTO_CALIDAD_CONTROL_MIGRATORIO,
   CONTROL_ASIGNACIONES,
   AUDITORIA_REGISTROS
} = SUB_PAG

type PageComponent = {
   [key: string]: ReactElement
}

export const pages: PageComponent = {
   // ► Pages:
   [REGLAS_CONSISTENCIA]: <ReglasConsistenciaPage />,
   [SEGUIMIENTO_CALIDAD_DATOS]: <MonitoreoCalidadDatoPage />,

   // ► Subpag:
   [ALERTAS]: <AlertasSubpag />,
   [CONTROL_MIGRATORIO]: <ControlMigratorioSubpag />,
   [TRAMITE_INMIGRACION]: <TramitesInmigracionSubpag />,
   [NACIONALIZACION]: <NacionalizacionSubpag />,
   [EMISION_DOC_VIAJE]: <EmisionDocViaje />,
   [SEGUIMIENTO_CALIDAD_CONTROL_MIGRATORIO]: <MonitoreoControlMigratorioJZSubPag />,
   [CONTROL_ASIGNACIONES]: <ControlAsignacionSubpag />,
   [AUDITORIA_REGISTROS]: <AuditoriaRegistrosSubpag />
}
