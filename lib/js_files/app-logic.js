// -------------------- ЛОГИКА ИГРЫ -------------------------
window.application.logic.game.listFilling = function () {
    let functions = {}
    const listLoad = function () {
        // Перенос списка в приложение
        const localList = functions
        for (const item of Object.keys(localList))
            window.application.logic.game.list[item] = localList[item]
    }

    // Генерация карт
    functions['generateCards'] = function (cardSelectorsList) {
        const generatedCardQty =
            cardSelectorsList.length % 2 === 0
                ? cardSelectorsList.length
                : cardSelectorsList.length - 1
        const selectedCardsQty = generatedCardQty / 2
        let selectedCards = new Array(selectedCardsQty) // выборка из общей колоды
        let generatedCards = new Array(generatedCardQty) // данные размещения выборки

        // Создание полной колоды (все 36 карт)
        const suits = ['spades', 'diamonds', 'hearts', 'clubs']
        const ranks = [`6`, `7`, `8`, `9`, `10`, `J`, `Q`, `K`, `A`]
        let availableCards = []
        for (const suit of suits)
            for (const rank of ranks) availableCards.push(`${rank}_${suit}`)

        // Случайная выборка из полной колоды
        for (let cardNum = 1; cardNum <= selectedCardsQty; cardNum++) {
            const availableCardsQty = availableCards.length
            const randomCardNum = Math.floor(Math.random() * availableCardsQty)

            selectedCards[cardNum - 1] = availableCards[randomCardNum]
            availableCards.splice(randomCardNum, 1)
        }

        // Случайное размещение карт по данному списку селекторов
        let doubleSet = [].concat(selectedCards, selectedCards)
        for (let cardNum = 1; cardNum <= generatedCardQty; cardNum++) {
            const doubleSetQty = doubleSet.length
            const randomCardNum = Math.floor(Math.random() * doubleSetQty)

            const selectedCard = doubleSet[randomCardNum]
            doubleSet.splice(randomCardNum, 1)

            let cardData = {}
            cardData.placeNumber = cardNum
            cardData.selector = cardSelectorsList[cardNum - 1]
            cardData.isCardHidden = true
            cardData.name = selectedCard
            cardData.rank = selectedCard.slice(0, selectedCard.indexOf('_'))
            cardData.suit = selectedCard.slice(selectedCard.indexOf('_') + 1)

            const suit = cardData.suit
            cardData.suitImg =
                suit === 'spades'
                    ? '♠'
                    : suit === 'clubs'
                    ? '♣'
                    : suit === 'hearts'
                    ? '♥'
                    : '♦'

            generatedCards[cardNum - 1] = cardData
        }

        return generatedCards
    }

    listLoad()
}
