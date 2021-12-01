import { CREATE_MESSAGE} from '../actions/types';

const initialState = {
    msg: {},
    status: null
}

export default function(state = initialState, action){
    switch(action.type){
        case CREATE_MESSAGE:
            return (state = action.payload)
    }
}