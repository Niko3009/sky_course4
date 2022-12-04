//------------------- ОБЪЕКТ ПРИЛОЖЕНИЯ -------------------

import { appContainer } from './appContainer'

import { launch as launchFunc } from './launchFunc'
import { data as dataObj } from './dataObj'
import { components as componentsObj } from './components/componentsObj'

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
        httpRequest: function () {}, // см. lib\scripts\httpRequestFunc.ts
    },

    // ТАЙМЕРЫ И ОТСРОЧКИ
    timers: {
        list: [],
        start(intervalInSeconds: number, func: any, param1: any, param2: any) {
            let timerId = setInterval(() => {
                func(param1, param2)
            }, intervalInSeconds * 1000)

            window.app.timers.list.push(timerId)
            return timerId
        },
        stop(timerId: number) {
            clearInterval(timerId)

            const timers = window.app.timers
            const index = timers.list.indexOf(timerId)
            timers.list.splice(index, 1)
        },
        stopAll() {
            window.app.timers.list.forEach((timer: number) =>
                clearInterval(timer)
            )
            window.app.timers.list = []
        },
    },
    timeouts: {
        list: [],
        start(intervalInSeconds: number, func: any, param1: any, param2: any) {
            let timeoutId = setTimeout(() => {
                func(param1, param2)
            }, intervalInSeconds * 1000)

            window.app.timeouts.list.push(timeoutId)
            return timeoutId
        },
        stop(timeoutId: number) {
            clearTimeout(timeoutId)

            const timeouts = window.app.timeouts
            const index = timeouts.list.indexOf(timeoutId)
            timeouts.list.splice(index, 1)
        },
        stopAll() {
            window.app.timeouts.list.forEach((timeout: number) =>
                clearTimeout(timeout)
            )
            window.app.timeouts.list = []
        },
    },

    // HTML-СЕЛЕКТОРЫ
    selectors: {
        container: appContainer, // контейнер приложения
        tabTitle: document.head.querySelector('title'), // тег названия вкладки
    },
}
