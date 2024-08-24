import { MetricaDatoInvalidoJZ, MetricaDatoInvalidoJZInternal } from '../models'

/* export const adaptMetricaDatosInvalidosJZToInternal = (metricas: MetricaDatoInvalidoJZ[]) => {
   // RC0002;[sIdDocumento]|RN0005;[sIdPaisMov]

   // 1
   const rnMap: { [key: string]: number } = {}
   metricas.forEach(mt => {
      mt.camposErrCsv.split('|')
         .forEach(rn => {
            const [key] = rn.split(';')
            rnMap[key] = (rnMap[key] ?? 0) + mt.total
         })
   })

   // 2
   let metricasInternal: MetricaDatoInvalidoJZInternal[] = []
   metricasInternal = Object.entries(rnMap).map(([regla, total]) => {
      return {
         regla,
         total
      }
   })

   return metricasInternal
} */

export const adaptMetricaDatosInvalidosJZToInternal = (metricas: MetricaDatoInvalidoJZ[]) => {
   // RC0002;[sIdDocumento]|RN0005;[sIdPaisMov]

   // 1
   const rnMap: { [key: string]: number } = {}
   metricas.forEach(mt => {
      mt.camposErrCsv.split('|')
         .forEach(rn => {
            const [, fields] = rn.split(';')
            fields.split(',').forEach(f => {
               rnMap[f] = (rnMap[f] ?? 0) + mt.total
            })
         })
   })

   // 2
   let metricasInternal: MetricaDatoInvalidoJZInternal[] = []
   metricasInternal = Object.entries(rnMap).map(([campo, total]) => {
      return {
         campo: campo.replace(/\[|\]/g, '').trim().slice(1),
         total
      }
   }).sort((a, b) => a.total > b.total ? -1 : 1).slice(0, 10)

   return metricasInternal
}
