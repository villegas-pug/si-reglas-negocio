import { ResponsiveContainer, PieChart, Pie, Tooltip, Cell } from 'recharts'

import uniqolor from 'uniqolor'
type Props<T> = {
   data: T[]
   dataKey: keyof T
   nameKey: keyof T
   colorFill: string
   label: (data: T) => string
   width?: number
   height?: number
}

export const MyPieChart2 = <T extends unknown>({ data, dataKey, nameKey, colorFill, label, width = 700, height = 400 }: Props<T>) => {
   return (
      <ResponsiveContainer width={ width } height={ height }>
         <PieChart>
            <Pie
               dataKey={dataKey as string}
               nameKey={ nameKey as string }
               data={data}
               fill={colorFill}
               label={ label }
            >
               {
                  data.map((item: any) => {
                     const values = Object.values(item)
                     return <Cell key={ `${values[0]}` } fill={ uniqolor(`${values[0]}`).color } />
                  })
               }

            </Pie>
            <Tooltip />
         </PieChart>
      </ResponsiveContainer>
   )
}
