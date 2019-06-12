import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label, ResponsiveContainer } from 'recharts';
import { Empty } from 'antd';
import Title from './Title';

class Chart extends React.Component {
  render() {
    const { title, actual, predicted } = this.props;
    const data = actual && predicted && this.combineData(actual, predicted);
    return (
      <React.Fragment>
        <Title>{title || 'Price Chart'}</Title>
        {data ? this.renderChart(data) : <Empty style={{ verticalAlign: "middle" }}/>}
      </React.Fragment>
    );
  }

  renderChart = (data) => (
    <ResponsiveContainer>
      <LineChart
        data={data}
        margin={{
          top: 10, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3"/>
        <XAxis dataKey="date"/>
        <YAxis type="number" domain={['dataMin', 'dataMax']}>
          <Label angle={270} position="left" style={{ textAnchor: 'middle' }}>
            Price (Rp)
          </Label>
        </YAxis>
        <Tooltip/>
        <Legend/>
        <Line type="monotone" dataKey="predicted" stroke="#8884d8"/>
        <Line type="monotone" dataKey="actual" stroke="#82ca9d"/>
      </LineChart>
    </ResponsiveContainer>
  );

  combineData = (actual, predicted) => {
    let data = predicted.map(row => ({ 'date': row.date, 'predicted': row.price }));
    actual.forEach((row, i) => data[i].actual = row.price);
    return data;
  };
}

export default Chart;
