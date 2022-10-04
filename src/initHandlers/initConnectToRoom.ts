import { RoomModel } from '@/models/RoomModel'
import { State } from '@/middlewares/session'
import { welcomeKeyboard } from '@/helpers/keyboards'
import Context from '@/models/Context'

export default async function initConnectToRoom(ctx: Context): Promise<void> {
  const msg = await ctx.editMessageText(`Введите номер комнаты 🫥🫥🫥`)
  ctx.session.state = State.sendRoomId
  ctx.session.oldMessageId = (msg as any).message_id
}
