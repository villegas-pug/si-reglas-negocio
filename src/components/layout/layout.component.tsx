import { FC, ReactElement, useMemo, useState } from 'react'

import { useNavigate } from 'react-router-dom'
import type { MenuProps } from 'antd'
import { Breadcrumb, Layout, Menu, theme } from 'antd'

import { icons } from '../../consts'
import { Procedimiento } from '../../interfaces'
import { useAuthComponents } from '../../hooks'
import { useAuthStore } from '../../stores'

const { Header, Content, Footer, Sider } = Layout

type MenuItem = Required<MenuProps>['items'][number];

const getLayoutItems = (authPags: Procedimiento[]): MenuItem[] => {
   const pags = authPags.filter(({ tipo }) => tipo === 'PAG')
   const subPags = authPags.filter(({ tipo }) => tipo !== 'DYNAMIC_COMPONENT')

   const items: MenuItem[] = pags.map(({ idProcedimiento, nombre, icono, rutaPag }) => {
      return {
         key: idProcedimiento,
         label: nombre,
         icon: icons[icono],
         children: subPags
            .filter(subPag => subPag.rutaPag === rutaPag)
            .map((subPag) => {
               return {
                  key: subPag.idProcedimiento,
                  label: subPag.tipo === 'PAG' ? 'Principal' : subPag.nombre,
                  icon: subPag.tipo === 'PAG' ? icons.FaHome : icons[subPag.icono]
               }
            })
      }
   })

   return items
}

type Props = {
   children: ReactElement | ReactElement[]
}

export const LayoutApp: FC<Props> = ({ children }) => {
   const [collapsed, setCollapsed] = useState(true)
   const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken()

   const navigate = useNavigate()
   const { userAuth } = useAuthStore()
   const { authPag } = useAuthComponents()

   const getPathByIdProcedimiento = useMemo(() => (key: number) => {
      return authPag.find(pag => pag.idProcedimiento === key)?.rutaPrincipal || '/'
   }, [authPag])

   return (
      <Layout style={{ height: '100vh' }}>
         <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
            width={ 270 }
         >
            <div style={{ marginTop: 20 }} />
            <Menu
               theme='dark'
               defaultSelectedKeys={['1']}
               mode='inline'
               items={getLayoutItems(authPag)}
               onClick={({ key }) => { navigate(getPathByIdProcedimiento(+key)) }}
            />
         </Sider>
         <Layout>
            <Header style={{ padding: 0, background: colorBgContainer, height: 5 }} />
            <Content style={{ margin: '0 16px' }}>
               <Breadcrumb style={{ margin: '16px 0' }}>
                  <Breadcrumb.Item>Usuario</Breadcrumb.Item>
                  <Breadcrumb.Item>{ userAuth?.nombres }</Breadcrumb.Item>
               </Breadcrumb>
               <div
                  style={{
                     padding: 24,
                     minHeight: 360,
                     background: colorBgContainer,
                     borderRadius: borderRadiusLG,
                     overflow: 'auto'
                  }}
               >
                  { children }
               </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
               Sistema de Reglas de Consistencia de Datos ©{new Date().getFullYear()} Creado por Subdirección de Registro de Información Migratoria
            </Footer>
         </Layout>
      </Layout>
   )
}
