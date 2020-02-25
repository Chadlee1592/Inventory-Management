import React, { Fragment, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { useMediaQuery } from '@material-ui/core';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentSalesInfo } from '../../actions/sales';

// width and height 23 and 16 for phone
// fontSize 2 rem and 1 rem for phone
// paper padding 2 and 1 for phone
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(23),
      height: theme.spacing(23)
    }
  },
  rootTwo: {
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(1),
      height: theme.spacing(1)
    }
  },
  rootThree: {
    flexGrow: 1
  },
  paper: {
    textAlign: 'center',
    padding: theme.spacing(2)
  },
  title: {
    color: 'black'
  },
  number: {
    fontSize: '2rem'
  },
  isActiveRoot: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16)
    }
  },
  isActivePaper: {
    textAlign: 'center',
    padding: theme.spacing(1)
  },
  isActiveNumber: {
    fontSize: '1rem'
  }
}));

const Papers = ({
  getCurrentSalesInfo,
  auth: { user },
  sale: { sale, loading, info }
}) => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    checkedB: false
  });
  const [data, setData] = React.useState({
    overallProfit: '',
    overallCost: '',
    monthlyProfit: '',
    overallRevenue: ''
  });

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };

  const isActive = useMediaQuery('(max-width: 450px');

  useEffect(() => {
    getCurrentSalesInfo();
  }, []);

  useEffect(() => {
    if (info !== null) {
      setData({
        overallProfit: info.totalProfit,
        overallCost: info.totalInventoryCost,
        monthlyProfit: info.currentMonthProfit,
        overallRevenue: info.totalRevenue
      });
    }
  }, [info]);

  const formatMoney = number =>
    number.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

  return (
    <Fragment>
      {!isActive ? (
        <Fragment>
          <div className={classes.root}>
            {state.checkedB && (
              <Fragment>
                <Paper elevation={3}>
                  <div className={classes.rootThree}>
                    <p className={[classes.paper, classes.title].join(' ')}>
                      Total Investment
                    </p>
                    <p className={[classes.paper, classes.number].join(' ')}>
                      {formatMoney(data.overallCost)}
                    </p>
                  </div>
                </Paper>
                <Paper elevation={3}>
                  <div className={classes.rootThree}>
                    <p className={[classes.paper, classes.title].join(' ')}>
                      Total Revenue
                    </p>
                    <p className={[classes.paper, classes.number].join(' ')}>
                      {formatMoney(data.overallRevenue)}
                    </p>
                  </div>
                </Paper>
                <Paper elevation={3}>
                  <div className={classes.rootThree}>
                    <p className={[classes.paper, classes.title].join(' ')}>
                      Total Profit
                    </p>
                    <p className={[classes.paper, classes.number].join(' ')}>
                      {formatMoney(data.overallProfit)}
                    </p>
                  </div>
                </Paper>
                <Paper elevation={3}>
                  <div className={classes.rootThree}>
                    <p className={[classes.paper, classes.title].join(' ')}>
                      Current Month Profit
                    </p>
                    <p className={[classes.paper, classes.number].join(' ')}>
                      {formatMoney(data.monthlyProfit)}
                    </p>
                  </div>
                </Paper>
              </Fragment>
            )}
          </div>

          <FormControlLabel
            control={
              <Switch
                className={classes.display}
                checked={state.checkedB}
                onChange={handleChange('checkedB')}
                value='checkedB'
                color='primary'
              />
            }
            label='Show / Hide'
          />
        </Fragment>
      ) : (
          <Fragment>
            <div className={classes.isActiveRoot}>
              {state.checkedB && (
                <Fragment>
                  <Paper elevation={3}>
                    <div className={classes.rootThree}>
                      <p
                        className={[classes.isActivePaper, classes.title].join(
                          ' '
                        )}
                      >
                        Total Investment
                    </p>
                      <p
                        className={[
                          classes.isActivePaper,
                          classes.isActiveNumber
                        ].join(' ')}
                      >
                        {formatMoney(data.overallCost)}
                      </p>
                    </div>
                  </Paper>
                  <Paper elevation={3}>
                    <div className={classes.rootThree}>
                      <p
                        className={[classes.isActivePaper, classes.title].join(
                          ' '
                        )}
                      >
                        Total Revenue
                    </p>
                      <p
                        className={[
                          classes.isActivePaper,
                          classes.isActiveNumber
                        ].join(' ')}
                      >
                        {formatMoney(data.overallRevenue)}
                      </p>
                    </div>
                  </Paper>
                  <Paper elevation={3}>
                    <div className={classes.rootThree}>
                      <p
                        className={[classes.isActivePaper, classes.title].join(
                          ' '
                        )}
                      >
                        Total Profit
                    </p>
                      <p
                        className={[
                          classes.isActivePaper,
                          classes.isActiveNumber
                        ].join(' ')}
                      >
                        {formatMoney(data.overallProfit)}
                      </p>
                    </div>
                  </Paper>
                  <Paper elevation={3}>
                    <div className={classes.rootThree}>
                      <p
                        className={[classes.isActivePaper, classes.title].join(
                          ' '
                        )}
                      >
                        Current Month Profit
                    </p>
                      <p
                        className={[
                          classes.isActivePaper,
                          classes.isActiveNumber
                        ].join(' ')}
                      >
                        {formatMoney(data.monthlyProfit)}
                      </p>
                    </div>
                  </Paper>
                </Fragment>
              )}
            </div>

            <FormControlLabel
              control={
                <Switch
                  className={classes.display}
                  checked={state.checkedB}
                  onChange={handleChange('checkedB')}
                  value='checkedB'
                  color='primary'
                />
              }
              label='Show / Hide'
            />
          </Fragment>
        )}
    </Fragment>
  );
};

Papers.propTypes = {
  getCurrentSalesInfo: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  sale: PropTypes.object.isRequired
};

const mapStateToProp = state => ({
  auth: state.auth,
  sale: state.sale
});

export default connect(mapStateToProp, {
  getCurrentSalesInfo
})(Papers);
