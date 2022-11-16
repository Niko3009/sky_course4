// --------------------- ОКНО ВЫБОРА СЛОЖНОСТИ ---------------------

window.app.components.windows.list['difficulty selection'] = function () {
    const objectForComponentListFilling =
        window.app.components.class.objectsForListFilling.ofComponents

    const windows = new objectForComponentListFilling('window')
    const cssPrefix = windows.cssPrefixMaking(`difficultySelection`)
    const renderTheElement = windows.renderTheElement
    const renderTheBlock = windows.renderTheBlock
    const windowBox = windows.box

    const openTheScreen = window.app.components.screens.open

    // Заголовок окна

    const windowTitleParams = { title: 'Выбери сложность' }
    renderTheBlock('windowTitle', windowBox, windowTitleParams)

    // Блок - опции сложности

    let selectedDifficulty // выбранный уровень сложности (по умолчанию 0)

    const optionBlockParams = { classList: [cssPrefix + 'selectionBlock'] }
    const optionBlock = renderTheElement('div', windowBox, optionBlockParams)

    const optionBlockBtns = optionBlock.children
    for (let optionValue = 1; optionValue <= 3; optionValue++) {
        const optionBtnParams = { buttonName: String(optionValue) }
        const optionBtn = renderTheBlock('button', optionBlock, optionBtnParams)
        optionBtn.addEventListener('click', () => {
            selectedDifficulty = optionValue
            for (const button of optionBlockBtns)
                button.classList.remove('selectedOption')
            optionBtn.classList.add('selectedOption')
        })
    }

    // Блок - кнопка старт

    const startBtnParams = { buttonName: 'Старт' }
    const startBtn = renderTheBlock('button', windowBox, startBtnParams)
    startBtn.addEventListener('click', gameStart)

    // Функционал окна

    function gameStart() {
        if (selectedDifficulty === undefined) {
            // если сложность не выбрана, окно даст "сигнал"
            const errorTime = 0.5

            for (const button of optionBlockBtns)
                button.classList.add('errorOption')

            setTimeout(() => {
                for (const button of optionBlockBtns)
                    button.classList.remove('errorOption')
            }, errorTime * 1000)

            return
        }

        console.log(`Выбрана сложность:`, selectedDifficulty)
        window.app.data.game.difficulty = selectedDifficulty

        const selectedOptionBtn = optionBlockBtns[selectedDifficulty - 1]
        selectedOptionBtn.classList.add('resultOption')

        openTheScreen('game')
    }
}
