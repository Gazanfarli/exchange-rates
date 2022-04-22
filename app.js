const url = "https://api.exchangerate.host/latest"
const currencyInput = document.querySelector("#input");
const currencyResult = document.querySelector("#result");

eventListeners();
function eventListeners(){
    document.addEventListener("click", changeActive);
    currencyInput.addEventListener("click", convertCurrency)
}

function changeActive(e){
    if(e.target.className.includes("currency-item")){
        const currencies = [...e.target.parentElement.children];
        currencies.forEach(e => {
            if(e.className.indexOf("active") !== -1){
                e.classList.remove("active");
            }
        })
        e.target.classList.add("active");
    }
}

function convertCurrency(event){
    let fromCurrency = document.querySelectorAll(".active")[0].innerText;
    let fromValue = 0;
    let rates;
    getRatesFromAPI()
    .then(data => {
        rates = data;
    })
    .catch(err => console.log(err));
    // console.log(rates.);
    console.log(fromCurrency)
}

async function getRatesFromAPI(){
    let rates =  await fetch(url);
    const data = await rates.json();
    return data.rates;
}
getRatesFromAPI()
.then(data => {
    console.log(data)
})
.catch(err => console.log(err));

// function getCurrencyRate(fromCurrency){
//     let fromValue; 
//     getRatesFromAPI()
//     .then(data => {
//         fromValue = data.fromCurrency;
//     })
//     .catch(err => console.log(err))
//     console.log(fromValue);
// }
// getCurrencyRate("RUB");
