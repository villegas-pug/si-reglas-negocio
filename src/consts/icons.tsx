import { ReactElement } from 'react'

import { BsDatabaseX } from 'react-icons/bs'
import { PiAirplaneLandingFill } from 'react-icons/pi'
import { AiFillAlert } from 'react-icons/ai'
import { FaPersonMilitaryToPerson } from 'react-icons/fa6'
import { FaHome } from 'react-icons/fa'
import { MdNearbyError } from 'react-icons/md'

type Icon = { [key: string]: ReactElement }

const sizeIconPag = 27
const sizeIconSubpag = 18

export const icons: Icon = {

   // ► PAG
   FaHome: <FaHome size={ sizeIconPag } />,
   BsDatabaseX: <BsDatabaseX size={sizeIconPag} />,
   MdNearbyError: <MdNearbyError size={sizeIconPag} />,

   // ► SUB_PAG
   PiAirplaneLandingFill: <PiAirplaneLandingFill size={ sizeIconSubpag } />,
   AiFillAlert: <AiFillAlert size={ sizeIconSubpag } />,
   FaPersonMilitaryToPerson: <FaPersonMilitaryToPerson size={ sizeIconSubpag } />

}
