import React from 'react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Spin } from 'antd';
import Chart from '../components/Chart';
import Menu from '../components/Menu';
import Prices from '../components/Prices';
import { getPrediction, getPredictionTransferLearning } from "../services/api";
import 'antd/dist/antd.css';
import Scores from "../components/Scores";

const styles = theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  title: {
    flexGrow: 1,
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    minHeight: "100%",
  },
  fixedHeight: {
    height: 450,
  },
  fixedHeightContainer: {
    height: 474
  }
});

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stock: {},
      result: {},
      loading: false
    };
  }

  stockChangeCallback = (stock, days, transferLearning = false) => {
    this.setState({ loading: true });
    let func = transferLearning ? getPredictionTransferLearning : getPrediction;
    func(stock.code, days)
      .then(({ data }) => {
        this.setState({ stock: stock, result: data, loading: false });
      })
      .catch(error => {
        this.setState({ stock: {}, result: {}, loading: false });
      });
  };

  render() {
    const { classes } = this.props;
    const { stock, result, loading } = this.state;
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    return (
      <div className={classes.root}>
        <CssBaseline/>
        <AppBar position="absolute" className={classes.appBar}>
          <Toolbar className={classes.toolbar}>
            <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
              Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
        <main className={classes.content}>
          <div className={classes.appBarSpacer}/>
          <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={8} lg={9}>
                <Spin spinning={loading}>
                  <Paper className={fixedHeightPaper}>
                    <Chart title={stock.name} actual={result.actual} predicted={result.predicted}/>
                  </Paper>
                </Spin>
              </Grid>
              <Grid container item xs={12} md={4} lg={3} direction="column">
                <Grid className={classes.fixedHeightContainer} container item spacing={3} direction="column">
                  <Grid item lg>
                    <Paper className={classes.paper}>
                      <Menu callbackFromParent={this.stockChangeCallback}/>
                    </Paper>
                  </Grid>
                  <Grid item lg>
                    <Paper className={classes.paper}>
                      <Spin spinning={loading}>
                        <Scores data={result.scores}/>
                      </Spin>
                    </Paper>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Spin spinning={loading}>
                  <Paper className={classes.paper}>
                    <Prices type="Actual" data={result.actual}/>
                  </Paper>
                </Spin>
              </Grid>
              <Grid item xs={6}>
                <Spin spinning={loading}>
                  <Paper className={classes.paper}>
                    <Prices type="Predicted" data={result.predicted}/>
                  </Paper>
                </Spin>
              </Grid>
            </Grid>
          </Container>
        </main>
      </div>
    );
  }
}

export default withStyles(styles)(Dashboard);
