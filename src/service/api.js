import axios from "axios";

// API 新冠肺炎
const requestCovidNineteen = axios.create({
  baseURL: "https://api.covid19api.com/",
});

// API 城市資料
const requestCountries = axios.create({
  baseURL: "https://restcountries.eu/rest/v2/all",
});

// API 新冠肺炎 API Doc: https://documenter.getpostman.com/view/10808728/SzS8rjbc?version=latest
export const apiCovidNineteenSummary /* 返回所有地區每日最新數據、總數據*/ = () => requestCovidNineteen.get("/summary");
export const apiCovidNineteenCountries /* 返回所有地區名稱*/ = () => requestCovidNineteen.get("/countries");
export const apiCovidNineteenCountryStatusFromDayOne /* 返回一個地區至今的某類別自第一日到今日*/ = ({
  country,
  status
}) => {
  return requestCovidNineteen.get(`/dayone/country/${country}/status/${status}`);
};
export const apiCovidNineteenCountryAllStatusFromDayOne /* 返回一個國家特定時間內的資料*/ = ({
  country,
  startTime,
  endTime,
}) => {
  return requestCovidNineteen.get(
    `/country/${country}?from=${startTime}&to=${endTime}`
  );
};


// API 城市資料
export const apiCountries = () => requestCountries.get(); // 返回所有國家詳細訊息