// --------------------- ПРОЦЕДУРА ЗАПУСКА ---------------------

export const launch = function () {
    console.log(`\n`, `ЗАПУСК ПРИЛОЖЕНИЯ`, `\n\n`)

    const startDelay = 0.5
    const transitionsSetting = window.app.components.transitions.preSetting

    // Предварительные настройки

    hotkeysSetting()
    transitionsSetting()

    // Запуск

    setTimeout(start, startDelay)

    // Функции

    function start() {
        const openTheModal = window.app.components.modals.open

        openTheModal('difficulty selection')
        // openTheScreen('game')
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
