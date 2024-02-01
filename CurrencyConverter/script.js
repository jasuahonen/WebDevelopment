document.addEventListener('DOMContentLoaded', () => {
    const fromCurrencySelect = document.getElementById('fromCurrency');
    const toCurrencySelect = document.getElementById('toCurrency');
    const amountInput = document.getElementById('amount');
    const resultDiv = document.getElementById('result');

    // Fetch currency codes from the API
    fetch('https://open.er-api.com/v6/latest')
        .then(response => response.json())
        .then(data => {
            const currencies = Object.keys(data.rates);

            currencies.forEach(currency => {
                const option1 = document.createElement('option');
                option1.value = currency;
                option1.text = currency;
                fromCurrencySelect.add(option1);

                const option2 = document.createElement('option');
                option2.value = currency;
                option2.text = currency;
                toCurrencySelect.add(option2);
            });
        });

    // Conversion function
    window.convertCurrency = () => {
        const fromCurrency = fromCurrencySelect.value;
        const toCurrency = toCurrencySelect.value;
        const amount = amountInput.value;

        fetch(`https://open.er-api.com/v6/latest`)
            .then(response => response.json())
            .then(data => {
                const rate = data.rates[toCurrency] / data.rates[fromCurrency];
                const convertedAmount = (amount * rate).toFixed(2);

                resultDiv.innerHTML = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
            })
            .catch(error => console.error('Error fetching exchange rates:', error));
    };
});
