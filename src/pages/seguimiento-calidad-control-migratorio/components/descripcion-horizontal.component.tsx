import { Badge, Descriptions } from 'antd'
import type { DescriptionsProps } from 'antd'
import { FC } from 'react'

type Props = {
   json: string
}

type Title = 'SimPersona' | 'SimMovMigra'

type AdaptStringifyToObject = {
   title: Title
   descriptions: DescriptionsProps['items']
}

const adaptStringifyToObject = (stringify: string): AdaptStringifyToObject => {
   if (!stringify) return {} as AdaptStringifyToObject

   const [[jsonKey1, json1]] = Object.entries(JSON.parse(stringify)) as any

   let jsonFinal = json1
   let jsonKeyFinal: Title = jsonKey1
   if (typeof json1 === 'string') {
      const [[jsonKey2, json2]] = Object.entries(JSON.parse(json1)) as any
      jsonFinal = json2
      jsonKeyFinal = jsonKey2
   }

   const descriptions = (jsonFinal as []).map(record => {
      const entries = Object.entries(record).map(([key, value]) => {
         return {
            key: value as string,
            label: key as string,
            children: value as string
         }
      })
      return entries
   }).flat(Infinity) as DescriptionsProps['items']

   return { title: jsonKeyFinal, descriptions }
}

export const DescripcionHorizontalDeStringify: FC<Props> = ({ json }) => {
   const { title, descriptions } = adaptStringifyToObject(json) || []
   return (
      <>
         {
            title === 'SimPersona'
               ? (
                  <Badge.Ribbon text={ title } color='gold' placement='start'>
                     <Descriptions
                        column={ 11 }
                        layout='vertical'
                        size='small'
                        items={ descriptions }
                        labelStyle={{ display: 'flex', justifyContent: 'center' }}
                        bordered
                     />
                  </Badge.Ribbon>
               )
               : (
                  <Descriptions title={ title } column={ 14 } layout='vertical' bordered items={ descriptions } />
               )
         }
      </>
   )
}
