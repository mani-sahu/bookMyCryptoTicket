import React from 'react';
import './form.css'
import {Card, Form, Button, Container} from "react-bootstrap";
import { useState } from 'react'
function Formpage() {
    const [from, setFrom] = useState("");
    const [destination, setDestination] = useState("");
    const [startDate, setStartDate] = useState(Date())

    const fromList = ["Bangalore","Delhi","Mumbai","Hyderabad","Kolkata"]
    const fromItems = fromList.map((item) => <option value={item}>{item}</option>)
    async function handleSubmit(e){
        e.preventDefault();
    }
    return (
        <Container
            className='d-flex align-items-center justify-content-center'
            style={{ minHeight: "100vh"}}
        >
            <div className='box-body' style={{textAlign: "center"}}>
                <Card className='card_parent'>
                    <Card.Body className='card_body'>
                        <h2>Find Flights</h2>
                        <Form className='form-body' onSubmit={handleSubmit}>
                            <Form.Group
                                className='field'
                                id='from'
                                style={{ margin: "10px"}}>
                            <Form.Label className='label'>From</Form.Label>
                            <Form.Select aria-label='Default select example'>
                                <option>Choose</option>
                                {fromItems}
                            </Form.Select>
                            </Form.Group>
                            <Form.Group
                                className='field'
                                id='from'
                                style={{ margin: "10px"}}>
                            <Form.Label className='label'>Destination</Form.Label>
                            <Form.Select aria-label='Default select example'>
                                <option>Choose</option>
                                {fromItems}
                            </Form.Select>
                            </Form.Group>

                        </Form>
                    </Card.Body>
                </Card>
            </div>
        
        </Container>
    );
}

export default Formpage;