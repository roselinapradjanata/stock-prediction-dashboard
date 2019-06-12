import React from 'react';
import { Empty } from 'antd';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';

class Prices extends React.Component {
  render() {
    const { type, data } = this.props;
    return (
      <React.Fragment>
        <Title>{type} Prices</Title>
        {data ? this.renderTable(data) : <Empty/>}
      </React.Fragment>
    );
  }

  renderTable = (data) => (
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>Date</TableCell>
          <TableCell>Price</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data && data.map((row, i) => (
          <TableRow key={i}>
            <TableCell>{row.date}</TableCell>
            <TableCell>{row.price}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default Prices;
