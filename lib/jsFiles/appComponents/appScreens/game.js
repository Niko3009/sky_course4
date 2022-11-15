// --------------------- ЭКРАН ИГРЫ ---------------------

window.app.components.screens.list['game'] = function () {
    const objectForComponentListFilling =
        window.app.components.class.objectsForListFilling.ofComponents

    const screens = new objectForComponentListFilling('screen')
    const cssPrefix = screens.cssPrefixMaking(`game`)
    const renderTheElement = screens.renderTheElement
    const renderTheBlock = screens.renderTheBlock
    const screenBox = screens.box

    // Данные экрана

    const gameData = window.app.data.game

    const timerStart = window.app.timers.start
    const updateGameTime = gameData.time.updateTheData

    const difficultyPresets = {
        1: 6, // легкий уровень - 6 карточек (3 пары)
        2: 12, // средний уровень - 12 карточек (6 пар)
        3: 18, // сложный уровень - 18 карточек (9 пар)
        4: 36, // очень сложный уровень - 36 карточек (18 пар)
    }
    const defaultDifficulty = 4
    const isDataValid = Boolean(difficultyPresets[gameData.difficulty])
    const difficulty = isDataValid ? gameData.difficulty : defaultDifficulty
    const cardsQty = difficultyPresets[difficulty]

    let cardBoxesList = [] // список селекторов с картами
    let areCardsHidden = true

    // Блок - header

    const headerParams = { classList: [cssPrefix + `header`] }
    const header = renderTheElement('div', screenBox, headerParams)

    const gameTimer = renderTheBlock('gameTimer', header)
    let gameTimeInSec = 0
    timerStart(1, updateTime)

    const restartBtnParams = { buttonName: 'Начать заново' }
    const restartBtn = renderTheBlock('button', header, restartBtnParams)
    restartBtn.addEventListener('click', reloadGame)

    // Блок - игровое поле (с картами)

    const gameFieldParams = { classList: [cssPrefix + 'gameField'] }
    const gameField = renderTheElement('div', screenBox, gameFieldParams)

    const cardsCollectionBox = document.createElement('div')
    const cardsCollectionBoxClass = `gameField_cardsCollectionBox_${difficulty}`
    cardsCollectionBox.classList.add(cssPrefix + cardsCollectionBoxClass)
    gameField.appendChild(cardsCollectionBox)

    console.log(`Число задействованных карт: ${cardsQty}`)
    for (let cardNum = 1; cardNum <= cardsQty; cardNum++) {
        // поле с картами
        const cardBox = document.createElement('div')
        cardBox.classList.add(cssPrefix + 'gameField_cardBox')
        cardsCollectionBox.appendChild(cardBox)

        const cardImg = document.createElement('img')
        cardImg.src = './lib/img/cards/back.png'
        cardBox.appendChild(cardImg)

        cardBoxesList.push(cardBox)
    }

    const cards = generateCards(cardBoxesList)
    gameData.cards.involved = cards
    for (const card of cards)
        card.selector.addEventListener('click', () => {
            turnOneCard(card)
        })
    console.log(`История игры:`)

    // Блок - footer

    const footer = document.createElement('div')
    footer.classList.add(cssPrefix + `footer`)
    screenBox.appendChild(footer)

    const btnTurnCardsParams = { buttonName: 'Перевернуть карты' }
    const btnTurnCards = renderTheBlock('button', footer, btnTurnCardsParams)
    btnTurnCards.addEventListener('click', turnAllCards)

    // Функционал экрана

    function updateTime() {
        gameTimeInSec++
        updateGameTime(gameTimeInSec)

        const seconds = gameData.time.seconds
        const minutes = gameData.time.minutes

        gameTimer.updateTime.byTimeData(minutes, seconds)
    }
    function reloadGame() {
        window.app.components.screens.open('game')
    }

    function generateCards(cardBoxesList) {
        // Создание полной колоды (все 36 карт)

        let availableCards = []

        const suits = ['spades', 'diamonds', 'hearts', 'clubs']
        const ranks = [`6`, `7`, `8`, `9`, `10`, `J`, `Q`, `K`, `A`]
        for (const suit of suits)
            for (const rank of ranks) availableCards.push(`${rank}_${suit}`)

        // Случайная выборка из полной колоды

        let selectedCards = new Array()

        const selectedCardsQty = Math.floor(cardBoxesList.length / 2)
        for (let cardNum = 1; cardNum <= selectedCardsQty; cardNum++) {
            const availableCardsQty = availableCards.length
            const randomCardNum =
                Math.floor(Math.random() * availableCardsQty) + 1

            const selectedCardName = availableCards[randomCardNum - 1]
            availableCards.splice(randomCardNum - 1, 1)

            selectedCards[cardNum - 1] = selectedCardName
        }

        // Набор генерируемых карт: удвоенная выборка из колоды

        let generatedCards = [].concat(selectedCards, selectedCards)

        // Случайное размещение карт по данному списку селекторов

        let placedCards = new Array()

        const placedCardsQty = generatedCards.length
        for (let cardNum = 1; cardNum <= placedCardsQty; cardNum++) {
            const generatedCardQty = generatedCards.length
            const randomCardNum =
                Math.floor(Math.random() * generatedCardQty) + 1

            const selectedCardName = generatedCards[randomCardNum - 1]
            generatedCards.splice(randomCardNum - 1, 1)

            const rank = selectedCardName.slice(
                0,
                selectedCardName.indexOf('_')
            )
            const suit = selectedCardName.slice(
                selectedCardName.indexOf('_') + 1
            )
            const suitImg =
                suit === 'spades'
                    ? '♠'
                    : suit === 'clubs'
                    ? '♣'
                    : suit === 'hearts'
                    ? '♥'
                    : '♦'

            let selectedCard = {
                placeNumber: cardNum,
                selector: cardBoxesList[cardNum - 1],
                isCardHidden: true,
                name: selectedCardName,
                rank: rank,
                suit: suit,
                suitImg: suitImg,
            }

            placedCards[cardNum - 1] = selectedCard
        }

        // Возврат списка размещенных карт

        return placedCards
    }
    function turnOneCard(card) {
        const isCardHidden = card.isCardHidden
        const img = card.selector.querySelector('img')

        if (isCardHidden) {
            // раскрываем карту
            img.src = `./lib/img/cards/${card.name}.png`
            card.isCardHidden = false

            console.log(
                `${card.rank + card.suitImg} (карта №${card.placeNumber})`
            )
        } else {
            // скрываем карту
            img.src = `./lib/img/cards/back.png`
            card.isCardHidden = true
        }
    }

    function turnAllCards() {
        if (areCardsHidden) {
            // раскрываем карты
            for (const card of cards) {
                const img = card.selector.querySelector('img')
                img.src = `./lib/img/cards/${card.name}.png`
                card.isCardHidden = false
            }
            areCardsHidden = false
        } else {
            // скрываем карты
            for (const card of cards) {
                const img = card.selector.querySelector('img')
                img.src = `./lib/img/cards/back.png`
                card.isCardHidden = true
            }
            areCardsHidden = true
        }
    }
}
