import { SUCESS_REQUEST_SEARCH } from '../actions/actionTypes';

  const initialState = {
    response_data: ''
  };

  export const requestData = (state = initialState, action) => {
    switch (action.type) {
      case SUCESS_REQUEST_SEARCH:
        return {
          ...state,
          response_data: action.response_data
        };
      default:
        return state;
    }
  };