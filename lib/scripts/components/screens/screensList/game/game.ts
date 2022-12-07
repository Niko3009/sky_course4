// --------------------- ЭКРАН ИГРЫ ---------------------

import './style/gameStyle.css'

import { screenRender } from './gameScreenRender'
import * as funcs from './gameFuncs'

import { cardImages } from './gameImg'

export const game = function () {
    const appObj = window.app
    const gameData = appObj.data.game
    const componentsObj = appObj.components

    const openTheModal = componentsObj.modals.open
    const openTheScreen = componentsObj.screens.open
    const closeTheScreen = componentsObj.screens.close
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
    const restartBtn = blockList.restartBtn
    const exitBtn = blockList.exitBtn

    const cardsSetBox = blockList.cardsSetBox
    const cardBoxesList = Array.from(cardsSetBox.children)

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

            gameTimerID = timerStart(1, updateGameTime) // запускаем таймер игры

            hasTheGameStarted = true

            console.log('\n', `История игры:`, '\n\n')
        })
    }

    const updateGameTime = function () {
        gameTimeInSec++

        updateDataOfGameTime(gameTimeInSec) // обновление глобальных данных

        const seconds = gameData.time.seconds
        const minutes = gameData.time.minutes

        gameTimer.updateTime.byTimeData(minutes, seconds) // обновление блока таймера (на экране)
    }

    const gameReload = function () {
        const currentScreen = appObj.data.state.screen
        if (currentScreen) openTheScreen(currentScreen)
    }

    const gameExit = function () {
        const makeExit = () => {
            openTheModal('difficulty selection')
        }

        closeTheScreen()
        setTimeout(makeExit, screenClosingTime * 1000)
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
                        ? (cardImg.src = cardImages[card.name])
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

    const generateCards = funcs.generateCards

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

        openTheModal('game result')
    }

    // СОБЫТИЯ ------------------------------------------------------------

    let hasTheGameStarted: boolean = false
    let lastActivatedCard: any = null
    let numberOfActiveCards: number = 0
    let gameTimeInSec: number = 0
    let gameTimerID: number

    exitBtn.addEventListener('click', gameExit)
    restartBtn.addEventListener('click', gameReload)

    console.log('\n', `Число задействованных карт: ${cardsQty}`, '\n\n')
    const cardsOnGameField = generateCards(cardBoxesList)  
    for (const card of cardsOnGameField)
        card.selector.onclick = function () {
            actionWithCard.open(card)
        }

    gameData.status = 'inGame'
    gameStart() // старт игры
}
