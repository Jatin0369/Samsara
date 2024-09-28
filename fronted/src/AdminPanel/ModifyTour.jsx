// ModifyTour.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ModifyTour.css";
import NewTour from "./NewTour"; // Adjust the path based on your project structure
import baseUrl from "../baseUrl";

function ModifyTour() {
  const [tours, setTours] = useState([]);
  const [selectedTour, setSelectedTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch all tours
  const fetchTours = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/tours`); // Adjust endpoint if needed
      console.log(response.data); // Optional: Remove in production
      setTours(response.data.tours); // Corrected to access 'tours' array
      setError(null);
    } catch (err) {
      console.error("Error fetching tours:", err);
      setError("Failed to fetch tours.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

  // Handle Delete Tour
  const handleDelete = async (tourId) => {
    if (!window.confirm("Are you sure you want to delete this tour?")) return;

    try {
      const response = await axios.delete(`${baseUrl}/api/tours/${tourId}`);
      if (response.status === 200) {
        alert("Tour deleted successfully!");
        fetchTours(); // Refresh the tours list
      } else {
        alert("Failed to delete the tour.");
      }
    } catch (err) {
      console.error("Error deleting tour:", err);
      alert("An error occurred while deleting the tour.");
    }
  };

  // Handle Update Tour
  const handleUpdate = (tour) => {
    setSelectedTour(tour);
  };

  return (
    <div className="modify-tour-container">
      <h1>Manage Tours</h1>

      {loading ? (
        <p>Loading tours...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <div className="tour-table-container">
          <table className="tour-table" border="1" cellPadding="10" cellSpacing="0">
            <thead>
              <tr>
                <th>Serial No.</th>
                <th>Tour Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tours.map((tour, index) => (
                <tr key={tour._id}>
                  <td>{index + 1}</td>
                  <td>{tour.tourName}</td> {/* Corrected field name */}
                  <td>
                    <button onClick={() => handleUpdate(tour)}>Update</button>
                    <button onClick={() => handleDelete(tour._id)} style={{ marginLeft: "10px" }}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="new-modify-tour-section">
        {selectedTour ? (
          <div>
            <h2>Edit Tour</h2>
            <NewTour
              selectedTour={selectedTour}
              refreshTours={fetchTours}
              setSelectedTour={setSelectedTour}
            />
          </div>
        ) : (
          <div>
            <h2>Select a Tour to modify it</h2>
            {/* <NewTour
              selectedTour={null}
              refreshTours={fetchTours}
              setSelectedTour={setSelectedTour}
            /> */}
          </div>
        )}
      </div>
    </div>
  );
}

export default ModifyTour;
