// --------------------- ЭКРАН ИГРЫ ---------------------

import { cardImages } from './images.js'

export const game = function () {
    const appObj = window.app
    const componentsObj = appObj.components
    const objectForComponentListFilling =
        componentsObj.dev.forListFilling.ofComponents
    const screens = new objectForComponentListFilling('screen')

    const cssPrefix = screens.cssPrefixMaking(`game`)
    const renderTheElement = screens.renderTheElement
    const renderTheBlock = screens.renderTheBlock
    const screenBox = screens.template.box

    const closeTheScreen = componentsObj.screens.close
    const openTheModal = componentsObj.modals.open
    const screenClosingTime = componentsObj.transitions.screenClosingTime

    const makeTheTimeout = appObj.timeouts.start
    const timerStart = appObj.timers.start
    const timerStop = appObj.timers.stop

    const gameData = appObj.data.game
    const updateDataOfGameTime = gameData.time.updateTheData

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

    const cardFlipTime = 0.8
    const delayBeforeCardFlip = 0

    // ОТРИСОВКА ЭКРАНА ------------------------------------------------------------

    // Блок - header

    const headerParams = { classList: [cssPrefix + `header`] }
    const header = renderTheElement('div', screenBox, headerParams)

    const gameTimerBlock = renderTheBlock('gameTimer', header)

    const restartBtnParams = { buttonName: 'Начать заново' }
    const restartBtn = renderTheBlock('button', header, restartBtnParams)

    // Блок - игровое поле (блок с картами)

    const gameFieldParams = { classList: [cssPrefix + 'gameField'] }
    const gameField = renderTheElement('div', screenBox, gameFieldParams)

    const cardsCollectionBox = document.createElement('div')
    const cardsCollectionBoxClass = `gameField_cardsCollectionBox_${difficulty}`
    cardsCollectionBox.classList.add(cssPrefix + cardsCollectionBoxClass)
    gameField.appendChild(cardsCollectionBox)

    let cardBoxesList = [] // список селекторов с картами
    for (let cardNum = 1; cardNum <= cardsQty; cardNum++) {
        // поле с картами
        const cardBox = document.createElement('div')
        cardBox.classList.add(cssPrefix + 'gameField_cardBox')
        cardsCollectionBox.appendChild(cardBox)

        const cardImg = document.createElement('img')
        cardImg.src = cardImages['back']
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
        setTimeout(() => {
            openTheModal('difficulty selection')
        }, screenClosingTime * 1000)
    }

    const gameReload = function () {
        const currentScreen = window.app.data.state.screen

        if (currentScreen) window.app.components.screens.open(currentScreen)
    }

    const gameStart = function () {
        const cards = cardsOnGameField
        const delayBeforeCardShowing = 1
        const timeOfCardShowing = 5

        makeTheTimeout(delayBeforeCardShowing, () => {
            for (const card of cards) flipTheCard(card) // раскрываем все карты игроку
        })

        makeTheTimeout(delayBeforeCardShowing + timeOfCardShowing, () => {
            for (const card of cards) flipTheCard(card) // скрываем все карты

            gameTimerID = timerStart(1, updateTime) // запускаем таймер игры

            hasTheGameStarted = true

            console.log('\n', `История игры:`, '\n\n')
        })
    }

    const updateTime = function () {
        gameTimeInSec++

        updateDataOfGameTime(gameTimeInSec) // обновление глобальных данных

        const seconds = gameData.time.seconds
        const minutes = gameData.time.minutes

        gameTimerBlock.updateTime.byTimeData(minutes, seconds) // обновление блока таймера (на экране)
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

    const flipTheCard = function (card) {
        const cardBox = card.selector
        const cardImg = cardBox.querySelector('img')
        const isCardHidden = card.isCardHidden

        const animationClass = 'flip-in-ver-left'
        const animationTime = cardFlipTime
        const delayBeforeAnimation = delayBeforeCardFlip

        const isAnimationInProgress = Boolean(cardBox.style.animation)
        if (isAnimationInProgress) return false

        makeTheTimeout(delayBeforeAnimation, () => {
            cardBox.style.animation = `${animationClass} ${animationTime}s cubic-bezier(0.250, 0.460, 0.450, 0.940) both`
            cardBox.classList.add(animationClass)

            makeTheTimeout(animationTime / 2, () => {
                isCardHidden
                    ? (cardImg.src = cardImg.src = cardImages[card.name])
                    : (cardImg.src = cardImages['back'])
            })
        })

        makeTheTimeout(delayBeforeAnimation + animationTime, () => {
            cardBox.classList.remove(animationClass)
            cardBox.style.removeProperty('animation')

            isCardHidden
                ? (card.isCardHidden = false)
                : (card.isCardHidden = true)
        })

        return true
    }

    const openTheCard = function (card) {
        if (!hasTheGameStarted || numberOfActiveCards > 1) return

        const isCardHidden = Boolean(card.isCardHidden)
        if (!isCardHidden) return

        const isCardFlipSuccessful = flipTheCard(card)
        if (!isCardFlipSuccessful) return

        numberOfActiveCards++

        makeTheTimeout(delayBeforeCardFlip + cardFlipTime, () => {
            const time = gameData.time.summary
            const value = card.rank + card.suitImg
            const num = card.placeNumber

            console.log(`${time}: открыта карта № ${num} ( ${value} )`)

            if (!lastActivatedCard) {
                lastActivatedCard = card
                return
            }

            twoCardsComparing(card, lastActivatedCard)

            lastActivatedCard = null
            numberOfActiveCards = 0
        })
    }

    const closeTheCard = function (card) {
        const isCardHidden = Boolean(card.isCardHidden)
        if (isCardHidden) return

        const isCardFlipSuccessful = flipTheCard(card)
        if (!isCardFlipSuccessful) return
    }

    const twoCardsComparing = function (firstCard, secondCard) {
        const areCardsSame = firstCard.name === secondCard.name

        if (areCardsSame) {
            const firstCardIndex = cardsOnGameField.indexOf(firstCard)
            cardsOnGameField.splice(firstCardIndex, 1)

            const secondCardIndex = cardsOnGameField.indexOf(secondCard)
            cardsOnGameField.splice(secondCardIndex, 1)

            gameData.cards.founded.push(firstCard.name)

            if (cardsOnGameField.length === 0) gameFinish(true)
        } else {
            makeTheTimeout(delayBeforeCardFlip + cardFlipTime, () => {
                closeTheCard(firstCard)
                closeTheCard(secondCard)

                gameFinish(false)
            })
        }
    }

    const gameFinish = function (isGameOverWithVictory = true) {
        console.log('\n', `Игра завершена`, '\n\n')

        gameData.status = isGameOverWithVictory ? 'gameVictory' : 'gameDefeat'

        timerStop(gameTimerID)
        // appObj.data.getInfo()

        openTheModal('game result')
    }

    // СОБЫТИЯ ------------------------------------------------------------

    gameData.status = 'inGame'

    let hasTheGameStarted = false
    let lastActivatedCard = null
    let numberOfActiveCards = 0
    let gameTimeInSec = 0
    let gameTimerID

    btnTurnCards.addEventListener('click', gameExit)
    restartBtn.addEventListener('click', gameReload)

    const cardsOnGameField = generateCards(cardBoxesList)

    console.log('\n', `Число задействованных карт: ${cardsQty}`, '\n\n')

    for (const card of cardsOnGameField)
        card.selector.addEventListener('click', () => {
            openTheCard(card)
        })

    gameStart() // старт игры
}
