import { FC, ReactElement } from 'react'

import { Divider, Modal } from 'antd'

type Props = {
   title: string
   isOpen: boolean
   handleIsOpen: (open: boolean) => void
   maskClosable?: boolean
   children: ReactElement | string
}

export const CustomModal: FC<Props> = ({ title, isOpen, maskClosable = true, handleIsOpen, children }) => {
   if (!isOpen) return <></>
   return (
      <Modal
         title={
            <Divider>{ title }</Divider>
         }
         open={ isOpen }
         width={ 'fit-content' }
         footer={<></>}
         maskClosable={ maskClosable }
         onCancel={() => handleIsOpen(false)}
      >
         { children }
      </Modal>
   )
}
