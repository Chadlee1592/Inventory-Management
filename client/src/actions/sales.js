import axios from 'axios';
import { setAlert } from './alert';
import moment from 'moment';

import { GET_SALES, SALES_ERROR, UPDATE_SALES } from './types';
import sale from '../reducers/sale';


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
    if (!edit) {
      // if status is true then lookup is 0
      if (formData.status === 0) {
        const newData = {
          purchaseDate: moment(formData.purchase_date).format('MM DD YYYY'),
          oppName: formData.name,
          cost: formData.cost,
          revenue: formData.revenue,
          soldDate: moment(formData.closed_date).format('MM DD YYYY'),
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
    const res = await axios.delete(`/api/sales/${id}`)

    dispatch({
      type: UPDATE_SALES,
      payload: res.data
    })

    dispatch(setAlert('Sale Removed', 'success'))
  } catch (err) {
    dispatch({
      type: SALES_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    })
  }
}