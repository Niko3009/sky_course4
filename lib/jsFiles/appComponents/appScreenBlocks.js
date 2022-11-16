// ------------------- ХОДОВЫЕ БЛОКИ ДЛЯ ЭКРАНОВ -------------------

window.app.components.screens.blocks.listFilling = function () {
    const objectForBlockListFilling =
        window.app.components.class.objectsForListFilling.ofComponentBlocks

    const screenBlocks = new objectForBlockListFilling('screen')
    const renderTheElement = screenBlocks.renderTheElement
    const cssPrefixMaking = screenBlocks.cssPrefixMaking

    // Кнопка
    screenBlocks.list['button'] = function (
        container,
        params = { buttonName: 'Кнопка', buttonClass: 'regular' }
    ) {
        const cssPrefix = cssPrefixMaking('button')

        const buttonParams = { classList: [cssPrefix + params.buttonClass] }
        const button = renderTheElement('button', container, buttonParams)

        const buttonName = params.buttonName
        if (typeof buttonName === 'string') button.innerHTML = buttonName
        else console.log('Название кнопки не передано!')

        return button
    }

    // Блок сообщения
    screenBlocks.list['popUpMessage'] = function (
        container,
        params = { message: `Сообщение` }
    ) {
        const cssPrefix = cssPrefixMaking('popUpMessage')

        const messageDisplay = document.createElement('div')
        messageDisplay.classList.add(cssPrefix + 'msgDisplay')
        container.appendChild(messageDisplay)

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
    screenBlocks.list['gameTimer'] = function (container) {
        const cssPrefix = cssPrefixMaking('gameTimer')

        // Отрисовка блоков таймера

        const timerBox = document.createElement('div')
        timerBox.classList.add(cssPrefix + `Box`)
        container.appendChild(timerBox)

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

    screenBlocks.listUploadToAppObj()
}
