import React, { useEffect, useState } from "react";
import "./TourDetails.css";
import Bg from "../Bg/Bg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";

function DropdownCard({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle the dropdown
  const toggleCard = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="card">
      <div className="card-header" onClick={toggleCard}>
        <h3 className="question-name">{question}</h3>
        <span>{isOpen ? "-" : "+"}</span> {/* Toggle between + and - */}
      </div>
      {/* Conditionally render the content based on state */}
      <div className={`card-content ${isOpen ? "open" : "collapsed"}`}>
        <p>{answer}</p>
      </div>
    </div>
  );
}

function TourDetails() {
  const { id } = useParams(); // Get ID from URL
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [adult, SetAdult] = useState(1);
  const [children, SetChildren] = useState(0);
  const [total, setTotal] = useState(0);

  // Fetch tour details
  useEffect(() => {
    const fetchTourDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/tours/${id}`
        );
        console.log("this is response data-> ", response.data.tour);
        setTour(response.data.tour); // Adjust based on your API response structure
        // setTotal(parseInt(tour?.adultPrice))
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to fetch tour details.");
      } finally {
        setLoading(false);
      }
    };

    fetchTourDetails();
  }, [id]);

  useEffect(() => {
    if (tour?.adultPrice) {
      // Set default total as adult price multiplied by the number of adults
      setTotal(parseInt(tour.adultPrice) * adult);
    }
  }, [tour]); // Trigger when `tour` is fetched


  // Calculate total cost based on adults and children
  useEffect(() => {
    let ans = adult * parseInt(tour?.adultPrice) + children * parseInt(tour?.childPrice);
    setTotal(ans);
  }, [adult, children]);

  const setAdultValue = (value) => {
    const updatedAdults = Number(value); // Convert value to number
    SetAdult(updatedAdults);
  };
  const setChildrenValue = (value) => {
    const updatedChildren = Number(value); // Convert value to number
    SetChildren(updatedChildren);
  };

  // Function to format the date to dd-mm-yyyy
  const formatDateToDDMMYYYY = (date) => {
    return format(date, "dd-MM-yyyy");
  };

  const tourFacilities = tour?.included;

  const facilityList = tourFacilities?.split(",") || [];

  const facilitiesUl = (
    <ul>
      {facilityList.map((facility, index) => (
        <li key={index}>{facility}</li>
      ))}
    </ul>
  );

  return (
    <div className="tourdetails-outer">
      <Bg heading={tour?.tourName} />
      <div className="tourdetails-outer-2">
        <div className="tourdetails-info">
          <div className="tourdetails-short-info">
            {tour?.tourInfo.map((item) => (
              <div className="language-info">
                <p className="small-text">{item.key}</p>
                {item.key === "Duration" ? (
                  <p className="main-text">{item.value + ' days'}</p>
                ) : <p className="main-text">{item.value}</p>}
              </div>
            ))}
          </div>
          <div className="tourdetails-detail">
            <h3 className="info-heading">About this tour</h3>
            <p>{tour?.aboutTour}</p>
            <h3 className="info-heading">Included in tour</h3>
            {/* <ul>
              <li>
                Comfortable hotel or resort accommodations based on your
                customers' preferences and budget.
              </li>
              <li>Options can range from budget-friendly to luxury stays.</li>
              <li>Airport or railway station transfers to and from Gulmarg.</li>
              <li>
                Local transportation within Gulmarg for sightseeing and
                activities.
              </li>
              <li>
                Daily meals (breakfast, lunch, and dinner) at selected
                restaurants or hotels.
              </li>
              <li>Vegetarian and non-vegetarian options available.</li>
              <li>Gondola ride to Apharwat Peak.</li>
              <li>
                Skiing or snowboarding lessons (for beginners or intermediate
                levels).
              </li>
              <li>Trekking or hiking trails in the surrounding areas.</li>
              <li>
                Experienced local guides to accompany your customers throughout
                the tour.
              </li>
            </ul> */}
            {facilitiesUl}
            <h3 className="info-heading">Itenary</h3>
            <div>
              {tour?.itinerary.map((faq, index) => (
                <DropdownCard
                  key={index}
                  question={
                    "Day" +
                    tour?.itinerary[index].day +
                    ":" +
                    tour?.itinerary[index].heading
                  }
                  answer={tour?.itinerary[index].content}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="floating-menu">
          <div className="top-banner">
            <p>
              <span style={{ fontSize: "20px" }}>Price:</span> 12345/person
            </p>
          </div>
          <form classname="form-detail-tourdetail">
            <input
              type="text"
              className="custom-input-tourdetail"
              placeholder="Your Name"
            />
            <input
              type="text"
              className="custom-input-tourdetail"
              placeholder="Your Email"
            />
            <input
              type="text"
              className="custom-input-tourdetail"
              placeholder="Your Phone Number"
            />
            <DatePicker
              className="custom-input-tourdetail-date"
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              placeholderText="Choose date" // Custom placeholder
              dateFormat="dd-MM-yyyy" // Ensures date is formatted as dd-mm-yyyy
              minDate={new Date()} // Disable past dates
            />
          </form>
          <div className="quantity">
            <div className="quantity-box">
              <p>Adult</p>
              <input
                type="number"
                min="1"
                className="custom-input-tourdetail-quantity"
                placeholder="Adult"
                value={adult}
                onChange={(e) => setAdultValue(e.target.value)}
              />
            </div>
            <div className="quantity-box">
              <p>Children</p>
              <input
                type="number"
                min="0"
                className="custom-input-tourdetail-quantity"
                placeholder="Children"
                value={children}
                onChange={(e) => setChildrenValue(e.target.value)}
              />
            </div>
          </div>
          <p className="total-quantity">Total: {total}</p>
          <div className="inquiry-button-tourdetail">Send an Inquiry</div>
          <div className="bottom-banner"></div>
        </div>
      </div>
    </div>
  );
}

export default TourDetails;
