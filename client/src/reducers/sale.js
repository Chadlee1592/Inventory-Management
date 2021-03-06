import { GET_SALES, SALES_ERROR, CLEAR_SALES, UPDATE_SALES, GET_INFO, CLEAR_INFO } from '../actions/types';

const initialState = {
  sale: null,
  loading: true,
  error: {},
  info: null
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_SALES:
    case UPDATE_SALES:
      return {
        ...state,
        sale: payload,
        loading: false
      };
    case SALES_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case CLEAR_SALES:
      return {
        ...state,
        sale: null,
        loading: false
      };
    case GET_INFO:
      return {
        ...state,
        loading: false,
        info: payload
      };
    case CLEAR_INFO:
      return {
        ...state,
        loading: false,
        info: null
      };
    default:
      return state;
  }
}
