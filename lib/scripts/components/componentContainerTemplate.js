import { appContainer } from '../appContainer.js'

const componentContainerTemplate = class {
    constructor(
        componentType // тип компонента (например: 'screen')
    ) {
        const display = document.createElement('div')
        display.classList.add(`${componentType}Display`)
        display.style.display = 'none'
        display.style.opacity = '0'
        appContainer.appendChild(display)

        const box = document.createElement('div')
        box.classList.add(`${componentType}Box`)
        display.appendChild(box)

        const coverLayer = document.createElement('div')
        coverLayer.classList.add(`${componentType}CoverLayer`)
        coverLayer.style.display = 'none'
        display.appendChild(coverLayer)

        this.box = box // контейнер (селектор) для контента окна
        this.display = display // задний фон (поверх нем располагается box)
        this.coverLayer = coverLayer // фон поверх box; предназначен для блокировки контента
    }
}

export { componentContainerTemplate, appContainer }
