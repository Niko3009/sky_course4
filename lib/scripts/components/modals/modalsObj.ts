// ---------- ОБЪЕКТ МОДАЛЬНЫХ ОКОН (MODAL) ----------

import { list as modalsList } from './modalsList'
import { list as modalBlocksList } from './modalBlocksList'
import { container as modalContainer } from './modalContainer'

export const modals = {
    list: modalsList,

    // Открытие окна
    open: function (newModal: string) {
        const appObj = window.app
        const appData = appObj.data
        const components = appObj.components

        const modalDisplay = components.modals.template.display
        const modalBox = components.modals.template.box
        const modalCover = components.modals.template.cover

        const modalRendering = components.modals.list[newModal] // функция отрисовки

        const newModalOpening = components.blockVisibility.Off // анимация появления
        const modalAnimationTime = components.transitions.modalAnimationTime

        const makeDelay = components.dev.makeDelay

        const modalClosingTime = components.transitions.modalClosingTime
        const modalOpeningTime = components.transitions.modalOpeningTime
        const delayBetweenTransitions =
            components.transitions.delayBetweenTransitions

        // Предварительные проверки

        const doesNewModalExist = Boolean(modalRendering)
        if (!doesNewModalExist) {
            const warning = `Окна «${newModal}» в window.app.components.modals.list нет`
            console.error(warning)
            return
        }

        const isModalTransitionInProgress =
            appData.state.isModalTransitionInProgress
        if (isModalTransitionInProgress) {
            const warning =
                `Открыть окно «${newModal}» сейчас нельзя:\n ` +
                `переход уже запущен`
            console.error(warning)
            return
        }

        // Закрытие текущего окна

        const currentModalClosing = components.modals.close
        let delayBeforeModalOpening = 0

        const currentModal = appData.state.modal
        const isModalOpenedNow = Boolean(currentModal)
        if (isModalOpenedNow)
            delayBeforeModalOpening +=
                modalClosingTime + delayBetweenTransitions

        currentModalClosing()

        // Открытие нового окна

        makeDelay(delayBeforeModalOpening, () => {
            appData.state.isModalTransitionInProgress = true
            modalCover.style.display = 'block'

            const breakLine = `··············· Окно «${newModal}» ···············`
            console.log(`\n`, breakLine, `\n\n`) // отметка в консоли

            const newAppGlobalState = `${newModal} (modal)`
            appData.state.globalState = newAppGlobalState // отметка в глобальном состоянии
            appData.state.globalStateNumber++
            appData.state.modal = newModal
            appData.state.modalNumber++

            modalRendering(modalBox)

            newModalOpening(modalDisplay, modalAnimationTime)

            makeDelay(modalOpeningTime, () => {
                appData.state.isModalTransitionInProgress = false
                modalCover.style.removeProperty('display')
            })
        })
    },

    // Закрытие окна
    close: function () {
        const appObj = window.app
        const appData = appObj.data
        const components = appObj.components

        const modalDisplay = components.modals.template.display
        const modalBox = components.modals.template.box
        const modalCover = components.modals.template.cover

        const currentModalClosing = components.blockVisibility.On // анимация скрытия
        const modalAnimationTime = components.transitions.modalAnimationTime

        const makeDelay = components.dev.makeDelay

        const modalClosingTime = components.transitions.modalClosingTime

        // Предварительные проверки

        const currentModal = appData.state.modal
        const isModalOpenedNow = Boolean(currentModal)
        if (!isModalOpenedNow) return

        const isModalTransitionInProgress =
            appData.state.isModalTransitionInProgress
        if (isModalTransitionInProgress) {
            const warning =
                `Закрыть окно «${currentModal}» сейчас нельзя:\n ` +
                `переход уже запущен`
            console.error(warning)
            return
        }

        // Закрытие окна

        appData.state.isModalTransitionInProgress = true
        modalCover.style.display = 'block'

        currentModalClosing(modalDisplay, modalAnimationTime)
        const currentModalClosingTime = modalClosingTime

        makeDelay(currentModalClosingTime, () => {
            modalBox.innerHTML = ''
            modalDisplay.classList = modalDisplay.classList[0]

            appData.state.globalState = null // отметка в глобальном состоянии
            appData.state.globalStateNumber++
            appData.state.modal = null

            const breakLine = `Модальное окно «${currentModal}» закрыто    ·······················`
            console.log(`\n`, breakLine, `\n\n`)
            console.log(`\n\n\n`) // отметка в консоли

            appData.state.isModalTransitionInProgress = false
            modalCover.style.removeProperty('display')
        })
    },

    // Блоки для верстки окна
    blocks: {
        list: modalBlocksList,

        render: function (
            blockName: string,
            container = window.app.components.modals.template.box,
            params: any = new Object()
        ) {
            const blocks = window.app.components.modals.blocks

            if (blocks.list[blockName] === undefined) {
                const warning = `Блока ${blockName} в components.modals.blocks.list нет`
                console.error(warning)
                return
            }
            if (container === null) {
                const warning = `В body нет поля (контейнера), введенного для ${blockName}`
                console.error(warning)
                return
            }

            // запускаем функцию верстки блока и сохраняем результат (если он был передан)

            const result = blocks.list[blockName](container, params)

            if (result !== undefined) return result
        },
    },

    // Шаблон для окна
    template: modalContainer,
}
