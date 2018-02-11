//So by using axios you can cut out the middle
// step of passing the results of the http request to the .json() method.
// Axios just returns the data object you would expect.
// https://medium.com/@thejasonfile/fetch-vs-axios-js-for-making-http-requests-2b261cdd3af5

const axios = require('axios');

const getExchangeRate = (from, to) => {
  //remember to return the promise to continue chaining
  return axios
    .get(`https://api.fixer.io/latest?base=${from}`)
    .then(response => {
      return response.data.rates[to];
    });
};

const getCountries = currencyCode => {
  return axios
    .get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`)
    .then(response => {
      return response.data.map(country => {
        return country.name;
      });
    });
};

const convertCurrency = (from, to, amount) => {
  let countries;
  return getCountries(to)
    .then(tempCountries => {
      countries = tempCountries;
      return getExchangeRate(from, to);
    })
    .then(rate => {
      const exchangedAmount = amount * rate;
      return `${amount} ${from} is worth ${exchangedAmount} ${to} can be used in the following countries: ${countries.join(
        ', '
      )}.`;
    });
};

const getExchangeRateAlt = async (from, to) => {
  const response = await axios.get(`https://api.fixer.io/latest?base=${from}`);
  return response.data.rates[to];
};

const getCountriesAlt = async currencyCode => {
  const response = await axios.get(
    `https://restcountries.eu/rest/v2/currency/${currencyCode}`
  );
  return response.data.map(country => country.name);
};

//create convertCurrencyAlt as a async function
const convertCurrencyAlt = async (from, to, amount) => {
  const countries = await getCountriesAlt(to);
  const exchangeRate = await getExchangeRateAlt(from, to);
  const exchangedAmount = amount * exchangeRate;
  return `${amount} ${from} is worth ${exchangedAmount} ${to} can be used in the following countries: ${countries.join(
    ', '
  )}.`;
};

convertCurrencyAlt('USD', 'CAD', 100).then(status => {
  console.log(status);
});

// getCountries('CAD').then(country => {
//   console.log(country);
// });
//
// getExchangeRate('USD', 'EUR').then(rate => {
//   console.log(rate);
// });
