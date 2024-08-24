import { useEffect, useMemo, useState } from 'react'
import { useAuthStore } from '../stores'
import { HallazgoControlMigratorioInternal } from '../models'
import { findAllHallazgosByPaginacion } from '../services'
import { adaptHallazgoControlMigratorioToInternal } from '../adapters'

export const useControlHallazgos = () => {
   const { userAuth: { idJefatura } } = useAuthStore()

   const [hallazgosControlMigratorio, setHallazgosControlMigratorio] = useState<HallazgoControlMigratorioInternal[]>([])

   useEffect(() => {
      if (!idJefatura) return
      findHallazgosByPaginacion(1, 20)
   }, [])

   const findHallazgosByPaginacion = async (currentPage: number, recordsByPages: number) => {
      const hallazgos = await findAllHallazgosByPaginacion({
         idJefatura,
         currentPage,
         recordsByPages
      })

      setHallazgosControlMigratorio(adaptHallazgoControlMigratorioToInternal(hallazgos))
   }

   const totalHallazgosControlMigratorio = useMemo(() => hallazgosControlMigratorio[0]?.nTotalRows || 0, [hallazgosControlMigratorio])

   return {
      hallazgosControlMigratorio,
      totalHallazgosControlMigratorio,
      findHallazgosByPaginacion
   }
}
