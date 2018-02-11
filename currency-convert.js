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

getCountries = currencyCode => {
  return axios
    .get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`)
    .then(response => {
      return response.data.map(country => {
        return country.name;
      });
    });
};

getCountries('CAD').then(country => {
  console.log(country);
});

getExchangeRate('USD', 'EUR').then(rate => {
  console.log(rate);
});
