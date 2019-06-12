import React from 'react';
import Title from './Title';
import { Empty } from 'antd';
import Grid from '@material-ui/core/Grid';
import 'antd/dist/antd.css';
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";

class Scores extends React.Component {
  render() {
    const { data } = this.props;
    return (
      <React.Fragment>
        <Title>Scores</Title>
        <Grid container spacing={3}>
          <Grid item lg={12}>
            {data ? this.renderTable(data) : <Empty/>}
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }

  renderTable = (data) => (
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>Metric</TableCell>
          <TableCell>Score</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((row, i) => (
          <TableRow key={i}>
            <TableCell>{row.metric}</TableCell>
            <TableCell>{row.score}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default Scores;
