import { Context as BaseContext } from 'grammy'
import { DocumentType } from '@typegoose/typegoose'
import { I18nContext } from '@grammyjs/i18n/dist/source'
import { SessionData } from '@/middlewares/session'
import { User } from '@/models/User'

interface Context extends BaseContext {
  readonly i18n: I18nContext
  dbuser: DocumentType<User>
  session: SessionData
}

export default Context
