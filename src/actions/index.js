import { SUCESS_REQUEST_SEARCH } from './actionTypes';

export const responseData = value => ({
    type: SUCESS_REQUEST_SEARCH,
    response_data: value
  });