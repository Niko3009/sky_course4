// ------------------- БЛОКИ ДЛЯ МОДАЛЬНЫХ ОКОН -------------------

let list = {}

// Заголовок окна
list['modalTitle'] = function (
    container,
    params = { title: 'Заголовок окна' }
) {
    const componentsObj = window.app.components
    const objectForBlockListFilling =
        componentsObj.dev.forListFilling.ofComponentBlocks
    const modalBlocks = new objectForBlockListFilling('modal')

    const cssPrefix = modalBlocks.cssPrefixMaking('modalTitle')
    const renderTheElement = modalBlocks.renderTheElement

    // ОТРИСОВКА БЛОКА ----------------------

    const titleLineParams = { classList: [cssPrefix + 'txt'] }
    const titleLine = renderTheElement('h1', container, titleLineParams)

    const title = params.title
    if (typeof title === 'string') titleLine.innerHTML = title
    else console.log('Заголовок окна не передан!')

    return title
}

// Стандартная кнопка
list['button'] = function (
    container,
    params = { buttonName: 'Стандартная кнопка' }
) {
    const componentsObj = window.app.components
    const objectForBlockListFilling =
        componentsObj.dev.forListFilling.ofComponentBlocks
    const modalBlocks = new objectForBlockListFilling('modal')

    const cssPrefix = modalBlocks.cssPrefixMaking('button')
    const renderTheElement = modalBlocks.renderTheElement

    // ОТРИСОВКА БЛОКА ----------------------

    const buttonParams = { classList: [cssPrefix + 'regular'] }
    const button = renderTheElement('button', container, buttonParams)

    const buttonName = params.buttonName
    if (typeof buttonName === 'string') button.innerHTML = buttonName
    else console.log('Название кнопки не передано!')

    return button
}

// Блок таймера
list['gameTimer'] = function (container) {
    const componentsObj = window.app.components
    const objectForBlockListFilling =
        componentsObj.dev.forListFilling.ofComponentBlocks
    const modalBlocks = new objectForBlockListFilling('modal')

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
    // timerMinBox.appendChild(pMin)
    const pSec = document.createElement('p')
    pSec.textContent = 'sec'
    // timerSecBox.appendChild(pSec)

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
