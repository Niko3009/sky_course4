// --------------------- ЭКРАН ИГРЫ ---------------------

import { screenRender } from './gameScreenRender'
import { cardImages } from './gameImg'

export const game = function () {
    const appObj = window.app
    const gameData = appObj.data.game
    const componentsObj = appObj.components

    const closeTheScreen = componentsObj.screens.close
    const openTheModal = componentsObj.modals.open
    const screenClosingTime = componentsObj.transitions.screenClosingTime

    const makeTheDelay = appObj.timeouts.start
    const timerStart = appObj.timers.start
    const timerStop = appObj.timers.stop

    const updateDataOfGameTime = gameData.time.updateTheData

    // ДАННЫЕ ЭКРАНА ------------------------------------------------------------

    const difficultyPresets: any = {
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
    const delayBeforeCardFlip = 0.1
    const cardFlipClass = 'flip-in-ver-left' // css-класс анимации

    // ОТРИСОВКА ЭКРАНА ------------------------------------------------------------

    const blockList = screenRender(difficulty, cardsQty)

    const gameTimer = blockList.gameTimer
    const cardsSetBox = blockList.cardsSetBox
    const restartBtn = blockList.restartBtn
    const exitBtn = blockList.exitBtn

    // ФУНКЦИОНАЛ ------------------------------------------------------------
    const gameStart = function () {
        const cards = cardsOnGameField
        const delayBeforeCardShowing = 1
        const timeOfCardShowing = 5

        makeTheDelay(delayBeforeCardShowing, () => {
            for (const card of cards) actionWithCard.flip(card) // раскрываем все карты игроку
        })

        makeTheDelay(delayBeforeCardShowing + timeOfCardShowing, () => {
            for (const card of cards) actionWithCard.flip(card) // скрываем все карты

            gameTimerID = timerStart(1, updateTime) // запускаем таймер игры

            hasTheGameStarted = true

            console.log('\n', `История игры:`, '\n\n')
        })
    }

    const gameReload = function () {
        const currentScreen = window.app.data.state.screen

        if (currentScreen) window.app.components.screens.open(currentScreen)
    }

    const gameExit = function () {
        closeTheScreen()
        setTimeout(() => {
            openTheModal('difficulty selection')
        }, screenClosingTime * 1000)
    }

    const updateTime = function () {
        gameTimeInSec++

        updateDataOfGameTime(gameTimeInSec) // обновление глобальных данных

        const seconds = gameData.time.seconds
        const minutes = gameData.time.minutes

        gameTimer.updateTime.byTimeData(minutes, seconds) // обновление блока таймера (на экране)
    }

    const generateCards = function (cardBoxesList: any) {
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
            const randomCardNum =
                Math.floor(Math.random() * availableCardsQty) + 1

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

    const actionWithCard = {
        flip: function (card: any) {
            const cardBox = card.selector
            const cardImg = cardBox.querySelector('img')
            const isCardHidden = card.isCardHidden

            const animationTime = cardFlipTime
            const delayBeforeAnimation = delayBeforeCardFlip
            const animationClass = cardFlipClass

            const isAnimationInProgress = Boolean(cardBox.style.animation)
            if (isAnimationInProgress) return false

            makeTheDelay(delayBeforeAnimation, () => {
                cardBox.style.animation = `${animationClass} ${animationTime}s`
                cardBox.classList.add(animationClass)
                makeTheDelay(animationTime / 2, () => {
                    isCardHidden
                        ? (cardImg.src = cardImg.src = cardImages[card.name])
                        : (cardImg.src = cardImages['back'])
                })
            })

            makeTheDelay(delayBeforeAnimation + animationTime, () => {
                cardBox.classList.remove(animationClass)
                cardBox.style.removeProperty('animation')

                isCardHidden
                    ? (card.isCardHidden = false)
                    : (card.isCardHidden = true)
            })

            return true
        },
        open: function (card: any) {
            if (!hasTheGameStarted || numberOfActiveCards > 1) return

            const isCardHidden = Boolean(card.isCardHidden)
            if (!isCardHidden) return

            const isCardFlipSuccessful = actionWithCard.flip(card)
            if (!isCardFlipSuccessful) return

            numberOfActiveCards++

            makeTheDelay(delayBeforeCardFlip + cardFlipTime, () => {
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
        },
        close: function (card: any) {
            const isCardHidden = Boolean(card.isCardHidden)
            if (isCardHidden) return

            const isCardFlipSuccessful = actionWithCard.flip(card)
            if (!isCardFlipSuccessful) return
        },
        remove: function (card: any) {
            const cardBox = card.selector
            const cardImg = cardBox.querySelector('img')

            const animationTime = cardFlipTime
            const delayBeforeAnimation = delayBeforeCardFlip
            const animationClass = cardFlipClass

            cardBox.classList.remove(animationClass)
            cardBox.style.removeProperty('animation')

            makeTheDelay(delayBeforeAnimation, () => {
                cardBox.style.animation = `${animationClass} ${animationTime}s`
                cardBox.classList.add(animationClass)

                makeTheDelay(animationTime / 2, () => {
                    cardImg.style.display = 'none'
                })
            })

            makeTheDelay(delayBeforeAnimation + animationTime, () => {
                cardBox.classList.remove(animationClass)
                cardBox.style.removeProperty('animation')
            })

            const firstCardIndex = cardsOnGameField.indexOf(card)
            cardsOnGameField.splice(firstCardIndex, 1)

            return true
        },
    }

    const twoCardsComparing = function (firstCard: any, secondCard: any) {
        const areCardsSame = firstCard.name === secondCard.name

        if (areCardsSame) {
            actionWithCard.remove(firstCard)
            actionWithCard.remove(secondCard)

            gameData.cards.founded.push(firstCard.name)

            if (cardsOnGameField.length === 0) gameFinish(true)
        } else {
            makeTheDelay(delayBeforeCardFlip + cardFlipTime, () => {
                // actionWithCard.close(firstCard)
                // actionWithCard.close(secondCard)

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

    let hasTheGameStarted: boolean = false
    let lastActivatedCard: any = null
    let numberOfActiveCards: number = 0
    let gameTimeInSec: number = 0
    let gameTimerID: number

    gameData.status = 'inGame'

    exitBtn.addEventListener('click', gameExit)
    restartBtn.addEventListener('click', gameReload)

    const cardBoxesList = Array.from(cardsSetBox.children) // список селекторов с картами
    const cardsOnGameField = generateCards(cardBoxesList)

    console.log('\n', `Число задействованных карт: ${cardsQty}`, '\n\n')

    for (const card of cardsOnGameField)
        card.selector.addEventListener('click', () => {
            actionWithCard.open(card)
        })

    gameStart() // старт игры
}
