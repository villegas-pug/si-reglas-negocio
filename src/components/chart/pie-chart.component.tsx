import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
type Props<T> = {
   data: T[]
   dataKey: keyof T
   getLabel: (data: T) => string
   getCellKey: (data: T) => string
   getCellFill: (data: T) => string
   width?: number
   height?: number
}

export const MyPieChart = <T extends unknown>({ data, dataKey, getLabel, getCellKey, getCellFill, width = 700, height = 400 }: Props<T>) => {
   return (
      <ResponsiveContainer width={ width } height={ height }>
         <PieChart>
            <Pie
               dataKey={ dataKey as string }
               data={ data }
               label={ getLabel }
            >
               {
                  data.map(record => (
                     <Cell key={ getCellKey(record) } fill={ getCellFill(record) } />
                  ))
               }
            </Pie>
         </PieChart>
      </ResponsiveContainer>
   )
}
