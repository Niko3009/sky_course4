import {
    appContainer,
    componentContainerTemplate,
} from '../componentContainerTemplate.js'

const componentType = 'screen'
const createTheContainer = function () {
    const container = new componentContainerTemplate(componentType)
    return container
}

let container = {
    box: appContainer.querySelector(`.${componentType}Box`),
    display: appContainer.querySelector(`.${componentType}Display`),
    coverLayer: appContainer.querySelector(`.${componentType}CoverLayer`),
}

if (!container.box) container = createTheContainer()

export { container, appContainer }
