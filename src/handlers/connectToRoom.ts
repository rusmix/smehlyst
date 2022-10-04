import { RoomModel } from '@/models/RoomModel'

import Context from '@/models/Context'

export async function sendAll(players: number[], ctx: Context) {
  console.log(players)
  for (let i = 0; i < players.length; i++) {
    await ctx.api.sendMessage(
      players[i],
      `${ctx.dbuser.nickname} присоединился!`
    )
  }
}

export default async function connectToRoom(ctx: Context) {
  const roomId = Number(ctx.update.message.text)
  if (isNaN(roomId)) return ctx.reply('Некорректное значение комнаты')
  const roomResult = await RoomModel.findOne({ roomId: roomId })
  console.log('room is _____', roomResult)
  if (roomResult) {
    const msg = await ctx.reply(
      'Вы в игре! Ждём остальных игроков! VIP персона запустит игру, как только все подключатся'
    )
    await sendAll(roomResult.players, ctx)
    roomResult.players.push(ctx.session.userId)
    await roomResult.save()
    ctx.session.oldMessageId = (msg as any).message_id
  }
}
