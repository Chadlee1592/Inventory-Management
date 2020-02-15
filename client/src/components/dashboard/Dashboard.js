import React, { Fragment, useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  createSales,
  getCurrentSales,
  deleteSale,
  updateSale,
  getCurrentSalesInfo
} from '../../actions/sales';
import Papers from './Papers';

import Spinner from '../layout/Spinner';
import MaterialTable from 'material-table';

const Dashboard = ({
  getCurrentSales,
  getCurrentSalesInfo,
  createSales,
  deleteSale,
  updateSale,
  history,
  auth: { user },
  sale: { sale, loading, info }
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
      {
        title: 'Margin',
        field: 'margin',
        filtering: false,
        type: 'currency'
      },
      { title: 'id', field: 'id', hidden: true }
    ],
    data: []
  });

  useEffect(() => {
    getCurrentSales();
  }, []);

  useEffect(() => {
    if (!loading && sale) {
      setState(prevState => {
        const data = [...prevState.data];
        for (let i = sale.length - 1; i >= 0; i--) {
          // if status is true then lookup is 0: Open
          if (sale[i].status === true) {
            const newData = {
              id: sale[i]._id,
              name: sale[i].oppName,
              cost: sale[i].cost,
              status: 0,
              revenue: sale[i].price,
              purchase_date: sale[i].purchaseDate,
              closed_date: sale[i].soldDate,
              margin: 0
            };
            data.push(newData);
          } else {
            // if status is false then lookup is 1: Closed
            const newData = {
              id: sale[i]._id,
              name: sale[i].oppName,
              cost: sale[i].cost,
              status: 1,
              revenue: sale[i].price,
              purchase_date: sale[i].purchaseDate,
              closed_date: sale[i].soldDate,
              margin: sale[i].margin
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
        <Papers />
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
                    if (newData.margin) {
                      updateSale(
                        'Please exclude margin. Margin is automatically calculated',
                        'danger'
                      );
                      const data = [...prevState.data];
                      return { ...prevState, data };
                    } else if (
                      (parseInt(newData.status) === 1 &&
                        !newData.purchase_date) ||
                      (parseInt(newData.status) === 1 && !newData.revenue) ||
                      (parseInt(newData.status) === 1 && !newData.closed_date) ||
                      (parseInt(newData.status) === 1 && !newData.cost) ||
                      (parseInt(newData.status) === 1 && !newData.name)
                    ) {
                      updateSale(
                        'Please fill all except margin fields when status is closed',
                        'danger'
                      );
                      const data = [...prevState.data];
                      return { ...prevState, data };
                    } else if (
                      (parseInt(newData.status) === 0 && !newData.name) ||
                      !newData.status ||
                      (parseInt(newData.status) === 0 && !newData.cost)
                    ) {
                      updateSale(
                        'Please fill Status, Name and Cost when creating and sale',
                        'danger'
                      );
                      const data = [...prevState.data];
                      return { ...prevState, data };
                    } else {
                      const data = [...prevState.data];
                      createSales(newData, history).then(() => getCurrentSalesInfo())

                      if (parseInt(newData.status) === 1) {
                        newData.margin = parseInt(newData.revenue) - parseInt(newData.cost)
                        data.push(newData);
                        return { ...prevState, data };
                      } else {
                        newData.margin = 0
                        data.push(newData);
                        return { ...prevState, data };
                      }
                    }
                  });
                }, 600);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  if (oldData.margin !== newData.margin) {
                    updateSale(
                      'Please do not update the margin. Margin is automatically calculated',
                      'danger'
                    )
                  } else {
                    if (oldData) {
                      if (
                        (newData.status == 1 && !newData.closed_date) ||
                        (newData.status == 1 && !newData.revenue) ||
                        (newData.status == 1 && !newData.cost) ||
                        (newData.status == 1 && !newData.purchase_date) ||
                        (newData.status == 1 && !newData.name)
                      ) {
                        updateSale(
                          'Please fill all fields except margin when status is closed',
                          'danger'
                        );
                      } else {
                        setState(prevState => {
                          createSales(newData, history, true).then(() => getCurrentSalesInfo())
                          if (newData.status == 1) {
                            newData.margin = parseInt(newData.revenue) - parseInt(newData.cost)
                            const data = [...prevState.data];
                            data[data.indexOf(oldData)] = newData;
                            return { ...prevState, data };
                          } else {
                            newData.margin = 0
                            const data = [...prevState.data];
                            data[data.indexOf(oldData)] = newData;
                            return { ...prevState, data };
                          }
                        });
                      }
                    }
                  }
                }, 600);

              }),
            onRowDelete: oldData =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  setState(prevState => {
                    deleteSale(oldData.id).then(() => getCurrentSalesInfo())
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
  createSales: PropTypes.func.isRequired,
  deleteSale: PropTypes.func.isRequired,
  updateSale: PropTypes.func.isRequired,
  getCurrentSalesInfo: PropTypes.func.isRequired
};

const mapStateToProp = state => ({
  auth: state.auth,
  sale: state.sale
});

export default connect(mapStateToProp, {
  getCurrentSales,
  createSales,
  deleteSale,
  updateSale,
  getCurrentSalesInfo,
})(withRouter(Dashboard));
