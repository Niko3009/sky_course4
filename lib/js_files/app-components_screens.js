// ------------------------- ЭКРАНЫ -------------------------
window.application.components.screens.listFilling = function () {
    let screens = {}
    const screenBox = window.application.components.screens.box
    const renderBlock = window.application.components.screens.blocks.render
    function listLoad() {
        // Перенос списка отрисовки в приложение
        const localList = screens
        for (const item of Object.keys(localList))
            window.application.components.screens.list[item] = localList[item]
    }
    function title(title) {
        console.log(title.toUpperCase())
    }
    let cssPrefix
    function getClassPrefix(appComponentName) {
        const appComponent = 'screen'
        cssPrefix = `${appComponent}_${appComponentName}_`
    }

    // Экран игры
    screens['game'] = function () {
        title('Игра')
        getClassPrefix(`game`)

        // Данные экрана

        const gameInfo = window.application.info.game
        const updateGameTime = gameInfo.time.updateInfo
        const timerStart = window.application.timers.start

        const gameLogicList = window.application.logic.game.list
        const generateCards = gameLogicList['generateCards'] // функция генерации карт

        const gamePresets = {
            1: 6, // легкий уровень - 6 карточек (3 пары)
            2: 12, // средний уровень - 12 карточек (6 пар)
            3: 18, // сложный уровень - 18 карточек (9 пар)
            4: 36, // очень сложный уровень - 36 карточек (18 пар)
        }
        const defaultDifficulty = 4
        const isDataValid = Boolean(gamePresets[gameInfo.difficulty])
        const difficulty = isDataValid ? gameInfo.difficulty : defaultDifficulty
        const cardsQty = gamePresets[difficulty]

        let cardBoxesList = [] // список селекторов с картами
        let areCardsHidden = true

        // Блок - header

        const header = document.createElement('div')
        header.classList.add(cssPrefix + `header`)
        screenBox.appendChild(header)

        const gameTimer = renderBlock('gameTimer', header)
        let gameTimeInSec = 0
        timerStart(1, updateTime)

        const btnRestartParams = { buttonName: 'Начать заново' }
        const btnRestart = renderBlock('button', header, btnRestartParams)
        btnRestart.addEventListener('click', reloadGame)

        // Блок - игровое поле (с картами)

        const gameField = document.createElement('div')
        gameField.classList.add(cssPrefix + 'gameField')
        screenBox.appendChild(gameField)

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
        gameInfo.cards.involved = cards
        for (const card of cards)
            card.selector.addEventListener('click', () => {
                turnCard(card)
            })
        console.log(`История игры:`)

        // Блок - footer

        const footer = document.createElement('div')
        footer.classList.add(cssPrefix + `footer`)
        screenBox.appendChild(footer)

        const btnTurnCardsParams = { buttonName: 'Перевернуть карты' }
        const btnTurnCards = renderBlock('button', footer, btnTurnCardsParams)
        btnTurnCards.addEventListener('click', turnAllCards)

        // Функционал

        function updateTime() {
            gameTimeInSec++
            updateGameTime(gameTimeInSec)

            const seconds = gameInfo.time.seconds
            const minutes = gameInfo.time.minutes

            gameTimer.updateTime.byTimeData(minutes, seconds)
        }
        function reloadGame() {
            window.application.components.screens.open('game')
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
        function turnCard(card) {
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
    }

    listLoad()
}
window.application.components.screens.blocks.listFilling = function () {
    let screenBlocks = {}

    const listLoad = function () {
        // Перенос списка отрисовки в приложение
        const localList = screenBlocks
        for (const item of Object.keys(localList))
            window.application.components.screens.blocks.list[item] =
                localList[item]
    }

    let cssPrefix
    function getClassPrefix(appComponentName) {
        const appComponent = 'screenBlocks'
        cssPrefix = `${appComponent}_${appComponentName}_`
    }

    // Кнопка
    screenBlocks['button'] = function (
        container,
        params = { buttonName: 'Кнопка', buttonClass: 'regular' }
    ) {
        getClassPrefix('button')

        const button = document.createElement('button')
        button.classList.add(cssPrefix + params.buttonClass)
        container.appendChild(button)

        const buttonName = params.buttonName
        if (typeof buttonName === 'string') button.innerHTML = buttonName
        else console.log('Название кнопки не передано!')

        return button
    }

    // Блок сообщения
    screenBlocks['message'] = function (
        container,
        params = { message: `Сообщение` }
    ) {
        getClassPrefix('message')

        const messageDisplay = document.createElement('div')
        messageDisplay.classList.add(cssPrefix + 'msgDisplay')
        container.appendChild(messageDisplay)

        const messageBox = document.createElement('div')
        messageBox.classList.add(cssPrefix + 'msgBox')
        messageDisplay.appendChild(messageBox)

        const messageLine = document.createElement('p')
        messageBox.appendChild(messageLine)

        const message = params.message
        if (typeof message === 'string') messageLine.innerHTML = message
        else console.log('Сообщение не передано!')

        return messageDisplay
    }

    // Блок таймера
    screenBlocks['gameTimer'] = function (container) {
        getClassPrefix('gameTimer')

        // Отрисовка блоков таймера

        const timerBox = document.createElement('div')
        timerBox.classList.add(cssPrefix + `Box`)
        container.appendChild(timerBox)

        const timerMinBox = document.createElement('div')
        timerMinBox.classList.add(cssPrefix + `SubBox`)
        timerBox.appendChild(timerMinBox)
        const timerSecBox = document.createElement('div')
        timerSecBox.classList.add(cssPrefix + `SubBox`)
        timerBox.appendChild(timerSecBox)

        const pMin = document.createElement('p')
        pMin.textContent = 'min'
        timerMinBox.appendChild(pMin)
        const pSec = document.createElement('p')
        pSec.textContent = 'sec'
        timerSecBox.appendChild(pSec)

        const hMin = document.createElement('h1')
        hMin.textContent = '00'
        timerMinBox.appendChild(hMin)
        const hSec = document.createElement('h1')
        hSec.textContent = '.00'
        timerSecBox.appendChild(hSec)

        // Функционал

        let timerData = {}
        timerData.selectorOfMinutes = hMin
        timerData.selectorOfSeconds = hSec
        timerData.updateTime = {}
        timerData.updateTime.byTimeData = function (minutes, seconds) {
            hMin.textContent = minutes < 10 ? '0' + minutes : minutes
            hSec.textContent = seconds < 10 ? '.0' + seconds : '.' + seconds
        }
        timerData.updateTime.bySecondsData = function (seconds) {
            const minutes = Math.floor(seconds / 60)
            const remainingSeconds = seconds - minutes * 60

            hMin.textContent = minutes < 10 ? '0' + minutes : minutes
            hSec.textContent =
                remainingSeconds < 10
                    ? '.0' + remainingSeconds
                    : '.' + remainingSeconds
        }

        return timerData
    }

    listLoad()
}
