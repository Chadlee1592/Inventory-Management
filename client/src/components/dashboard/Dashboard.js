import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner'
import { getCurrentSales } from '../../actions/sales';

const Dashboard = ({ getCurrentSales, auth: { user }, sale: { sale, loading } }) => {
  useEffect(() => {
    getCurrentSales();
  }, []);

  return loading && sale === null ? <Spinner /> : <Fragment>
    <h1 className="large text-primary">Dashboard</h1>
    <p className="lead">
      <i className="fas fa-user"></i> Welcome {user && user.name}
    </p>
    {sale !== null ? <Fragment>has</Fragment> : <Fragment>hasnot</Fragment>}
  </Fragment>;
};

Dashboard.propTypes = {
  getCurrentSales: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  sale: PropTypes.object.isRequired
};

const mapStateToProp = state => ({
  auth: state.auth,
  sale: state.sale
});

export default connect(mapStateToProp, { getCurrentSales })(Dashboard);
