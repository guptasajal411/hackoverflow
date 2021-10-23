const httpPost = (url, data, callback, err = console.error) => {
    const request = new XMLHttpRequest();
    request.open('POST', url, true);
    request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    request.onload = () => callback(request.responseText);
    request.onerror = () => err(request);
    request.send(data);
};

var config = {
    containerID: "sawo-container",
    identifierType: "email",
    apiKey: "2afa93d3-9fa3-4974-88bc-6caa9bfbfdc0",
    onSuccess: (payload) => {
        const data = JSON.stringify(payload);
        httpPost("/", data, console.log);
        console.log(payload)
    },
};
var sawo = new Sawo(config);
sawo.showForm();