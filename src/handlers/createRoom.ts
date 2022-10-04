import { RoomModel } from '@/models/RoomModel'
import { startGameKeyboard } from '@/helpers/keyboards'
import Context from '@/models/Context'

function getRandomInt() {
  return 1000 + Math.floor(Math.random() * 8999)
}

export default async function createRoom(ctx: Context): Promise<void> {
  const roomId = getRandomInt()
  if (await RoomModel.findOne({ roomId: roomId })) return createRoom(ctx) //проверка вдруг такая рума уже есть

  const players = [ctx.session.userId]
  const resRoom = await new RoomModel({
    roomId: roomId,
    players: players,
    vipPersonid: ctx.session.userId,
  }).save()
  console.log(resRoom)

  const msg = await ctx.editMessageText(
    `Комната создана, вот её номер: <b>${roomId}</b>\nПриглашай друзей и обоссывайтесь со смеху🤨\nКак только все подключатся, нажми на кнопку👇🏻`,
    {
      parse_mode: 'HTML',
      reply_markup: startGameKeyboard,
    }
  )
  ctx.session.oldMessageId = (msg as any).message_id
}
