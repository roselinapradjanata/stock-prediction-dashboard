const SERVICE_HOST = 'http://localhost';
const SERVICE_PORT = '5000';
const HOST = `${SERVICE_HOST}:${SERVICE_PORT}`;

export const GET_ALL_STOCKS = `${HOST}/api/v1/stocks`;
export const GET_STOCK_PREDICTION = (code) => `${HOST}/api/v1/predictions/${code}`;
