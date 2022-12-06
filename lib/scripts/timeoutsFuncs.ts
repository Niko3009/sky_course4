export const timeoutStart = function (
    intervalInSeconds: number,
    func: any,
    prm1: any,
    prm2: any
) {
    let timeoutId = setTimeout(() => {
        func(prm1, prm2)
    }, intervalInSeconds * 1000)

    window.app.timeouts.list.push(timeoutId)
    return timeoutId
}

export const timeoutStop = function (timeoutId: number) {
    clearTimeout(timeoutId)

    const timeouts = window.app.timeouts
    const index = timeouts.list.indexOf(timeoutId)
    timeouts.list.splice(index, 1)
}

export const timeoutStopAll = function () {
    window.app.timeouts.list.forEach((timeout: number) => clearTimeout(timeout))
    window.app.timeouts.list = []
}
