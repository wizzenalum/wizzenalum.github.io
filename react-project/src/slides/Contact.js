import React from "react";

function Contact() {
  return (
    <div id="contact">
      <div id="contact-header" class="head2">
        <h2 class="inline">Contact</h2>
      </div>
      <div id="contact-container">
        <form action="" method="get" id="form">
          <input
            type="text"
            id="person-name"
            name="name"
            placeholder="Your Name"
          />
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Your Email"
          />
          <textarea
            id="message"
            name="message"
            placeholder="Message"
            rows="2"
          ></textarea>
          <button id="submit">send</button>
        </form>
        <div id="info" class="">
          <h3 id="getintouch">Get in touch</h3>
          <div id="address">
            <div id="place">
              <img src="/icons/place.png" alt="icon" class="address-icon" />
              <span>Bharatput, Rajasthan</span>
            </div>
            <div id="mobile">
              <img src="/icons/mobile.png" alt="icon" class="address-icon" />
              <span>8477001129</span>
            </div>
            <div id="mail">
              <img src="/icons/email.png" alt="icon" class="address-icon" />
              <span>sikri.ghanshyam@gmail.com</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
