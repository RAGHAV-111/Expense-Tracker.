import { createSlice } from "@reduxjs/toolkit"

const initialExpense ={
    isprime : false,
}

const primemember = createSlice({
    name : 'prime',
    initialState : initialExpense,
    reducers : {
        isprime(state){
            state.isprime = !state.isprime
        }
    }
})

export const primeeAction = primemember.actions;

export default primemember.reducer;
