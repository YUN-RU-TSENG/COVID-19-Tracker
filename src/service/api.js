import axios from "axios";


// API 新冠肺炎
// API Doc: https://documenter.getpostman.com/view/10808728/SzS8rjbc?version=latest
const requestCovid19 = axios.create({
  baseURL: "https://api.covid19api.com/",
});

export const GET_COVID19 = (url, parameter = {}) => requestCovid19.get(url, parameter);
export const POST_COVID19 = (url, data = {}, config = {}) => requestCovid19.post(url, data, config);


// API 城市資料
// API Doc: https://restcountries.eu/
const requestCountries = axios.create({
  baseURL: "https://restcountries.eu/rest/v2/",
});

export const GET_COUNTRIES = (url, parameter = {}) =>  requestCountries.get(url, parameter);
export const POST_COUNTRIES = (url, data = {}, config = {}) => requestCountries.post(url, data, config);