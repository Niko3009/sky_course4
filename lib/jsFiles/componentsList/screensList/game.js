// --------------------- ЭКРАН ИГРЫ ---------------------

window.app.components.screens.list['game'] = function () {
    const appObj = window.app
    const componentsObj = appObj.components

    const objectForComponentListFilling =
        componentsObj.class.objectsForListFilling.ofComponents

    const screens = new objectForComponentListFilling('screen')
    const cssPrefix = screens.cssPrefixMaking(`game`)
    const renderTheElement = screens.renderTheElement
    const renderTheBlock = screens.renderTheBlock
    const screenBox = screens.template.box

    // Вспомогательные

    const closeTheScreen = window.app.components.screens.close
    const openTheModal = window.app.components.modals.open
    const screenClosingTime =
        window.app.components.transitions.screenClosingTime

    const gameData = window.app.data.game
    const timerStart = window.app.timers.start
    const updateGameTime = gameData.time.updateTheData

    // ДАННЫЕ ЭКРАНА ------------------------------------------------------------

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

    const cardAnimationTime = 0.8
    let cardBoxesList = [] // список селекторов с картами

    // ОТРИСОВКА ЭКРАНА ------------------------------------------------------------

    // Блок - header

    const headerParams = { classList: [cssPrefix + `header`] }
    const header = renderTheElement('div', screenBox, headerParams)

    const gameTimer = renderTheBlock('gameTimer', header)
    let gameTimeInSec = 0

    const restartBtnParams = { buttonName: 'Начать заново' }
    const restartBtn = renderTheBlock('button', header, restartBtnParams)

    // Блок - игровое поле (блок с картами)

    const gameFieldParams = { classList: [cssPrefix + 'gameField'] }
    const gameField = renderTheElement('div', screenBox, gameFieldParams)

    const cardsCollectionBox = document.createElement('div')
    const cardsCollectionBoxClass = `gameField_cardsCollectionBox_${difficulty}`
    cardsCollectionBox.classList.add(cssPrefix + cardsCollectionBoxClass)
    gameField.appendChild(cardsCollectionBox)

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

    // Блок - footer

    const footer = document.createElement('div')
    footer.classList.add(cssPrefix + `footer`)
    screenBox.appendChild(footer)

    const btnTurnCardsParams = { buttonName: 'Выйти из игры' }
    const btnTurnCards = renderTheBlock('button', footer, btnTurnCardsParams)

    // ФУНКЦИОНАЛ ------------------------------------------------------------

    const gameExit = function () {
        closeTheScreen()
        setTimeout(
            openTheModal,
            screenClosingTime * 1000,
            'difficulty selection'
        )
    }

    const gameReload = function () {
        const currentScreen = window.app.data.state.screen

        if (currentScreen) window.app.components.screens.open(currentScreen)
    }

    const gameStart = function () {
        const cards = cardsOnGameField
        const delayBeforeShowing = 1
        const showTime = 4

        setTimeout(() => {
            cardsShowing() // раскрываем карты
            setTimeout(() => {
                cardsHiding() // скрываем карты
                gameTimerStart() // запускаем таймер игры
                console.log(`История игры:`)
            }, showTime * 1000)
        }, delayBeforeShowing * 1000)

        function cardsShowing() {
            for (const card of cards) turnOneCard(card)
        }
        function cardsHiding() {
            for (const card of cards) turnOneCard(card)
        }
        function gameTimerStart() {
            timerStart(1, updateTime)
        }
    }

    const updateTime = function () {
        gameTimeInSec++
        updateGameTime(gameTimeInSec)

        const seconds = gameData.time.seconds
        const minutes = gameData.time.minutes

        gameTimer.updateTime.byTimeData(minutes, seconds)
    }

    const generateCards = function (cardBoxesList) {
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

        let cardsOnGameField = new Array()

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

            let selectedCardData = {
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
        window.app.data.game.cards.involved = selectedCards
        window.app.data.game.gameFieldData.closedCards = cardsOnGameField

        return cardsOnGameField
    }

    const turnOneCard = function (card) {
        const cardBox = card.selector
        const cardImg = cardBox.querySelector('img')
        const isCardHidden = card.isCardHidden

        const animationClass = 'flip-in-ver-left'
        const animationTime = cardAnimationTime

        if (cardBox.style.animation) return

        cardBox.style.animation = `${animationClass} ${animationTime}s cubic-bezier(0.250, 0.460, 0.450, 0.940) both`
        cardBox.classList.add(animationClass)

        setTimeout(() => {
            isCardHidden
                ? (showTheCard(), gameStatusUpdate(card)) // раскрываем карту и обновляем статус игры
                : hiddenTheCard() // скрываем карту
        }, (animationTime / 2) * 1000)

        setTimeout(() => {
            cardBox.classList.remove(animationClass)
            cardBox.style.removeProperty('animation')
        }, animationTime * 1000)

        function showTheCard() {
            cardImg.src = `./lib/img/cards/${card.name}.png`
            card.isCardHidden = false
        }
        function hiddenTheCard() {
            cardImg.src = `./lib/img/cards/back.png`
            card.isCardHidden = true
        }
    }

    const gameStatusUpdate = function (card) {
        const mark = card.rank + card.suitImg + ` (карта №${card.placeNumber})`
        console.log(mark)
    }

    // СОБЫТИЯ ------------------------------------------------------------

    btnTurnCards.addEventListener('click', gameExit)
    restartBtn.addEventListener('click', gameReload)

    const cardsOnGameField = generateCards(cardBoxesList)

    for (const card of cardsOnGameField)
        card.selector.addEventListener('click', function () {
            turnOneCard(card)
        })

    console.log(`Число задействованных карт: ${cardsQty}`)

    gameStart() // старт игры
}
