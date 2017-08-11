import { createTypes } from 'reduxsauce';

export default createTypes(`

  STATES_FETCH_REQUESTED
  STATES_FETCH_SUCCEEDED
  STATES_FETCH_FAILED

  CITIES_FETCH_REQUESTED
  CITIES_FETCH_SUCCEEDED
  CITIES_FETCH_FAILED

  DEPARTMENTS_FETCH_REQUESTED
  DEPARTMENTS_FETCH_SUCCEEDED
  DEPARTMENTS_FETCH_FAILED

  SELECT_STATE
  SELECT_CITY
  SELECT_DEPARTMENT

  RESET_POSTS
  POSTS_FETCH_REQUESTED
  POSTS_FETCH_SUCCEEDED
  POSTS_FETCH_FAILED

  RESET_ACTIVISTS
  ACTIVISTS_FETCH_REQUESTED
  ACTIVISTS_FETCH_SUCCEEDED
  ACTIVISTS_FETCH_FAILED
`);
