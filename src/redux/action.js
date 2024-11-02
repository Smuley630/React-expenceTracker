// Define action types
export const GET_USER = 'GET_USER';
export const GET_USER_NAME = 'GET_USER_NAME';
export const REVIEW ='REVIEW'
export const VERIFIEDUSER='VERIFIEDUSER'
export const SELECTEDUSER ='SELECTEDUSER'
 ;
// export const DECREMENT = 'DECREMENT';

// Action creators for incrementing and decrementing
export const getUserFromReducer = (data) => {
  return {
    type: GET_USER,data
  };
};

export const getUserName = (data) => {
  return {
    type: GET_USER_NAME,data
  };
  
};
export const getReview = (data) => {
  return {
    type: REVIEW,data
  };
  
  
};
export const setVerifiedUser = (data) => {
  return {
    type: VERIFIEDUSER,data
  };
}

export const setSelectedUser = (data) => {
  return {
    type: SELECTEDUSER,data
  };
}


