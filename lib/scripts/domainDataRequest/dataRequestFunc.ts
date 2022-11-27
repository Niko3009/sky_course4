//---------------- ПРОЦЕДУРА ЗАПРОСА С ДОМЕНА -------------

// window.application.domainData.dataRequest = function ({
//     path = null,
//     params = {},
//     onSuccess = (data) => {},
//     onError = (data) => {},
//     multiple = false,
// }) {
//     const requestScreenNumber = window.application.status.screenNumber // номер экрана с которого запрос отправляется
//     const singleRequest = multiple === false // является ли запрос разовым (если да - true, если нет - false)

//     if (singleRequest) loaderEnable() // лоадер включается и выключается (ниже) только для разовых запросов

//     // Непосредственно запрос в back-end
//     let backURL = 'https://skypro-rock-scissors-paper.herokuapp.com'
//     if (path !== null) backURL += `/` + path

//     request({
//         method: 'GET',
//         url: backURL,
//         params: params,
//         onSuccess: requestOnLoad,
//         onError: requestOnError,
//     })

//     // Функция успешного запроса
//     function requestOnLoad(data) {
//         if (singleRequest) loaderDisable()

//         // если ответ негативный (status: error) — отработает, как ошибка
//         if (data.status === 'error') {
//             window.application.backendData.applyAppError(
//                 data.message !== undefined
//                     ? data.message
//                     : 'Неизвестная проблема на сервере'
//             )
//             return
//         }

//         // защита от задержек (см. ниже, в конце dataRequest)
//         const responseScreenNumber = window.application.status.screenNumber
//         if (requestScreenNumber !== responseScreenNumber) {
//             // console.log(``);
//             // console.log(`Пришел ответ на запрос с экрана #${requestScreenNumber},`);
//             // console.log(`а работает уже — #${responseScreenNumber}`);
//             // console.log(``);
//             return
//         }

//         // Запись новых данных в window.application
//         window.application.backendData.applyAppData(data)

//         // Дальнейшие действия (задаются при вызове dataRequest)
//         onSuccess(data)
//     }

//     // Функция неудачного запроса
//     function requestOnError(data) {
//         if (singleRequest) loaderDisable()

//         // защита от задержек (см. ниже, в конце dataRequest)
//         const responseScreenNumber = window.application.status.screenNumber
//         if (requestScreenNumber !== responseScreenNumber) {
//             // console.log(``);
//             // console.log(`Пришла ошибка на запрос с экрана #${requestScreenNumber},`);
//             // console.log(`а работает уже — #${responseScreenNumber}`);
//             // console.log(``);
//             return
//         }

//         // Обработка ошибок и негативных ответов (status: error)
//         window.application.backendData.applyAppError(data.error)

//         // Дальнейшие действия (задаются при вызове dataRequest)
//         onError(data)
//     }

//     // Защита от задержек — это проверка на случай, если ответ на запрос пришел после смены экрана,
//     // т.е.: если вызван запрос на одном экране, а ответ пришел — после отрисовки следующего
// }

// // Запись новых данных в window.application
// window.application.domainData.applyAppData = function (responseData) {
//     const playerStatus = responseData['player-status']
//     const gameStatus = responseData['game-status']

//     if (responseData.token !== undefined)
//         dataRecord(
//             'user.token',
//             responseData.token,
//             window.application.user,
//             'token'
//         )

//     if (playerStatus !== undefined && playerStatus.status !== undefined)
//         dataRecord(
//             'user.status',
//             playerStatus.status,
//             window.application.user,
//             'status'
//         )

//     if (
//         playerStatus !== undefined &&
//         playerStatus.game !== undefined &&
//         playerStatus.game.id !== undefined
//     )
//         dataRecord(
//             'user.game.id',
//             playerStatus.game.id,
//             window.application.user.game,
//             'id'
//         )

//     if (gameStatus !== undefined && gameStatus.status !== undefined)
//         dataRecord(
//             'user.game.status',
//             gameStatus.status,
//             window.application.user.game,
//             'status'
//         )

//     if (
//         gameStatus !== undefined &&
//         gameStatus.enemy !== undefined &&
//         gameStatus.enemy.login !== undefined
//     )
//         dataRecord(
//             'user.game.enemy',
//             gameStatus.enemy.login,
//             window.application.user.game,
//             'enemy'
//         )

//     function dataRecord(data_name, data, record_object, key) {
//         if (record_object[key] !== undefined) {
//             record_object[key] = data
//             // console.log(`Обновлен: ` + data_name);
//         }
//     }
// }

// // Обработка ошибок и негативных ответов (status: error)
// window.application.domainData.applyAppError = function (message) {
//     console.log('')
//     console.log('ОШИБКА!')
//     console.log(message)

//     // занесение данных об ошибке
//     if (window.application.backendData['errors-array'][message] === undefined) {
//         // занесение статуса в "сыром" виде, или
//         window.application.status.error = message
//     } else {
//         // замена статуса ошибки с версии back-end и разъяснение ошибки в консоли
//         const explain = window.application.backendData['errors-array'][message]

//         console.log(`т.е.: ${explain}`)
//         window.application.status.error = explain
//     }

//     // очищение информации об игроке
//     window.application.clearAppData.user()

//     // переход к стартовому экрану
//     window.application.renderScreen('login')
// }

// // Разъяснение сообщений об ошибках (для замены статуса ошибки с версии back-end)
// window.application.domainData['errors-array'] = {
//     // Общие ошибки
//     'Request failed!': 'Неизвестная проблема сети',

//     // Негативный ответ с домена
//     'Internal Server Error': 'Возникла проблема на сервере',

//     "token doesn't exist": 'Нет игрока с таким токеном',

//     'player is already in game': 'Игрок уже в другой игре',

//     'no game id': 'Id игры не передан',

//     'wrong game id': 'Id некорректный: <br> игра закончена или отсутствует',

//     'player is not in this game': 'Игрок не в этой игре',

//     'not your move': 'Не ваш ход! Сейчас ход вашего противника',

//     'wrong move': `Недопустимый ход`,

//     'no move': 'Ход не передан',

//     'player is not in this game': 'Игрок не в этой игре',
// }
