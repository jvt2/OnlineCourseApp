// src/redux/actions.js

export const logIn = (user) => ({
  type: 'LOG_IN',
  payload: user,
});

export const logOut = () => ({
  type: 'LOG_OUT',
});

export const setEnrolledCourses = (courses) => ({
  type: 'SET_ENROLLED_COURSES',
  payload: courses,
});

export const enrollCourse = (course) => ({
  type: 'ENROLL_COURSE',
  payload: course,
});
