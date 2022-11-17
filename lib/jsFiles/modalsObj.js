// ---------- ОБЪЕКТ МОДАЛЬНЫХ ОКОН (MODAL) ----------

window.app.components.modals = {
    list: [], // см. lib\jsFiles\componentsList\modalsList\*.js
    listFilling: function () {},

    // Открытие окна
    open: function (newModal) {
        const modalBox = window.app.components.modals.template.box
        const modalDisplay = window.app.components.modals.template.display
        const coverLayer = window.app.components.modals.template.coverLayer

        const modalRendering = window.app.components.modals.list[newModal] // функция отрисовки

        const newModalOpening = window.app.components.blockVisibility.Off // анимация появления
        const modalAnimationTime =
            window.app.components.transitions.modalAnimationTime

        const makeDelay = window.app.components.func.makeDelay

        const modalClosingTime =
            window.app.components.transitions.modalClosingTime
        const modalOpeningTime =
            window.app.components.transitions.modalOpeningTime
        const delayBetweenTransitions =
            window.app.components.transitions.delayBetweenTransitions

        // Предварительные проверки

        const doesNewModalExist = Boolean(modalRendering)
        if (!doesNewModalExist) {
            const warning = `Окна «${newModal}» в window.app.components.modals.list нет`
            console.log(`❗`, warning)
            return
        }

        const isModalTransitionInProgress =
            window.app.data.state.isModalTransitionInProgress
        if (isModalTransitionInProgress) {
            const warning =
                `Открыть окно «${newModal}» сейчас нельзя:\n ` +
                `переход уже запущен`
            console.log(`❗`, warning)
            return
        }

        // Закрытие текущего окна

        const currentModalClosing = window.app.components.modals.close
        let delayBeforeModalOpening = 0

        const currentModal = window.app.data.state.modal
        const isModalOpenedNow = Boolean(currentModal)
        if (isModalOpenedNow)
            delayBeforeModalOpening +=
                modalClosingTime + delayBetweenTransitions

        currentModalClosing()

        // Открытие нового окна

        makeDelay(delayBeforeModalOpening, () => {
            window.app.data.state.isModalTransitionInProgress = true
            coverLayer.style.display = 'block'

            const breakLine = `··············· Окно «${newModal}» ···············`
            console.log(`\n`, breakLine, `\n\n`) // отметка в консоли

            const newAppGlobalState = `${newModal} (modal)`
            window.app.data.state.globalState = newAppGlobalState // отметка в глобальном состоянии
            window.app.data.state.globalStateNumber++
            window.app.data.state.modal = newModal
            window.app.data.state.modalNumber++

            modalRendering(modalBox)

            newModalOpening(modalDisplay, modalAnimationTime)

            makeDelay(modalOpeningTime, () => {
                window.app.data.state.isModalTransitionInProgress = false
                coverLayer.style.removeProperty('display')
            })
        })
    },

    // Закрытие окна
    close: function () {
        const modalBox = window.app.components.modals.template.box
        const modalDisplay = window.app.components.modals.template.display
        const coverLayer = window.app.components.modals.template.coverLayer

        const currentModalClosing = window.app.components.blockVisibility.On // анимация скрытия
        const modalAnimationTime =
            window.app.components.transitions.modalAnimationTime

        const makeDelay = window.app.components.func.makeDelay

        const modalClosingTime =
            window.app.components.transitions.modalClosingTime

        coverLayer.style.display = 'block'

        // Предварительные проверки

        const currentModal = window.app.data.state.modal
        const isModalOpenedNow = Boolean(currentModal)
        if (!isModalOpenedNow) return

        const isModalTransitionInProgress =
            window.app.data.state.isModalTransitionInProgress
        if (isModalTransitionInProgress) {
            const warning =
                `Закрыть окно «${currentModal}» сейчас нельзя:\n ` +
                `переход уже запущен`
            console.log(`❗`, warning)
            return
        }

        // Закрытие окна

        window.app.data.state.isModalTransitionInProgress = true
        coverLayer.style.display = 'block'

        currentModalClosing(modalDisplay, modalAnimationTime)
        const currentModalClosingTime = modalClosingTime

        makeDelay(currentModalClosingTime, () => {
            modalBox.innerHTML = ''
            modalBox.classList = modalBox.classList[0]

            window.app.data.state.globalState = null // отметка в глобальном состоянии
            window.app.data.state.globalStateNumber++
            window.app.data.state.modal = null

            const breakLine = `Модальное окно «${currentModal}» закрыто    ·······················`
            console.log(`\n`, breakLine, `\n\n`)
            console.log(`\n\n\n`) // отметка в консоли

            window.app.data.state.isModalTransitionInProgress = false
            coverLayer.style.removeProperty('display')
        })
    },

    // Блоки для верстки окна
    blocks: {
        list: [],
        listFilling: function () {}, // см. lib\jsFiles\componentsList\modalsList\difficultySelection.js

        render: function (
            blockName,
            container = window.app.components.modals.template.box,
            params = {}
        ) {
            if (
                window.app.components.modals.blocks.list[blockName] ===
                undefined
            ) {
                console.log(
                    `❗`,
                    `Блока ${blockName} в window.app.components.modals.blocks.list нет`
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
            const result = window.app.components.modals.blocks.list[blockName](
                container,
                params
            )

            if (result !== undefined) return result
        },
    },

    // Шаблон для окна
    template: new window.app.components.class.objectForComponentTemplate(
        'modal'
    ),
}
