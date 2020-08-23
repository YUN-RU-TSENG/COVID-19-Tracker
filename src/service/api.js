/**
 * API Doc: https://documenter.getpostman.com/view/10808728/SzS8rjbc?version=latest
 */
// ! 這一頁太亂，要整理
import axios from "axios";
// nprogress
import NProgress from "nprogress";
import "@/assets/plugin/nprogress.css";

const covidNineteenInstance = axios.create({
  baseURL: "https://api.covid19api.com/",
  timeout: 6000,
});

covidNineteenInstance.interceptors.request.use((config) => {
  NProgress.start();
  return config;
});
covidNineteenInstance.interceptors.response.use((response) => {
  NProgress.done();
  return response;
});

// 返回所有地區每日最新數據、總數據
export const GET_covidNineteenSummary = () =>
  covidNineteenInstance.get("/summary").then((response) => response.data);

// 返回所有地區名稱
export const GET_covidNineteenCountries = () =>
  covidNineteenInstance.get("/countries").then((response) => response.data);

// 返回一個地區至今的某類別自第一日到今日
export const GET_covidNineteenCountryStatusFromDayOne = (country, status) =>
  covidNineteenInstance
    .get(`/dayone/country/${country}/status/${status}`)
    .then((response) => response.data);

// 返回一個國家特定時間內的資料
export const GET_covidNineteenCountryAllStatusFromDayOne = (
  country,
  startTime,
  endTime
) =>
  covidNineteenInstance
    .get(`/country/${country}?from=${startTime}&to=${endTime}`)
    .then((response) => response.data);

const Country_Instance = axios.create({
  baseURL: "https://restcountries.eu/rest/v2/all",
});

// Country_Instance.interceptors.request.use((config) => {
//   return config;
// });
// Country_Instance.interceptors.response.use((response) => {
//   return response;
// });

// 返回所有國家詳細訊息
export const GET_Countries = () =>
  Country_Instance.get().then((response) => response.data);
