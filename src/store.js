import { configureStore } from "@reduxjs/toolkit";
import { vacationReducer } from "./reducers/vacationReducer";
import { combineReducers } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/userReducer";
import { loginReducer } from "./reducers/loginReducer";

const rootReducer = combineReducers({
	vacationReducer,
    userReducer,
    loginReducer
});

const store = configureStore({reducer: rootReducer});

export default store;