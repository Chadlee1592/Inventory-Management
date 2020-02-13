import React, { Fragment, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentSalesInfo } from '../../actions/sales';

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
  getCurrentSalesInfo,
  auth: { user },
  sale: { sale, loading, info }
}) => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    checkedB: false,
  });
  const [data, setData] = React.useState({
    overallProfit: '',
    overallCost: '',
    monthlyProfit: ''
  })

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };

  useEffect(() => {
    getCurrentSalesInfo();
  }, []);

  useEffect(() => {
    if (info !== null) {
      setData({
        overallProfit: info.totalProfit,
        overallCost: info.totalInventoryCost,
        monthlyProfit: info.currentMonthProfit
      })
    }
  }, [info])

  return (
    <Fragment>
      <div className={classes.root}>
        {state.checkedB && (
          <Fragment>
            <Paper elevation={3}>
              {' '}
              <div>Overall Profit</div>
              <div>{data.overallProfit}</div>
            </Paper>
            <Paper elevation={3}>
              <div>Overall Cost</div>
              <div>{data.overallCost}</div>
            </Paper>
            <Paper elevation={3}>
              <div>Monthly Profit</div>
              <div>{data.monthlyProfit}</div>
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
