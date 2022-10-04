import { RoomModel } from '@/models/RoomModel'
import {
  backKeyboard,
  chooseKeyboard,
  welcomeKeyboard,
} from '@/helpers/keyboards'
import Context from '@/models/Context'
import createRoom from './createRoom'

export default async function complexityValidator(ctx: Context): Promise<void> {
  if (ctx.dbuser.isSubscribed || ctx.match === 'base') return createRoom(ctx)

  await ctx.editMessageText(
    `У Вас нет доступа к этому списку вопросов! Попробуйте базовый уровень или купите доступ, поддержав автора проекта)`,
    {
      parse_mode: 'HTML',
      reply_markup: backKeyboard,
    }
  )
}
