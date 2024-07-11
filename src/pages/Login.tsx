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

import { useAuth } from '../store'
import { User } from '../interfaces'
import { Fade } from '@mui/material'

const { Title } = Typography

export const Login = () => {
   const login = useAuth(state => state.login)

   const onFinish = async (user: User) => {
      login(user)
   }

   return (
      <Fade in timeout={ 1000 }>
         <Row style={{ height: '100vh' }}>
            <Col
               span={ 18 }
               style={{
                  background: 'linear-gradient(45deg, #010a5f 0, #0172bb 100%)',
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
                  Reglas de Negocio y Calidad de Datos
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
                  style={{ height: '100%', backgroundColor: '#EAEAEA' }}
               >
                  <Form onFinish={ onFinish }>
                     <Form.Item
                        name='user'
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
                     >Ingresar</Button>
                  </Form>
               </Flex>
            </Col>
         </Row>
      </Fade>
   )
}
