import { ReactElement } from 'react'

import { ControlMigratorioPage } from '../pages/ControlMigratorioPage'

import { ALERTAS, CITAS, CONTROL_MIGRATORIO, PASAPORTES, TRAMITE_INMIGRACION, TRAMITE_NACIONALIZACION } from './paths'

import { TramitesInmigracionPage } from '../pages/TramitesInmigracionPage'
import { TramitesNacionalizacionPage } from '../pages/TramitesNacionalizacionPage'
import { CitasPage } from '../pages/CitasPage'
import { AlertasPage } from '../pages/AlertasPage'
import { PasaportesPage } from '../pages/PasaportesPage'

type Page = {
   [key: string]: ReactElement
}

export const pages: Page = {
   [CONTROL_MIGRATORIO]: <ControlMigratorioPage />,
   [TRAMITE_INMIGRACION]: <TramitesInmigracionPage />,
   [TRAMITE_NACIONALIZACION]: <TramitesNacionalizacionPage />,
   [CITAS]: <CitasPage />,
   [ALERTAS]: <AlertasPage />,
   [PASAPORTES]: <PasaportesPage />
}
