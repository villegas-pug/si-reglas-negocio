import { create } from 'zustand'
import { Dimension } from '../../models'
import { findAllRNDimension } from '../../services'

type State = {
   dimensionDb: Dimension[]
}

type Action = {
   findAllRNDimension: () => Promise<void>
}

export const useDimensionStore = create<State & Action>((set) => ({
   dimensionDb: [],
   findAllRNDimension: async () => {
      const dimensionDb = await findAllRNDimension()
      set({ dimensionDb })
   }
}))
