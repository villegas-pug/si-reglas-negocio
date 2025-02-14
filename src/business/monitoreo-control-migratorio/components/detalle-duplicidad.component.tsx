import { Badge, Descriptions, Flex } from 'antd'
import type { DescriptionsProps } from 'antd'
import { FC } from 'react'
import { formatDatetimeStrToDatetime } from '../../utils'

type Props = {
   json: string
}

type Title = 'Documento Vinculado(DNI)' | 'Documento Vinculado(PAS)' | 'Persona Duplicada' | 'Movimiento Duplicado'

type AdaptStringifyToObject = {
   title: Title
   descriptions: DescriptionsProps['items']
}

const adaptStringifyToObject = (stringify: string): AdaptStringifyToObject[] => {
   if (!stringify) return []

   const entries = Object.entries(JSON.parse(stringify)) as any

   const result: AdaptStringifyToObject[] = (entries as any[]).map(([objKey, objValue]) => {
      const title = objKey
      const descriptions: DescriptionsProps['items'] = []
      objValue.forEach((objOfValue = []) => {
         Object.entries(objOfValue).forEach(([key, value]) => {
            const headerName = `${key}`.trim()
            const content = `${value}`.trim()
            descriptions.push({
               key: headerName,
               label: headerName,
               children: headerName.startsWith('Fec') || headerName.startsWith('dFec') ? formatDatetimeStrToDatetime(content) : content
            })
         })
      })
      return { title, descriptions }
   })

   return result
}

export const DetalleDuplicidad: FC<Props> = ({ json }) => {
   const descriptions = adaptStringifyToObject(json) || []

   return (
      <Flex vertical gap={ 10 } style={{ padding: '5px 50px' }}>
         {
            descriptions.map(({ title, descriptions }) => (
               <DuplicadosViewer key={ title } title={ title } descriptions={ descriptions } />
            ))
         }
      </Flex>
   )
}

type DuplicadosViewerProps = {
   title: Title,
   descriptions: DescriptionsProps['items']
}

const DuplicadosViewer: FC<DuplicadosViewerProps> = ({ title, descriptions }) => {
   if (title === 'Documento Vinculado(DNI)') {
      return (
         <Badge.Ribbon text={ title } color='gold' placement='start'>
            <CustomDescriptions column={ 12 } items={descriptions} width={ 2500 } />
         </Badge.Ribbon>
      )
   }

   if (title === 'Documento Vinculado(PAS)') {
      return (
         <Badge.Ribbon text={ title } color='magenta' placement='start'>
            <CustomDescriptions column={ 14 } items={descriptions} width={ 2800 } />
         </Badge.Ribbon>
      )
   }

   if (title === 'Persona Duplicada') {
      return (
         <Badge.Ribbon text={ title } color='cyan' placement='start'>
            <CustomDescriptions column={ 12 } items={ descriptions } width={ 2500 } />
         </Badge.Ribbon>
      )
   }

   if (title === 'Movimiento Duplicado') {
      return (
         <Badge.Ribbon text={ title } color='lime' placement='start'>
            <CustomDescriptions column={ 15 } items={ descriptions } width={ 3200 } />
         </Badge.Ribbon>
      )
   }
}

type CustomDescriptionsProps = {
   column: number
   items: DescriptionsProps['items']
   width: number
}

const CustomDescriptions: FC<CustomDescriptionsProps> = ({ column, items, width }) => {
   return (
      <Descriptions
         column={ column }
         layout='vertical'
         bordered
         items={ items }
         labelStyle={{ display: 'flex', justifyContent: 'center' }}
         style={{ width }}
      />
   )
}
