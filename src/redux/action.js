export const GET_USER = 'GET_USER';
export const GET_USER_NAME = 'GET_USER_NAME';
export const REVIEW ='REVIEW'
export const VERIFIEDUSER='VERIFIEDUSER'
export const SELECTEDUSER ='SELECTEDUSER'
export const EXPENCE_ADDED = 'EXPENCE_ADDED'
 ;

export const getUserFromReducer = (data) => {
  return {
    type: GET_USER,data
  };
};

export const expenceAddedFlag = (data) => {
  return {
    type: EXPENCE_ADDED,data
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


