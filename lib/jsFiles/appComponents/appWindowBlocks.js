// ------------------- ХОДОВЫЕ БЛОКИ ДЛЯ МОДАЛЬНЫХ ОКОН -------------------

window.app.components.windows.blocks.listFilling = function () {
    const objectForBlockListFilling =
        window.app.components.class.objectsForListFilling.ofComponentBlocks

    const windowBlocks = new objectForBlockListFilling('window')
    const renderTheElement = windowBlocks.renderTheElement
    const cssPrefixMaking = windowBlocks.cssPrefixMaking

    // Заголовок окна
    windowBlocks.list['windowTitle'] = function (
        container,
        params = { title: 'Заголовок окна' }
    ) {
        const cssPrefix = cssPrefixMaking('windowTitle')

        const titleLineParams = { classList: [cssPrefix + 'txt'] }
        const titleLine = renderTheElement('h1', container, titleLineParams)

        const title = params.title
        if (typeof title === 'string') titleLine.innerHTML = title
        else console.log('Заголовок окна не передан!')

        return title
    }

    // Кнопка
    windowBlocks.list['button'] = function (
        container,
        params = { buttonName: 'Кнопка' }
    ) {
        const cssPrefix = cssPrefixMaking('button')

        const button = document.createElement('button')
        button.classList.add(cssPrefix + 'button')
        container.appendChild(button)

        const buttonName = params.buttonName
        if (typeof buttonName === 'string') button.innerHTML = buttonName
        else console.log('Название кнопки не передано!')

        return button
    }

    windowBlocks.listUploadToAppObj()
}
