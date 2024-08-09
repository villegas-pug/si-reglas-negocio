import { lazy, ReactElement } from 'react'

import { pages as namePages } from '../consts'

// ► Pages
const ReglasConsistenciaPage = lazy(() => import('../pages/ReglasConsistenciaPage'))
const ControlHallazgosPage = lazy(() => import('../pages/ControlHallazgosPage'))

// ► Subpag
const ControlMigratorioSubpag = lazy(() => import('../pages/subpag/ControlMigratorioSubpag'))
const AlertasSubpag = lazy(() => import('../pages/subpag/AlertasSubpag'))
const TramitesInmigracionSubpag = lazy(() => import('../pages/subpag/TramitesInmigracionSubpag'))

const { PAG, SUB_PAG } = namePages

const {
   REGLAS_CONSISTENCIA,
   CONTROL_REGISTROS_INCONSISTENTES
} = PAG

const {
   ALERTAS,
   CONTROL_MIGRATORIO,
   TRAMITE_INMIGRACION
} = SUB_PAG

type PageComponent = {
   [key: string]: ReactElement
}

export const pages: PageComponent = {
   // ► Pages:
   [REGLAS_CONSISTENCIA]: <ReglasConsistenciaPage />,
   [CONTROL_REGISTROS_INCONSISTENTES]: <ControlHallazgosPage />,

   // ► Subpag:
   [ALERTAS]: <AlertasSubpag />,
   [CONTROL_MIGRATORIO]: <ControlMigratorioSubpag />,
   [TRAMITE_INMIGRACION]: <TramitesInmigracionSubpag />
}
