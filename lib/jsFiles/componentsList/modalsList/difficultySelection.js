// --------------------- ОКНО ВЫБОРА СЛОЖНОСТИ ---------------------

window.app.components.modals.list['difficulty selection'] = function () {
    const appObj = window.app
    const componentsObj = appObj.components

    const objectForComponentListFilling =
        componentsObj.class.objectsForListFilling.ofComponents

    const modals = new objectForComponentListFilling('modal')
    const cssPrefix = modals.cssPrefixMaking(`difficultySelection`)
    const renderTheElement = modals.renderTheElement
    const renderTheBlock = modals.renderTheBlock
    const modalBox = modals.template.box

    const openTheScreen = componentsObj.screens.open
    const closeTheModal = componentsObj.modals.close
    const modalClosingTime = componentsObj.transitions.modalClosingTime

    // Сбросить данные игры до значений по умолчанию

    appObj.timers.clearAll()
    appObj.data.game.resetDataToDefault()

    // Заголовок окна

    const modalTitleParams = { title: 'Выбери сложность' }
    renderTheBlock('modalTitle', modalBox, modalTitleParams)

    // Блок - опции сложности

    let selectedDifficulty // выбранный уровень сложности (по умолчанию 0)

    const optionBlockParams = { classList: [cssPrefix + 'selectionBlock'] }
    const optionBlock = renderTheElement('div', modalBox, optionBlockParams)

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
    const startBtn = renderTheBlock('button', modalBox, startBtnParams)
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
        appObj.data.game.difficulty = selectedDifficulty

        const selectedOptionBtn = optionBlockBtns[selectedDifficulty - 1]
        selectedOptionBtn.classList.add('resultOption')

        closeTheModal()
        setTimeout(openTheScreen, modalClosingTime * 1000, 'game')
    }
}
