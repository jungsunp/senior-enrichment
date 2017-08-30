import { combineReducers } from 'redux';

import campuses from './campuses';
import students from './students';

export default combineReducers({ campuses, students });

