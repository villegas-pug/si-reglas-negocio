import { LocalStorageKey } from './../interfaces'
import { useState } from 'react'

export const useLocalStorage = (key: LocalStorageKey) => {
   const [value, setValue] = useState(() => {
      return JSON.parse(localStorage.getItem(key) || '')
   })

   const setLocalStorage = (key: LocalStorageKey, item: any) => {
      localStorage.setItem(key, JSON.stringify(localStorage.getItem(item)))
      setValue(item)
   }

   const getLocalStorage = (key: LocalStorageKey) => {
      setValue(JSON.parse(localStorage.getItem(key) || ''))
   }

   return {
      setLocalStorage,
      getLocalStorage,
      value
   }
}
