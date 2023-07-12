import React, { useContext, useEffect, useRef } from "react";
import Classes from './VerifyEmail.module.css'
import { Link } from "react-router-dom";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import Context from "../../Store/auth-ctx";


const VerifyEmail = ()=>{
    const ctx = useContext(Context);

    const oobCode = useRef();
    

    

    const verifycode =async (e)=>{
        e.preventDefault()
        
        try{
            const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCv_843trnlWnuDHeouzfAVQB0NLXomkr8',{
                method : 'POST',
                body : JSON.stringify({
                    oobCode : oobCode.current.value
                }),
                headers : {
                    'Content-Type' : 'application/json'
                }
            })
            const data = await response.json();
            
            if(!response.ok){
                throw new Error(`${data.error.message}`)
            }
            
        }
        catch(error){
            alert(error.message)
        }
        
    }

    return(
        <div>
        <div className={Classes.container}>

            <h5>Winners never quit, Quitters never win.</h5>
            <p>
                latest update sent to your mail !!<Link to='/'>Okay</Link>
            </p>
        </div>

        <hr />
        <div className={Classes.formcontainer}>
                <form onSubmit={verifycode}>
        <Button variant="outline-danger btn-sm" className={Classes.cancelbtn}>Cancel</Button>
                    <fieldset>
                        <legend>Now you will recieve a confirmatory mail.</legend>
                    <Row>
                       
                        <Col>
                        </Col>
                    </Row>
                    <Link onClick={ctx.sentverification}>Resend Again ?</Link><br/>
                    <Button className="btn-sm m-2" type="submit">Update</Button>
                    </fieldset>
                </form>
            
        </div>
    </div>
    )
}
export default VerifyEmail;