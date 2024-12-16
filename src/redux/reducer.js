import { GET_USER ,GET_USER_NAME ,REVIEW, VERIFIEDUSER,SELECTEDUSER, EXPENCE_ADDED } from './action';

// Initial state
const initialState = {
  data: [],
  userName : [],
  review:[],
  varifiedUser:true,
  selectedUser:{},
  expenceAddedFlag:false
};

// Reducer function
const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        data: action.data,
      };
      case GET_USER_NAME:
        return {
          ...state,
          userName: action.data,
        };
        case REVIEW:
        return {
          ...state,
          review: action.data,
        };
        case VERIFIEDUSER:
          return {
            ...state,
            varifiedUser: action.data,
          };
          case SELECTEDUSER:
            return {
              ...state,
              selectedUser: action.data,
            };
            case EXPENCE_ADDED:
              return {
                ...state,
                expenceAddedFlag: action.data,
              };
   
    default:
      return state;
  }
};

export default counterReducer;
