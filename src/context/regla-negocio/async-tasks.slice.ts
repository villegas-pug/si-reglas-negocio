import { StateCreator } from 'zustand'
import { AsyncIterable } from '../../interfaces'

type State = {
 asyncTasks: AsyncIterable[]
}

type Action = {
  addToAsyncTasks: (task: AsyncIterable[]) => void
}

export type AsyncTasksState = State & Action

export const asyncTasksSlice: StateCreator<State & Action> = (set) => ({

   asyncTasks: [],
   addToAsyncTasks: (tasks) => set({ asyncTasks: tasks })

})
