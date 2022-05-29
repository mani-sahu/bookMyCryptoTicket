import React, { useEffect, useState } from "react";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import { abi, contractAddress, coinAbi, coinContractAddress } from '../contractDetails'
import axios from 'axios';
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'

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
const Ticket = ({ url, index }) => {
    const { data, error, fetch, isFetching, isLoading } = useWeb3ExecuteFunction({
        abi: abi,
        contractAddress: contractAddress,
        functionName: "getTokenIdsForWallet"
    })
    const { Moralis } = useMoralis();
    const [ticketDetail, setTicketDetail] = useState({
        name: '',
        from: '',
        to: '',
        seat: '',
        date: '',
        time: ''
    })
    const [transfer, setTransfer] = useState(false);
    const getData = () => {
        axios.get('https://gateway.pinata.cloud/ipfs/QmYut6Z2gZSgxF5p4E6QWYRu5bmfUygSgZ64gLDdA1Muft/1.json').then(res => {
            console.log(res);
            setTicketDetail(res.data);
        })
    }
    useEffect(() => {
        getData();
        fetch();
    }, [])
    const transferTicket = async () => {
        const address = document.getElementById('addressInput').value;
        const options = {
            contractAddress: contractAddress,
            abi: abi,
            functionName: "safeTransferFrom(address,address,uint256)",
            params: {
                from: Moralis.account,
                to: address,
                tokenId: data[index]._hex
            },
            msgValue: Moralis.Units.ETH("0.005"),
        }
        const transferNft = await Moralis.executeFunction(options);

    }
    return (
        <div className="">
            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl p-4 shadow-md">
                <div className="grid grid-cols-4 ">
                    <div className="col-span-2">
                        <h1 className="text-left font-bold">From</h1>
                        <h2 className="text-left text-xl ">{ticketDetail.from}</h2>
                        <h1 className="text-left font-bold">To</h1>
                        <h2 className="text-left text-xl">{ticketDetail.to}</h2>
                    </div>
                    <div className="col-span-2">
                        <h1 className="text-left font-bold">Date</h1>
                        <h2 className="text-left text-xl">{ticketDetail.date}</h2>
                        <h1 className="text-left font-bold">Time</h1>
                        <h2 className="text-left text-xl">{ticketDetail.time}</h2>
                    </div>
                </div>
                <button className="text-white bg-blue-700 py-1 px-4 rounded-lg " onClick={() => setTransfer(!transfer)}>Transfer Ticket</button>
            </div>
            <br></br>
            {transfer && (
                <div className="mb-4 ">
                    <label>Address: <input id="addressInput" className="border-black" type='text' /></label>
                    <button className="text-white bg-blue-700 ml-2 py-1 px-4 rounded-lg " onClick={() => transferTicket()}>Transfer</button>
                </div>
            )}
        </div>
    )
}
const Profile = () => {
    const [flyingCoinBalance, setFlyingCoinBalance] = useState(0);
    const { authenticate, isAuthenticated } = useMoralis();
    const { logout, isAuthenticating, account, Moralis } = useMoralis();


    const { data, error, fetch, isFetching, isLoading } = useWeb3ExecuteFunction({
        abi: abi,
        contractAddress: contractAddress,
        functionName: "getTokenIdsForWallet"
    })

    const getTokenIds = async () => {
        fetch();
        // const options = {
        //     contractAddress: contractAddress,
        //     abi: abi,
        //     functionName: "getTokenIdsForWallet"
        // }
        // const getTokenIdsForWallet = await Moralis.executeFunction(options);
        // console.log(getTokenIdsForWallet);

    }
    //var nftURIs = [];
    var [nftURIs, setNftURIs] = useState([]);
    const [nftDetails, setNftDetails] = useState([]);

    var tokenIds = [];
    const getTokenURIs = async () => {
        const options = {
            contractAddress: contractAddress,
            abi: abi,
            functionName: "getTokenURIs",
            params: {
                tokenIds: tokenIds
            }
        }
        const getTokenURIsOfTransaction = await Moralis.executeFunction(options);
        console.log(getTokenURIsOfTransaction);
        var URIs = getTokenURIsOfTransaction;
        console.log(URIs);
        setNftURIs(URIs);
        //get nft details and store the json in a variable
        //then display the tickets
    }
    useEffect(() => {
        console.log('data changed');

        if (data) {
            var n = data.length;
            console.log(n);
            for (let i = 0; i < n; i++) {
                tokenIds.push(data[0]._hex);
            }
            console.log(tokenIds);
            getTokenURIs();
        }
    }, [data])
    // if (account) {
    //     getTokenIds();
    // }
    useEffect(() => {
        console.log('account');
        console.log(account);
        getTokenIds();
    }, [isAuthenticated])

    useEffect(() => {
        var details = [];
        for (let i = 0; i < nftURIs.length; i++) {
            details.push(getData());
        }
        setNftDetails(details);
        console.log(nftDetails);
    }, [])

    // useEffect(() => {
    //     getTokenIds();
    // }, [])
    const getData = () => {
        axios.get('https://gateway.pinata.cloud/ipfs/QmYut6Z2gZSgxF5p4E6QWYRu5bmfUygSgZ64gLDdA1Muft/1.json').then(res => {
            console.log(res);
        })
    }
    const signOut = () => {
        logout();
        setNftURIs([]);
    }
    // const claimCoins = async () => {
    //     //get the token balance from database
    //     //if token balance greater than 20000,continue
    //     const d = (await db.collection('users').doc(account.toString()).get()).data().tokenBalance
    //     console.log(account)
    //     console.log(d);
    //     var tokenBalance = BigInt(d);
    //     var decimalsOffset = 1000000000000000000n;
    //     const options = {
    //         contractAddress: coinContractAddress,
    //         abi: coinAbi,
    //         functionName: "mint",
    //         params: {
    //             to: account ? account.toString() : "",
    //             amount: tokenBalance * decimalsOffset
    //         }
    //     }
    //     const coinToken = await Moralis.executeFunction(options);
    //     console.log(coinToken);

    //     //else
    //     //display an error

    // }
    return (
        <div className="text-center mt-30">
            <div className="grid grid-cols-4 mt-20 ">
                <div className="col-span-1 m-4 ">

                    <div className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl p-4 shadow-md m-10">
                        {!isAuthenticated && (
                            <button className="text-xl text-white bg-blue-600 py-1 px-4 rounded-lg hover:bg-blue-700" onClick={() => authenticate()}>Connect Wallet</button>
                        )}
                        {isAuthenticated && (
                            <button className="text-xl text-white bg-blue-600 py-1 px-4 rounded-lg hover:bg-blue-700" onClick={() => signOut()}>Logout</button>
                        )}
                    </div>
                </div>
                <div className="col-span-3 m-4">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-black">Your Tickets</h1>
                    </div>
                    {nftURIs.map((item, index) => (
                        <Ticket url={item} index={index} />
                    ))}

                </div>
            </div>


        </div>
    )
}
export default Profile;