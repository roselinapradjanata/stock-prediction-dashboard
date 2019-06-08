import axios from 'axios';
import * as url from './constant';

export function getAllStocks() {
  return axios.get(url.GET_ALL_STOCKS);
}

export function getPrediction(code) {
  return axios.get(url.GET_STOCK_PREDICTION(code));
}
