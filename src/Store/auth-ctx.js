import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { expenseAction } from "./expense-redux";

const Context = React.createContext({
    isLoging: false
})

export const ContextProvider = (props) => {
    const expenseState = useSelector((state)=> state.expense.expense)
    const dispatch = useDispatch()
    const navigate = useNavigate();

    let tokenfromstorage = localStorage.getItem('token')
   
    const [idToken, setIdToken] = useState(tokenfromstorage)
    const [getfunctiondone, setGetfunctiondone] = useState(false);
    const [editmode, setEditmode] = useState(false)

    const editid = localStorage.getItem('editid');
    const crudcrud = '7bc913e828d44d9faa96ec5d017e32b6';

    let useremail = localStorage.getItem('email')
    if (useremail) {
        useremail = useremail.replace('@', '').replace('.', '')
    }
    
    const isLoging = !!idToken

        async function getdatafromdatabase (){
        try {
            const response = await fetch(`https://crudcrud.com/api/${crudcrud}/${useremail}`, {
                method: 'GET',
                
            })
            const data = await response.json()
            if (!response.ok) {
                throw new Error(`${data.error}`)
            }
          
            if (data) {
                dispatch(expenseAction.addexpense(data))
               
            }
        }
        catch (error) {
            alert(error.message)
        }
        setGetfunctiondone(true)
    }
    useEffect(() => {
        getdatafromdatabase()
    }, [idToken])
    

    const [expense, setExpense] = useState([]);

    const changeloginstate = (data) => {
        localStorage.setItem('token', data.idToken)
        localStorage.setItem('email', data.email)
        setIdToken(data.idToken)
    }

    const logouthandler = () => {
        localStorage.clear()
        setIdToken(null)
        navigate('/login')
    }

    const sentverification = async () => {
        
        try {
            const url = 'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key'
            const response = await fetch(`${url}=AIzaSyCv_843trnlWnuDHeouzfAVQB0NLXomkr8`, {
                method: 'POST',
                body: JSON.stringify({
                    requestType: "VERIFY_EMAIL",
                    idToken: idToken

                })
                
            })
            const data = await response.json()
            if (!response.ok) {
                throw new Error(`${data.error.message}`)
            }
            if (response.ok) {
                alert('Check your email')
            }

        }
        catch (error) {
            alert(error.message)
        }
    }

    const addExpensetodatabase = async (item) => {
       
        if(editmode){

            try{
                const response = await fetch(`https://crudcrud.com/api/${crudcrud}/${useremail}/${editid}`, {
                    method: 'PUT',
                    body: JSON.stringify(item),
                    headers : {
                        "Content-Type" : "application/json"
                    }
                    
                })
              
                localStorage.removeItem('editid')
                setEditmode(false)
                if(!response.ok){
                    throw new Error('Something went wrong')
                }
                dispatch(expenseAction.addexpense([...expenseState,item]))
    
            }
            catch(error){
                alert(error.message)
            }
        }
        else{
            
            try {
                const response = await fetch(`https://crudcrud.com/api/${crudcrud}/${useremail}`, {
                    method: 'POST',
                    body: JSON.stringify(item),
                    headers : {
                        "Content-Type" : "application/json"
                    }
                })
                if(!response.ok){
                    throw new Error('something not working')
                }
                
                const data = await response.json()
               
                item={...item,_id:data._id}
                dispatch(expenseAction.addexpense([...expenseState,item]))
                
            }
            catch (error) {
                alert(error.message)
            }
        }
        }
        
    const deleteexpensedatabase = async (item) => {
       
        try {
            const response = await fetch(`https://crudcrud.com/api/${crudcrud}/${useremail}/${item._id}`, {
                method: 'DELETE',

            })
            
            if (!response.ok) {
                throw new Error('something went wrong')
            }
            
            const updateItems = expenseState.filter((expense) =>
                expense.id !== item.id
            )
            dispatch(expenseAction.addexpense([...updateItems]))
           
        }
        catch (error) {
            alert(error.message)
        }
    }
   

    const editexpensefunction = (item) => {
       
        localStorage.setItem('editid',`${item._id}`)
        const updateItems = expenseState.filter((expense) =>
            expense.id !== item.id
        )
        dispatch(expenseAction.addexpense([...updateItems]))
        setEditmode(true)
    }
    const context = {
        isLoging: isLoging,
        idToken: idToken,
        expense: expense,
        editexpensefunction : editexpensefunction,
        changeloginstate: changeloginstate,
        sentverification: sentverification,
        logouthandler: logouthandler,
        addExpensetodatabase: addExpensetodatabase,
        deleteexpensedatabase: deleteexpensedatabase,

    }
    return (
        <Context.Provider value={context}>
            {props.children}
        </Context.Provider>
    )
}

export default Context
