import React, { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import { Link, useNavigate } from "react-router-dom"; // Import for navigation
import "./Home.css";
import mountains from "./mountains.webp";
import arrow from "./right-arrow.png";
import BlogSlider from "./BlogSlider";
import axios from 'axios';
import map from './map.png'
import gps from './gps-navigation.png'
import earth from './planet-earth.png'
import people from './people.png'
import mainMount from './mountains.jpg'
import beach from './beach.jpg'
import sky from './sky.jpg'



function Home() {

  const navigate = useNavigate();

  const [selectedTour, setSelectedTour] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("");
  const [selectedDestination, setSelectedDestination] = useState("");

  const [tours, setTours] = useState([]);
  const [uniqueDurations, setUniqueDurations] = useState([]);
  const [uniqueCities, setUniqueCities] = useState([]);
  const [uniqueTourTypes, setUniqueTourTypes] = useState([]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSelectChange = (event) => {
    setSelectedTour(event.target.value); // Update state with selected tour
  };
  const handleSelectChangeDay = (event) => {
    setSelectedDuration(event.target.value);
  }
  const handleSelectChangeDest = (event) => {
    setSelectedDestination(event.target.value);
  }

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/tours') // Node.js server URL
      .then((response) => {
        setTours(response.data.tours); // Set the response data to state
        console.log(response.data.tours)
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 2,
  };


  useEffect(() => {
    if (tours.length > 0) {
      const durations = [];
      tours.forEach((tour) => {
        const duration = parseInt(tour.tourInfo.find((info) => info.key === "Duration").value);
        if (!durations.includes(duration)) {
          durations.push(duration);
        }
      });
      setUniqueDurations(durations.sort((a, b) => a - b));

      const cities = [];
      tours.forEach((tour) => {
        const city = tour.tourInfo.find((info) => info.key === "City").value;
        if (!cities.includes(city)) {
          cities.push(city);
        }
      });
      setUniqueCities(cities.sort());

      const tourTypes = [];
      tours.forEach((tour) => {
        const tourType = tour.tourInfo.find((info) => info.key === "Type").value;
        if (!tourTypes.includes(tourType)) {
          tourTypes.push(tourType);
        }
      });
      setUniqueTourTypes(tourTypes.sort());
    }
  }, [tours]);

  // Handle the search button click
  const handleSearch = () => {
    // Build the state object dynamically based on selected filters
    const filters = {
      selectedTour: selectedTour || null,
      selectedDuration: selectedDuration || null,
      selectedDestination: selectedDestination || null,
    };
  
    console.log("Navigating with filters:", filters);
  
    navigate(`/tour`, {
      state: filters,
    });
  };
  const reviews = [
    {
      name: "Sarah W.",
      type: "Adventure Enthusiast",
      review: "I couldn't have asked for a better travel booking experience! The website made it so easy to find unique destinations tailored to my adventurous spirit. The seamless booking process and detailed itinerary updates kept me stress-free throughout. Highly recommend it!"
    },
    {
      name: "James L.",
      type: "Family Traveler",
      review: "Planning a family vacation can be hectic, but this platform made it a breeze! From finding family-friendly destinations to getting great deals, the whole process was smooth and hassle-free. We had an amazing time, and I’ll definitely be using this service again."
    },
    {
      name: "Priya S.",
      type: "Solo Explorer",
      review: "As a solo traveler, I appreciate how user-friendly the site is. I found some incredible off-the-beaten-path destinations that I hadn't considered before. Their customer service is also top-notch—answered all my queries promptly. Will book through them again!"
    },
    {
      name: "Mark T.",
      type: "Frequent Business Traveler",
      review: "Time is money, and this website saves both! I love how efficient the search and booking tools are. The variety of hotels and travel options available is impressive, and I can always count on their recommendations for hassle-free business trips."
    },
    {
      name: "Emily R.",
      type: "Honeymooner",
      review: "We booked our honeymoon through this site, and it was absolutely perfect! The site’s recommendations were spot-on for romantic getaways, and the entire process was so easy. From booking flights to accommodations, everything was just right!"
    }
  ];
  const handleNextReview = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePreviousReview = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? reviews.length - 1 : prevIndex - 1
    );
  };
  
  return (
    <>
      <div className="home-page">
        {/* {message} */}
        <div className="outer-cont">
        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}  // Increase the duration for a slower fade-in
        style={{ marginBottom: "20px", padding: "20px" }}
      >
         
        {/* Slowly Fading Div 1 */}
          <img className="home-main-img" src={mainMount} alt="mountain">
          </img>
          {/* <img className="arrow-left-upper-slider" src={arrow} alt="arrow" onClick={handlePreviousReview}></img> */}
          <div className="centered-text">
          <h2 className="hero-section-heading">Explore, Dream, Discover Your Perfect Journey Awaits</h2>
            <p>Browse our curated experiences, read inspiring travel stories, and book your dream vacation with ease. Let's turn your travel aspirations into unforgettable memories. Start your journey today!"</p>
          </div>
          {/* <img className="arrow-right-upper-slider" src={arrow} alt="arrow" onClick={handlePreviousReview}></img> */}
      </motion.div>
          <div className="booking-box">
            <div className="border-box">
            <select
              className="border-box-option"
              id="mySelect"
              value={selectedTour}
              onChange={handleSelectChange}
            >
              <option value="" disabled>
                Select an option
              </option>
              {uniqueTourTypes.map((tourType) => (
                <option key={tourType} value={tourType}>
                  {tourType}
                </option>
              ))}
            </select>
            </div>
            <div className="border-box">
            <select
              className="border-box-option"
              id="mySelect"
              value={selectedDuration}
              onChange={handleSelectChangeDay}
            >
              <option value="" disabled>
                Select an option
              </option>
              {uniqueDurations.map((duration) => (
                <option key={duration} value={duration}>
                  {duration} days
                </option>
              ))}
            </select>
            </div>
            <div className="border-box">
            <select
              className="border-box-option"
              id="mySelect"
              value={selectedDestination}
              onChange={handleSelectChangeDest}
            >
              <option value="" disabled>
                Select an option
              </option>
              {uniqueCities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            </div>
            <div className="search-button" onClick={handleSearch}>Search</div>
          </div>
        </div>
        <div className="second-container">
          <div className="about-intro">
            <h2 className="heading-2">World Best Travel Agent Since 2016.</h2>
            <p className="para-text">
            Experience the world like never before. Our expertly curated tours are designed to offer exceptional travel experiences, blending adventure, luxury, and cultural immersion. Whether you're planning a family getaway, a solo expedition, or a corporate retreat, we provide seamless booking and personalized itineraries. Explore our destinations, get inspired by travel insights, and book your next adventure with confidence. Your perfect journey starts here
            </p>
          </div>
          <div className="floating-container">
            <div className="float-card float-card-a ">
              {/* <img src={mountains} alt='img'></img> */}
              <p>Konark Temple</p>
            </div>
            <div className="float-card float-card-b">
            <p>Qutub Minar</p>
            </div>
            <div className="float-card float-card-c">
            <p>Rani ki Vav</p>
            </div>
          </div>
        </div>

        <div className="fourth-container">
          <div className="stories">
            <div className="quotes-section">
            <h2 className="heading-2">"The journey of a thousand miles begins with a single step."</h2>
            <p>
            This powerful quote by Lao Tzu reminds us that no matter how daunting a challenge may seem, progress starts with the smallest of actions. Every great adventure or achievement, whether it's personal growth, a career ambition, or a physical journey, requires the courage to take that first step. It's not about reaching the destination immediately, but about moving forward with perseverance and faith. Along the way, each step teaches us something new, building strength, wisdom, and resilience. Embrace the beginning, because it's the start of something extraordinary.
            </p>
            <p>At Saṃsāra, we believe that planning your dream vacation is the first step towards unforgettable experiences. Our team is dedicated to making that journey seamless and enjoyable from the very start. Whether you're exploring new destinations or revisiting favorite spots, we guide you every step of the way, offering expert advice, personalized itineraries, and unmatched service. Your journey deserves the best, and with us, you'll not only take that first step confidently but enjoy every moment that follows. Let us turn your travel dreams into reality, one step at a time.</p>
            </div>
          </div>
        </div>
        <div className="third-container">
          <h2 className="heading-2">Why Travel with Us</h2>
          <div className="floating-card-2-container">
            <div className="float-card-2">
              <div className="image-holder">
              <img src={map} alt="img"/>
              </div>
              <div className="card-content-holder">
              <h3>Trusted Agency</h3>
              <p>We collaborate with the most reliable travel agencies to bring you seamless and stress-free travel experiences. With us, you're always in safe hands.</p>
              </div>
            </div>
            <div className="float-card-2">
              <div className="image-holder">
              <img src={earth} alt="img"/>
              </div>
              <div className="card-content-holder">
              <h3>Happy Travellers</h3>
              <p>Thousands of travellers have explored the world with us, leaving with unforgettable memories. Join them, and let’s make your next trip extraordinary.</p>
              </div>
            </div>
            <div className="float-card-2">
              <div className="image-holder">
              <img src={gps} alt="img"/>
              </div>
              <div className="card-content-holder">
              <h3>Unique Destinations</h3>
              <p>Discover breathtaking hidden gems and offbeat destinations. We take pride in curating journeys that offer truly unique and unforgettable experiences.</p>
              </div>
            </div>
            <div className="float-card-2">
              <div className="image-holder">
              <img src={people} alt="img"/>
              </div>
              <div className="card-content-holder">
              <h3>Trusted Traveller</h3>
              <p>Our community of travellers provides honest and verified reviews. Plan your adventure with confidence, guided by the experiences of fellow explorers.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="fourth-container">
          <div className="stories">
            <div className="story-1">
              <div className="cont-btn">
                <p>
                At the heart of every journey is a story waiting to be told. We don't just plan trips—we create meaningful, immersive travel experiences that inspire you to explore the world with fresh eyes. From untouched landscapes to vibrant cultures, each destination is carefully crafted to offer you an authentic connection. Whether it's discovering hidden treasures or embracing new adventures, your journey with us is more than just a vacation—it's a lifelong memory in the making. Let us guide you to places where dreams and reality merge seamlessly.
                </p>
                <Link to='/tour' className="no-underline"><div className="search-button-2">Discover More</div></Link>
              </div>
              <img src={sky} alt="image"></img>
            </div>
            <div className="story-1">
              <img src={mountains} alt="image2"></img>
              <div className="cont-btn">
                <p>
                Your dream holiday begins here! Whether you're seeking adventure, relaxation, or a mix of both, we tailor every detail to ensure a flawless vacation. From personalized itineraries to hand-picked destinations, we go beyond just planning—we create memorable experiences. Let us handle the logistics while you focus on making memories. With us, your perfect holiday is just a click away
                </p>
                <Link to='/tour' className="no-underline"><div className="search-button-2">Discover More</div></Link>
              </div>
            </div>
          </div>
        </div>
        <div className="fifth-container">
          <div className="bg-static-img">
            <div className="customer-testimonials">
              <div className="block-1">
                <p>Testimonials</p>
              </div>
              <div className="block-2">
                <p>What Customers Say About Us?</p>
              </div>
              <motion.div
        key={currentIndex}
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 100 }}
        transition={{ duration: 1 }}
        className="review-card"
      >
              <div className="block-3">
                <p>
                {reviews[currentIndex].review}
                </p>
              </div>
              </motion.div>
     
              <div className="block-4">
                <img className="arrow-left" src={arrow} alt="arrow" onClick={handlePreviousReview}></img>
                <p>{reviews[currentIndex].name}</p>
                <img className="arrow-right" src={arrow} alt="arrow" onClick={handleNextReview}></img>
              </div>
          
            </div>
          </div>
        </div>
        <div className="sixth-container">
          <BlogSlider/>
        </div>
        
      </div>
    </>
  );
}

export default Home;
