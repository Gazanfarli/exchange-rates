const exchange_api_url = "https://api.exchangerate.host/latest?base="
const currencyInput = document.querySelector("#input");
const currencyResult = document.querySelector("#result");

eventListeners();

function eventListeners(){
    document.addEventListener("DOMContentLoaded", convertDefault)
    document.addEventListener("click", changeActive);
    currencyInput.addEventListener("keyup", convertCurrencyFromInput)
    currencyResult.addEventListener("keyup", convertCurrencyFromResult)
}


function convertCurrencyFromInput(){ // Convert from main input
    let fromCurrency = document.querySelectorAll(".active")[0].innerText;
    let toCurrency = document.querySelectorAll(".active")[1].innerText;

    if(isEqual()){
        currencyResult.value = currencyInput.value;
        return 0;
    };

    getRatesFromAPI(exchange_api_url + `${fromCurrency}&symbols=${toCurrency}`)
    .then(data => {
        let toValue = Object.values(data)[0];
        currencyResult.value = (currencyInput.value * toValue).toFixed(4);
    })
    .catch(err => console.log(err));
}

function convertCurrencyFromResult(){ // Convert from Result input
    let fromCurrency = document.querySelectorAll(".active")[1].innerText;
    let toCurrency = document.querySelectorAll(".active")[0].innerText;

    if(isEqual()){
        currencyInput.value = currencyResult.value;
        return 0;
    };

    getRatesFromAPI(exchange_api_url + `${fromCurrency}&symbols=${toCurrency}`)
    .then(data => {
        let toValue = Object.values(data)[0];
        currencyInput.value = (currencyResult.value * toValue).toFixed(4);
    })
    .catch(err => console.log(err));
}

function getRatesFromAPI(url){
    return new Promise((resolve, reject) => {
        fetch(url)
        .then(res => res.json())
        .then(data => resolve(data.rates))
        .catch(() => reject("Someting went wrong... can't fetch data from API"));
    })
}

function isEqual(){
    const actives = [...document.querySelectorAll(".active")];
    if(actives[0].textContent == actives[1].textContent){
        return true;
    }else{
        return false;
    }
}

function convertDefault(){
    let fromCurrency = document.querySelectorAll(".active")[0].innerText;
    let toCurrency = document.querySelectorAll(".active")[1].innerText;

    getRatesFromAPI(exchange_api_url + `${fromCurrency}&symbols=${toCurrency}`)
    .then(data => {
        let toValue = Object.values(data)[0];
        currencyInput.value = 1;
        currencyResult.value = toValue.toFixed(4);
        changeRateText(fromCurrency, toCurrency);
    })
}

function changeActive(e){
    if(e.target.className.includes("currency-item")){
        isEqual();
        const currencies = [...e.target.parentElement.children];
        currencies.forEach(e => {
            if(e.className.indexOf("active") !== -1){
                e.classList.remove("active");
            }
        })
        e.target.classList.add("active");
    }
    changeRateText();
    convertCurrencyFromInput();
}

function changeRateText(){
    let fromCurrencyRate = document.querySelector(".input-rate");
    let toCurrencyRate = document.querySelector(".result-rate");
    const fromCurrency = document.querySelectorAll(".active")[0].innerText;
    const toCurrency = document.querySelectorAll(".active")[1].innerText;

    getRatesFromAPI(exchange_api_url + `${fromCurrency}&symbols=${toCurrency}`)
    .then(data => {
        fromCurrencyRate.textContent = `1 ${fromCurrency} = ${Object.values(data)[0].toFixed(4)} ${toCurrency}`;
    })
    getRatesFromAPI(exchange_api_url + `${toCurrency}&symbols=${fromCurrency}`)
    .then(data => {
        toCurrencyRate.textContent = `1 ${toCurrency} = ${Object.values(data)[0].toFixed(4)} ${fromCurrency}`
    })
}