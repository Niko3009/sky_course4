export const timerStart = function (
    intervalInSeconds: number,
    func: any,
    prm1: any = undefined,
    prm2: any = undefined
) {
    let timerId = setInterval(() => {
        func(prm1, prm2)
    }, intervalInSeconds * 1000)

    window.app.timers.list.push(timerId)
    return timerId
}

export const timerStop = function (timerId: number) {
    clearInterval(timerId)

    const timers = window.app.timers
    const index = timers.list.indexOf(timerId)
    timers.list.splice(index, 1)
}

export const timerStopAll = function () {
    window.app.timers.list.forEach((timer: number) => clearInterval(timer))
    window.app.timers.list = []
}
