import { PLACES_SUCCESS } from "../actions/types.js";

const initialState = {
  places: [
    {
      name: "--",
      geometry: {
        location: {
          lat: "---",
          lng: "---",
        }
      }
    },
    {
      name: "--",
      geometry: {
        location: {
          lat: "---",
          lng: "---",
        }
      }
    },
    {
      name: "--",
      geometry: {
        location: {
          lat: "---",
          lng: "---",
        }
      }
    },
    {
      name: "--",
      geometry: {
        location: {
          lat: "---",
          lng: "---",
        }
      }
    },
    {
      name: "--",
      geometry: {
        location: {
          lat: "---",
          lng: "---",
        }
      }
    },
  ]
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PLACES_SUCCESS:
      return {
        ...state,
        places: action.payload.results
      };
    default:
      return state;
  }
}