import { create } from 'zustand'
import { filtroSeguimientoCalidadCMSlice, type FiltroState } from './filtro-slice.context'

export const useSeguimientoCalidadCMContext = create<FiltroState>()((...rest) => ({
   ...filtroSeguimientoCalidadCMSlice(...rest)
}))
