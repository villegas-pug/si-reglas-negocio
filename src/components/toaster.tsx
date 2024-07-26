import { FC, useEffect } from 'react'

import { message } from 'antd'

import { useApiStatus } from '../stores'

export const Toaster: FC = () => {
   const [messageApi, contextHolder] = message.useMessage()

   const { isLoading, type, message: content } = useApiStatus()

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
