import { RoomModel } from '@/models/RoomModel'
import { State } from '@/middlewares/session'
import { chooseKeyboard, welcomeKeyboard } from '@/helpers/keyboards'
import Context from '@/models/Context'
import connectToRoom from './connectToRoom'

export default async function stateHandler(ctx: Context): Promise<void> {
  console.log('in statehandler___', ctx)
  switch (ctx.session.state) {
    case State.sendRoomId:
      await connectToRoom(ctx)
      break
    default:
      break
  }
}
