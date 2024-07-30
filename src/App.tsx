import { ConfigProvider } from 'antd'
import esES from 'antd/locale/es_ES'

import { AppRoutes } from './rutes/AppRoutes'
import { Toaster } from './components'

import { ApiStatusInterceptor, RequestTokenInterceptor } from './interceptors'
import { theme } from './config'

import './global.css'

ApiStatusInterceptor()
RequestTokenInterceptor()

function App () {
   return (
      <ConfigProvider locale={esES} theme={ theme }>
         <AppRoutes />
         <Toaster />
      </ConfigProvider>
   )
}

export default App
