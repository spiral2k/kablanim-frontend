import { combineReducers } from 'redux';

/* reducers */
import ui from './ui/reducer';
import global from './global/reducer';
import login from './login/reducer';
import user from './user/reducer';

const rootReducer = combineReducers({
    global,
    ui,
    login,
    user
});

export default rootReducer;
