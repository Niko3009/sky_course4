export const twoCardsComparing = function (
    firstCard: string,
    secondCard: string
) {
    if (!firstCard.includes('_') || !secondCard.includes('_')) return

    const areCardsSame = firstCard === secondCard

    return areCardsSame
}

export const generateCardsByCardsQty = function (cardsQty: number) {
    // Создание полной колоды (все 36 карт)

    let availableCards: string[] = new Array()

    const suits = ['spades', 'diamonds', 'hearts', 'clubs']
    const ranks = [`6`, `7`, `8`, `9`, `10`, `J`, `Q`, `K`, `A`]
    for (const suit of suits)
        for (const rank of ranks) availableCards.push(`${rank}_${suit}`)

    // Случайная выборка из полной колоды

    let selectedCards: string[] = new Array()

    const halfOfCardsQty = Math.floor(cardsQty / 2)
    const selectedCardsQty = halfOfCardsQty <= 36 ? halfOfCardsQty : 36

    for (let cardNum = 1; cardNum <= selectedCardsQty; cardNum++) {
        const availableCardsQty = availableCards.length
        const randomCardNum = Math.floor(Math.random() * availableCardsQty) + 1

        const selectedCardName = availableCards[randomCardNum - 1]
        availableCards.splice(randomCardNum - 1, 1)

        selectedCards[cardNum - 1] = selectedCardName
    }

    // Набор генерируемых карт: удвоенная выборка из колоды

    const generatedCards: string[] = selectedCards.concat(selectedCards)

    return generatedCards
}
