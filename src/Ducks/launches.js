import { API_URL } from "../../cfg";
const LOAD_NEXT_LAUNCHES = "moonwalk/launches/LOAD_NEXT_LAUNCHES";
const LOAD_NEXT_LAUNCHES_SUCCESS =
  "moonwalk/launches/LOAD_NEXT_LAUNCHES_SUCCESS";
const LOAD_NEXT_LAUNCHES_ERROR = "moonwalk/launches/LOAD_NEXT_LAUNCHES_ERROR";
const SET_SELECTED_LAUNCH = "moonwalk/launches/SET_SELECTED_LAUNCH";
const LOAD_LAUNCH = "moonwalk/launches/LOAD_LAUNCH";
const LOAD_LAUNCH_SUCCESS = "moonwalk/launches/LOAD_LAUNCH_SUCCESS";
const LOAD_LAUNCH_ERROR = "moonwalk/launches/LOAD_LAUNCH_ERROR";

const initialState = {
  data: null,
  loading: false,
  error: false
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case LOAD_NEXT_LAUNCHES:
      return {
        ...state,
        loading: true
      };
    case LOAD_NEXT_LAUNCHES_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        data: action.payload
      };
    case LOAD_NEXT_LAUNCHES_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        data: action.payload
      };
    case SET_SELECTED_LAUNCH:
      return {
        ...state,
        selectedLaunch: action.payload
      };
    case LOAD_LAUNCH:
      return {
        ...state,
        loading: true
      };
    case LOAD_LAUNCH_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        data: {
          launches: [...state.data.launches, action.payload.launches[0]]
        }
      };
    case LOAD_LAUNCH_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        ...data
      };
    default:
      return state;
  }
};

const loadNextLaunchesSuccess = payload => {
  return {
    type: LOAD_NEXT_LAUNCHES_SUCCESS,
    payload
  };
};

const loadNextLaunchesError = payload => {
  return {
    type: LOAD_NEXT_LAUNCHES_ERROR,
    payload
  };
};

export const setSelectedLaunch = payload => {
  return {
    type: SET_SELECTED_LAUNCH,
    payload
  };
};

const loadLaunchSuccess = payload => {
  return {
    type: LOAD_LAUNCH_SUCCESS,
    payload
  };
};

const loadLaunchError = payload => {
  return {
    type: LOAD_LAUNCH_ERROR,
    payload
  };
};

export const loadNextLaunches = (numberOfLaunches = 5) => {
  return dispatch => {
    dispatch({ type: LOAD_NEXT_LAUNCHES });
    fetch(`${API_URL}next/${numberOfLaunches}`)
      .then(data => data.json())
      .then(data => dispatch(loadNextLaunchesSuccess(data)))
      .catch(err => dispatch(loadNextLaunchesError(err)));
  };
};

export const loadLaunch = (id = 0) => {
  return dispatch => {
    dispatch({ type: LOAD_LAUNCH });
    fetch(`${API_URL}/${id}`)
      .then(data => data.json())
      .then(data => dispatch(loadLaunchSuccess(data)))
      .catch(err => dispatch(loadLaunchError(err)));
  };
};
