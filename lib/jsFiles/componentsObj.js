// ---------- ОБЪЕКТ КОМПОНЕНТОВ ПРИЛОЖЕНИЯ ----------

window.app.components = {
    // ЭКРАНЫ
    screens: {}, // см. lib\jsFiles\screensObj.js

    // МОДАЛЬНЫЕ ОКНА
    modals: {}, // см. lib\jsFiles\modalsObj.js

    // СКРЫТИЕ И РАСКРЫТИЕ КОМПОНЕНТА
    blockVisibility: {
        // Скрытие
        On: function (block, animationDuration) {
            const makeDelay = window.app.components.func.makeDelay
            const delayBeforeHiding =
                window.app.components.transitions.delayBeforeComponentHiding

            // Анимация

            window.app.data.state.isAnimationInProgress = true
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
                        window.app.data.state.isAnimationInProgress = false
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

            window.app.data.state.isAnimationInProgress = true
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
                        window.app.data.state.isAnimationInProgress = false
                    })
                })
            })
        },
    },

    // ВРЕМЯ ПЕРЕХОДОВ
    transitions: {
        delayBetweenTransitions: 0.05,

        delayBeforeComponentHiding: 0.4,
        delayBeforeComponentShowing: 0,

        screenAnimationTime: 0.6, // время анимации экрана
        screenOpeningTime: 0,
        screenClosingTime: 0,

        modalAnimationTime: 0.6, // время анимации окна
        modalOpeningTime: 0,
        modalClosingTime: 0,

        preSetting() {
            const transitionsObj = window.app.components.transitions

            // Экран

            window.app.components.transitions.screenOpeningTime =
                transitionsObj.screenAnimationTime +
                transitionsObj.delayBeforeComponentShowing

            window.app.components.transitions.screenClosingTime =
                transitionsObj.screenAnimationTime +
                transitionsObj.delayBeforeComponentHiding

            // Окно

            window.app.components.transitions.modalOpeningTime =
                transitionsObj.modalAnimationTime +
                transitionsObj.delayBeforeComponentShowing

            window.app.components.transitions.modalClosingTime =
                transitionsObj.modalAnimationTime +
                transitionsObj.delayBeforeComponentHiding
        },
    },

    // ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ДЛЯ РАЗРАБОТЧИКА
    func: {
        makeDelay: function (delayTime, funcAfterDelay) {
            setTimeout(funcAfterDelay, delayTime * 1000)
        },
    },
    class: {
        objectForComponentTemplate: class {
            constructor(
                componentType // тип компонента (например: 'screen')
            ) {
                const app = window.app.selectors.container

                const display = document.createElement('div')
                display.classList.add(`${componentType}Display`)
                display.style.display = 'none'
                display.style.opacity = '0'
                app.appendChild(display)

                const box = document.createElement('div')
                box.classList.add(`${componentType}Box`)
                display.appendChild(box)

                const coverLayer = document.createElement('div')
                coverLayer.classList.add(`${componentType}CoverLayer`)
                coverLayer.style.display = 'none'
                display.appendChild(coverLayer)

                this.box = box // контейнер (селектор) для контента окна
                this.display = display // задний фон (поверх нем располагается box)
                this.coverLayer = coverLayer // фон поверх box; предназначен для блокировки контента
            }
        },
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

                    this.template = {}
                    this.template.box =
                        componentsObj[componentObjKey].template.box // блок для контента компонента
                    this.renderTheBlock =
                        componentsObj[componentObjKey].blocks.render
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

                    this.cssPrefixOfComponent = componentType // вспомогательный префикс css-классов
                    this.cssPrefixMaking = function (
                        cssPrefixOfComponentName = `${componentType}Name`
                    ) {
                        const className = `${componentType}_${cssPrefixOfComponentName}`
                        const cssPrefix = `${className}_`

                        const componentBox =
                            componentsObj[componentObjKey].template.box
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

                        const componentBox =
                            componentsObj[componentObjKey].template.box
                        componentBox.classList.add(className)

                        return cssPrefix
                    }
                }
            },
        },
    },
}
