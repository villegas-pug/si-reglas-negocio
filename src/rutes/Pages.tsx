import { lazy, ReactElement } from 'react'

import { pages as namePages } from '../consts'

// ► Pages
const ReglasConsistenciaPage = lazy(() => import('../pages/ReglasConsistenciaPage'))
const SeguimientoCalidadDatoPage = lazy(() => import('../pages/SeguimientoCalidadDatoPage'))

// ► Subpag
const ControlMigratorioSubpag = lazy(() => import('../pages/ControlMigratorioSubpag'))
const AlertasSubpag = lazy(() => import('../pages/AlertasSubpag'))
const TramitesInmigracionSubpag = lazy(() => import('../pages/TramitesInmigracionSubpag'))
const NacionalizacionSubpag = lazy(() => import('../pages/NacionalizacionSubpag'))
const EmisionDocViaje = lazy(() => import('../pages/EmisionDocViaje'))
const SeguimientoCalidadControlMigratorioSubpag = lazy(() => import('../pages/seguimiento-calidad-control-migratorio/SeguimientoCalidadControlMigratorioSubpag'))

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
   SEGUIMIENTO_CALIDAD_CONTROL_MIGRATORIO
} = SUB_PAG

type PageComponent = {
   [key: string]: ReactElement
}

export const pages: PageComponent = {
   // ► Pages:
   [REGLAS_CONSISTENCIA]: <ReglasConsistenciaPage />,
   [SEGUIMIENTO_CALIDAD_DATOS]: <SeguimientoCalidadDatoPage />,

   // ► Subpag:
   [ALERTAS]: <AlertasSubpag />,
   [CONTROL_MIGRATORIO]: <ControlMigratorioSubpag />,
   [TRAMITE_INMIGRACION]: <TramitesInmigracionSubpag />,
   [NACIONALIZACION]: <NacionalizacionSubpag />,
   [EMISION_DOC_VIAJE]: <EmisionDocViaje />,
   [SEGUIMIENTO_CALIDAD_CONTROL_MIGRATORIO]: <SeguimientoCalidadControlMigratorioSubpag />
}
