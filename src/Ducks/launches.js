const LOAD_NEXT_LAUNCHES = 'moonwalk/launches/LOAD_NEXT_LAUNCHES';
const LOAD_NEXT_LAUNCHES_SUCCESS = 'moonwalk/launches/LOAD_NEXT_LAUNCHES_SUCCESS';
const LOAD_NEXT_LAUNCHES_ERROR = 'moonwalk/launches/LOAD_NEXT_LAUNCHES_ERROR';

const initialState = {
  loading: false,
  error: false,
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case LOAD_NEXT_LAUNCHES:
      return {
        ...state,
        loading: true,
      }
    case LOAD_NEXT_LAUNCHES_SUCCESS:
    return {
      ...state,
      loading: false,
      error: false,
      data: action.payload,
    }
    case LOAD_NEXT_LAUNCHES_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        data: action.payload,
      }
    default: 
      return state;
  }
}

const loadNextLaunchesSuccess = payload => {
  return {
    type: LOAD_NEXT_LAUNCHES_SUCCESS,
    payload,
  };
}

const loadNextLaunchesError = payload => {
  return {
    type: LOAD_NEXT_LAUNCHES_ERROR,
    payload,
  };
}

export const loadNextLaunches = (numberOfLaunches = 5) => {
  return dispatch => {
    dispatch({type: LOAD_NEXT_LAUNCHES});
    fetch(`https://launchlibrary.net/1.4/launch/next/${numberOfLaunches}`)
      .then(data => data.json())
      .then(data => dispatch(loadNextLaunchesSuccess(data)))
      .catch(err => dispatch(loadNextLaunchesError(err)))
  }
}