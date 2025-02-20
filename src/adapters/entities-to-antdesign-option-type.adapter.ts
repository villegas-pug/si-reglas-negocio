import { DefaultOptionType } from 'antd/es/select'

export const adaptEntitiesToAntdesignOptionType = <T> (entities: T[], label: keyof T, value: keyof T) => {
   const optTypes: DefaultOptionType[] = entities.map((entity) => ({
      label: entity[label] as string,
      value: entity[value] as number
   }))

   return optTypes
}
