import { useState } from 'react'

import { LocalStorageKey } from '../type'

export const useLocalStorage = (key: LocalStorageKey) => {
   const [value, setValue] = useState(() => {
      try {
         return JSON.parse(localStorage.getItem(key) || '')
      } catch (err) {
         return false
      }
   })

   const setLocalStorage = (key: LocalStorageKey, item: any) => {
      localStorage.setItem(key, JSON.stringify(localStorage.getItem(item)))
      setValue(item)
   }

   const getLocalStorage = (key: LocalStorageKey) => {
      let item
      try {
         item = JSON.parse(localStorage.getItem(key) || '')
      } catch (err) {
         item = undefined
      }

      setValue(item)
   }

   return {
      setLocalStorage,
      getLocalStorage,
      value
   }
}
