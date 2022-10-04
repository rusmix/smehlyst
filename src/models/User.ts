import * as findorcreate from 'mongoose-findorcreate'
import { FindOrCreate } from '@typegoose/typegoose/lib/defaultClasses'
import { getModelForClass, plugin, prop } from '@typegoose/typegoose'

@plugin(findorcreate)
export class User extends FindOrCreate {
  @prop({ required: true, index: true, unique: true })
  id: number

  @prop({ index: true })
  username: string

  @prop({ required: true, default: 'ru' })
  language: string

  @prop({ required: true, default: false })
  isSubscribed: boolean

  @prop({ required: true, default: 'Хто я...' })
  nickname: string
}

export const UserModel = getModelForClass(User, {
  schemaOptions: { timestamps: true },
})

export function findOrCreateUser(id: number) {
  return UserModel.findOrCreate({ id: id })
}
