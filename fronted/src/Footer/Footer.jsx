import React, { useState } from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

function Footer() {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };
  const notify = () => {
    // toast("Wow so easy!");
  toast.success(`Email Submitted for ${inputValue}`, {
    position: "top-left"
  });
}

  return (
    <div className="outer-container-footer">
      <div className="box-3">
        <div className="mail">
          <h3>Sign up here for new events and offers</h3>
          <input
            id="inputField"
            type="email"
            placeholder="Enter Your Email"
            value={inputValue}
            onChange={handleChange}
          />
           <div className="submit-button"  onClick={notify}>Submit</div>
           <ToastContainer />
        </div>
        <div className="links">
            <h3>Quick Links</h3>
            <ul>
            <Link to="/aboutus" className='no-underline-f'><li>About Us</li></Link>
            <Link to="/tour" className='no-underline-f'><li>Tours</li></Link>
            <Link to="" className='no-underline-f'><li>Latest Blogs</li></Link>
                <Link to="contact" className='no-underline-f'><li>Contact Us</li></Link>
            </ul>
        </div>
        <div className="address">
            <h3>Contact</h3>
            <p>149-R Model Town, New Delhi
            <br /> UT, India.</p>
            <p>info@travel.com
            +91 98-76-54-32-10 </p>
        </div>
      </div>
      <div className="social-links"></div>
    </div>
  );
}

export default Footer;
