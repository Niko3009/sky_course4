// ---------- ДВИЖОК КОМПОНЕНТОВ ПРИЛОЖЕНИЯ ----------

window.app.components = {
    // ЭКРАНЫ
    screens: {
        // Комментарий:
        // Вызов нового экрана вызывает закрытие уже открытых экрана и модального окна.
        // Поэтому вызывать их следует в порядке: сначала — экран, потом — окно.
        // Иначе новое окно сразу же закроется.

        list: [], // см. lib\jsFiles\appComponents\appScreens\*.js
        listFilling: function () {},

        // Открытие экрана
        open: function (newScreen) {
            const screenBox = window.app.components.screens.box
            const screenDisplay = window.app.components.screens.template.display

            const screenRendering =
                window.app.components.screens.list[newScreen] // функция отрисовки

            const newScreenShowing =
                window.app.components.componentVisibility.Off // анимация появления
            const screenAnimationTime =
                window.app.components.transitions.screenAnimationTime

            const makeDelay = window.app.components.func.makeDelay
            const delayBetweenTransitions =
                window.app.components.transitions.delayBetweenTransitions
            const windowClosingTime =
                window.app.components.transitions.windowAnimationTime +
                window.app.components.transitions.delayBeforeComponentHiding
            const screenClosingTime =
                window.app.components.transitions.screenAnimationTime +
                window.app.components.transitions.delayBeforeComponentHiding

            // Предварительные проверки

            const doesTheScreenExist = Boolean(screenRendering)
            if (!doesTheScreenExist) {
                const warning = `Экрана «${newScreen}» в window.app.components.screens.list нет`
                console.log(`❗`, warning)
                return
            }

            // Закрытие текущего экрана
            // (вместе с экраном будет закрыто и модальное окно)

            const currentScreenClosing = window.app.components.screens.close
            let currentScreenClosingTime = 0

            const currentWindow = window.app.data.state.window
            const isWindowOpenedNow = Boolean(currentWindow)
            if (isWindowOpenedNow)
                currentScreenClosingTime +=
                    windowClosingTime + delayBetweenTransitions

            const currentScreen = window.app.data.state.screen
            const isScreenOpenedNow = Boolean(currentScreen)
            if (isScreenOpenedNow)
                currentScreenClosingTime +=
                    screenClosingTime + delayBetweenTransitions

            currentScreenClosing()

            // Открытие нового экрана

            makeDelay(currentScreenClosingTime, () => {
                const breakLine = `―――――――――――――――――― ЭКРАН «${newScreen.toUpperCase()}» ――――――――――――――――――`
                console.log(`\n`, breakLine, `\n\n`) // отметка в консоли

                const newAppGlobalState = `${newScreen} (screen)`
                window.app.data.state.globalState = newAppGlobalState // отметка в глобальном состоянии
                window.app.data.state.globalStateNumber++
                window.app.data.state.screen = newScreen
                window.app.data.state.screenNumber++

                screenRendering(screenBox)

                newScreenShowing(screenDisplay, screenAnimationTime)
            })
        },

        // Закрытие экрана
        close: function () {
            const screenBox = window.app.components.screens.box
            const screenDisplay = window.app.components.screens.template.display

            const currentScreenHiding =
                window.app.components.componentVisibility.On // анимация скрытия
            const screenAnimationTime =
                window.app.components.transitions.screenAnimationTime

            const makeDelay = window.app.components.func.makeDelay
            const delayBetweenTransitions =
                window.app.components.transitions.delayBetweenTransitions
            const windowClosingTime =
                window.app.components.transitions.windowAnimationTime +
                window.app.components.transitions.delayBeforeComponentHiding
            const screenHidingTime =
                screenAnimationTime +
                window.app.components.transitions.delayBeforeComponentHiding

            // Предварительное закрытие окна
            // (по умолчанию закрывается вместе с экраном)

            const currentWindowClosing = window.app.components.windows.close
            let currentWindowClosingTime = 0

            const currentWindow = window.app.data.state.window
            const isWindowOpenedNow = Boolean(currentWindow)
            if (isWindowOpenedNow)
                currentWindowClosingTime +=
                    windowClosingTime + delayBetweenTransitions

            currentWindowClosing()

            // Предварительные проверки

            const failureData = { isProcessInterrupted: true }

            const currentScreen = window.app.data.state.screen
            const isScreenOpenedNow = Boolean(currentScreen)
            if (!isScreenOpenedNow) return failureData

            // Закрытие

            makeDelay(currentWindowClosingTime, () => {
                currentScreenHiding(screenDisplay, screenAnimationTime)
                const currentScreenHidingTime = screenHidingTime

                makeDelay(currentScreenHidingTime, () => {
                    screenBox.innerHTML = ''
                    screenBox.classList = screenBox.classList[0]

                    window.app.data.state.globalState = null // отметка в глобальном состоянии
                    window.app.data.state.globalStateNumber++
                    window.app.data.state.screen = null

                    const breakLine = `Экран «${currentScreen}» закрыт    ――――――――――――――――――――――――――――――――――――――――――――――`
                    console.log(`\n`, breakLine, `\n\n`)
                    console.log(`\n\n\n`) // отметка в консоли
                })
            })
        },

        // Блоки для верстки экрана
        blocks: {
            list: [], // см. lib\jsFiles\appComponents\appScreenBlocks.js
            listFilling: function () {},

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
                const result = window.app.components.screens.blocks.list[
                    blockName
                ](container, params)

                if (result !== undefined) return result
            },
        },

        // Контейнер (селектор) для контента экрана
        box: null,
        // Шаблон для экрана
        template: {
            display: null, // задний фон (поверх него располагается box)
            preRender: function () {
                const app = window.app.selectors.container

                const display = document.createElement('div')
                display.classList.add('screenDisplay')
                display.style.display = 'none'
                display.style.opacity = '0'
                app.appendChild(display)

                const box = document.createElement('div')
                box.classList.add('screenBox')
                display.appendChild(box)

                window.app.components.screens.template.display = display
                window.app.components.screens.box = box
            },
        },
    },

    // МОДАЛЬНЫЕ ОКНА
    windows: {
        // Комментарий:
        // Вызов модального окна вызывает закрытие предыдущего окна.
        // Модальное окно всегда открывается поверх экрана.

        list: [], // см. lib\jsFiles\appComponents\appWindows\*.js
        listFilling: function () {},

        // Открытие окна
        open: function (newWindow) {
            const windowBox = window.app.components.windows.box
            const windowDisplay = window.app.components.windows.template.display

            const windowRendering =
                window.app.components.windows.list[newWindow] // функция отрисовки

            const newWindowShowing =
                window.app.components.componentVisibility.Off // анимация появления
            const windowAnimationTime =
                window.app.components.transitions.windowAnimationTime

            const makeDelay = window.app.components.func.makeDelay
            const delayBetweenTransitions =
                window.app.components.transitions.delayBetweenTransitions
            const windowClosingTime =
                window.app.components.transitions.windowAnimationTime +
                window.app.components.transitions.delayBeforeComponentHiding

            // Предварительные проверки

            const doesTheWindowExist = Boolean(windowRendering)
            if (!doesTheWindowExist) {
                const warning = `Окна «${newWindow}» в window.app.components.windows.list нет`
                console.log(`❗`, warning)
                return
            }

            // Закрытие текущего окна

            const currentWindowClosing = window.app.components.windows.close
            let currentWindowClosingTime = 0

            const currentWindow = window.app.data.state.window
            const isWindowOpenedNow = Boolean(currentWindow)
            if (isWindowOpenedNow)
                currentWindowClosingTime +=
                    windowClosingTime + delayBetweenTransitions

            currentWindowClosing()

            // Открытие нового окна

            makeDelay(currentWindowClosingTime, () => {
                const breakLine = `··············· Окно «${newWindow}» ···············`
                console.log(`\n`, breakLine, `\n\n`) // отметка в консоли

                const newAppGlobalState = `${newWindow} (window)`
                window.app.data.state.globalState = newAppGlobalState // отметка в глобальном состоянии
                window.app.data.state.globalStateNumber++
                window.app.data.state.window = newWindow
                window.app.data.state.windowNumber++

                windowRendering(windowBox)

                newWindowShowing(windowDisplay, windowAnimationTime)
            })
        },

        // Закрытие окна
        close: function () {
            const windowBox = window.app.components.windows.box
            const windowDisplay = window.app.components.windows.template.display

            const currentWindowHiding =
                window.app.components.componentVisibility.On // анимация скрытия
            const windowAnimationTime =
                window.app.components.transitions.windowAnimationTime

            const makeDelay = window.app.components.func.makeDelay

            const windowHidingTime =
                windowAnimationTime +
                window.app.components.transitions.delayBeforeComponentHiding

            // Предварительные проверки

            const failureData = { isProcessInterrupted: true }

            const currentWindow = window.app.data.state.window
            const isWindowOpenedNow = Boolean(currentWindow)
            if (!isWindowOpenedNow) return failureData

            // Закрытие

            makeDelay(0, () => {
                currentWindowHiding(windowDisplay, windowAnimationTime)
                const currentWindowHidingTime = windowHidingTime

                makeDelay(currentWindowHidingTime, () => {
                    windowBox.innerHTML = ''
                    windowBox.classList = windowBox.classList[0]

                    window.app.data.state.globalState = null // отметка в глобальном состоянии
                    window.app.data.state.globalStateNumber++
                    window.app.data.state.window = null

                    const breakLine = `Модальное окно «${currentWindow}» закрыто    ·······················`
                    console.log(`\n`, breakLine, `\n\n`)
                    console.log(`\n\n\n`) // отметка в консоли
                })
            })
        },

        // Блоки для верстки окна
        blocks: {
            list: [], // см. lib\jsFiles\appComponents\appWindows\difficultySelection.js
            listFilling: function () {},

            render: function (
                blockName,
                container = window.app.components.windows.template.box,
                params = {}
            ) {
                if (
                    window.app.components.windows.blocks.list[blockName] ===
                    undefined
                ) {
                    console.log(
                        `❗`,
                        `Блока ${blockName} в window.app.components.windows.blocks.list нет`
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
                const result = window.app.components.windows.blocks.list[
                    blockName
                ](container, params)

                if (result !== undefined) return result
            },
        },

        // Контейнер (селектор) для контента окна
        box: null,
        // Шаблон для окна
        template: {
            display: null, // задний фон (поверх него располагается box)
            preRender: function () {
                const app = window.app.selectors.container

                const display = document.createElement('div')
                display.classList.add('windowDisplay')
                display.style.display = 'none'
                display.style.opacity = '0'
                app.appendChild(display)

                const box = document.createElement('div')
                box.classList.add('windowBox')
                display.appendChild(box)

                window.app.components.windows.template.display = display
                window.app.components.windows.box = box
            },
        },
    },

    // СКРЫТИЕ И РАСКРЫТИЕ КОМПОНЕНТА
    componentVisibility: {
        // Скрытие
        On: function (block, animationDuration) {
            const makeDelay = window.app.components.func.makeDelay
            const delayBeforeHiding =
                window.app.components.transitions.delayBeforeComponentHiding

            // Анимация

            window.app.data.state.isTransitionInProgress = true
            makeDelay(delayBeforeHiding, () => {
                const startDelay = 0.1
                const endDelay = animationDuration - startDelay

                const styleTransitionDuration = endDelay
                block.style.transition = `all ${styleTransitionDuration}s`

                makeDelay(startDelay, () => {
                    block.style.opacity = '0'
                    makeDelay(endDelay, () => {
                        block.style.removeProperty('transition')
                        block.style.display = 'none'
                        window.app.data.state.isTransitionInProgress = false
                    })
                })
            })
        },

        // Раскрытие
        Off: function (block, animationDuration) {
            const makeDelay = window.app.components.func.makeDelay
            const delayBeforeShowing =
                window.app.components.transitions.delayBeforeComponentShowing

            // Анимация

            window.app.data.state.isTransitionInProgress = true
            makeDelay(delayBeforeShowing, () => {
                const startDelay = 0.1
                const endDelay = animationDuration - startDelay

                const styleTransitionDuration = endDelay

                block.style.transition = `all ${styleTransitionDuration}s`

                block.style.removeProperty('display')
                makeDelay(startDelay, () => {
                    block.style.removeProperty('opacity')
                    makeDelay(endDelay, () => {
                        block.style.removeProperty('transition')
                        window.app.data.state.isTransitionInProgress = false
                    })
                })
            })
        },
    },

    // ВРЕМЯ ПЕРЕХОДОВ
    transitions: {
        delayBetweenTransitions: 0.1,
        delayBeforeComponentHiding: 0.5,
        delayBeforeComponentShowing: 0,

        screenAnimationTime: 0.8, // время анимации экрана
        windowAnimationTime: 1.0, // время анимации окна
    },

    // ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ДЛЯ РАЗРАБОТЧИКА
    func: {
        makeDelay: function (delayTime, funcAfterDelay) {
            setTimeout(funcAfterDelay, delayTime * 1000)
        },
    },
    class: {
        objectsForListFilling: {
            ofComponents: class {
                constructor(
                    componentType, // тип компонента (например: 'screen')
                    componentObjKey = `` // ключ компонента в window.app.components (лучше его задавать)
                ) {
                    const componentsObj = window.app.components
                    const isComponentKeyGiven = Boolean(componentObjKey)
                    if (!isComponentKeyGiven)
                        componentObjKey = `${componentType}s`

                    this.list = new Object()
                    this.listUploadToAppObj = function () {
                        window.app.components[componentObjKey].list = this.list
                    }

                    this.box = componentsObj[componentObjKey].box // блок для контента компонента
                    this.renderTheBlock =
                        componentsObj[componentObjKey].blocks.render
                    this.renderTheElement = function (
                        elementType,
                        elementParent = this.box,
                        params = { id: '', classList: [] }
                    ) {
                        const element = document.createElement(elementType)
                        elementParent.appendChild(element)

                        if (params.id) element.id = params.id

                        if (params.classList && params.classList.length > 0)
                            for (const className of params.classList)
                                element.classList.add(className)

                        return element
                    }

                    this.cssPrefixOfComponent = componentType // вспомогательный префикс css-классов
                    this.cssPrefixMaking = function (
                        cssPrefixOfComponentName = `${componentType}Name`
                    ) {
                        const className = `${componentType}_${cssPrefixOfComponentName}`
                        const cssPrefix = `${className}_`

                        const componentBox = componentsObj[componentObjKey].box
                        componentBox.classList.add(className)

                        return cssPrefix
                    }
                }
            },
            ofComponentBlocks: class {
                constructor(
                    componentType, // тип компонента (например: 'screen')
                    componentObjKey = `` // ключ компонента в window.app.components (лучше его задавать)
                ) {
                    const componentsObj = window.app.components
                    const isComponentKeyGiven = Boolean(componentObjKey)
                    if (!isComponentKeyGiven)
                        componentObjKey = `${componentType}s`

                    this.list = new Object()
                    this.listUploadToAppObj = function () {
                        window.app.components[componentObjKey].blocks.list =
                            this.list
                    }

                    this.renderTheElement = function (
                        elementType,
                        elementParent,
                        params = { id: '', classList: [] }
                    ) {
                        const element = document.createElement(elementType)
                        elementParent.appendChild(element)

                        if (params.id) element.id = params.id

                        if (params.classList && params.classList.length > 0)
                            for (const className of params.classList)
                                element.classList.add(className)

                        return element
                    }

                    this.cssPrefixOfBlock = componentType + 'Block' // вспомогательный префикс css-классов
                    this.cssPrefixMaking = function (
                        cssPrefixOfBlockName = `${componentType}BlockName`
                    ) {
                        const className = `${componentType}Block_${cssPrefixOfBlockName}`
                        const cssPrefix = `${className}_`

                        const componentBox = componentsObj[componentObjKey].box
                        componentBox.classList.add(className)

                        return cssPrefix
                    }
                }
            },
        },
    },
}
