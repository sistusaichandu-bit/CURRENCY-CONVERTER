const fromCurrency = document.getElementById('fromCurrency');
const toCurrency = document.getElementById('toCurrency');
const amount = document.getElementById('amount');
const convertBtn = document.getElementById('convertBtn');
const result = document.getElementById('result');

// List of currencies to populate dropdowns
const currencies = ["USD", "EUR", "GBP", "INR", "JPY", "CAD", "AUD", "CHF", "CNY", "ZAR" , "SGD" , "RUB" , "QAR" , "NZD" , "AED"];
currencies.push("SGD" , "RUB" , "QAR" , "NZD" , "AED");

currencies.forEach(currency => {
  const option1 = document.createElement("option");
  option1.value = currency;
  option1.text = currency;
  fromCurrency.appendChild(option1);

  const option2 = document.createElement("option");
  option2.value = currency;
  option2.text = currency;
  toCurrency.appendChild(option2);
});

// Set default selections
fromCurrency.value = "USD";
toCurrency.value = "INR";

convertBtn.addEventListener('click', () => {
  const amountVal = amount.value;

  if (!amountVal || amountVal <= 0) {
    result.innerText = "Please enter a valid amount.";
    return;
  }

  const from = fromCurrency.value;
  const to = toCurrency.value;

  // Use ExchangeRate API (no API key required)
  fetch(`https://api.exchangerate-api.com/v4/latest/${from}`)
    .then(res => res.json())
    .then(data => {
      const rate = data.rates[to];
      const converted = (amountVal * rate).toFixed(2);
      result.innerText = `${amountVal} ${from} = ${converted} ${to}`;
    })
    .catch(() => {
      result.innerText = "Error fetching exchange rate.";
    });
});
