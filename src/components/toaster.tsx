import { FC, useEffect } from 'react'

import { message } from 'antd'

import { useNotifyStore } from '../stores'

export const Toaster: FC = () => {
   const [messageApi, contextHolder] = message.useMessage()

   const { isLoading, type, message: content } = useNotifyStore()

   useEffect(() => {
      if (!isLoading && content) {
         messageApi.open({
            type,
            content
         })
      }
   }, [isLoading, content])

   return (
      <>
         {
            contextHolder
         }
      </>
   )
}
