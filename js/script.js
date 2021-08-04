const darkLightMode = document.querySelector('[data-dark-light]');
const tiltScreen = document.querySelector('[data-tilt-screen]');
const runProgram = document.querySelector('[data-run-code]');
const inputLanguage = document.getElementById('language');
const codeTextarea = document.querySelector('[data-language-coding]');
const outputArea = document.querySelector('[data-display-output]');

let data;

runProgram.addEventListener('click', fetchData);

function fetchData() {
    const code = codeTextarea.value;
    const selectedLanguage = inputLanguage.options[inputLanguage.selectedIndex].value;
    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://codequotient.com/api/executeCode');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = (event) => {
        data = JSON.parse(event.target.responseText);
        setTimeout(fetchResult, 3000);
    };
    xhr.send(JSON.stringify({
            "code" : code,
            langId : selectedLanguage
    }));
}

function fetchResult() {
    if (data.error === "code is null") {
        return alert('Opsss, Something went wrong');
    }
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://codequotient.com/api/codeResult/'+data.codeId);
    xhr.onload = (event) => {
        data = null;
        data = JSON.parse(event.target.responseText);
        displayOutput(data);
    }
    xhr.send();
}

function displayOutput(data) {
    let outputObject = JSON.parse(data.data);
    if (outputObject.object !== "") {
        outputArea.innerHTML = outputObject.output;
    } else {
        outputArea.innerHTML = outputObject.errors;
    }
}