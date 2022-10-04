import { NextFunction } from 'grammy'
import Context from '@/models/Context'

export default function attachUser(ctx: Context, next: NextFunction) {
  if (ctx.session.userId == 0) {
    if (ctx.chat?.id) ctx.session.userId = ctx.chat?.id
    if (ctx.update?.pre_checkout_query)
      ctx.session.userId = ctx.update.pre_checkout_query.from.id
  }
  return next()
}
