import './global.css'

import { Toaster } from 'react-hot-toast'

import { DashboardRoute } from './rutes/DashboardRoute'

import { ConfigProvider } from 'antd'
import esES from 'antd/locale/es_ES'

function App () {
   return (
      <ConfigProvider locale={ esES }>
         <DashboardRoute />
         <Toaster
            position='bottom-center'
            gutter={ 8 }
            toastOptions={{
               duration: 5000
            }}
         />
      </ConfigProvider>
   )
}

export default App
