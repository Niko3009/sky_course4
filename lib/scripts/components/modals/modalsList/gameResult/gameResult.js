// --------------------- ОКНО РЕЗУЛЬТАТА ИГРЫ ---------------------

import { images } from './images.js'

export const gameResult = function () {
    const appObj = window.app
    const componentsObj = appObj.components
    const objectForComponentListFilling =
        componentsObj.dev.forListFilling.ofComponents
    const modals = new objectForComponentListFilling('modal')

    const cssPrefix = modals.cssPrefixMaking(`gameResult`)
    const renderTheElement = modals.renderTheElement
    const renderTheBlock = modals.renderTheBlock
    const modalBox = modals.template.box

    const closeTheScreen = componentsObj.screens.close
    const openTheModal = componentsObj.modals.open

    const gameData = appObj.data.game

    // ДАННЫЕ ЭКРАНА ------------------------------------------------------------

    const gameStatus = gameData.status
    const seconds = gameData.time.seconds
    const minutes = gameData.time.minutes

    // ОТРИСОВКА ЭКРАНА ------------------------------------------------------------

    // Блок объявления результата

    const resultImgParams = { classList: [cssPrefix + `resultImg`] }
    const resultImg = renderTheElement('img', modalBox, resultImgParams)
    resultImg.src = images[gameStatus]

    const statement =
        gameStatus === 'gameVictory' ? 'Вы выиграли!' : 'Вы проиграли!'
    const modalTitleParams = { title: statement }
    renderTheBlock('modalTitle', modalBox, modalTitleParams)

    // Время игры

    const timeBlockParams = { classList: [cssPrefix + `timeBlock`] }
    const timeBlock = renderTheElement('div', modalBox, timeBlockParams)

    const spentTimeTxt = renderTheElement('p', timeBlock)
    spentTimeTxt.textContent = 'Затраченное время:'

    const spentTimeTimer = renderTheBlock('gameTimer', timeBlock)
    spentTimeTimer.updateTime.byTimeData(minutes, seconds)

    // Кнопка 'Играть снова'

    const newGameBtnParams = { buttonName: 'Играть снова' }
    const newGameBtn = renderTheBlock('button', modalBox, newGameBtnParams)

    // ФУНКЦИОНАЛ ------------------------------------------------------------

    const startNewGame = function () {
        closeTheScreen()

        openTheModal('difficulty selection')
    }

    // СОБЫТИЯ ------------------------------------------------------------

    console.log(statement)
    newGameBtn.addEventListener('click', startNewGame)
}
