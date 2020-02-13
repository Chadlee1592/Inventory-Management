import React, { Fragment, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

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
    monthlyProfit: '',
    monthlyCost: ''
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
    const totalMargin = overallProfit();
    const totalCost = overallCost();
    console.log(totalMargin);
    console.log(totalCost);

    const 
  }, [sale]);

  return (
    <Fragment>
      <div className={classes.root}>
        {state.checkedB && (
          <Fragment>
            <Paper elevation={3}>
              {' '}
              <div>Overall</div>
            </Paper>
            <Paper elevation={3} />
            <Paper elevation={3} />
            <Paper elevation={3} />
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
