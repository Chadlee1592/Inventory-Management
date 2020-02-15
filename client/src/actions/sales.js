import axios from 'axios';
import { setAlert } from './alert';
import moment from 'moment';

import { GET_SALES, SALES_ERROR, UPDATE_SALES, GET_INFO, CLEAR_INFO } from './types';

export const getCurrentSales = () => async dispatch => {
  try {
    const res = await axios.get('/api/sales');

    dispatch({
      type: GET_SALES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: SALES_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const clearCurrentSalesInfo = () => async dispatch => {
  dispatch({ type: CLEAR_INFO })
}

export const createSales = (
  formData,
  history,
  edit = false
) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    if (!formData.revenue) {
      // if new item
      if (!edit) {
        // if status is true then lookup is 0: Open
        if (parseInt(formData.status) === 0 && !formData.closed_date) {
          const newData = {
            purchaseDate: moment(formData.purchase_date).format('MM DD YYYY'),
            oppName: formData.name,
            cost: formData.cost,
            revenue: formData.revenue,
            soldDate: null,
            margin: 0,
            status: true,
            edit: false
          };

          const res = await axios.post('/api/sales', newData, config);

          dispatch({
            type: GET_SALES,
            payload: res.data
          });

          dispatch(setAlert(edit ? 'Sale Updated' : 'Sale Created', 'success'));

          history.push('/dashboard');
        } else if (parseInt(formData.status) === 0) {
          const newData = {
            purchaseDate: moment(formData.purchase_date).format('MM DD YYYY'),
            oppName: formData.name,
            cost: formData.cost,
            revenue: formData.revenue,
            soldDate: moment(formData.closed_date).format('MM DD YYYY'),
            margin: 0,
            status: true,
            edit: false
          };

          const res = await axios.post('/api/sales', newData, config);

          dispatch({
            type: GET_SALES,
            payload: res.data
          });

          dispatch(setAlert(edit ? 'Sale Updated' : 'Sale Created', 'success'));

          history.push('/dashboard');
        } else {
          const newData = {
            purchaseDate: moment(formData.purchase_date).format('MM DD YYYY'),
            oppName: formData.name,
            cost: formData.cost,
            revenue: formData.revenue,
            soldDate: moment(formData.closed_date).format('MM DD YYYY'),
            margin: 0,
            status: false,
            edit: false
          };

          const res = await axios.post('/api/sales', newData, config);

          dispatch({
            type: GET_SALES,
            payload: res.data
          });

          dispatch(setAlert(edit ? 'Sale Updated' : 'Sale Created', 'success'));

          history.push('/dashboard');
        }
      } else {
        // if status is true then lookup is 0: Open
        if (parseInt(formData.status) === 0) {
          const newData = {
            id: formData.id,
            purchaseDate: moment(formData.purchase_date).format('MM DD YYYY'),
            oppName: formData.name,
            cost: formData.cost,
            revenue: formData.revenue,
            soldDate: moment(formData.closed_date).format('MM DD YYYY'),
            margin: 0,
            status: true,
            edit: true
          };

          const res = await axios.post('/api/sales', newData, config);

          dispatch({
            type: GET_SALES,
            payload: res.data
          });

          dispatch(setAlert(edit ? 'Sale Updated' : 'Sale Created', 'success'));

          history.push('/dashboard');
        } else {
          const newData = {
            id: formData.id,
            purchaseDate: moment(formData.purchase_date).format('MM DD YYYY'),
            oppName: formData.name,
            cost: formData.cost,
            revenue: formData.revenue,
            soldDate: moment(formData.closed_date).format('MM DD YYYY'),
            margin: 0,
            status: false,
            edit: true
          };

          const res = await axios.post('/api/sales', newData, config);

          dispatch({
            type: GET_SALES,
            payload: res.data
          });

          dispatch(setAlert(edit ? 'Sale Updated' : 'Sale Created', 'success'));

          history.push('/dashboard');
        }
      }
    } else {
      if (!edit) {
        // if status is true then lookup is 0
        if (formData.status === 0) {
          const newData = {
            purchaseDate: moment(formData.purchase_date).format('MM DD YYYY'),
            oppName: formData.name,
            cost: formData.cost,
            revenue: formData.revenue,
            soldDate: moment(formData.closed_date).format('MM DD YYYY'),
            margin: parseInt(formData.revenue) - parseInt(formData.cost),
            status: true,
            edit: false
          };

          const res = await axios.post('/api/sales', newData, config);

          dispatch({
            type: GET_SALES,
            payload: res.data
          });

          dispatch(setAlert(edit ? 'Sale Updated' : 'Sale Created', 'success'));

          history.push('/dashboard');
        } else {
          const newData = {
            purchaseDate: moment(formData.purchase_date).format('MM DD YYYY'),
            oppName: formData.name,
            cost: formData.cost,
            revenue: formData.revenue,
            soldDate: moment(formData.closed_date).format('MM DD YYYY'),
            margin: parseInt(formData.revenue) - parseInt(formData.cost),
            status: false,
            edit: false
          };

          const res = await axios.post('/api/sales', newData, config);

          dispatch({
            type: GET_SALES,
            payload: res.data
          });

          dispatch(setAlert(edit ? 'Sale Updated' : 'Sale Created', 'success'));

          history.push('/dashboard');
        }
      } else {
        if (parseInt(formData.status) === 0) {
          const newData = {
            id: formData.id,
            purchaseDate: moment(formData.purchase_date).format('MM DD YYYY'),
            oppName: formData.name,
            cost: formData.cost,
            revenue: formData.revenue,
            soldDate: moment(formData.closed_date).format('MM DD YYYY'),
            margin: parseInt(formData.revenue) - parseInt(formData.cost),
            status: true,
            edit: true
          };

          const res = await axios.post('/api/sales', newData, config);

          dispatch({
            type: GET_SALES,
            payload: res.data
          });

          dispatch(setAlert(edit ? 'Sale Updated' : 'Sale Created', 'success'));

          history.push('/dashboard');
        } else {
          const newData = {
            id: formData.id,
            purchaseDate: moment(formData.purchase_date).format('MM DD YYYY'),
            oppName: formData.name,
            cost: formData.cost,
            revenue: formData.revenue,
            soldDate: moment(formData.closed_date).format('MM DD YYYY'),
            margin: parseInt(formData.revenue) - parseInt(formData.cost),
            status: false,
            edit: true
          };

          const res = await axios.post('/api/sales', newData, config);

          dispatch({
            type: GET_SALES,
            payload: res.data
          });

          dispatch(setAlert(edit ? 'Sale Updated' : 'Sale Created', 'success'));

          history.push('/dashboard');
        }
      }
    }

  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: SALES_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const deleteSale = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/sales/${id}`);

    dispatch({
      type: UPDATE_SALES,
      payload: res.data
    });

    dispatch(setAlert('Sale Removed', 'success'));
  } catch (err) {
    dispatch({
      type: SALES_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const updateSale = (
  msg,
  alertType,
  timeout = 8000
) => async dispatch => {
  try {
    dispatch(setAlert(msg, alertType, timeout));
  } catch (err) {
    dispatch({
      type: SALES_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const getCurrentSalesInfo = () => async dispatch => {
  try {
    const res = await axios.get('/api/sales');

    const overallProfit = () => {
      let totalMargin = 0;
      for (let i = 0; i < res.data.length; i++) {
        if (!res.data[i].status) {
          totalMargin += res.data[i].margin
        }
      }
      return totalMargin;
    }

    const overallCost = () => {
      let totalCost = 0;
      for (let i = 0; i < res.data.length; i++) {
        totalCost += res.data[i].cost
      }
      return totalCost
    }

    const monthlyProfit = () => {
      let monthMargin = 0;
      const today = new Date();
      const currentMonth = today.getMonth();
      for (let i = 0; i < res.data.length; i++) {
        const closedMonth = moment(res.data[i].soldDate)
        if (!res.data[i].status && currentMonth === closedMonth.month()) {
          monthMargin += res.data[i].margin;
        }
      }
      return monthMargin
    }


    const payload = {
      totalInventoryCost: overallCost(),
      totalProfit: overallProfit(),
      currentMonthProfit: monthlyProfit()
    }
    console.log(payload)

    dispatch({
      type: GET_INFO,
      payload: payload
    });
  } catch (err) {
    dispatch({
      type: SALES_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

