import { API_URL } from "../../cfg";
const SEARCH_LAUNCHES = "moonwalk/search/SEARCH_LAUNCHES";
const SEARCH_LAUNCHES_SUCCESS = "moonwalk/search/SEARCH_LAUNCHES_SUCCESS";
const SEARCH_LAUNCHES_ERROR = "moonwalk/search/SEARCH_LAUNCHES_ERROR";

const initialState = {
  loading: false,
  error: false
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SEARCH_LAUNCHES:
      return {
        ...state,
        loading: true
      };
    case SEARCH_LAUNCHES_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        data: action.payload
      };
    case SEARCH_LAUNCHES_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        data: action.payload
      };
    default:
      return state;
  }
};

const searchLaunchesSuccess = payload => {
  return {
    type: SEARCH_LAUNCHES_SUCCESS,
    payload
  };
};

const searchLaunchesError = payload => {
  return {
    type: SEARCH_LAUNCHES_ERROR,
    payload
  };
};

export const searchLaunches = str => {
  return dispatch => {
    if (!str) dispatch(searchLaunchesError());

    dispatch({ type: SEARCH_LAUNCHES });
    fetch(`${API_URL}/${str}`)
      .then(data => data.json())
      .then(data => dispatch(searchLaunchesSuccess(data)))
      .catch(err => dispatch(searchLaunchesError(err)));
  };
};
