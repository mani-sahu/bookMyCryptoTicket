import React from 'react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useMoralis } from 'react-moralis';

const NavBarItem = ({ title, classprops }) => (
    <li className={`mx-4 cursor-pointer ${classprops}`}>{title}</li>
)

const Navbar = () => {
    const { authenticate, isAuthenticated, user } = useMoralis();
    const { logout, isAuthenticating } = useMoralis();

    return (
        <nav className="w-full bg-black flex md:justify-center justify-between items-center p-4">
            <div className="md:flex-[0.5] flex-initial justify-center items-center">
                <NavLink to="/" exact>
                    <img alt='logo' className='w-32 cursor-pointer' />
                </NavLink>
            </div>

            <ul className='text-white flex list-none flex-row justify-between items-center flex-initial'>
                {["Profile"].map((item, index) => (
                    <NavLink to={"/" + item}>
                        <NavBarItem key={item + index} title={item} />
                    </NavLink>
                ))}
                {!isAuthenticated && (
                    <l1 className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]">
                        <button onClick={() => authenticate()} disabled={isAuthenticating}>Connect Wallet</button>
                    </l1>
                )}
                {isAuthenticated && (
                    <l1 className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]">
                        <button onClick={() => logout()} >Log Out</button>
                    </l1>
                )}

            </ul>
        </nav>
    );
}

export default Navbar;


