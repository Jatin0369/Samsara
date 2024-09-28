import React from "react";
import Map from "./Map";
import "./Contact.css";

function Contact() {
  return (
    <div className="contact-outer">
      <div className="map">
        <Map />
      </div>
      <div className="contact-container">
        <div className="contact-info">
          <h3>Contact Info</h3>
          <p>
            Thank you for your kind trust in Us! Our travel expert team
            will contact you soonest for the best trips and ddvices.
          </p>
          <p>
            149-R Model Town, New Delhi<br />UT, India.
            <br />info@travel.com +91 98-76-54-32-10
          </p>
        </div>
        <div className="contact-form">
          <h3>Get In Touch</h3>
          <form classname="form-detail">
            <input type="text" class="custom-input" placeholder="Your Name" />
            <input type="text" class="custom-input" placeholder="Your Email" />
            <textarea
              class="custom-textbox"
              placeholder="Enter your text here..."
            ></textarea>

          </form>
          <div className="submit-button">Submit</div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
