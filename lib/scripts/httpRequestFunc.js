//---------------- HTTP-ЗАПРОС -------------------

window.app.domainData.httpRequest = function ({
    method = 'GET',
    url = '#',
    params = {},
    body = '',
    responseType = 'json',
    requestType = 'json',
    onSuccess = (data) => {
        console.log(data)
    },
    onError = (data) => {
        console.log(data)
    },
}) {
    const req = new XMLHttpRequest()
    const bodyParams = new URLSearchParams(params)
    const successRequestStatus = 200

    // Формирование запроса

    if (method === 'GET') {
        url = url + (bodyParams.toString() ? `?${bodyParams.toString()}` : ``)
    }

    req.open(method, url)
    req.responseType = responseType

    if (requestType === 'urlencoded') {
        const headers = {
            'Content-type': 'application/x-www-form-urlencoded',
        }

        Object.keys(headers).forEach((key) => {
            req.setRequestHeader(key, headers[key])
        })

        body = bodyParams.toString()
    }

    req.send(body)

    // console.log(""); //line break
    // console.log(`Data request (${method}) from URL:`);
    // console.log(url);

    req.onload = function (event) {
        const request = event.target

        // console.log(`Response received, status: #${request.status}`);

        if (request.status !== successRequestStatus) {
            let errorData = {
                status: request.status,
                error: request.statusText,
            }
            // console.log(`Error: ` + errorData.error);
            onError(errorData)
            return
        }

        // console.log("Success!");
        onSuccess(request.response)
    }

    req.onerror = function () {
        // const request = event.target

        let errorData = { status: null, error: 'Request failed!' }

        // console.log(`Error: ` + errorData.error);
        onError(errorData)
    }
}
