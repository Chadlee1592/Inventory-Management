import axios from 'axios';
import { setAlert } from './alert';

import { GET_SALES, SALES_ERROR } from './types';

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

export const createSales = (formData, history, edit = false) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    console.log(formData)

    // const res = await axios.post('/api/sales', formData, config)

    // dispatch({
    //   type: GET_SALES,
    //   payload: res.data
    // });

    // dispatch(setAlert(edit ? 'Sale Updated' : 'Sale Created'))

    // if (!edit) {
    //   history.push('/dashboard')
    // }
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
}
