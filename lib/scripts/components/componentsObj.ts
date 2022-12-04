// ---------- ОБЪЕКТ КОМПОНЕНТОВ ПРИЛОЖЕНИЯ ----------

import { screens as screensObj } from './screens/screensObj'
import { modals as modalsObj } from './modals/modalsObj'

export const components = {
    // ЭКРАНЫ
    screens: screensObj,

    // МОДАЛЬНЫЕ ОКНА
    modals: modalsObj,

    // СКРЫТИЕ И РАСКРЫТИЕ КОМПОНЕНТА
    blockVisibility: {
        // Скрытие
        On: function (block: any, animationDuration: number) {
            const makeDelay = window.app.components.dev.makeDelay
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
        Off: function (block: any, animationDuration: number) {
            const makeDelay = window.app.components.dev.makeDelay
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
    dev: {
        makeDelay: function (delayTime: number, funcAfterDelay: any) {
            setTimeout(funcAfterDelay, delayTime * 1000)
        },
        forListFilling: {
            ofComponents: class {
                list: any
                listUploadToAppObj: any
                template: any
                renderTheBlock: any
                renderTheElement: any
                cssPrefixOfComponent: any
                cssPrefixMaking: any

                constructor(
                    componentType: string, // тип компонента (например: 'screen')
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

                    this.template = new Object()
                    this.template.box =
                        componentsObj[componentObjKey].template.box // блок для контента компонента
                    this.renderTheBlock =
                        componentsObj[componentObjKey].blocks.render
                    this.renderTheElement = function (
                        elementType: any,
                        elementParent: any,
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
                        cssPrefixOfComponentName: string = `${componentType}Name`
                    ) {
                        const className = `${componentType}_${cssPrefixOfComponentName}`
                        const cssPrefix = `${className}_`

                        const componentDisplay =
                            componentsObj[componentObjKey].template.display
                        componentDisplay.classList.add(className)

                        return cssPrefix
                    }
                }
            },
            ofComponentBlocks: class {
                list: any
                listUploadToAppObj: any
                renderTheElement: any
                cssPrefixOfBlock: any
                cssPrefixMaking: any

                constructor(
                    componentType: any, // тип компонента (например: 'screen')
                    componentObjKey: string = `` // ключ компонента в window.app.components (лучше его задавать)
                ) {
                    const isComponentKeyGiven = Boolean(componentObjKey)
                    if (!isComponentKeyGiven)
                        componentObjKey = `${componentType}s`

                    this.list = new Object()
                    this.listUploadToAppObj = function () {
                        window.app.components[componentObjKey].blocks.list =
                            this.list
                    }

                    this.renderTheElement = function (
                        elementType: any,
                        elementParent: any,
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

                        // const componentsObj = window.app.components
                        // const componentBox =
                        //     componentsObj[componentObjKey].template.box
                        // componentBox.classList.add(className)

                        return cssPrefix
                    }
                }
            },
        },
    },
}
