import * as findorcreate from 'mongoose-findorcreate'
import { FindOrCreate } from '@typegoose/typegoose/lib/defaultClasses'
import { getModelForClass, plugin, prop } from '@typegoose/typegoose'

@plugin(findorcreate)
export class Room extends FindOrCreate {
  @prop({ required: true, index: true, unique: true })
  roomId: number

  @prop({ index: true })
  vipPersonid: number
  
  @prop({ index: true })
  players: number[]

  @prop({ index: true })
  complexity: string

  @prop({ index: true })
  questions: number[]
}

export const RoomModel = getModelForClass(Room, {
  schemaOptions: { timestamps: true },
})
