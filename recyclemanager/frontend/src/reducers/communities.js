import { GET_COMMUNITIES, GET_COMMUNITIES_ACCOUNTS } from "../actions/types.js";

const initialState = {
  communities: null,
  accounts: [
    {
      teamName: "team1",
      score: 500},
    {
      teamName: "team2",
      score: 400
    },
    {
      teamName: "team3",
      score: 300
    },
    {
      teamName: "team4",
      score: 200
    },
    {
      teamName: "team5",
      score: 100
    }
  ]
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
          case GET_COMMUNITIES_ACCOUNTS: 
            return {
              ...state, 
              accounts: action.payload.accounts
            }
    default:
        return state;
  }
}