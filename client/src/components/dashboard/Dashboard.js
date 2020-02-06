import React, { Fragment, useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSales } from '../../actions/sales';
import Spinner from '../layout/Spinner';
import { getCurrentSales } from '../../actions/sales';
import MaterialTable from 'material-table';

const Dashboard = ({
  getCurrentSales,
  createSales,
  history,
  auth: { user },
  sale: { sale, loading }
}) => {
  const [state, setState] = useState({
    columns: [
      {
        title: 'Status',
        field: 'status',
        lookup: { 0: 'Open', 1: 'Closed' }
      },
      {
        title: 'Purchase Date',
        field: 'purchase_date',
        filtering: false,
        type: 'date'
      },
      { title: 'Name', field: 'name', filtering: false },
      { title: 'Cost', field: 'cost', filtering: false, type: 'currency' },
      {
        title: 'Revenue',
        field: 'revenue',
        filtering: false,
        type: 'currency'
      },
      {
        title: 'Closed Date',
        field: 'closed_date',
        filtering: false,
        type: 'date'
      },
      { title: 'id', field: 'id', hidden: true }
    ],
    data: [
      // { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
    ]
  });

  useEffect(() => {
    getCurrentSales();
  }, []);

  useEffect(() => {
    if (!loading) {
      setState(prevState => {
        const data = [...prevState.data];
        for (let i = 0; i < sale.length; i++) {
          // if status is true then lookup is 0
          console.log(sale[i]);
          if (sale[i].status === true) {
            const newData = {
              id: sale[i]._id,
              name: sale[i].oppName,
              cost: sale[i].cost,
              status: 0,
              revenue: sale[i].price,
              purchase_date: sale[i].purchaseDate,
              closed_date: sale[i].soldDate
            };
            data.push(newData);
          } else {
            // if status is false then lookup is 1
            const newData = {
              id: sale[i]._id,
              name: sale[i].oppName,
              cost: sale[i].cost,
              status: 1,
              revenue: sale[i].price,
              purchase_date: sale[i].purchaseDate,
              closed_date: sale[i].soldDate
            };
            data.push(newData);
          }
        }

        return { ...prevState, data };
      });
    }
  }, [sale]);

  return loading && sale === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Dashboard</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Welcome {user && user.name}
      </p>
      <MaterialTable
        title='Inventory'
        columns={state.columns}
        data={state.data}
        editable={{
          onRowAdd: newData =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                setState(prevState => {
                  const data = [...prevState.data];
                  createSales(newData, history);
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
                    console.log(newData, 'test');
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
            })
        }}
        options={{
          filtering: true,
          exportButton: true,
          cellStyle: { textAlign: 'left' },
          pageSize: 10
        }}
      />
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentSales: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  sale: PropTypes.object.isRequired,
  createSales: PropTypes.func.isRequired
};

const mapStateToProp = state => ({
  auth: state.auth,
  sale: state.sale
});

export default connect(mapStateToProp, { getCurrentSales, createSales })(
  withRouter(Dashboard)
);
