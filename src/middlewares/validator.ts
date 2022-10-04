import { NextFunction } from 'grammy'
import Context from '@/models/Context'

export default async function validator(
  ctx: Context,
  next: NextFunction
): Promise<void> {
  if (ctx.session?.roomId) {
    // GameModel
    console.log('there is no room')
  }
  return next()
}
