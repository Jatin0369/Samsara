import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom"; // Import Link
import Bg from "../Bg/Bg";
import "./Tour.css";
import axios from "axios";
import baseUrl from "../baseUrl";

function Tour() {
  const [sliderValue, setSliderValue] = useState(1000);
  const { state } = useLocation();
  const [filteredTours, setFilteredTours] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // State for filters
  const [selectedTour, setSelectedTour] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("");
  const [selectedDestination, setSelectedDestination] = useState("");

  const [uniqueDurations, setUniqueDurations] = useState([]);
  const [uniqueCities, setUniqueCities] = useState([]);
  const [uniqueTourTypes, setUniqueTourTypes] = useState([]);


  const handleChange = (e) => {
    setSliderValue(e.target.value);
  };

  const handleTourChange = (e) => {
    setSelectedTour(e.target.value);
  };

  const handleDurationChange = (e) => {
    setSelectedDuration(e.target.value);
  };

  const handleDestinationChange = (e) => {
    setSelectedDestination(e.target.value);
  };

  useEffect(() => {
    if (filteredTours.length > 0) {
      const durations = [];
      filteredTours.forEach((tour) => {
        const duration = parseInt(tour.tourInfo.find((info) => info.key === "Duration").value);
        if (!durations.includes(duration)) {
          durations.push(duration);
        }
      });
      setUniqueDurations(durations.sort((a, b) => a - b));

      const cities = [];
      filteredTours.forEach((tour) => {
        const city = tour.tourInfo.find((info) => info.key === "City").value;
        if (!cities.includes(city)) {
          cities.push(city);
        }
      });
      setUniqueCities(cities.sort());

      const tourTypes = [];
      filteredTours.forEach((tour) => {
        const tourType = tour.tourInfo.find((info) => info.key === "Type").value;
        if (!tourTypes.includes(tourType)) {
          tourTypes.push(tourType);
        }
      });
      setUniqueTourTypes(tourTypes.sort());
    }
  }, [filteredTours]);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        setLoading(true);
        setError("");

        // Prepare params based on state and filters
        const params = {};
        if (state) {
          if (state.selectedTour) params.tourType = state.selectedTour;
          if (state.selectedDuration) params.duration = state.selectedDuration;
          if (state.selectedDestination) params.destination = state.selectedDestination;
        }

        // Add additional filters
        if (selectedTour) params.tourType = selectedTour;
        if (selectedDuration) params.duration = selectedDuration;
        if (selectedDestination) params.destination = selectedDestination;

        console.log("Fetching tours with params:", params); // Log params

        const response = await axios.get(`${baseUrl}/api/tours`, { params });
        console.log("Response data:", response.data); // Log response data

        setFilteredTours(response.data.tours);
      } catch (err) {
        console.error("Error fetching tours:", err);
        setError("Failed to fetch tours. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, [state, selectedTour, selectedDuration, selectedDestination, sliderValue]); // Trigger on state or filter change



  return (
    <div className="tour-outer">
      <Bg heading="Tours" />
      <div className="tour-selection-main">
        <div className="tour-filter-panel">
          <h3>Apply Filters</h3>
          {/* Tour Type Filter */}
          <select value={selectedTour} onChange={handleTourChange} className="tour-border-box-option">
            <option value="">Select Tour Type</option>
            {/* Populate with unique tour types */}
            {uniqueTourTypes.map(type => <option value={type}>{type}</option>)}
          </select>
          <div className="tour-line"></div>
          {/* Duration Filter */}
          <select value={selectedDuration} onChange={handleDurationChange} className="tour-border-box-option">
            <option value="">Select Duration</option>
            {uniqueDurations.map(type => <option value={type}>{type}</option>)}
          </select>
          <div className="tour-line"></div>
          {/* Destination Filter */}
          <select value={selectedDestination} onChange={handleDestinationChange} className="tour-border-box-option">
            <option value="">Select Destination</option>
            {uniqueCities.map(type => <option value={type}>{type}</option>)}
          </select>

          {/* Price Slider */}
          {/* <div className="tour-border-box">
            <p>Price: ${sliderValue}</p>
            <input
              className="tour-range"
              type="range"
              min="0"
              max="1000"
              value={sliderValue}
              onChange={handleChange}
              step="50"
            />
          </div> */}
        </div>
        
        <div className="tour-display">
          {loading ? (
            <p>Loading tours...</p>
          ) : error ? (
            <p className="error-message">{error}</p>
          ) : filteredTours.length > 0 ? (
            filteredTours.map((tour, index) => {
              const cityInfo = tour.tourInfo.find(info => info.key === 'City');
              const durationInfo = tour.tourInfo.find(info => info.key === 'Duration');
              const tourTypeInfo = tour.tourInfo.find(info => info.key === 'Type');

              const city = cityInfo ? cityInfo.value : "Unknown";
              const duration = durationInfo ? durationInfo.value : "N/A";
              const tourType = tourTypeInfo ? tourTypeInfo.value : "N/A";

              const tourImage = tour.images.length > 0 ? tour.images[0].value : "";

              return (
                <Link to={`/tourdetails/${tour._id}`} key={index} className="tour-card no-underline">
                  {tourImage ? (
                    <img
                      className="tour-pic no-underline"
                      src={`${baseUrl}/${tourImage}`}
                      alt={tour.tourName}
                    />
                  ) : (
                    <img className="tour-pic" src="path/to/default/image.jpg" alt="default tour" />
                  )}
                  <div className="content-tour-box no-underline">
                    <p className="tour-place no-underline">{city}</p>
                    <p className="tour-name no-underline">{tour.tourName}</p>
                    <p className="tour-price no-underline">
                      From: <span>${tour.adultPrice}</span>
                    </p>
                    <p className="tour-duration no-underline">Duration: {duration} days</p>
                    <p className="tour-description no-underline">{tour.aboutTour}</p>
                  </div>
                </Link>
              );
            })
          ) : (
            <p>No tours found for the selected filters.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Tour;
