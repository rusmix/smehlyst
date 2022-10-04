import { InlineKeyboard } from 'grammy'

export const welcomeKeyboard = new InlineKeyboard()
  .text('Создать', 'createRoom')
  .row()
  .text('Подключиться', 'connectToRoom')

export const chooseKeyboard = new InlineKeyboard()
  .text('Базовый', 'base')
  .row()
  .text('Любительский', 'advanced')

export const backKeyboard = new InlineKeyboard().text('Назад', 'back')

export const startGameKeyboard = new InlineKeyboard().text(
  'Начать игру',
  'startGame'
)
