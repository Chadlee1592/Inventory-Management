import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentSales } from '../../actions/sales';

const Dashboard = ({ getCurrentSales, auth, sale }) => {
  useEffect(() => {
    getCurrentSales();
  }, []);

  return <div>Dashboard</div>;
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
