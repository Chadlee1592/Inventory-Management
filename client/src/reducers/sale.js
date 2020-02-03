import { GET_SALES, SALES_ERROR } from '../actions/types';

const initialState = {
  sale: null,
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_SALES:
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
    default:
      return state;
  }
}
