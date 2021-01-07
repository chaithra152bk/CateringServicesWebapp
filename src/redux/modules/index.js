import { combineReducers } from 'redux';
import {profile} from './profileReducer';

const allReducers = combineReducers(
  {

    profile
  }
);

export default allReducers;