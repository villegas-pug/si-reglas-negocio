import { FC, ReactElement } from 'react'

import { Modal } from 'antd'

type Props = {
   isModalOpen: boolean
   setIsModalOpen: () => void
   children: ReactElement
}

export const CustomModal: FC<Props> = ({ isModalOpen, setIsModalOpen, children }) => {
   return (
      <Modal title='Editor-SQL' width={620} open={isModalOpen} onOk={setIsModalOpen} onCancel={setIsModalOpen}>
         { children }
      </Modal>
   )
}
