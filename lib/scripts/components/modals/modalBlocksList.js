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

    const buttonParams = { classList: [cssPrefix + 'button'] }
    const button = renderTheElement('button', container, buttonParams)

    const buttonName = params.buttonName
    if (typeof buttonName === 'string') button.innerHTML = buttonName
    else console.log('Название кнопки не передано!')

    return button
}

export { list }
