export interface AsyncIterable {
  name: string
  method: (...args: any[]) => Promise<unknown>
}

export type StatusOfProcessed = {
   callsToExecute: number,
   callsExecuted: number,
   callsErr: { calls: string[], total: number },
   processing: boolean
}
