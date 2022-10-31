function solve() {
    let departBtn = document.getElementById('depart');
    let arriveBtn = document.getElementById('arrive');
    let infoBox = document.getElementById('info');

    let currentStop = 'depot';
    let stopName = '';

    function depart() {
        fetch(`http://localhost:3030/jsonstore/bus/schedule/${currentStop}`)
            .then(handleResponse)
            .then(handleData)
            .catch(handleErr)

        function handleResponse(response) {
            if (response.ok == true && response.statusText == 'OK') {
                return response.json();
            }
            handleErr();
        }

        function handleData(data) {
            currentStop = data.next;
            stopName = data.name;
            infoBox.textContent = `Next stop ${data.name}`
            departBtn.disabled = true;
            arriveBtn.disabled = false;
       
        }

        function handleErr() {
            infoBox.textContent = "Error";
            departBtn.disabled = true;
            arriveBtn.disabled = true;
        }
    }

    function arrive() {
        infoBox.textContent = `Arriving at ${stopName}`
        departBtn.disabled = false;
        arriveBtn.disabled = true;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();