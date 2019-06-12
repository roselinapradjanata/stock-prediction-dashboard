import axios from 'axios';
import * as url from './constant';

export function getAllStocks() {
  return axios.get(url.GET_ALL_STOCKS);
}

export function getPrediction(code, days) {
  return axios.get(url.GET_STOCK_PREDICTION(code, days));
}

export function getPredictionTransferLearning(code, days) {
  return axios.get(url.GET_STOCK_PREDICTION_TL(code, days));
}
