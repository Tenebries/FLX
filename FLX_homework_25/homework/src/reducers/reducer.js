import UserData from '../data';

const initialState = {
  limit: 5,
  data: UserData
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'REMOVE':
      return {
        ...state,
        limit: state.limit - 1,
        data: state.data.filter((user) => user.id !== action.id)
      };
    case 'MORE':
      return {
        ...state,
        limit:
          state.limit + 5 > state.data.length
            ? (state.limit = state.data.length)
            : state.limit + 5
      };
    default:
      return state;
  }
}

export default reducer;
