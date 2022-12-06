export const generateCards = function (cardBoxesList: any) {
    const appObj = window.app
    const gameData = appObj.data.game

    // Создание полной колоды (все 36 карт)

    let availableCards: string[] = new Array()

    const suits = ['spades', 'diamonds', 'hearts', 'clubs']
    const ranks = [`6`, `7`, `8`, `9`, `10`, `J`, `Q`, `K`, `A`]
    for (const suit of suits)
        for (const rank of ranks) availableCards.push(`${rank}_${suit}`)

    // Случайная выборка из полной колоды

    let selectedCards: string[] = new Array()

    const selectedCardsQty = Math.floor(cardBoxesList.length / 2)
    for (let cardNum = 1; cardNum <= selectedCardsQty; cardNum++) {
        const availableCardsQty = availableCards.length
        const randomCardNum = Math.floor(Math.random() * availableCardsQty) + 1

        const selectedCardName = availableCards[randomCardNum - 1]
        availableCards.splice(randomCardNum - 1, 1)

        selectedCards[cardNum - 1] = selectedCardName
    }

    // Набор генерируемых карт: удвоенная выборка из колоды

    let generatedCards: string[] = selectedCards.concat(selectedCards)

    // Случайное размещение карт по данному списку селекторов

    let cardsOnGameField = new Array()

    const placedCardsQty = generatedCards.length
    for (let cardNum = 1; cardNum <= placedCardsQty; cardNum++) {
        const generatedCardQty = generatedCards.length
        const randomCardNum = Math.floor(Math.random() * generatedCardQty) + 1

        const selectedCardName = generatedCards[randomCardNum - 1]
        generatedCards.splice(randomCardNum - 1, 1)

        const rank = selectedCardName.slice(0, selectedCardName.indexOf('_'))
        const suit = selectedCardName.slice(selectedCardName.indexOf('_') + 1)
        const suitImg =
            suit === 'spades'
                ? '♠'
                : suit === 'clubs'
                ? '♣'
                : suit === 'hearts'
                ? '♥'
                : '♦'

        // Данные карты
        const selectedCardData = {
            placeNumber: cardNum,
            selector: cardBoxesList[cardNum - 1],
            isCardHidden: true,
            name: selectedCardName,
            rank: rank,
            suit: suit,
            suitImg: suitImg,
        }

        cardsOnGameField[cardNum - 1] = selectedCardData
    }

    // Возврат данных

    gameData.gameFieldData.closedCards = cardsOnGameField
    gameData.cards.involved = selectedCards
    gameData.cards.founded = []

    return cardsOnGameField
}