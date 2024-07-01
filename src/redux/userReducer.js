// src/redux/userReducer.js

const initialState = {
    isLoggedIn: false,
    user: null,
    enrolledCourses: [],
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOG_IN':
        return {
          ...state,
          isLoggedIn: true,
          user: action.payload,
        };
      case 'LOG_OUT':
        return initialState;
      case 'SET_ENROLLED_COURSES':
        return {
          ...state,
          enrolledCourses: action.payload,
        };
      case 'ENROLL_COURSE':
        return {
          ...state,
          enrolledCourses: [...state.enrolledCourses, action.payload],
        };
      default:
        return state;
    }
  };
  
  export default userReducer;
  