import React from 'react';
import Title from './Title';
import { getAllStocks, getPrediction } from "../services/api";
import { Select, Typography } from 'antd';
import 'antd/dist/antd.css';

const { Option } = Select;
const { Text } = Typography;

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stock: {},
      stocks: [],
      loading: false,
    };
  }

  componentDidMount() {
    getAllStocks().then(({ data }) => this.setState({ stocks: data }));
  }

  handleChange = (index) => {
    const stock = this.state.stocks[index];
    this.setState({ stock: stock, loading: true });
    getPrediction(stock.code)
      .then(({ data }) => {
        this.props.callbackFromParent(stock, data);
        this.setState({ loading: false });
      });
  };

  render() {
    const { stock, stocks, loading } = this.state;
    return (
      <React.Fragment>
        <Title>Menu</Title>
        <Select
          showSearch
          size="large"
          placeholder="Select a stock"
          optionFilterProp="children"
          onChange={this.handleChange}
          loading={loading}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {stocks.map((stock, i) => <Option key={i} value={i}>{stock.code}</Option>)}
        </Select>
        <Text style={{ textAlign: "center", marginTop: 5 }}>{ stock.name }</Text>
      </React.Fragment>
    );
  }
}

export default Menu;
