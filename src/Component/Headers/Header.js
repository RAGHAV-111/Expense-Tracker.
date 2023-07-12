import React, { useContext, useState } from "react";
import { Link, NavLink, Route, Routes } from "react-router-dom";
import Classes from './Header.module.css'
import { Navbar, Container, Nav, Button, Badge } from "react-bootstrap";
import Context from "../../Store/auth-ctx";
import { useDispatch, useSelector } from "react-redux";
import { primeeAction } from "../../Store/prime-redux";

const Header = () => {
  const [showprimefeature, setShowprimefeature] = useState(false);
  const expenseState = useSelector((state) => state.expense.expense)
  const primeState = useSelector((state) => state.prime.isprime)
  const themeState = useSelector((state) => state.theme.islight)
  const dispatch = useDispatch();
  const totalprice = expenseState.reduce((curnumber, item) => {
    return (curnumber + Number(item.price))
  }, 0)
  

  const handleprimefeature = () => {
    dispatch(primeeAction.isprime())
  }

  const ctx = useContext(Context)
  return (
    <header className={Classes.header}>
      <Navbar bg="light" variant="light">
        <Navbar.Brand className={Classes.logo}>
          <img
            alt=""
            src="https://cdn1.vectorstock.com/i/1000x1000/94/00/money-dollar-bag-clipart-vector-37959400.jpg"
            width="40"
            height="40"
            className="d-inline-block align-top"
          />{' '}
          <h2>Expense Tracker</h2>

        </Navbar.Brand>
        <Container >
          {ctx.isLoging && <>
            <Nav className="me-auto">
              <NavLink to="/">Home</NavLink>
            </Nav>
            <Badge bg="secondary"> Total   : ₹ {totalprice}</Badge>
            {totalprice > 10000 && <Button className='btn-sm mx-3' onClick={handleprimefeature}>{!primeState ? 'Activate premium' : 'Deactivate premium'}</Button>}
            <Button type="button" className="btn btn-outline-light btn-sm " onClick={ctx.logouthandler}>Log Out</Button>
          </>
          }

        </Container>
      </Navbar>

    </header>
  )
}
export default Header;