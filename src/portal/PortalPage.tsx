import {
   Row,
   Col,
   Flex,
   Input,
   Button,
   Form,
   Typography
} from 'antd'
import { UserOutlined } from '@ant-design/icons'

import { useAuthStore } from '../stores/auth'
import { Usuario } from '../models'
import { Fade } from 'react-awesome-reveal'
import { useApiStatusStore } from '../stores'

import bgPortal from '../assets/bg-portal-v1.jpg'

const { Title } = Typography

export const Login = () => {
   const { login } = useAuthStore()
   const { isLoading } = useApiStatusStore()

   const onFinish = async (user: Usuario) => {
      login(user)
   }

   return (
      <Fade delay={ 500 } duration={ 1500 }>
         <Row style={{ height: '100vh' }}>
            <Col
               span={ 18 }
               style={{
                  background: `url(${bgPortal})`,
                  backgroundSize: 'cover',
                  clipPath: 'polygon(0 0%, 100% 0, 96% 100%, 0% 100%)'
               }}
            >
               <Flex
                  vertical
                  align='flex-end'
                  justify='flex-end'
                  style={{ height: '100%', marginRight: '8em' }}
               >
                  <Title
                     level={1}
                     color='#fff'
                     style={{
                        color: '#fff',
                        fontFamily: 'Playwrite IS, cursive',
                        fontWeight: 400
                     }}
                  >
                     Sistema de Gestión de Calidad de Datos
                  </Title>
                  <Title
                     level={3}
                     style={{
                        color: '#fff',
                        fontFamily: 'Playwrite IS, cursive',
                        fontWeight: 400
                     }}
                  >
                  Subdirección de Registro de Información Migratoria - Superintendencia Nacional de Migraciones
                  </Title>
               </Flex>
            </Col>
            <Col
               span={6}
               style={{
                  clipPath: 'polygon(10% 0, 100% 0, 100% 100%, 0% 100%)'
               }}
            >
               <Flex
                  justify='center'
                  align='center'
                  style={{
                     height: '100%',
                     /* backgroundColor: '#EAEAEA' */
                     background: 'linear-gradient(45deg, #0172bb 0, #010a5f 100%)'
                  }}
               >
                  <Form
                     onFinish={onFinish}
                     style={{ width: 300 }}
                  >
                     <Form.Item
                        name='login'
                        rules={[{ required: true, message: '¡Ingresar usuario!' }]}
                     >
                        <Input size='large' suffix={<UserOutlined />} placeholder='Usuario' autoFocus />
                     </Form.Item>
                     <Form.Item
                        name='password'
                        rules={[{ required: true, message: '¡Ingresar contraseña!' }]}
                     >
                        <Input.Password size='large' placeholder='Contraseña' />
                     </Form.Item>
                     <Button
                        block
                        type='primary'
                        size='large'
                        prefix='a'
                        htmlType='submit'
                        loading={ isLoading }
                        disabled={ isLoading }
                     >
                        Ingresar
                     </Button>
                  </Form>
               </Flex>
            </Col>
         </Row>
      </Fade>
   )
}
