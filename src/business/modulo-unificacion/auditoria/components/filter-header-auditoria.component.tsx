import { FC } from 'react'

import { Form, DatePicker } from 'antd'
import { useAuditoriaAsignacionContext } from '../context'
import dayjs, { Dayjs } from 'dayjs'

export const FilterHeaderAuditoria: FC = () => {
   /* const submitRef = useRef<HTMLButtonElement>({} as HTMLButtonElement) */

   const { fechaAsignacionFilter, setFechaAsignacionFilter, findAllAssigsOfCurrentUserByParams } = useAuditoriaAsignacionContext()

   /* const onFinish: FormProps<FilterAuditoriaConfig>['onFinish'] = async ({ fechaAsignacion }) => {
      setFechaAsignacionFilter(fechaAsignacion)
   } */

   const handleChangeFechaAsignacion = (date: Dayjs) => {
      const fechaAsignacion = date.toDate()
      setFechaAsignacionFilter(fechaAsignacion)
      findAllAssigsOfCurrentUserByParams({ idTipoAsignacion: 1 })
   }

   return (
      <Form layout='horizontal'>

         <Form.Item
            name='fechaAsignacion'
            label='Busqueda fecha asignación'
            initialValue={dayjs(fechaAsignacionFilter)}
         >
            <DatePicker
               size='large'
               style={{ width: 200 }}
               onChange={ handleChangeFechaAsignacion }
            />

         </Form.Item>

         {/* <button type='submit' ref={ submitRef } hidden /> */}
      </Form>
   )
}
