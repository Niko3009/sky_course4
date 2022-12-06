const suits = ['spades', 'diamonds', 'hearts', 'clubs']
const ranks = [`6`, `7`, `8`, `9`, `10`, `J`, `Q`, `K`, `A`]

// Импорт картинок карт

let cardImages: any = new Object()

for (const suit of suits)
    for (const rank of ranks) {
        const cardName: string = `${rank}_${suit}`
        cardImages[cardName] = require(`./img/cards/${cardName}.png`)
    }

cardImages['back'] = require(`./img/cards/back.png`)

// Объект картинок

export { cardImages }
