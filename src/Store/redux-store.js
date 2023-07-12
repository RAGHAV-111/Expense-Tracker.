import { configureStore } from "@reduxjs/toolkit";

import expenseReducer from './expense-redux'
import primememberReducer from "./prime-redux";
import themeMangerReducer from './dark-light'

const store = configureStore({
    reducer : {expense : expenseReducer, prime : primememberReducer , theme: themeMangerReducer}
})
export default store;