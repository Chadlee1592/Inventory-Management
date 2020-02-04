import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner'
import { getCurrentSales } from '../../actions/sales';
import MaterialTable from 'material-table';

const Dashboard = ({ getCurrentSales, auth: { user }, sale: { sale, loading } }) => {
  useEffect(() => {
    getCurrentSales();
    setState(prevState => {
      const data = [...prevState.data];
      const newData = {
        name: 'chad',
        status: 1
      }
      data.push(newData);
      return { ...prevState, data };
    })
  }, []);

  console.log(sale)

  const [state, setState] = React.useState({
    columns: [
      {
        title: 'Status',
        field: 'status',
        lookup: { 0: 'Open', 1: 'Closed' },
      },
      { title: 'Name', field: 'name', filtering: false },
      { title: 'Purchase Date', field: 'surname', filtering: false },
      { title: 'Closed Date', field: 'date', filtering: false },
      { title: 'id', field: 'db_id', hidden: true }
    ],
    data: [
      // { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
    ],
  });

  return loading && sale === null ? <Spinner /> : <Fragment>
    <h1 className="large text-primary">Dashboard</h1>
    <p className="lead">
      <i className="fas fa-user"></i> Welcome {user && user.name}
    </p>
    <MaterialTable
      title="Inventory"
      columns={state.columns}
      data={state.data}
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              setState(prevState => {
                const data = [...prevState.data];
                // Save to database here
                data.push(newData);
                return { ...prevState, data };
              });
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                setState(prevState => {
                  console.log(newData, 'test')
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  return { ...prevState, data };
                });
              }
            }, 600);
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              setState(prevState => {
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
            }, 600);
          }),
      }}
      options={{
        filtering: true,
        exportButton: true
      }}
    />
  </Fragment>;
}

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
