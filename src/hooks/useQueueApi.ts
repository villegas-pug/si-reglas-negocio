import { useRef, useState } from 'react'
import { AsyncIterable, StatusOfProcessed } from '../interfaces'
import { sleep } from '../helpers'
/* import { sleep } from '../helpers' */

const initialQueueStatus: StatusOfProcessed = {
   callsToExecute: 0,
   callsExecuted: 0,
   callsErr: { calls: [], total: 0 },
   processing: false
}

export const useQueueApi = () => {
   const queueRef = useRef<AsyncIterable[]>([])
   const [isPauseQueueApi, setIsPauseQueueApi] = useState(false)

   const [notyQueueApiStatus, setNotyQueueApiStatus] = useState<StatusOfProcessed>(initialQueueStatus)

   const addToQueueApi = (calls: AsyncIterable[] = []) => {
      setNotyQueueApiStatus(initialQueueStatus)
      if (calls.length === 0) return
      queueRef.current = calls
      processQueueApi()
   }

   const processQueueApi = async () => {
      setNotyQueueApiStatus((prevStatus) => {
         return {
            ...prevStatus,
            callsToExecute: queueRef.current.length,
            processing: true
         }
      })

      for await (const api of queueRef.current) {
         await sleep(isPauseQueueApi ? (60 * 5) : 0) // Pausa hasta 5 min ...
         setIsPauseQueueApi(false)
         try {
            await api.method()
            setNotyQueueApiStatus((prevStatus) => {
               return {
                  ...prevStatus,
                  callsExecuted: prevStatus.callsExecuted + 1
               }
            })
         } catch {
            setNotyQueueApiStatus((prevStatus) => {
               return {
                  ...prevStatus,
                  callsErr: {
                     total: prevStatus.callsErr.total + 1,
                     calls: prevStatus.callsErr.calls.concat(api.name)
                  }
               }
            })
         }
      }

      setNotyQueueApiStatus((prevStatus) => {
         return {
            ...prevStatus,
            processing: false
         }
      })
   }

   const toggleQueueApi = (isPaused: boolean) => {
      setIsPauseQueueApi(isPaused)
   }

   return {
      isPauseQueueApi,
      notyQueueApiStatus,
      addToQueueApi,
      toggleQueueApi
   }
}
