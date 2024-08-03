import { FC, ReactElement } from 'react'

import { Modal } from 'antd'

type Props = {
   title: string
   isOpen: boolean
   setIsOpen: (open: boolean) => void
   children: ReactElement | string
}

export const CustomModal: FC<Props> = ({ title, isOpen, setIsOpen, children }) => {
   return (
      <Modal
         title={ title }
         open={ isOpen }
         width={ 'fit-content' }
         footer={ <></> }
         onCancel={() => setIsOpen(false) }
      >
         { children }
      </Modal>
   )
}
