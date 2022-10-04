import { NextFunction } from 'grammy'
import { findOrCreateUser } from '@/models/User'
import Context from '@/models/Context'

export default async function attachUser(ctx: Context, next: NextFunction) {
  if (!ctx.from) {
    throw new Error('No from field found')
  }
  const { doc } = await findOrCreateUser(ctx.from.id)
  ctx.dbuser = doc
  console.log('user is ___', doc)
  //adding username
  if (!ctx.dbuser?.username && ctx.from?.username) {
    ctx.dbuser.username = ctx.from.username
    await ctx.dbuser.save()
  }
  if (!ctx.dbuser?.username && !ctx.from?.username) {
    ctx.dbuser.username = 'unknown'
    await ctx.dbuser.save()
  }

  return next()
}
