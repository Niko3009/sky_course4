//------------------- ОБЪЕКТ ПРИЛОЖЕНИЯ -------------------

import { appContainer } from './appContainer.js'

import { launch as launchFunc } from './launchFunc.js'
import { data as dataObj } from './dataObj.js'
import { components as componentsObj } from './components/componentsObj.js'

export const app = {
    // ПРОЦЕДУРА ЗАПУСКА
    launch: launchFunc,

    // ТЕКУЩИЕ ДАННЫЕ ПРИЛОЖЕНИЯ
    data: dataObj,

    // КОМПОНЕНТЫ ПРИЛОЖЕНИЯ
    components: componentsObj,

    // ПОЛУЧЕНИЕ БЭК-ЭНД ДАННЫХ
    domainData: {
        dataRequest: function () {}, // -
        httpRequest: function () {}, // см. lib\scripts\httpRequestFunc.js
    },

    // ТАЙМЕРЫ И ОТСРОЧКИ
    timers: {
        list: [],
        start(intervalInSeconds, func, param1, param2) {
            let timerId = setInterval(() => {
                func(param1, param2)
            }, intervalInSeconds * 1000)

            window.app.timers.list.push(timerId)
            return timerId
        },
        stop(timerId) {
            clearInterval(timerId)

            const timers = window.app.timers
            const index = timers.list.indexOf(timerId)
            timers.list.splice(index, 1)
        },
        stopAll() {
            window.app.timers.list.forEach((timer) => clearInterval(timer))
            window.app.timers.list = []
        },
    },
    timeouts: {
        list: [],
        start(intervalInSeconds, func, param1, param2) {
            let timeoutId = setTimeout(() => {
                func(param1, param2)
            }, intervalInSeconds * 1000)

            window.app.timeouts.list.push(timeoutId)
            return timeoutId
        },
        stop(timeoutId) {
            clearTimeout(timeoutId)

            const timeouts = window.app.timeouts
            const index = timeouts.list.indexOf(timeoutId)
            timeouts.list.splice(index, 1)
        },
        stopAll() {
            window.app.timeouts.list.forEach((timeout) => clearTimeout(timeout))
            window.app.timeouts.list = []
        },
    },

    // HTML-СЕЛЕКТОРЫ
    selectors: {
        container: appContainer, // контейнер приложения
        tabTitle: document.head.querySelector('title'), // тег названия вкладки
    },
}
