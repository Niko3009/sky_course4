//------------------- ДВИЖОК ПРИЛОЖЕНИЯ -------------------

window.app = {
    // ПРОЦЕДУРА ЗАПУСКА
    launch: function () {
        console.log(`\n`, `ЗАПУСК ПРИЛОЖЕНИЯ`, `\n\n`)

        const startDelay = 0.5

        preRender() // предварительная отрисовка
        preLoading() // предварительная подгрузка данных
        preSetting() // предварительная настройка приложения

        // Запуск

        setTimeout(start, startDelay)

        // Функции

        function start() {
            const openTheWindow = window.app.components.windows.open
            openTheWindow('difficulty selection')
            // openTheScreen('game')
        }

        function preRender() {
            window.app.components.screens.template.preRender()
            window.app.components.windows.template.preRender()
        }

        function preLoading() {
            // Подгрузка экранов
            window.app.components.screens.blocks.listFilling()
            window.app.components.screens.listFilling()
            // Подгрузка окон
            window.app.components.windows.blocks.listFilling()
            window.app.components.windows.listFilling()
        }

        function preSetting() {
            // Горячие клавиши (hotkeys)
            document.addEventListener('keydown', function (event) {
                // Hotkey для вывода информации
                const getInfo = window.app.data.getInfo
                const getInfoHotkeys = ['z', 'я']
                if (getInfoHotkeys.includes(event.key)) getInfo()
            })
            let instructionsForHotkeys = new String()
            instructionsForHotkeys += `Для получения текущей информации об игре, нажмите «z»/«я» \n`
            console.log(`\n`, instructionsForHotkeys, `\n`)
        }
    },

    // ТЕКУЩИЕ ДАННЫЕ ПРИЛОЖЕНИЯ
    data: {
        // ГЛОБАЛЬНОЕ СОСТОЯНИЕ
        state: {
            globalState: null,

            screen: null,
            window: null,

            globalStateNumber: 0,
            screenNumber: 0,
            windowNumber: 0,

            isTransitionInProgress: false,
        },

        // ДАННЫЕ ИГРЫ
        game: {
            difficulty: 0,
            time: {
                secondsAll: 0,
                seconds: 0,
                minutes: 0,
                updateTheData: function (secondsAll) {
                    const minutes = Math.floor(secondsAll / 60)
                    const remainingSeconds = secondsAll - minutes * 60

                    window.app.data.game.time.secondsAll = secondsAll
                    window.app.data.game.time.minutes = minutes
                    window.app.data.game.time.seconds = remainingSeconds
                },
            },
            cards: { involved: null, selected: null },
        },

        // ВЫВЕСТИ ДАННЫЕ (вспомогательная)
        getInfo: function () {
            console.log(window.app.data)
            return window.app.data
        },
    },

    // КОМПОНЕНТЫ ПРИЛОЖЕНИЯ
    components: {}, // см. lib\jsFiles\appComponentsEngine.js

    // ПОЛУЧЕНИЕ БЭК-ЭНД ДАННЫХ
    backEndData: {}, // см. -

    // ТАЙМЕРЫ
    timers: {
        list: [],
        start: function (intervalInSeconds, func) {
            let timerId = setInterval(func, intervalInSeconds * 1000)
            window.app.timers.list.push(timerId)
            return timerId
        },
        clearAll: function () {
            window.app.timers.list.forEach((timer) => clearInterval(timer))
            window.app.timers.list = []
        },
    },

    // HTML-СЕЛЕКТОРЫ
    selectors: {
        container: document.body.querySelector('#app'), // контейнер приложения
        tabTitle: document.head.querySelector('title'), // тег названия вкладки
    },
}
