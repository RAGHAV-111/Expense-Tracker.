import React, { useContext, useEffect, useRef } from "react";
import Classes from './UpdateProfile.module.css'
import { Link } from "react-router-dom";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import Context from "../../Store/auth-ctx";

const UpdateProfile = () => {
    const fullname = useRef();
    const photourl = useRef();
    const ctx = useContext(Context)
    const getprofiledetail = async ()=>{
        try{

            const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCv_843trnlWnuDHeouzfAVQB0NLXomkr8',{
                method:'POST',
                body : JSON.stringify({
                    idToken : ctx.idToken
                }),
                headers : {
                    'Content-Type' : 'application/json'
                }
            })
            if(!response.ok){
                throw new Error('Something went wrong')
            }
            const data = await response.json()
            if(data.users[0].displayName){

                fullname.current.value = data.users[0].displayName
                photourl.current.value = data.users[0].photoUrl
            }
        }
        catch(error){
            alert(error.message)
        }
    }

    useEffect(  ()  => {
        getprofiledetail()
    },[])
    const submithandler = async (e)=>{
        e.preventDefault();
        const fullnamevalue = fullname.current.value;
        const photourlvalue = photourl.current.value;

        try{
            const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCv_843trnlWnuDHeouzfAVQB0NLXomkr8',{
                method : 'POST',
                body : JSON.stringify({
                    idToken : ctx.idToken,
                    displayName : fullnamevalue,
                    photoUrl : photourlvalue,
                    returnSecureToken : true,
                }),
                headers:{
                    'Content-Type':'application/json'
                }
               

            })
            if(!response.ok){
                throw new Error('something went wrong')
            }
            const data = await response.json()
           

        }
        catch(error){
            alert(error.message)
        }
    }
    // -----------------------logic end  for updating user profile

    return (
        <div>
            <div className={Classes.container}>

                <h5>Winners never quit, Quitters never win.</h5>
                <p>
                    verify your email and get latest update !!<Link to='/updateprofile/verifyemail' onClick={ctx.sentverification}>verify now</Link>
                </p>
            </div>

            <hr />
            <div className={Classes.formcontainer}>
                    <form onSubmit={submithandler}>
            <Button variant="outline-danger btn-sm" className={Classes.cancelbtn}>Cancel</Button>
                        <fieldset>
                            <legend>Enter your details</legend>
                        <Row>
                            <Col>
                              <img src="https://w7.pngwing.com/pngs/223/244/png-transparent-computer-icons-avatar-user-profile-avatar-heroes-rectangle-black.png" width='30'className="mb-2" /> 
                               <Form.Control placeholder="Full Name" ref={fullname} type="text" />
                            </Col>
                            <Col>
                            <img src="https://static.vecteezy.com/system/resources/thumbnails/003/731/316/small/web-icon-line-on-white-background-image-for-web-presentation-logo-icon-symbol-free-vector.jpg" width='30'className="mb-2" />
                                <Form.Control placeholder="Phot Url" ref={photourl} type="text" />
                            </Col>
                        </Row>
                        <Button className="btn-sm m-2" type="submit">Update</Button>
                        </fieldset>
                    </form>
                
            </div>
        </div>
    )
}
export default UpdateProfile