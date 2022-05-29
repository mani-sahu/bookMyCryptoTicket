import React from "react"
import "./Footer.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons'



const Footer = () => {

    return (

        <footer className="site-footer bg-dark" data-aos="fade-up">
            <div className="container">

            </div>
            <div className="container">
                <div className="row">
                    <div className="col-md-6 col-sm-12 ">

                        <p className="copyright-text"> &copy; 2022 BookMyCryptoTicket
                        </p>
                    </div>


                    <div className="col-md-6 col-sm-12  m-auto mb-3">
                        <ul className="social-icons">
                            <li><a target={'_blank'} rel='noreferrer' className="twitter" href="#"><i><FontAwesomeIcon icon={faTwitter} /></i></a></li>
                            <li><a target={'_blank'} rel='noreferrer' className="instagram" href="#"><i><FontAwesomeIcon icon={faInstagram} /></i></a></li>
                            <li><a target={'_blank'} rel='noreferrer' className="linkedin" href="#"><i><FontAwesomeIcon icon={faLinkedin} /></i></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;