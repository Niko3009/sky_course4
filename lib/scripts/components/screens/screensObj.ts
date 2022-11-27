// ---------- ОБЪЕКТ ЭКРАНОВ ----------

import { list as screensList } from './screensList'
import { list as screenBlocksList } from './screenBlocksList'
import { container as screenContainer } from './screenContainer'

export const screens = {
    list: screensList,

    // Открытие экрана
    open: function (newScreen: string) {
        const appObj = window.app
        const appData = appObj.data
        const components = appObj.components

        const screenDisplay = components.screens.template.display
        const screenBox = components.screens.template.box
        const screenCover = components.screens.template.cover

        const screenRendering = components.screens.list[newScreen] // функция отрисовки

        const newScreenOpening = components.blockVisibility.Off // анимация появления
        const screenAnimationTime = components.transitions.screenAnimationTime

        const makeDelay = components.dev.makeDelay

        const screenClosingTime = components.transitions.modalClosingTime
        const screenOpeningTime = components.transitions.screenOpeningTime
        const delayBetweenTransitions =
            components.transitions.delayBetweenTransitions

        // Предварительные проверки

        const doesNewScreenExist = Boolean(screenRendering)
        if (!doesNewScreenExist) {
            const warning = `Экрана «${newScreen}» в window.app.components.screens.list нет`
            console.log(`❗`, warning)
            return
        }

        const isScreenTransitionInProgress =
            appData.state.isScreenTransitionInProgress
        if (isScreenTransitionInProgress) {
            const warning =
                `Открыть экран «${newScreen}» сейчас нельзя:\n ` +
                `переход уже запущен`
            console.log(`❗`, warning)
            return
        }

        // Закрытие текущего экрана

        const currentScreenClosing = components.screens.close
        let delayBeforeScreenOpening = 0

        const currentScreen = appData.state.screen
        const isScreenOpenedNow = Boolean(currentScreen)
        if (isScreenOpenedNow)
            delayBeforeScreenOpening +=
                screenClosingTime + delayBetweenTransitions

        currentScreenClosing()

        // Открытие нового экрана

        makeDelay(delayBeforeScreenOpening, () => {
            appData.state.isScreenTransitionInProgress = true
            screenCover.style.display = 'block'

            const breakLine = `―――――――――――――――――― ЭКРАН «${newScreen.toUpperCase()}» ――――――――――――――――――`
            console.log(`\n`, breakLine, `\n\n`) // отметка в консоли

            const newAppGlobalState = `${newScreen} (screen)`
            appData.state.globalState = newAppGlobalState // отметка в глобальном состоянии
            appData.state.globalStateNumber++
            appData.state.screen = newScreen
            appData.state.screenNumber++

            screenRendering(screenBox)

            newScreenOpening(screenDisplay, screenAnimationTime)

            makeDelay(screenOpeningTime, () => {
                appData.state.isScreenTransitionInProgress = false
                screenCover.style.removeProperty('display')
            })
        })
    },

    // Закрытие экрана
    close: function () {
        const appObj = window.app
        const appData = appObj.data
        const components = appObj.components

        const screenDisplay = components.screens.template.display
        const screenBox = components.screens.template.box
        const screenCover = components.screens.template.cover

        const currentScreenClosing = components.blockVisibility.On // анимация скрытия
        const screenAnimationTime = components.transitions.screenAnimationTime

        const makeDelay = components.dev.makeDelay

        const screenClosingTime = components.transitions.screenClosingTime

        // Предварительные проверки

        const currentScreen = appData.state.screen
        const isScreenOpenedNow = Boolean(currentScreen)
        if (!isScreenOpenedNow) return

        const isScreenTransitionInProgress =
            appData.state.isScreenTransitionInProgress
        if (isScreenTransitionInProgress) {
            const warning =
                `Закрыть экран «${currentScreen}» сейчас нельзя:\n ` +
                `переход уже запущен`
            console.log(`❗`, warning)
            return
        }

        // Закрытие экрана

        appData.state.isScreenTransitionInProgress = true
        screenCover.style.display = 'block'

        currentScreenClosing(screenDisplay, screenAnimationTime)
        const currentScreenClosingTime = screenClosingTime

        makeDelay(currentScreenClosingTime, () => {
            screenBox.innerHTML = ''
            screenDisplay.classList = screenDisplay.classList[0]

            appData.state.globalState = null // отметка в глобальном состоянии
            appData.state.globalStateNumber++
            appData.state.screen = null

            const breakLine = `Экран «${currentScreen}» закрыт    ――――――――――――――――――――――――――――――――――――――――――――――`
            console.log(`\n`, breakLine, `\n\n`)
            console.log(`\n\n\n`) // отметка в консоли

            appData.state.isScreenTransitionInProgress = false
            screenCover.style.removeProperty('display')

            // ---------------ОСТАНОВКА ТАЙМЕРОВ ---------- !!!!!!

            appObj.timers.stopAll()
            appObj.timeouts.stopAll()
        })
    },

    // Блоки для верстки экрана
    blocks: {
        list: screenBlocksList,

        render: function (
            blockName: string,
            container = window.app.components.screens.template.box,
            params: any = new Object()
        ) {
            const blocks = window.app.components.screens.blocks

            if (blocks.list[blockName] === undefined) {
                const warning = `Блока ${blockName} в components.screens.blocks.list нет`
                console.log(`❗`, warning)
                return
            }
            if (container === null) {
                const warning = `В body нет поля (контейнера), введенного для ${blockName}`
                console.log(`❗`, warning)
                return
            }

            // запускаем функцию верстки блока и сохраняем результат (если он был передан)

            const result = blocks.list[blockName](container, params)

            if (result !== undefined) return result
        },
    },

    // Шаблон для экрана
    template: screenContainer,
}
