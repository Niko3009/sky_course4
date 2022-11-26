// --------------------- ТЕКУЩИЕ ДАННЫЕ ПРИЛОЖЕНИЯ ---------------------

export const data = {
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
        status: 'outOfGame',
        difficulty: 0,
        time: {
            secondsAll: 0,
            seconds: 0,
            minutes: 0,
            summary: `0m 0s`,

            updateTheData(secondsAll) {
                const timeObj = window.app.data.game.time

                const minutes = Math.floor(secondsAll / 60)
                const remainingSeconds = secondsAll - minutes * 60

                timeObj.secondsAll = secondsAll
                timeObj.minutes = minutes
                timeObj.seconds = remainingSeconds

                timeObj.summary = `${timeObj.minutes}m ${timeObj.seconds}s`
            },
        },
        cards: { involved: new Array(), founded: new Array() },
        gameFieldData: { openedCards: null, closedCards: null },

        resetDataToDefault() {
            const gameData = window.app.data.game

            gameData.status = 'outOfGame'
            gameData.difficulty = 0

            gameData.time.secondsAll = 0
            gameData.time.seconds = 0
            gameData.time.minutes = 0
            gameData.time.summary = `0m 0s`

            gameData.cards.involved = null
            gameData.cards.founded = null

            gameData.gameFieldData.openedCards = null
            gameData.gameFieldData.closedCards = null
        },
    },

    // ВЫВЕСТИ ДАННЫЕ (вспомогательная)
    getInfo() {
        const dataObj = window.app.data
        const gameData = dataObj.game

        // short app data
        let data = {
            globalState: dataObj.state.globalState,
            difficulty: gameData.difficulty,
            time: gameData.time.summary,
            cards: gameData.cards,
        }

        // full app data
        // data = window.app.data

        console.log(data)
        return data
    },
}
