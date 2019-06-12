const SERVICE_HOST = 'http://localhost';
const SERVICE_PORT = '5000';
const HOST = `${SERVICE_HOST}:${SERVICE_PORT}`;

export const GET_ALL_STOCKS = `${HOST}/api/v1/stocks`;
export const GET_STOCK_PREDICTION = (code, days) => `${HOST}/api/v1/predictions/${code}?days=${days}`;
export const GET_STOCK_PREDICTION_TL = (code, days) => `${HOST}/api/v1/predictions/tl/${code}?days=${days}`;
