import React, { Fragment, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import moment from 'moment';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentSales } from '../../actions/sales';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16)
    }
  }
}));

const Papers = ({
  getCurrentSales,
  auth: { user },
  sale: { sale, loading }
}) => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    checkedB: false,
    overallProfit: '',
    overallCost: '',
    monthlyProfit: ''
  });

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };

  useEffect(() => {
    const overallProfit = () => {
      if (!loading && sale) {
        for (let i = 0; i < sale.length; i++) {
          if (!sale[i].status) {
            let totalMargin = +sale[i].margin;
            return totalMargin;
          }
        }
      }
    };
    const overallCost = () => {
      if (!loading && sale) {
        for (let i = 0; i < sale.length; i++) {
          let totalCost = +sale[i].cost;
          return totalCost;
        }
      }
    };

    const monthProfit = () => {
      if (!loading && sale) {
        const today = new Date();
        const currentMonth = today.getMonth();
        for (let i = 0; i < sale.length; i++) {
          const closedMonth = moment(sale[i].soldDate);
          if (!sale[i].status && currentMonth === closedMonth.month()) {
            let totalMargin = +sale[i].margin;
            return totalMargin;
          }
        }
      }
    };
    if (!loading && sale) {
      const totalProfit = overallProfit();
      const totalCost = overallCost();
      const monthlyProfit = monthProfit();
      setState({
        ...state,
        monthlyProfit: monthlyProfit,
        overallCost: totalCost,
        overallProfit: totalProfit
      });
    }
  }, [sale]);
  console.log(state);
  return (
    <Fragment>
      <div className={classes.root}>
        {state.checkedB && (
          <Fragment>
            <Paper elevation={3}>
              {' '}
              <div>Overall Profit</div>
              <div>{state.overallProfit}</div>
            </Paper>
            <Paper elevation={3}>
              <div>Overall Cost</div>
              <div>{state.overallCost}</div>
            </Paper>
            <Paper elevation={3}>
              <div>Monthly Profit</div>
              <div>{state.monthlyProfit}</div>
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
  );
};

Papers.propTypes = {
  getCurrentSales: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  sale: PropTypes.object.isRequired
};

const mapStateToProp = state => ({
  auth: state.auth,
  sale: state.sale
});

export default connect(mapStateToProp, {
  getCurrentSales
})(Papers);
