// --------------------- ТЕКУЩИЕ ДАННЫЕ ПРИЛОЖЕНИЯ ---------------------

window.app.data = {
    // ГЛОБАЛЬНОЕ СОСТОЯНИЕ
    state: {
        globalState: null,

        screen: null,
        modal: null,

        globalStateNumber: 0,
        screenNumber: 0,
        modalNumber: 0,

        isAnimationInProgress: false,

        // isTransitionInProgress: false,

        isScreenTransitionInProgress: false,
        isModalTransitionInProgress: false,
    },

    // ДАННЫЕ ИГРЫ
    game: {
        difficulty: 0,
        time: {
            secondsAll: 0,
            seconds: 0,
            minutes: 0,
            updateTheData(secondsAll) {
                const minutes = Math.floor(secondsAll / 60)
                const remainingSeconds = secondsAll - minutes * 60

                window.app.data.game.time.secondsAll = secondsAll
                window.app.data.game.time.minutes = minutes
                window.app.data.game.time.seconds = remainingSeconds
            },
        },
        cards: { involved: null, founded: null },
        gameFieldData: { openedCards: null, closedCards: null },

        resetDataToDefault() {
            const gameData = window.app.data.game

            gameData.difficulty = 0

            gameData.time.secondsAll = 0
            gameData.time.seconds = 0
            gameData.time.minutes = 0

            gameData.cards.involved = null
            gameData.cards.founded = null

            gameData.gameFieldData.openedCards = null
            gameData.gameFieldData.closedCards = null
        },
    },

    // ВЫВЕСТИ ДАННЫЕ (вспомогательная)
    getInfo() {
        const gameData = window.app.data.game

        // short app data
        let data = {
            globalState: window.app.data.state.globalState,
            difficulty: gameData.difficulty,
            time: `${gameData.time.minutes}m ${gameData.time.seconds}s`,
            cards: gameData.cards,
        }

        // full app data
        // data = window.app.data

        console.log(data)
        return data
    },
}
