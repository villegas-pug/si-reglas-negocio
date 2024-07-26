import { Message } from './message-type.interface'

export interface Response<D extends object> {
   messageType: Message
   message: string
   data: D
}
