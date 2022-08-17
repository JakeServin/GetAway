import { configureStore } from "@reduxjs/toolkit";
import { vacationReducer } from "./reducers/vacationReducer";


const store = configureStore({reducer: vacationReducer});

export default store;