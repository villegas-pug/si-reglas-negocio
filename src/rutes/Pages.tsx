import { lazy, ReactElement } from 'react'

import { pages as namePages } from '../consts'

// ► Pages
const ReglasConsistenciaPage = lazy(() => import('../pages/ReglasConsistenciaPage'))

// ► Subpag
const ControlMigratorioSubpag = lazy(() => import('../pages/ControlMigratorioSubpag'))
const AlertasSubpag = lazy(() => import('../pages/AlertasSubpag'))
const TramitesInmigracionSubpag = lazy(() => import('../pages/TramitesInmigracionSubpag'))

const { PAG, SUB_PAG } = namePages

const {
   REGLAS_CONSISTENCIA
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

   // ► Subpag:
   [ALERTAS]: <AlertasSubpag />,
   [CONTROL_MIGRATORIO]: <ControlMigratorioSubpag />,
   [TRAMITE_INMIGRACION]: <TramitesInmigracionSubpag />
}
