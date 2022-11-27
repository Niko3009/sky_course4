// --------------------- ОКНО ВЫБОРА СЛОЖНОСТИ ---------------------

export const difficultySelection = function () {
    const appObj = window.app
    const componentsObj = appObj.components
    const objectForComponentListFilling =
        componentsObj.dev.forListFilling.ofComponents
    const modals = new objectForComponentListFilling('modal')

    const cssPrefix = modals.cssPrefixMaking(`difficultySelection`)
    const renderTheElement = modals.renderTheElement
    const renderTheBlock = modals.renderTheBlock
    const modalBox = modals.template.box

    const openTheScreen = componentsObj.screens.open
    const closeTheModal = componentsObj.modals.close
    const modalClosingTime = componentsObj.transitions.modalClosingTime

    const makeTheTimeout = appObj.timeouts.start

    // ОТРИСОВКА ЭКРАНА ------------------------------------------------------------

    // Заголовок окна

    const modalTitleParams = { title: 'Выбери сложность' }
    renderTheBlock('modalTitle', modalBox, modalTitleParams)

    // Блок - опции сложности

    const optionBlockParams = { classList: [cssPrefix + 'selectionBlock'] }
    const optionBlock = renderTheElement('div', modalBox, optionBlockParams)

    const optionBlockBtns = optionBlock.children
    for (let optionValue = 1; optionValue <= 3; optionValue++) {
        const optionBtnParams = { buttonName: String(optionValue) }
        renderTheBlock('button', optionBlock, optionBtnParams)
    }

    // Блок - кнопка старт

    const startBtnParams = { buttonName: 'Старт' }
    const startBtn = renderTheBlock('button', modalBox, startBtnParams)

    // ФУНКЦИОНАЛ ------------------------------------------------------------

    function gameStart() {
        // сигнал, если сложность не выбрана
        if (selectedDifficulty === undefined) {
            const errorTime = 0.5

            for (const button of optionBlockBtns)
                button.classList.add('errorOption')

            makeTheTimeout(errorTime, () => {
                for (const button of optionBlockBtns)
                    button.classList.remove('errorOption')
            })

            return
        }

        console.log(`Выбрана сложность:`, selectedDifficulty)
        appObj.data.game.difficulty = selectedDifficulty

        const selectedOptionBtn = optionBlockBtns[selectedDifficulty - 1]
        selectedOptionBtn.classList.add('resultOption')

        closeTheModal()
        const nameOfGameScreen = 'game'
        makeTheTimeout(modalClosingTime, () => {
            openTheScreen(nameOfGameScreen)
        })
    }

    // СОБЫТИЯ ------------------------------------------------------------

    appObj.data.game.resetDataToDefault()

    let selectedDifficulty = 0 // выбранный уровень сложности (по умолчанию - 0)

    for (const optionBtn of optionBlockBtns)
        optionBtn.addEventListener('click', () => {
            selectedDifficulty = Number(optionBtn.textContent)

            for (const button of optionBlockBtns)
                button.classList.remove('selectedOption')
            optionBtn.classList.add('selectedOption')
        })

    startBtn.addEventListener('click', gameStart)
}
