import { FC, ReactElement } from 'react'

import { Avatar, Card, Divider } from 'antd'
import { SendOutlined } from '@ant-design/icons'

const { Meta } = Card

type Props = {
   title: string
   descriptions: string[]
   chart: ReactElement
   navigate?: () => void
}

export const CardChart: FC<Props> = ({ title, descriptions, chart, navigate }) => {
   return (
      <Card
         style={{ width: 400 }}
         cover={chart}
         actions={ navigate && [
            <SendOutlined
               key={ title }
               style={{ fontSize: 30 }}
               onClick={() => { navigate && navigate() }}
            />
         ]}
      >
         <Meta title={title} avatar={ <Avatar src='https://w7.pngwing.com/pngs/871/820/png-transparent-project-management-business-process-computer-icons-portfolio-management-process-cycle-plan-business-business-process-thumbnail.png' /> } />
         <Divider type='vertical' />
         {
            descriptions.map(d => (
               <Meta key={ d } description={ d } />
            ))
         }
      </Card>
   )
}
