const LOAD = 'moonwalk/launches/LOAD';

export default (state = {}, action = {}) => {
  switch (action.type) {
    default: return state;
  }
}

export const loadLaunches = () => {
  return { type: LOAD };
}

export const getLaunches = () => {
//   return dispatch => get('/launches').then(launches => dispatch(updateLaunches(launches)))
}