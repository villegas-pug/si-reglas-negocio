import { EyeOutlined } from '@ant-design/icons'
import { Button, Flex, Tag } from 'antd'
import { HallazgoControlMigratorio } from '../../models'
export const renderTagHallazgo = (currentField: string, record: HallazgoControlMigratorio, showSentenciaSql: (idRn: string) => void) => {
   // sCamposErrCsv: RN1; field1, field2 | RN2; field1, field2
   const { sCamposErrCsv, ...rest } = record

   const restRecords: { [key: string]: any } = rest
   const currentValue = restRecords[currentField] || '<No definido>'

   if (!sCamposErrCsv) return currentValue

   // Reglas
   const camposErr = sCamposErrCsv.split('|')

   const [idRN] = camposErr.find(err => err.includes(currentField))?.split(';') || []

   if (!idRN) return currentValue

   return (
      <Flex gap='4px 0' align='center' justify='space-around'>
         <Tag bordered={ false } color='error' style={{ display: 'flex', alignItems: 'center', fontWeight: 'bold' }}>{ currentValue }</Tag>
         <Button
            shape='circle'
            size='middle'
            icon={ <EyeOutlined /> }
            onClick={() => {
               showSentenciaSql(idRN.trim())
            }}
         />
      </Flex>
   )
}
