import { Tag } from 'antd'
import { ReactElement } from 'react'

export const dimensionTagComponent: { [key: string]: ReactElement } = {
   Unicidad: <Tag color="magenta">Unicidad</Tag>,
   Completitud: <Tag color="red">Completitud</Tag>,
   Exactitud: <Tag color="volcano">Exactitud</Tag>,
   Consistencia: <Tag color="orange">Consistencia</Tag>,
   Obligatoriedad: <Tag color="gold">Obligatoriedad</Tag>,
   Frescura: <Tag color="lime">Frescura</Tag>
}
