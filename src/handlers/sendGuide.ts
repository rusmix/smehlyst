import Context from '@/models/Context'

export default async function sendGuide(ctx: Context): Promise<void> {
  await ctx.reply('Играть очень просто!')
}
