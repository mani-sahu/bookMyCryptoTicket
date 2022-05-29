import React from 'react';
import './form.css'
import { Card, Form, Button, Container } from "react-bootstrap";
import { useState, useRef } from 'react'
import DatePicker from 'react-date-picker';
import { useMoralis } from 'react-moralis';

import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import { abi, contractAddress } from '../../../contractDetails';
const firebaseConfig = {
    apiKey: "AIzaSyAzRXwsTwe2hBXvWLIx29Y0-XKFnBluDGI",
    authDomain: "bookmycryptoticket.firebaseapp.com",
    projectId: "bookmycryptoticket",
    storageBucket: "bookmycryptoticket.appspot.com",
    messagingSenderId: "642264572687",
    appId: "1:642264572687:web:680112da3a6f449e98547a",
    measurementId: "G-03G1T9DM22"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const eachFlight = () => {
    <div>
        <div className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl p-4 shadow-md">
            <div className="grid grid-cols-4 ">
                <div className="col-span-2">
                    <h1 className="text-left font-bold">From</h1>
                    <h2 className="text-left text-xl ">tvm</h2>
                    <h1 className="text-left font-bold">To</h1>
                    <h2 className="text-left text-xl">tvm</h2>
                    <h1 className="text-left font-bold">Seat</h1>
                    <h2 className="text-left text-xl">12</h2>
                </div>
                <div className="col-span-2">
                    <h1 className="text-left font-bold">Date</h1>
                    <h2 className="text-left text-xl">1</h2>
                    <h1 className="text-left font-bold">Time</h1>
                    <h2 className="text-left text-xl">12</h2>
                </div>
            </div>
            <button className="text-white bg-blue-700 py-1 px-4 rounded-lg " >Transfer Ticket</button>
        </div>
        <br></br>

    </div>
}

function Formpage() {
    const { authenticate, isAuthenticated } = useMoralis();
    const { logout, isAuthenticating, account, Moralis } = useMoralis();


    const fromRef = useRef()
    const destinationRef = useRef()
    const dateRef = useRef()
    const [from, setFrom] = useState("");
    const [destination, setDestination] = useState("");
    const fromList = ["Banglore", "Delhi", "Mumbai", "Hyderabad", "Kolkata"]
    const fromItems = fromList.map((item) => <option value={item}>{item}</option>)
    const [seatFull, setSeatFull] = useState(false);

    var seatList = [];
    var fromSeats = seatList.map((item) => <option value={item}>{item}</option>)

    const [flightDetails, setFlightDetails] = useState([]);
    const [showDetail, setShowDetail] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        const fromSelect = document.getElementById('fromSelect');
        const from = (fromList[fromSelect.selectedIndex - 1]);
        const toSelect = document.getElementById('toSelect');
        const to = (fromList[toSelect.selectedIndex - 1]);
        const dateDoc = document.getElementById('date')
        const date = dateDoc.value;
        console.log(from);
        console.log(to);
        console.log(date);
        db.collection('flights').where("from", "==", from.toString()).where("to", "==", to.toString()).where("date", "==", date).get()
            .then((querySnapshot) => {
                console.log('query');
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());
                    setFlightDetails(doc.data());
                    setShowDetail(true);
                });
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
    }

    const book = async () => {
        if (flightDetails.seats > 0) {
            //do the below after paying



            const options = {
                contractAddress: contractAddress,
                abi: abi,
                functionName: "mint",
                params: {
                    to: Moralis.account,
                    cid: flightDetails.flightCID,
                    seatNumbers: [flightDetails.seats]
                },
                msgValue: Moralis.Units.ETH("0.005"),
            }
            const mintNft = await Moralis.executeFunction(options).then(() => {
                const fromSelect = document.getElementById('fromSelect');
                const from = (fromList[fromSelect.selectedIndex - 1]);
                const toSelect = document.getElementById('toSelect');
                const to = (fromList[toSelect.selectedIndex - 1]);
                const dateDoc = document.getElementById('date')
                const date = dateDoc.value;
                db.collection('flights').where("from", "==", from.toString()).where("to", "==", to.toString()).where("date", "==", date).get()
                    .then((querySnapshot) => {
                        console.log('query');
                        querySnapshot.forEach((doc) => {
                            // doc.data() is never undefined for query doc snapshots
                            doc.update({ 'seats': flightDetails.seats - 1 });
                        });
                    })
                    .catch((error) => {
                        console.log("Error getting documents: ", error);
                    });
            })




        }
        else {
            setSeatFull(true);
        }
    }


    return (
        <Container
            className='d-flex align-items-center justify-content-center mt-40'
            style={{ minHeight: "100vh" }}
        >
            <div className=" p-4 text-center">
                {!isAuthenticated && (
                    <button className="text-xl text-white bg-blue-600 py-1 px-4 rounded-lg hover:bg-blue-700" onClick={() => authenticate()}>Connect Wallet</button>
                )}
                {isAuthenticated && (
                    <button className="text-xl text-white bg-blue-600 py-1 px-4 rounded-lg hover:bg-blue-700" onClick={() => logout()}>Logout</button>
                )}
            </div>
            <div className='box-body' style={{ textAlign: "center" }}>
                <Card className='card_parent'>
                    <Card.Body className='card_body'>
                        <h2 className='font-bold text-2xl'>Find Flights</h2>
                        <Form className='form-body' onSubmit={handleSubmit}>
                            <Form.Group
                                className='field'
                                id='from'
                                style={{ margin: "10px" }}>
                                <Form.Label className='label m-2'>From</Form.Label>
                                <Form.Select id='fromSelect' aria-label='Default select example' ref={dateRef}>
                                    <option>Choose</option>
                                    {fromItems}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group
                                className='field'
                                id='to'
                                style={{ margin: "10px" }}>
                                <Form.Label className='label m-2'>Destination</Form.Label>
                                <Form.Select id='toSelect' aria-label='Default select example'>
                                    <option>Choose</option>
                                    {fromItems}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label className='m-2'>Date</Form.Label>
                                <input type='date' id='date' />
                            </Form.Group>
                            <button className='m-2 bg-blue-700 text-white rounded p-2' type='submit'>Find Flights</button>
                        </Form>
                    </Card.Body>
                </Card>
            </div>

            <div className='text-center'>
                {showDetail && (
                    <div>
                        <h1 className='text-black m-2'>Flights Available</h1>
                        <div className='m-2'>
                            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl p-4 shadow-md">
                                <div className="grid grid-cols-4 ">
                                    <div className="col-span-2">
                                        <h1 className="text-left font-bold ">From</h1>
                                        <h2 className="text-left text-xl ">{flightDetails.from}</h2>
                                        <h1 className="text-left font-bold">To</h1>
                                        <h2 className="text-left text-xl">{flightDetails.to}</h2>
                                        <h1 className="text-left font-bold">Price</h1>
                                        <h2 className="text-left text-xl">0.005 ether</h2>
                                    </div>
                                    <div className="col-span-2">
                                        <h1 className="text-left font-bold">Date</h1>
                                        <h2 className="text-left text-xl">{flightDetails.date}</h2>
                                        <h1 className="text-left font-bold">Time</h1>
                                        <h2 className="text-left text-xl">{flightDetails.time}</h2>
                                    </div>
                                </div>
                                <button className="text-white bg-blue-700 py-1 px-4 rounded-lg " onClick={() => book()} >Book</button>
                                {seatFull && (
                                    <p>No seats available</p>
                                )}
                            </div>
                            <br></br>

                        </div>
                    </div>

                )}
            </div>

        </Container>
    );
}

export default Formpage;