import { HallazgoControlMigratorio, HallazgoControlMigratorioInternal } from '../models'

export const adaptHallazgoControlMigratorioToInternal = (hallazgos: HallazgoControlMigratorio[]): HallazgoControlMigratorioInternal[] => {
   return hallazgos.map((hallazgo) => ({ key: hallazgo.sIdMovMigratorio, ...hallazgo }))
}
