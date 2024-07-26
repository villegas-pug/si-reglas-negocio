import { FC } from 'react'

import { FloatButton } from 'antd'
import { LogoutOutlined, HomeOutlined } from '@ant-design/icons'

import { useAuthStore } from '../stores/auth'
import { useNavigate } from 'react-router-dom'
import { PRIVATE, PUBLIC } from '../config/paths'

export const LogoutButton: FC = () => {
   const navigate = useNavigate()

   const { logout } = useAuthStore()

   const handleLogout = () => {
      logout()
      navigate(PUBLIC)
   }

   return (
      <FloatButton.Group shape='circle' style={{ top: 20, left: 40 }}>
         <FloatButton
            tooltip='Ir a inicio'
            icon={<HomeOutlined />}
            onClick={ () => navigate(PRIVATE) }
         />

         <FloatButton
            tooltip='Salir'
            icon={<LogoutOutlined />}
            onClick={ handleLogout }
         />
      </FloatButton.Group>
   )
}
