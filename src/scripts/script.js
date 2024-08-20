const apiKey = '4e36f8b20eefb8dc1058da0f307a5888';
const endpoint = `https://data.fixer.io/api/latest?access_key=${apiKey}`;

document.addEventListener("DOMContentLoaded", function() {
    const fromCurrency = document.getElementById("fromCurrency");
    const toCurrency = document.getElementById("toCurrency");
    const amount = document.getElementById("amount");
    const result = document.getElementById("result");
    const convertButton = document.getElementById("convert");

    fetch(endpoint)
        .then(response => response.json())
        .then(data => {
            const currencies = Object.keys(data.rates);
            currencies.forEach(currency => {
                let option = document.createElement("option");
                option.value = currency;
                option.text = currency;
                fromCurrency.appendChild(option);
                toCurrency.appendChild(option.cloneNode(true));
            });
        })
        .catch(error => console.error("Error fetching data:", error));

    convertButton.addEventListener("click", function() {
        const fromValue = fromCurrency.value;
        const toValue = toCurrency.value;
        const amountValue = parseFloat(amount.value);

        if (!isNaN(amountValue)) {
            fetch(`${endpoint}&symbols=${fromValue},${toValue}`)
                .then(response => response.json())
                .then(data => {
                    const rate = data.rates[toValue] / data.rates[fromValue];
                    const convertedAmount = (amountValue * rate).toFixed(2);
                    result.innerHTML = `${amountValue} ${fromValue} = ${convertedAmount} ${toValue}`;
                })
                .catch(error => console.error("Error converting currency:", error));
        } else {
            result.innerHTML = "Please enter a valid amount.";
        }
    });
});
