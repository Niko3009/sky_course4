// ---------- ОБЪЕКТ ЭКРАНОВ ----------

window.app.components.screens = {
    list: [], // см. lib\jsFiles\componentsList\screensList\*.js
    listFilling: function () {},

    // Открытие экрана
    open: function (newScreen) {
        const screenBox = window.app.components.screens.template.box
        const screenDisplay = window.app.components.screens.template.display
        const coverLayer = window.app.components.screens.template.coverLayer

        const screenRendering = window.app.components.screens.list[newScreen] // функция отрисовки

        const newScreenOpening = window.app.components.blockVisibility.Off // анимация появления
        const screenAnimationTime =
            window.app.components.transitions.screenAnimationTime

        const makeDelay = window.app.components.func.makeDelay

        const screenClosingTime =
            window.app.components.transitions.modalClosingTime
        const screenOpeningTime =
            window.app.components.transitions.screenOpeningTime
        const delayBetweenTransitions =
            window.app.components.transitions.delayBetweenTransitions

        // Предварительные проверки

        const doesNewScreenExist = Boolean(screenRendering)
        if (!doesNewScreenExist) {
            const warning = `Экрана «${newScreen}» в window.app.components.screens.list нет`
            console.log(`❗`, warning)
            return
        }

        const isScreenTransitionInProgress =
            window.app.data.state.isScreenTransitionInProgress
        if (isScreenTransitionInProgress) {
            const warning =
                `Открыть экран «${newScreen}» сейчас нельзя:\n ` +
                `переход уже запущен`
            console.log(`❗`, warning)
            return
        }

        // Закрытие текущего экрана

        const currentScreenClosing = window.app.components.screens.close
        let delayBeforeScreenOpening = 0

        const currentScreen = window.app.data.state.screen
        const isScreenOpenedNow = Boolean(currentScreen)
        if (isScreenOpenedNow)
            delayBeforeScreenOpening +=
                screenClosingTime + delayBetweenTransitions

        currentScreenClosing()

        // Открытие нового экрана

        makeDelay(delayBeforeScreenOpening, () => {
            window.app.data.state.isScreenTransitionInProgress = true
            coverLayer.style.display = 'block'

            const breakLine = `―――――――――――――――――― ЭКРАН «${newScreen.toUpperCase()}» ――――――――――――――――――`
            console.log(`\n`, breakLine, `\n\n`) // отметка в консоли

            const newAppGlobalState = `${newScreen} (screen)`
            window.app.data.state.globalState = newAppGlobalState // отметка в глобальном состоянии
            window.app.data.state.globalStateNumber++
            window.app.data.state.screen = newScreen
            window.app.data.state.screenNumber++

            screenRendering(screenBox)

            newScreenOpening(screenDisplay, screenAnimationTime)

            makeDelay(screenOpeningTime, () => {
                window.app.data.state.isScreenTransitionInProgress = false
                coverLayer.style.removeProperty('display')
            })
        })
    },

    // Закрытие экрана
    close: function () {
        const screenBox = window.app.components.screens.template.box
        const screenDisplay = window.app.components.screens.template.display
        const coverLayer = window.app.components.screens.template.coverLayer

        const currentScreenClosing = window.app.components.blockVisibility.On // анимация скрытия
        const screenAnimationTime =
            window.app.components.transitions.screenAnimationTime

        const makeDelay = window.app.components.func.makeDelay

        const screenClosingTime =
            window.app.components.transitions.screenClosingTime

        // Предварительные проверки

        const currentScreen = window.app.data.state.screen
        const isScreenOpenedNow = Boolean(currentScreen)
        if (!isScreenOpenedNow) return

        const isScreenTransitionInProgress =
            window.app.data.state.isScreenTransitionInProgress
        if (isScreenTransitionInProgress) {
            const warning =
                `Закрыть экран «${currentScreen}» сейчас нельзя:\n ` +
                `переход уже запущен`
            console.log(`❗`, warning)
            return
        }

        // Закрытие экрана

        window.app.data.state.isScreenTransitionInProgress = true
        coverLayer.style.display = 'block'

        currentScreenClosing(screenDisplay, screenAnimationTime)
        const currentScreenClosingTime = screenClosingTime

        makeDelay(currentScreenClosingTime, () => {
            screenBox.innerHTML = ''
            screenBox.classList = screenBox.classList[0]

            window.app.data.state.globalState = null // отметка в глобальном состоянии
            window.app.data.state.globalStateNumber++
            window.app.data.state.screen = null

            const breakLine = `Экран «${currentScreen}» закрыт    ――――――――――――――――――――――――――――――――――――――――――――――`
            console.log(`\n`, breakLine, `\n\n`)
            console.log(`\n\n\n`) // отметка в консоли

            window.app.data.state.isScreenTransitionInProgress = false
            coverLayer.style.removeProperty('display')
        })
    },

    // Блоки для верстки экрана
    blocks: {
        list: [],
        listFilling: function () {}, // см. lib\jsFiles\componentsList\screenBlocksList.js

        render: function (
            blockName,
            container = window.app.components.screens.template.box,
            params = {}
        ) {
            if (
                window.app.components.screens.blocks.list[blockName] ===
                undefined
            ) {
                console.log(
                    `❗`,
                    `Блока ${blockName} в window.app.components.screens.blocks.list нет`
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
            const result = window.app.components.screens.blocks.list[blockName](
                container,
                params
            )

            if (result !== undefined) return result
        },
    },

    // Шаблон для экрана
    template: new window.app.components.class.objectForComponentTemplate(
        'screen'
    ),
}
