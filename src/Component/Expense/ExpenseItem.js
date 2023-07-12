import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import Context from "../../Store/auth-ctx";

const ExpenseItem = (props)=>{
    const ctx = useContext(Context)
    
    return (
        <div>
            <p>{props.item.description}</p>
            <p>₹{props.item.price}</p>
            <p>{props.item.category}</p>
            <Button onClick={()=>props.edithandler(props.item,'edit')}>Edit</Button>
            <Button className='btn-danger ml-3 mx-5 ' onClick={()=>ctx.deleteexpensedatabase(props.item)}>Delete</Button>
            
        </div>
    )
}
export default ExpenseItem;