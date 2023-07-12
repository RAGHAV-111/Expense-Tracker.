import React from "react";
import Classes from './ExpenseList.module.css'
import ExpenseItem from "./ExpenseItem";
import { useSelector } from "react-redux";

const ExpenseList = (props)=>{
    const expenseState = useSelector((state)=> state.expense.expense)
   const expeseList = expenseState.map((item)=>(
        
        <li><ExpenseItem item={item} edithandler={props.edithandler} /></li>
    ))
    return (
        <div className={Classes.container} >
            <ul>
                {expeseList}
            </ul>
        </div>
    )
}
export default ExpenseList