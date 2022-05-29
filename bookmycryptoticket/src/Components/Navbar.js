import "./Navbar.css";
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom"
import { useLocation } from "react-router-dom";
import logo from "./logo.png";


const Navbar = (props) => {


    const [navbar, setnavbar] = useState(false);

    const { pathname } = useLocation()
    // console.log(pathname);
    useEffect(() => {
        if (pathname !== '/') {
            setnavbar(true);
        }
        else {
            setnavbar(false);
        }
    }, [pathname]);

    const setBackground = () => {
        if (window.scrollY >= 5 || pathname !== '/') {
            setnavbar(true);
        }
        else {
            setnavbar(false);
        }
    }

    window.addEventListener('scroll', setBackground);
    return (
        <header className="navbar header bg-transparent">
            <div className="nav-div">
                <div className="align-items-center">
                    <Link className="navbar-brand" to="/">
                        <img src={logo} alt="logo" id="nav-logo"></img>
                    </Link>
                </div>

                <div className="menu-only" >
                    <Link to='/#about' className="text-decoration-none"><div className="navlink rounded-pill text-light px-3 py-2 mx-2 about">ABOUT</div></Link>
                    <Link to='/#search' className="text-decoration-none"><div className="navlink rounded-pill text-light px-3 py-2 mx-2 speakers">SEARCH FLIGHT</div></Link>
                    <Link to='/#book' className="text-decoration-none"><div className="navlink rounded-pill text-light px-3 py-2 mx-2 talks">BOOK</div></Link>
                    <Link to='/#footer' className="text-decoration-none" ><div className="navlink rounded-pill text-light px-3 py-2 ms-2 contact">CONTACT US</div></Link>
                </div>

            </div>
        </header>
    );
}

export default Navbar;
