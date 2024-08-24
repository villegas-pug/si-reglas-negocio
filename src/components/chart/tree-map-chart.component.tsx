import { Treemap, Tooltip, ResponsiveContainer } from 'recharts'

type Props<T> = {
   data: T[]
   nameKey: keyof T
   dataKey: keyof T
   colorStroke: string
   colorFill: string
   width?: number
   height?: number
}

export const MyTreeMap = <T extends unknown>({ data, dataKey, nameKey, colorStroke, colorFill, width = 400, height = 250 }: Props<T>) => {
   return (
      <ResponsiveContainer width={ width } height={ height }>
         <Treemap
            data={data}
            nameKey={ nameKey as string }
            dataKey={ dataKey as string }
            stroke={ colorStroke }
            fill={ colorFill }
         >
            <Tooltip />
         </Treemap>
      </ResponsiveContainer>
   )
}
