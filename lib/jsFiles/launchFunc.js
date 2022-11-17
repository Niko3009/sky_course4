// --------------------- ПРОЦЕДУРА ЗАПУСКА ---------------------

window.app.launch = function () {
    console.log(`\n`, `ЗАПУСК ПРИЛОЖЕНИЯ`, `\n\n`)

    const startDelay = 0.5
    const transitionsSetting = window.app.components.transitions.preSetting

    // Предварительные настройки

    preLoading() // предварительная подгрузка данных
    hotkeysSetting() // настройка горячих клавиш
    transitionsSetting()

    // Запуск

    setTimeout(start, startDelay)

    // Функции

    function start() {
        const openTheModal = window.app.components.modals.open
        openTheModal('difficulty selection')
        // openTheScreen('game')
    }

    function preLoading() {
        // Подгрузка данных экранов
        window.app.components.screens.blocks.listFilling()
        window.app.components.screens.listFilling()

        // Подгрузка данных модальных окон
        window.app.components.modals.blocks.listFilling()
        window.app.components.modals.listFilling()
    }

    function hotkeysSetting() {
        let instructionsForHotkeys = new String()
        instructionsForHotkeys += `Для получения текущей информации об игре, нажмите «z»/«я» \n`
        console.log(`\n`, instructionsForHotkeys, `\n`)

        document.addEventListener('keydown', function (event) {
            // Hotkey для вывода информации
            const getInfo = window.app.data.getInfo
            const getInfoHotkeys = ['z', 'я']
            if (getInfoHotkeys.includes(event.key)) getInfo()
        })
    }
}
