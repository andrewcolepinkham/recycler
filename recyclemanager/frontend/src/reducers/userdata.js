import { GET_USERDATA, DELETE_LEAD, ADD_LEAD } from "../actions/types.js";

const initialState = {
  userdata: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USERDATA:
      return {
        ...state,
        userdata: action.payload
      };
    case DELETE_USER:
      return {
        ...state,
        userdata: state.userdata.filter(user => user.id !== action.payload)
      };
    case ADD_USER:
      return {
        ...state,
        userdata: [...state.userdata, action.payload]
      };
    default:
      return state;
  }
}