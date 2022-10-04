import { RoomModel } from '@/models/RoomModel'
import { chooseKeyboard, welcomeKeyboard } from '@/helpers/keyboards'
import Context from '@/models/Context'

export default async function chooseComplexity(ctx: Context): Promise<void> {
  await ctx.editMessageText(
    `Выберите список вопросов, одни обычные, а другие со смехуёвинкой🫡`,
    {
      parse_mode: 'HTML',
      reply_markup: chooseKeyboard,
    }
  )
}
