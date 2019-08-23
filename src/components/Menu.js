import React from 'react';
import Title from './Title';
import { getAllStocks } from "../services/api";
import { Select, Checkbox, Button } from 'antd';
import Grid from '@material-ui/core/Grid';

import 'antd/dist/antd.css';

const { Option } = Select;

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stock: {},
      day: null,
      stocks: [],
      days: [1, 2, 3, 4, 5],
      transferLearning: false
    };
  }

  componentDidMount() {
    getAllStocks().then(({ data }) => this.setState({ stocks: data }));
  }

  handleStockChange = (index) => {
    let stock = this.state.stocks[index];
    let day = this.state.day || 1;
    this.setState({ stock: stock, day: day });
  };

  handleDayChange = (day) => {
    this.setState({ day: day });
  };

  handleMethodChange = (event) => {
    let transferLearning = event.target.checked;
    this.setState({ transferLearning: transferLearning });
  };

  handleSearchClick = () => {
    let { stock, day, transferLearning } = this.state;
    this.props.callbackFromParent(stock, day, transferLearning);
  };

  render() {
    const { stocks, days, stock, day } = this.state;
    let valueProp = stock.code ? { value: day } : {};
    return (
      <React.Fragment>
        <Title>Menu</Title>
        <Grid container spacing={2}>
          <Grid item lg={7}>
            <Select
              style={{ width: "100%" }}
              size="large"
              showSearch
              placeholder="Stock Code"
              optionFilterProp="children"
              onChange={this.handleStockChange}
              filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
              {stocks.map((stock, i) => <Option key={i} value={i}>{stock.code}</Option>)}
            </Select>
          </Grid>
          <Grid item lg={5}>
            <Select
              style={{ width: "100%" }}
              size="large"
              placeholder="Days"
              onChange={this.handleDayChange}
              disabled={!stock.code}
              {...valueProp}
            >
              {days.map((day, i) => <Option key={i} value={day}>{day}</Option>)}
            </Select>
          </Grid>
          <Grid item lg={12}>
            <Checkbox
              disabled={!stock.code}
              onChange={this.handleMethodChange}
            >
              Transfer Learning
            </Checkbox>
          </Grid>
          <Grid item container justify="flex-end">
            <Button
              type="primary"
              icon="search"
              disabled={!stock.code}
              onClick={this.handleSearchClick}
            >
              Predict
            </Button>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default Menu;
