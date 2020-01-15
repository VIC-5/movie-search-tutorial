import { TState , TAction } from './Types';

const Reducer = (state : TState , action : TAction) =>
{
    switch (action.type)
    {
        case "SEARCH_MOVIES_REQUEST" :
            return {
                ...state ,
                loading : true ,
                errorMessage : null ,
            };
        case "SEARCH_MOVIES_SUCCESS" :
            return {
                ...state ,
                loading : false ,
                movies : action.payload ,
            };
        case "SEARCH_MOVIES_FAILURE" :
            return {
                ...state ,
                loading : false ,
                errorMessage : action.error ,
            };
        default :
            return state;
    };
};

export default Reducer;