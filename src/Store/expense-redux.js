import { createSlice } from "@reduxjs/toolkit"

const initialExpense ={
    expense : [],
}

const expense = createSlice({
    name : 'expense',
    initialState : initialExpense,
    reducers : {
        addexpense(state, action){
            state.expense = action.payload
        }
    }
})

export const expenseAction = expense.actions;

export default expense.reducer;