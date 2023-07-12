import { createSlice } from "@reduxjs/toolkit"

const initialtheme = {
    islight : true,
}

const themeManger = createSlice({
    name : 'theme',
    initialState : initialtheme,
    reducers : {
        changetheme(state){
            state.islight = !state.islight
        }
    }
})

export const themehandler = themeManger.actions;

export default themeManger.reducer;
