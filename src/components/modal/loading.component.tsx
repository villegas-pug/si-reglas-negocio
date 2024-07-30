import { createPortal } from 'react-dom'
import { Spin } from 'antd'
import { useApiStatusStore } from '../../stores'

export const ModalLoading = () => {
   const { isLoading } = useApiStatusStore()
   const container = document.getElementById('modal-loading')

   return (
      createPortal(

         <Spin
            size='large'
            spinning={ isLoading }
            fullscreen
         />,
         container || document.body
      )
   )
}
