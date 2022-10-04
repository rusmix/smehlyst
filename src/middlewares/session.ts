import { SessionFlavor } from 'grammy'
import Context from '@/models/Context'

export const enum State {
  default = 'default',
  sendRoomId = 'sendRoomId',
  sendFirstJoke = 'sendFirstJoke',
  sendSecondJoke = 'sendSecondJoke',
  sendNick = 'sendNick',
}

export interface SessionData {
  userId: number
  roomId?: string
  questionAnswers?: string[]
  state: State
  oldMessageId?: number
}

export type BotContext = Context & SessionFlavor<SessionData>
