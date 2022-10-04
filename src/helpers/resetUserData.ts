import { State } from '@/middlewares/session'
import Context from '@/models/Context'

export default function resetUserData(ctx: Context): void {
  delete ctx.session.questionAnswers
  delete ctx.session.roomId
  ctx.session.state = State.default
  console.log('data reset ___________')
}
