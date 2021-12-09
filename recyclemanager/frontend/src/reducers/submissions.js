import { GET_SUBMISSIONS, DELETE_SUBMISSION, ADD_SUBMISSION } from "../actions/types.js";

const initialState = {
  submissions: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_SUBMISSIONS:
      return {
        ...state,
        submissions: action.payload
      };
    case DELETE_SUBMISSION:
      console.log("DELETE SUB"); 
      return {
        ...state,
        submissions: state.submissions.filter(submission => submission.id !== action.payload)
      };
    case ADD_SUBMISSION:
      console.log("HELLO")
      return {
        ...state,
        submissions: [...state.submissions, action.payload]
      };
    default:
      return state;
  }
}