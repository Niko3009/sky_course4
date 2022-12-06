import { cardImages } from './gameImg'

export const screenRender = function (difficulty: number, cardsQty: number) {
    const appObj = window.app
    const componentsObj = appObj.components
    const objectForComponentListFilling =
        componentsObj.dev.forListFilling.ofComponents

    const screens = new objectForComponentListFilling('screen')
    const cssPrefix = screens.cssPrefixMaking(`game`)
    const renderTheElement = screens.renderTheElement
    const renderTheBlock = screens.renderTheBlock
    const screenBox = screens.template.box

    // Блок - header

    const headerParams = { classList: [cssPrefix + `header`] }
    const header = renderTheElement('div', screenBox, headerParams)

    const gameTimer = renderTheBlock('gameTimer', header)

    const restartBtnParams = { buttonName: 'Начать заново' }
    const restartBtn = renderTheBlock('button', header, restartBtnParams)

    // Блок - игровое поле (блок с картами)

    const gameFieldParams = { classList: [cssPrefix + 'gameField'] }
    const gameField = renderTheElement('div', screenBox, gameFieldParams)

    const cardsSetBoxClass = `gameField_cardsSetBox_${difficulty}`
    const cardsSetBoxParams = { classList: [cssPrefix + cardsSetBoxClass] }
    const cardsSetBox = renderTheElement('div', gameField, cardsSetBoxParams)

    for (let cardNum = 1; cardNum <= cardsQty; cardNum++) {
        const cardBoxParams = { classList: [cssPrefix + 'gameField_cardBox'] }
        const cardBox = renderTheElement('div', cardsSetBox, cardBoxParams)

        const cardImg = renderTheElement('img', cardBox)
        cardImg.src = cardImages['back']
    }

    // Блок - footer

    const footerParams = { classList: [cssPrefix + `footer`] }
    const footer = renderTheElement('div', screenBox, footerParams)

    const exitBtnParams = { buttonName: 'Выйти из игры' }
    const exitBtn = renderTheBlock('button', footer, exitBtnParams)

    return { cardsSetBox, gameTimer, restartBtn, exitBtn }
}
