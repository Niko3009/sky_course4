// --------------------- МОДУЛЬНЫЕ ОКНА ---------------------
window.application.components.windows.listFilling = function () {
    let windows = {}
    const windowBox = window.application.components.windows.box
    const renderBlock = window.application.components.windows.blocks.render
    const listLoad = {
        // Перенос списка отрисовки в приложение
        windows: function () {
            const localList = windows
            for (const item of Object.keys(localList))
                window.application.components.windows.list[item] =
                    localList[item]
        },
    }

    // Окно выбора сложности
    windows['select'] = function () {
        const title = 'Выбери сложность'
        console.log(title.toUpperCase())

        renderBlock('title', windowBox, { title: title })

        // Блок - выбор сложности
        let selectedDifficulty = 0 // выбранный уровень сложности (по умолчанию 0)

        const optionBlock = document.createElement('div')
        optionBlock.classList.add('selectionBlock')
        windowBox.appendChild(optionBlock)

        const optionBlockBtns = optionBlock.children
        for (let i = 1; i <= 3; i++) {
            const optionValue = i // уровень сложности
            const option = renderBlock('button', optionBlock, {
                buttonName: String(optionValue),
            })
            option.addEventListener('click', () => {
                selectedDifficulty = optionValue
                for (const button of optionBlockBtns)
                    button.classList.remove('selectedOption')
                option.classList.add('selectedOption')
            })
        }

        // Блок - кнопка старт
        const buttonStart = renderBlock('button', windowBox, {
            buttonName: 'Старт',
        })
        buttonStart.addEventListener('click', () => {
            if (selectedDifficulty === 0) {
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
            window.application.info.game.difficulty = selectedDifficulty

            const selectedOptionBtn = optionBlockBtns[selectedDifficulty - 1]
            for (const button of optionBlockBtns)
                button.classList.remove('resultOption')
            selectedOptionBtn.classList.add('resultOption')

            window.application.components.screens.open('game')
        })
    }

    listLoad.windows()
}
window.application.components.windows.blocks.listFilling = function () {
    let windowBlocks = {}
    // const windowBox = window.application.components.windows.box     временно! (eslint)
    const listLoad = {
        // Перенос списка отрисовки в приложение
        windowBlocks: function () {
            const localList = windowBlocks
            for (const item of Object.keys(localList))
                window.application.components.windows.blocks.list[item] =
                    localList[item]
        },
    }

    // Заголовок окна
    windowBlocks['title'] = function (
        container,
        params = { title: 'Заголовок окна' }
    ) {
        const titleLine = document.createElement('h1')
        titleLine.classList.add('windowTitle')
        container.appendChild(titleLine)

        const title = params.title
        if (typeof title === 'string') titleLine.innerHTML = title
        else console.log('Заголовок окна не передан!')
    }

    // Кнопка
    windowBlocks['button'] = function (
        container,
        params = { buttonName: 'Кнопка' }
    ) {
        const button = document.createElement('button')
        button.classList.add('windowButton')
        container.appendChild(button)

        const buttonName = params.buttonName
        if (typeof buttonName === 'string') button.innerHTML = buttonName
        else console.log('Название кнопки не передано!')

        return button
    }

    listLoad.windowBlocks()
}
