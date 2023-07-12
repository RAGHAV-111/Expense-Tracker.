import React, { useState } from "react";
import { Form, Link, Outlet, Route, Routes } from "react-router-dom";
import Classes from './Welcome.module.css'
import Expense from "../Expense/Expenses";
import { Button, Col, Row, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { CSV, CSVLink } from 'react-csv'




const Welcomepage = () => {

    const [myStyle, setmyStyle] = useState({

        color: 'black',
        backgroundColor: 'white',
        border:'2px solid white' 

    })

    const [btntext,setBtnText] = useState("Enable Dark Mode")

    let toggleStyle = () => {
        if (myStyle.color == 'black') {
            setmyStyle({
                color: 'white',
                backgroundColor: 'black'
            })
            setBtnText("Enable Light  Mode");

        }
        else {
            setmyStyle({
                color: 'black',
                backgroundColor: 'white'
            })
            setBtnText("Enable  Dark Mode");
        }
    }

    const primeState = useSelector((state) => state.prime.isprime)
    const expenseState = useSelector((state) => state.expense.expense)

    return (
        <div style={myStyle}>
            <br>
            </br>
            <h3 style={{padding:'0px 0px 0px 0px', textAlign: 'left', height: '10px' }}> We are glad to welcome you! Your presence is well appreciated. </h3>

            <p style={{ textAlign: 'right' }}>
                Your profile is incomplete . <Link to='/updateprofile'> Complete now</Link>
            </p>

            {primeState &&
                <div className={Classes.premiumfeature} style={myStyle}>

                    <CSVLink data={expenseState} filename={'myData.csv'}>
                        Download CSV
                    </CSVLink>
                    <Button className="btn btn-dark  btn-sm" onClick={toggleStyle} >{btntext}</Button>
                </div>
            }
            <hr />
            <Expense />
        </div>
    )
}
export default Welcomepage;