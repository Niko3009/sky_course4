//------------------- ДВИЖОК ОТРИСОВКИ -------------------

window.application = {
    // ОБЩЕЕ
    selectors: {
        container: document.body.querySelector('#app'), // основной блок приложения
        tabtitle: document.head.querySelector('title'), // тег названия вкладки
    },
    launch: function () {
        // Отметка в консоли
        console.log(`\n`, `ЗАПУСК ПРИЛОЖЕНИЯ\n`, `\n`)
        console.log(
            `\n`,
            `Для получения текущей информации об игре, нажмите «z» \n`,
            `\n`
        )

        // Предварительная...
        window.application.pre.render() // отрисовка
        window.application.pre.loading() // загрузка данных
        window.application.pre.setting() // настройка приложения

        // Запуск
        const startScreenName = 'start screen'
        console.log(
            `\n`,
            `―――――――――――――――――― ЭКРАН «${startScreenName.toUpperCase()}» ――――――――――――――――――\n`,
            `\n`
        )
        window.application.info.state.screen = startScreenName

        window.application.components.windows.open('select') // запуск стартового окна
        // window.application.components.screens.open('game')
    },
    pre: {
        render: function () {
            window.application.components.screens.preRender()
            window.application.components.windows.preRender()
        },
        loading: function () {
            // Подгрузка логики приложения
            window.application.logic.game.listFilling()

            // Подгрузка экранов
            window.application.components.screens.blocks.listFilling()
            window.application.components.screens.listFilling()

            // Подгрузка окон
            window.application.components.windows.blocks.listFilling()
            window.application.components.windows.listFilling()
        },
        setting: function () {
            // Горячая клавиша для вывода информации
            document.addEventListener('keydown', function (event) {
                if (event.key === 'z' || event.key === 'я')
                    window.application.functions.getGameInfo()
            })
        },
    },

    // СОСТОЯНИЕ ПРИЛОЖЕНИЯ
    info: {
        state: {
            global: null, //select, game, result
            screen: null,
            window: null,
        },

        game: {
            difficulty: 0,
            time: {
                secondsAll: 0,
                seconds: 0,
                minutes: 0,
                updateInfo: function (secondsAll) {
                    const minutes = Math.floor(secondsAll / 60)
                    const remainingSeconds = secondsAll - minutes * 60

                    window.application.info.game.time.secondsAll = secondsAll
                    window.application.info.game.time.minutes = minutes
                    window.application.info.game.time.seconds = remainingSeconds
                },
            },
            cards: { involved: null, selected: null },
        },
    },

    // ЛОГИКА ПРИЛОЖЕНИЯ
    logic: {
        // ЛОГИКА ИГРЫ
        game: {
            list: [],
            listFilling: function () {},
        },
    },

    // КОМПОНЕНТЫ ПРИЛОЖЕНИЯ (экраны, окна и т.д.)
    components: {
        // ЭКРАНЫ
        screens: {
            list: [],
            listFilling: function () {},

            // Открытие и закрытие экрана
            open: function (screenName) {
                // Проверка на наличие запрашиваемого экрана
                if (
                    window.application.components.screens.list[screenName] ===
                    undefined
                ) {
                    console.log(
                        `❗`,
                        `Экрана «${screenName}» в window.application.components.screens.list нет`
                    )
                    return
                }

                const box = window.application.components.screens.box
                const display = window.application.components.screens.display
                const screenAnimationTime =
                    window.application.components.screens.animation.time // время анимации экрана
                const windowAnimationTime =
                    window.application.components.windows.animation.time // время анимации окна

                // Закрытие текущего экрана и открытие нового (с учетом задержки на анимацию)
                let delay = 0
                if (window.application.info.state.window !== null) {
                    window.application.components.windows.close()
                    delay += windowAnimationTime
                }
                if (window.application.info.state.screen !== null) {
                    window.application.components.screens.close()
                    delay += screenAnimationTime
                }

                setTimeout(openNewScreen, delay * 1000)

                function openNewScreen() {
                    // Отметка в консоли
                    console.log(
                        `\n`,
                        `―――――――――――――――――― ЭКРАН «${screenName.toUpperCase()}» ――――――――――――――――――\n`,
                        `\n`
                    )

                    // Отметка в статусе приложения
                    window.application.info.state.global =
                        screenName + ` (screen)`
                    window.application.info.state.screen = screenName

                    // Отрисовка (рендеринг)
                    window.application.components.screens.list[screenName](box) // заполнение контентом
                    window.application.functions.hiding.Off(
                        display,
                        screenAnimationTime
                    ) // анимация появления
                }
            },
            close: function () {
                const box = window.application.components.screens.box
                const display = window.application.components.screens.display
                const screenAnimationTime =
                    window.application.components.screens.animation.time // время анимации экрана
                const currentScreen = window.application.info.state.screen

                if (currentScreen !== null) {
                    // Очистка
                    window.application.functions.hiding.On(
                        display,
                        screenAnimationTime
                    ) // анимация скрытия
                    setTimeout(
                        () => (box.innerHTML = ''),
                        screenAnimationTime * 1000
                    ) // очистка контента

                    // Отметка в консоли
                    console.log(
                        `\n`,
                        `Экран «${currentScreen}» закрыт ✅\n`,
                        `――――――――――――――――――――――――――――――――――――――――――――――\n`,
                        `\n`
                    )
                    console.log(`\n`, `\n`, `\n`)

                    // Отметка в статусе приложения
                    window.application.info.state.global = null
                    window.application.info.state.screen = null
                }
            },

            // Шаблон для экрана
            box: null, // сам экран (область с контентом)
            display: null, // задний фон (поверх него располагается экран)
            preRender: function () {
                const app = window.application.selectors.container

                const display = document.createElement('div')
                display.classList.add('screenDisplay')
                app.appendChild(display)

                const box = document.createElement('div')
                box.classList.add('screenBox')
                display.appendChild(box)

                window.application.components.screens.display = display
                window.application.components.screens.box = box
            },

            // Блоки для верстки экрана
            blocks: {
                list: [],
                listFilling: function () {},

                render: function (
                    blockName,
                    container = window.application.components.screens.box,
                    params = {}
                ) {
                    if (
                        window.application.components.screens.blocks.list[
                            blockName
                        ] === undefined
                    ) {
                        console.log(
                            `❗`,
                            `Блока ${blockName} в window.application.components.screens.blocks.list нет`
                        )
                        return
                    }
                    if (container === null) {
                        console.log(
                            `❗`,
                            `В body нет поля (контейнера), введенного для ${blockName}`
                        )
                        return
                    }

                    // запускаем функцию верстки блока и сохраняем результат (если он был передан)
                    const result =
                        window.application.components.screens.blocks.list[
                            blockName
                        ](container, params)

                    if (result !== undefined) return result
                },
            },

            //Анимация экрана
            animation: {
                time: 0.5, // время анимации
            },
        },

        // МОДАЛЬНЫЕ ОКНА
        windows: {
            list: [],
            listFilling: function () {},

            // Открытие и закрытие окна
            open: function (windowName) {
                // Проверка на наличие запрашиваемого окна
                if (
                    window.application.components.windows.list[windowName] ===
                    undefined
                ) {
                    console.log(
                        `❗`,
                        `Окна «${windowName}» в window.application.components.windows.list нет !`
                    )
                    return
                }

                const box = window.application.components.windows.box
                const display = window.application.components.windows.display
                const windowAnimationTime =
                    window.application.components.windows.animation.time // время анимации окна

                // Закрытие текущего окна и открытие нового (с учетом задержки на анимацию)
                let delay = 0
                if (window.application.info.state.window !== null) {
                    window.application.components.windows.close()
                    delay += windowAnimationTime
                }

                setTimeout(openNewWindow, delay * 1000)

                function openNewWindow() {
                    // Отметка в консоли
                    console.log(
                        `\n`,
                        `··············· МОДАЛЬНОЕ ОКНО «${windowName.toUpperCase()}» ···············\n`,
                        `\n`
                    )

                    // Отрисовка (рендеринг)
                    window.application.components.windows.list[windowName](box) // заполнение окна контентом
                    window.application.functions.hiding.Off(
                        display,
                        windowAnimationTime
                    ) // анимация появления

                    // Отметка в статусе приложения
                    window.application.info.state.global =
                        windowName + ` (window)`
                    window.application.info.state.window = windowName
                }
            },
            close: function () {
                const box = window.application.components.windows.box
                const display = window.application.components.windows.display
                const windowAnimationTime =
                    window.application.components.windows.animation.time // время анимации окна
                const currentWindow = window.application.info.state.window

                if (currentWindow !== null) {
                    // Очистка
                    window.application.functions.hiding.On(
                        display,
                        windowAnimationTime
                    ) // анимация скрытия
                    setTimeout(
                        () => (box.innerHTML = ''),
                        windowAnimationTime * 1000
                    ) // очистка контента

                    // Отметка в консоли
                    console.log(
                        `\n`,
                        `Модальное окно «${currentWindow}» закрыто \n`,
                        `···········································\n`,
                        `\n`
                    )

                    // Отметка в статусе приложения
                    window.application.info.state.global =
                        window.application.info.state.screen + ` (screen)`
                    window.application.info.state.window = null
                }
            },

            // Шаблон для окна
            box: null, // само окно (область с контентом)
            display: null, // задний фон (поверх него располагается окно)
            preRender: function () {
                const app = window.application.selectors.container

                const display = document.createElement('div')
                display.classList.add('windowDisplay')
                display.style.display = 'none'
                display.style.opacity = '0'
                app.appendChild(display)

                const box = document.createElement('div')
                box.classList.add('windowBox')
                display.appendChild(box)

                window.application.components.windows.display = display
                window.application.components.windows.box = box
            },

            // Блоки для верстки окна
            blocks: {
                list: [],
                listFilling: function () {},

                render: function (
                    blockName,
                    container = window.application.components.windows.box,
                    params = {}
                ) {
                    if (
                        window.application.components.windows.blocks.list[
                            blockName
                        ] === undefined
                    ) {
                        console.log(
                            `❗`,
                            `Блока ${blockName} в window.application.components.windows.blocks.list нет`
                        )
                        return
                    }
                    if (container === null) {
                        console.log(
                            `❗`,
                            `В body нет поля (контейнера), введенного для ${blockName}`
                        )
                        return
                    }

                    // запускаем функцию верстки блока и сохраняем результат (если он был передан)
                    const result =
                        window.application.components.windows.blocks.list[
                            blockName
                        ](container, params)

                    if (result !== undefined) return result
                },
            },

            //Анимация окна
            animation: {
                time: 0.5, // время анимации
            },
        },
    },

    // ТАЙМЕРЫ
    timers: {
        list: [],
        start: function (intervalInSeconds, func) {
            window.application.timers.list.push(
                setInterval(func, intervalInSeconds * 1000)
            )
        },
        clearAll: function () {
            window.application.timers.list.forEach((timer) =>
                clearInterval(timer)
            )
            window.application.timers.list = []
        },
    },

    // ДОП. ФУНКЦИИ
    functions: {
        // Скрытие и раскрытие блока
        hiding: {
            // Скрытие блока
            On: function (block, duration) {
                block.style.transition = `all ${duration}s`
                block.style.opacity = '0'

                setTimeout(() => {
                    block.style.removeProperty('transition')

                    block.style.display = 'none'
                }, duration * 1000)
            },

            // Раскрытие блока
            Off: function (block, duration) {
                block.style.removeProperty('display')

                setTimeout(() => {
                    block.style.transition = `all ${duration}s`
                    block.style.removeProperty('opacity')

                    setTimeout(() => {
                        block.style.removeProperty('transition')
                    }, duration * 1000)
                }, 10)
            },
        },

        // Получение информации о глобальном состоянии игры
        getGameInfo: function () {
            console.log(window.application.info)
            return window.application.info
        },
    },
}

//---------------------- СОБЫТИЯ -------------------------

document.addEventListener('DOMContentLoaded', window.application.launch)
