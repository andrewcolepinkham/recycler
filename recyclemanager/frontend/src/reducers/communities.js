import { GET_COMMUNITIES } from "../actions/types.js";

const initialState = {
  communities: null
};

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_COMMUNITIES:
            // console.log("auth reducer get communities")
            // console.log(action.payload)
            return {
                ...state,
                communities: action.payload.communities
            };
    default:
        return state;
  }
}