import { RegisterAssignmentDto } from './../../asignacion/interfaces/register-assignment.interface'
import { StateCreator } from 'zustand'

import { Asignacion } from '../../asignacion/models'
import { findAllEstados, findAllTipoJustificaciones, findAssigsByParams } from '../services'
import { EstadoAsignacion, TipoJustificacion } from '../models'
import { useAuthStore } from '../../../../stores'
import { FilterAuditoriaConfig } from '../interfaces'
import { useAuditoriaAsignacionContext } from '.'

type State = {
   asignacionDb: Asignacion[]
   estadoAsignacionDb: EstadoAsignacion[]
   tipoJustificacionDb: TipoJustificacion[]
}

type Action = {
   findAllAssigsOfCurrentUserByParams: (params: Partial<RegisterAssignmentDto>) => Promise<void>
   findAllTipoJustificaciones: () => Promise<void>
   findAllEstados: () => Promise<void>
}

export type AuditoriaSliceState = State & Action

export const auditoriaSlice: StateCreator<AuditoriaSliceState> = (set) => ({
   asignacionDb: [],
   estadoAsignacionDb: [],
   tipoJustificacionDb: [],
   filterAuditoriaConfig: {} as FilterAuditoriaConfig,
   findAllAssigsOfCurrentUserByParams: async (params) => {
      const assigs = await findAssigsByParams({
         ...params,
         idOperador: useAuthStore.getState().userAuth.idOperador,
         fechaAsignacion: useAuditoriaAsignacionContext.getState().fechaAsignacionFilter
      })
      set({ asignacionDb: assigs })
   },
   findAllTipoJustificaciones: async () => {
      const tipoJustificaciones = await findAllTipoJustificaciones()
      set({ tipoJustificacionDb: tipoJustificaciones })
   },
   findAllEstados: async () => {
      const estados = await findAllEstados()
      set({ estadoAsignacionDb: estados })
   }
})
