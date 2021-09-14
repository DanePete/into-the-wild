const hikeReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_HIKE_DETAILS':
      console.log('action.payload', action.payload);
      return action.payload;
    default:
        return state;
  }
}

export default hikeReducer;