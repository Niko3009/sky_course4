//------------------- ОБЪЕКТ ПРИЛОЖЕНИЯ -------------------

window.app = {
    // ПРОЦЕДУРА ЗАПУСКА
    launch: function () {}, // см. lib/jsFiles/launchFunc.js

    // ТЕКУЩИЕ ДАННЫЕ ПРИЛОЖЕНИЯ
    data: {}, // см. /lib/jsFiles/dataObj.js

    // КОМПОНЕНТЫ ПРИЛОЖЕНИЯ
    components: {}, // см. lib/jsFiles/componentsObj.js

    // ПОЛУЧЕНИЕ БЭК-ЭНД ДАННЫХ
    domainData: {
        dataRequest: function () {}, // -
        httpRequest: function () {}, // см. lib\jsFiles\httpRequestFunc.js
    },

    // ТАЙМЕРЫ
    timers: {
        list: [],
        start(intervalInSeconds, func) {
            let timerId = setInterval(func, intervalInSeconds * 1000)
            window.app.timers.list.push(timerId)
            return timerId
        },
        clearAll() {
            window.app.timers.list.forEach((timer) => clearInterval(timer))
            window.app.timers.list = []
        },
    },

    // HTML-СЕЛЕКТОРЫ
    selectors: {
        container: document.body.querySelector('#app'), // контейнер приложения
        tabTitle: document.head.querySelector('title'), // тег названия вкладки
    },
}
