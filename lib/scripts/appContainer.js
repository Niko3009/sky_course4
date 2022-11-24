//------------------- КОНТЕЙНЕР ПРИЛОЖЕНИЯ -------------------

const createTheContainer = function () {
    const body = document.body

    const main = document.createElement('main')
    body.appendChild(main)

    const container = document.createElement('div')
    main.appendChild(container)

    container.classList.add(`app`)
    container.id = `app`

    return container
}

let appContainer = document.querySelector('#app')

if (!appContainer) appContainer = createTheContainer()

export { appContainer }
