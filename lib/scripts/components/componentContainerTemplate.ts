import { appContainer } from '../appContainer'

export { appContainer }

export const componentContainerTemplate = class {
    display: any
    bg: any
    box: any
    cover: any

    constructor(
        componentType: string // тип компонента (например: 'screen')
    ) {
        const display = document.createElement('div')
        display.classList.add(`${componentType}`)
        display.style.display = 'none'
        display.style.opacity = '0'
        appContainer.appendChild(display)

        const bg = document.createElement('div')
        bg.classList.add(`${componentType}BG`)
        display.appendChild(bg)

        const box = document.createElement('div')
        box.classList.add(`${componentType}Box`)
        display.appendChild(box)

        const cover = document.createElement('div')
        cover.classList.add(`${componentType}Cover`)
        cover.style.display = 'none'
        display.appendChild(cover)

        this.display = display // основной селектор шаблона

        this.bg = bg // задний фон
        this.box = box // контейнер для контента
        this.cover = cover // верхний слой для блокировки контента
    }
}
