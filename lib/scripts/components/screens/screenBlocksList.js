// ------------------- БЛОКИ ДЛЯ ЭКРАНОВ -------------------

let list = {}

// Кнопка
list['button'] = function (
    container,
    params = { buttonName: 'Кнопка', buttonClass: 'regular' }
) {
    const componentsObj = window.app.components
    const objectForBlockListFilling =
        componentsObj.dev.forListFilling.ofComponentBlocks
    const modalBlocks = new objectForBlockListFilling('screen')

    const cssPrefix = modalBlocks.cssPrefixMaking('button')
    const renderTheElement = modalBlocks.renderTheElement

    // ОТРИСОВКА БЛОКА ----------------------

    const buttonParams = { classList: [cssPrefix + params.buttonClass] }
    const button = renderTheElement('button', container, buttonParams)

    const buttonName = params.buttonName
    if (typeof buttonName === 'string') button.innerHTML = buttonName
    else console.log('Название кнопки не передано!')

    return button
}

// Блок сообщения
list['popUpMessage'] = function (container, params = { message: `Сообщение` }) {
    const componentsObj = window.app.components
    const objectForBlockListFilling =
        componentsObj.dev.forListFilling.ofComponentBlocks
    const modalBlocks = new objectForBlockListFilling('screen')

    const cssPrefix = modalBlocks.cssPrefixMaking('popUpMessage')
    const renderTheElement = modalBlocks.renderTheElement

    // ОТРИСОВКА БЛОКА ----------------------

    const msgDisplayParams = { classList: [cssPrefix + 'msgDisplay'] }
    const messageDisplay = renderTheElement('div', container, msgDisplayParams)

    const messageBox = document.createElement('div')
    messageBox.classList.add(cssPrefix + 'msgBox')
    messageDisplay.appendChild(messageBox)

    const messageLine = document.createElement('p')
    messageBox.appendChild(messageLine)

    const message = params.message
    if (typeof message === 'string') messageLine.innerHTML = message
    else console.log('Сообщение не передано!')

    return messageDisplay
}

// Блок таймера
list['gameTimer'] = function (container) {
    const componentsObj = window.app.components
    const objectForBlockListFilling =
        componentsObj.dev.forListFilling.ofComponentBlocks
    const modalBlocks = new objectForBlockListFilling('screen')

    const cssPrefix = modalBlocks.cssPrefixMaking('gameTimer')
    const renderTheElement = modalBlocks.renderTheElement

    // ОТРИСОВКА БЛОКА ----------------------

    const timerBoxParams = { classList: [cssPrefix + `Box`] }
    const timerBox = renderTheElement('div', container, timerBoxParams)

    const timerMinBox = document.createElement('div')
    timerMinBox.classList.add(cssPrefix + `SubBox`)
    timerBox.appendChild(timerMinBox)
    const timerSecBox = document.createElement('div')
    timerSecBox.classList.add(cssPrefix + `SubBox`)
    timerBox.appendChild(timerSecBox)

    const pMin = document.createElement('p')
    pMin.textContent = 'min'
    timerMinBox.appendChild(pMin)
    const pSec = document.createElement('p')
    pSec.textContent = 'sec'
    timerSecBox.appendChild(pSec)

    const hMin = document.createElement('h1')
    hMin.textContent = '00'
    timerMinBox.appendChild(hMin)
    const hSec = document.createElement('h1')
    hSec.textContent = '.00'
    timerSecBox.appendChild(hSec)

    // Функционал

    let timerData = {}
    timerData.selectorOfMinutes = hMin
    timerData.selectorOfSeconds = hSec
    timerData.updateTime = {}
    timerData.updateTime.byTimeData = function (minutes, seconds) {
        hMin.textContent = minutes < 10 ? '0' + minutes : minutes
        hSec.textContent = seconds < 10 ? '.0' + seconds : '.' + seconds
    }
    timerData.updateTime.bySecondsData = function (seconds) {
        const minutes = Math.floor(seconds / 60)
        const remainingSeconds = seconds - minutes * 60

        hMin.textContent = minutes < 10 ? '0' + minutes : minutes
        hSec.textContent =
            remainingSeconds < 10
                ? '.0' + remainingSeconds
                : '.' + remainingSeconds
    }

    return timerData
}

export { list }
