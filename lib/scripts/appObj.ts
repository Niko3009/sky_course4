//------------------- ОБЪЕКТ ПРИЛОЖЕНИЯ -------------------

import { appContainer } from './appContainer'

import { launch as launchFunc } from './launchFunc'
import { data as dataObj } from './dataObj'
import { components as componentsObj } from './components/componentsObj'

import { timeoutStart, timeoutStop, timeoutStopAll } from './timeoutsFuncs'
import { timerStart, timerStop, timerStopAll } from './timersFuncs'

export const app: {
    launch: any
    data: object
    components: object
    domainData: object
    timers: object
    timeouts: object
    selectors: object
} = {
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
        start: timerStart,
        stop: timerStop,
        stopAll: timerStopAll,
    },
    timeouts: {
        list: [],
        start: timeoutStart,
        stop: timeoutStop,
        stopAll: timeoutStopAll,
    },

    // HTML-СЕЛЕКТОРЫ
    selectors: {
        container: appContainer, // контейнер приложения
        tabTitle: document.head.querySelector('title'), // тег названия вкладки
    },
}
