import { useState } from 'react'

import { useAuthStore } from '../../stores'

import { getMetricasDatosInvalidosJefeZonal, getMetricasDependenciaJefeZonal, getMetricasOperadorJefeZonal, getMetricasResumenJefeZonal } from '../services'
import { MetricaDatoInvalidoJZInternal, MetricaDependenciaJZ, MetricaOperadorJZInternal, MetricaResumenJZ } from '../../models'
import { adaptMetricaDatosInvalidosJZToInternal, adaptMetricaOperadorJZ } from '../../adapters'

export const useMetricasJZ = () => {
   const { userAuth: { idJefatura } } = useAuthStore()

   const [resumenJZ, setResumenJZ] = useState<MetricaResumenJZ[]>([])
   const [operadorJZ, setOperadorJZ] = useState<MetricaOperadorJZInternal[]>([])
   const [dependenciaJZ, setDependenciaJZ] = useState<MetricaDependenciaJZ[]>([])
   const [datosInvalidosJZ, setDatosInvalidosJZ] = useState<MetricaDatoInvalidoJZInternal[]>([])

   const callGetMetricasResumenJefeZonal = () => { // Llama al api resumen JZ
      getMetricasResumenJefeZonal(idJefatura).then(mt => { setResumenJZ(mt) })
   }

   const callGetMetricasOperadorJefeZonal = () => { // Llama a api operador JZ
      getMetricasOperadorJefeZonal(1, idJefatura).then(mt => setOperadorJZ(adaptMetricaOperadorJZ(mt)))
   }

   const callGetMetricasDependenciaJefeZonal = () => { // Call api idJefatura JZ
      getMetricasDependenciaJefeZonal(1, idJefatura).then(mt => setDependenciaJZ(mt))
   }

   const callGetMetricasDatosInvalidosJefeZonal = () => { // Llamada api datos invalidos JZ
      getMetricasDatosInvalidosJefeZonal(1, idJefatura).then(mt => setDatosInvalidosJZ(adaptMetricaDatosInvalidosJZToInternal(mt)))
   }

   return {
      metricasResumenJZ: resumenJZ,
      metricasOperadorJZ: operadorJZ,
      metricasDependenciaJZ: dependenciaJZ,
      metricasDatosInvalidosJZ: datosInvalidosJZ,

      callGetMetricasResumenJefeZonal,
      callGetMetricasOperadorJefeZonal,
      callGetMetricasDependenciaJefeZonal,
      callGetMetricasDatosInvalidosJefeZonal
   }
}
