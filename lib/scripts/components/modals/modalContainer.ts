import {
    appContainer,
    componentContainerTemplate,
} from '../componentContainerTemplate'

const componentType = 'modal'
const createTheContainer = function () {
    const container = new componentContainerTemplate(componentType)
    return container
}

let container = {
    display: appContainer.querySelector(`.${componentType}`),

    bg: appContainer.querySelector(`.${componentType}BG`),
    box: appContainer.querySelector(`.${componentType}Box`),
    cover: appContainer.querySelector(`.${componentType}Cover`),
}

if (!container.display) container = createTheContainer()

export { container, appContainer }
