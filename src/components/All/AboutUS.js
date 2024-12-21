import React from 'react';
import { FaIconName } from 'react-icons/fa';
import { FaInstagram, FaTwitter, FaEnvelope, FaPhone } from 'react-icons/fa';
import './AboutUs.css'; // Make sure to create a CSS file for styling

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <h1>About Us</h1>
      <p>
        Welcome to <strong>Jamia Website </strong>, Your preferred destination for [brief description of the purpose of the website, for example, “to save money in an easy way without any financial benefits”]. Our mission is [“We facilitate the process of collecting money and reducing the debts of community members”].
      </p>
      <p>
        Based in the heart of [Muscat], we are dedicated to connecting with our community and providing a seamless online experience. Whether you're browsing through our offerings or reaching out for support, we are here to ensure your satisfaction.
      </p>

      <div className="contact-details">
        <h2>Contact Us</h2>
        <p>
          Have questions or need assistance? Reach out to us through any of the channels below:
        </p>
        <ul className="contact-icons">
          <li>
            <FaEnvelope /><a href="mailto:ralrawahi064@gmail.com">Jamia@gmail.com</a>
          </li>
          <li>
            <FaInstagram /><a href="https://www.instagram.com/Jamia" target="_blank" rel="noopener noreferrer">@Jamia</a>
          </li>
          <li>
            <FaTwitter /><a href="https://www.twitter.com/Jamia" target="_blank" rel="noopener noreferrer">@Jamia</a>
          </li>
          <li>
            <FaPhone /><a href="tel:+96890646116">+968 90646116</a>
          </li>
        </ul>
      </div>

      <div className="location">
        <h2>Our Location</h2>
        <div className="map-container">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14625.637588802547!2d58.41843105354854!3d23.589646125168333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e91fee2a1e6688b%3A0xe02fed20d7d74d5b!2zVVRBUywgRW5nbGlzaCBMYW5ndWFnZSBDZW50cmUg2YXYsdmD2LIg2KfZhNmE2LrYqSDYp9mE2KfZhtis2YTZitiy2YrYqSAtINin2YTZg9mE2YrYqSDYp9mE2KrZgtmG2YrYqQ!5e0!3m2!1sen!2sus!4v1734778243115!5m2!1sen!2sus"
          width="600"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      </div>
    </div>
  );
};

export default AboutUs;
