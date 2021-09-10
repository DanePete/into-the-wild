const hikesListReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_HIKE_LIST':
      console.log('action.payload', action.payload);
      return action.payload;
    default:
        return state;
  }
}

export default hikesListReducer;