import React, { useContext, useRef, useState } from "react";
import { Col, Row, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Classes from './Expense.module.css'
import Context from "../../Store/auth-ctx";
import ExpenseList from "./ExpenseList";

const Expense = () => {
    const ctx = useContext(Context)
    const [edit, setEdit] = useState(false);

    const price = useRef();
    const category = useRef();
    const description = useRef();

    const submithandler = (e) => {
        e.preventDefault();
        
        const newExpense = {
            id: Math.random(),
            price: price.current.value,
            category: category.current.value,
            description: description.current.value,
            date: Date()
        }
       
        ctx.addExpensetodatabase(newExpense)

        price.current.value = '';
        category.current.value = '';
        description.current.value = '';

        
    }
   
    const edithandler = (item) => {
        setEdit(true)
        price.current.value = item.price;
        category.current.value = item.category;
        description.current.value = item.description;
        
        ctx.editexpensefunction(item)
        // ctx.editexpensefunction(item,'post')
    }

    return (
        <div>
            <div className="container" style={{textAlign:'center' }}>
            <h2>Daily Expenses</h2>
            </div>

            <div>

                <div className={Classes.content}>
                    <form onSubmit={submithandler}>
                        <Row>

                        <Form.Group className="mb-3"  controlId="description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control placeholder="Where will you spend the money" ref={description} />
                        </Form.Group>

                            <Form.Group as={Col} controlId="price">
                                <Form.Label>Price</Form.Label>
                                <Form.Control type="number" min='0' ref={price} placeholder='price' />
                            </Form.Group>

                            <Form.Group as={Col} controlId="category">
                                <Form.Label>Category</Form.Label>
                                <Form.Select defaultValue="Food" ref={category}>
                                    <option>Food</option>
                                    <option>Petrol</option>
                                    <option>Salary</option>
                                    <option>etc</option>
                                </Form.Select>
                            </Form.Group>
                        </Row>
                        <br>
                        </br>

                        <Button type='submit'>Add Item</Button>
                    </form>

                </div>
                <div>
                    <ExpenseList edithandler={edithandler} />
                </div>
            </div>
        </div>
    )
}
export default Expense;