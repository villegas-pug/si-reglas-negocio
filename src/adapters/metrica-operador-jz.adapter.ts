import { MetricaOperadorJZ, MetricaOperadorJZInternal } from '../business/monitoreo-calidad-datos/models'

export const adaptMetricaOperadorJZ = (metricaOperadorJZ: MetricaOperadorJZ[]): MetricaOperadorJZInternal[] => {
   const metricaOperadorJZMap = metricaOperadorJZ.reduce((map, mt) => {
      map[mt.loginOpeDigita] = { ...map[mt.loginOpeDigita], loginOpeDigita: mt.loginOpeDigita, [`${mt.tabla[0].toLowerCase()}${mt.tabla.slice(1)}`]: mt.total }
      return map
   }, {} as { [key: string]: {} })

   const internal = Object.entries(metricaOperadorJZMap)
      .map(([, value]) => value as MetricaOperadorJZInternal)
      .sort((a, b) => (a.simMovMigra + a.simPersona) > (b.simMovMigra + b.simPersona) ? -1 : 1)
      .slice(0, 80)

   return internal
}
