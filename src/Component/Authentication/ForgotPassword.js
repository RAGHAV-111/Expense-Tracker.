import React, { useRef } from "react";
import Classes from './FortogotPassword.module.css'
import { Button, FloatingLabel, Form } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { Link} from "react-router-dom";

const ForgotPassword = ()=>{
const email = useRef();

const submithandler = async(e)=>{
    e.preventDefault();
    try{
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCv_843trnlWnuDHeouzfAVQB0NLXomkr8',{
            method : 'POST',
            body : JSON.stringify({
                requestType :  'PASSWORD_RESET',
                email : email.current.value,
            }),
            headers : {
                'Content-Type' : 'application/json'
            }
        })
        
        const data = await response.json();
        if(!response.ok){
            throw new Error(`${data.error.message}`)
        }
        
        email.current.value = '';
        alert('You can check your email')
        
        
    }
    catch(error){
        alert(error.message)
    }
       
    }
    return (
        <div className={Classes.container}>
            <div className={Classes.box}>
                <Card className={`${Classes.card} shadow-lg`}>
                    <Card.Body>
                        <Card.Title className={Classes.title}><h3>Find Your Account</h3>
                        </Card.Title>
                        <Card.Text> enter your email for reset your password </Card.Text>
                        <form className={Classes.form} onSubmit={submithandler} >
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Email address"
                                className="mb-3"
                            >
                                <Form.Control type="email" ref={email} placeholder="name@example.com" required/>
                            </FloatingLabel>
                           
                            <div className='d-grid gap-2'>
                                <Button className="btn btn-primary" style={{borderRadius:'20px'}} type="submit"  >
                                Find account
                                    
                                </Button>
                            </div>
                           
                        </form>
                        <Link to='/login' className={Classes.loginlink}>Login</Link>
                    </Card.Body>
                </Card>
            </div>
        </div> 
    )
}
export default ForgotPassword;