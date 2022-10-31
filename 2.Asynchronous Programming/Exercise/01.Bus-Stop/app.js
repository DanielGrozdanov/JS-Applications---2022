function getInfo() {

    let busId = document.getElementById('stopId').value;
    let stopName = document.getElementById("stopName");
    let buses = document.getElementById('buses');
    stopName.innerHTML = '';
    buses.innerHTML = '';

    fetch(`http://localhost:3030/jsonstore/bus/businfo/${busId}`)
        .then(handlResponse)
        .then(handleResponseData)
        .catch(handleError)


    function handlResponse(response) {
        if(response.ok == true && response.statusText == "OK"){
            return response.json();
        }
        handleError();
    }

    function handleResponseData(data) {
        for (let value of Object.values(data)) {
            if (typeof value === 'object') {
                for (let [bus, time] of Object.entries(value)) {
                    let li = document.createElement('li');
                    li.textContent = `Bus ${bus} arrives in ${time} minutes`
                    buses.appendChild(li);
                }
            }else{
                stopName.textContent = value;
            }
        }
    }

    function handleError(){
        return stopName.textContent = "Error";
    }
}