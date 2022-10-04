import { welcomeKeyboard } from '@/helpers/keyboards'
import Context from '@/models/Context'

export default async function sendGuide(ctx: Context): Promise<void> {
  await ctx.reply(
    'Добро пожаловать в игру Смехлыст в телеграме! Для старта, создайте комнату или подключитесь к существующей.\n\nКстати, рекомендую поставить себе смешной никнейм командой /setnick',
    {
      reply_markup: welcomeKeyboard,
    }
  )
}
