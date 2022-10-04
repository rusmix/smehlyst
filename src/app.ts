import 'module-alias/register'
import 'reflect-metadata'
// import 'source-map-support/register'

import { run } from '@grammyjs/runner'
import attachUser from '@/middlewares/attachUser'
import bot from '@/helpers/bot'
import configureI18n from '@/middlewares/configureI18n'

import i18n from '@/helpers/i18n'
// import languageMenu from '@/menus/language'
import { RoomModel } from './models/RoomModel'
import { SessionData, State } from '@/middlewares/session'
import { UserModel } from './models/User'
import { session } from 'grammy'
import Context from './models/Context'
import chooseComplexity from './handlers/chooseComplexity'
import complexityValidator from './handlers/complexityValidator'
import createRoom from './handlers/createRoom'
import ignoreOldMessageUpdates from '@/middlewares/ignoreOldMessageUpdates'
import initConnectToRoom from './initHandlers/initConnectToRoom'
import resetUserData from './helpers/resetUserData'
import sendGuide from './handlers/sendGuide'
import sendHelp from '@/handlers/help'
import sendWelcome from './handlers/sendWelcome'
import sequentialize, { getSessionKey } from '@/middlewares/sequentialize'
import startMongo from '@/helpers/startMongo'
import stateHandler from './handlers/stateHandler'
import validator from './middlewares/validator'
import attachUserId from './middlewares/attachUserId'

async function runApp() {
  console.log('Starting app...')
  // Mongo
  await startMongo()
  console.log('Mongo connected')

  // await bot.api.setMyCommands([
  //   { command: 'guide', description: 'Как играть?' },
  //   { command: 'subscribe', description: 'Приобрести полную версию' },
  //   {
  //     command: 'start',
  //     description: 'Перезапустить бота',
  //   },
  // ])

  // for deleting answers during tests
  // await UserModel.deleteMany()
  // await RoomModel.deleteMany()

  bot.use(sequentialize)
  bot.use(
    session({
      initial(): SessionData {
        return {
          userId: 0,
          questionAnswers: [],
          state: State.default,
        }
      },
      getSessionKey,
    })
  )
  bot.use(ignoreOldMessageUpdates)
  bot.use(attachUser)
  bot.use(attachUserId)
  bot.use(validator)

  bot.callbackQuery('createRoom', chooseComplexity)
  bot.callbackQuery('connectToRoom', initConnectToRoom)
  bot.callbackQuery(['base', 'advanced'], complexityValidator) // проверяет, есть ли у игрока подписка на другие опросы, потом создаёт комнату
  bot.callbackQuery('back', chooseComplexity)

  bot.command('giude', sendGuide)
  bot.command('start', async (ctx: Context) => {
    await resetUserData(ctx)
    await sendWelcome(ctx)
  })
  bot.on('message', stateHandler)
  // Errors
  bot.catch(console.error)
  // Start bot
  await bot.init()
  run(bot)
  console.info(`Bot ${bot.botInfo.username} is up and running`)
}

void runApp()
