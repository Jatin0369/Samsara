import React, { useState, useEffect } from "react";
import "./NewTour.css";
import axios from "axios";
import baseUrl from "../baseUrl";

function NewTour({ selectedTour, refreshTours, setSelectedTour }) {
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [aboutTour, setAboutTour] = useState("");
  const [included, setIncluded] = useState("");
  const [tourName, setTourName] = useState("");
  const [adultPrice, setAdultPrice] = useState("");
  const [childPrice, setChildPrice] = useState("");

  const [keyValuePairs, setKeyValuePairs] = useState([
    { key: "City", value: "" },
    { key: "Duration", value: "" },
    { key: "Tourtype", value: "" },
  ]);

  const [itinerary, setItinerary] = useState([
    { day: "1", heading: "", content: "" },
  ]);

  // Pre-fill form when a tour is selected for editing
  useEffect(() => {
    if (selectedTour) {
      console.log(selectedTour.tourInfo)
      setTourName(selectedTour.tourName);
      setAdultPrice(selectedTour.adultPrice)
      setChildPrice(selectedTour.childPrice)
      setAboutTour(selectedTour.aboutTour);
      setIncluded(selectedTour.included);
      setKeyValuePairs(selectedTour.tourInfo || []);
      setItinerary(selectedTour.itinerary || itinerary);
      setPreviews(selectedTour.images || []); // If images are provided as URLs
    } else{
      // Reset form if no tour is selected
      setTourName("");
      setAdultPrice("")
      setChildPrice("")
      setAboutTour("");
      setIncluded("");
      setKeyValuePairs([
        { key: "City", value: "" },
        { key: "Duration", value: "" },
        { key: "Tourtype", value: "" },
      ]);
      setItinerary([{ day: "1", heading: "", content: "" }]);
      setImages([]);
      setPreviews([]);
    }
  }, [selectedTour]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && images.length < 8) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviews((prevPreviews) => [...prevPreviews, reader.result]);
        setImages((prevImages) => [...prevImages, { name: file.name, file }]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (index) => {
    const imageName = images[index].name;
    axios.delete(`/api/image/${imageName}`)
      .then(response => {
        // remove the image from the folder
        axios.post(`/api/remove-image-from-folder`, { imageName })
          .then(response => {
            // remove the image data from the backend
            axios.patch(`/api/tour/${selectedTour._id}`, { imageNames: images.filter((_, i) => i !== index) })
              .then(response => {
                // update the previews state
                setPreviews(previews.filter((_, i) => i !== index));
                setImages(images.filter((_, i) => i !== index));
              })
              .catch(error => {
                console.error(error);
              });
          })
          .catch(error => {
            console.error(error);
          });
      })
      .catch(error => {
        console.error(error);
      });
  };

  const addKeyValuePair = () => {
    if (keyValuePairs.length < 8) {
      setKeyValuePairs([...keyValuePairs, { key: "", value: "" }]);
    } else {
      alert("You can only add up to 8 key-value pairs.");
    }
  };

  const handleChangeKeyValuePair = (index, field, event) => {
    const newKeyValuePairs = [...keyValuePairs];
    newKeyValuePairs[index][field] = event.target.value;
    setKeyValuePairs(newKeyValuePairs);
  };

  const addDaySection = () => {
    const newDay = itinerary.length + 1;
    setItinerary([...itinerary, { day: newDay, heading: "", content: "" }]);
  };

  const handleChangeDay = (index, field, event) => {
    const newItinerary = [...itinerary];
    newItinerary[index][field] = event.target.value;
    setItinerary(newItinerary);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    // Validation: Ensure at least one image is uploaded
    if (images.length === 0 && !selectedTour) {
      alert("Please upload at least one image.");
      return;
    }

    const formData = new FormData();
    formData.append("tourName", tourName);
    formData.append("adultPrice", adultPrice);
    formData.append("childPrice", childPrice)
    formData.append("aboutTour", aboutTour);
    formData.append("included", included);
    formData.append("tourInfo", JSON.stringify(keyValuePairs));
    formData.append("itinerary", JSON.stringify(itinerary));
    images.forEach((image, index) => {
      formData.append(`image`, image.file);
    });

    const url = selectedTour
      ? `${baseUrl}/api/updatetour/${selectedTour._id}` // Update existing tour
      : `${baseUrl}/api/createnewtour`; // Create new tour

    try {
      const response = await axios({
        method: selectedTour ? "PUT" : "POST",
        url: url,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      // console.log("FormData:", Object.fromEntries(formData.entries()));

      if (response.status === 200 || response.status === 201) {
        alert(selectedTour ? "Tour updated successfully!" : "Tour created successfully!");
        // refreshTours(); // Refresh the list of tours
        // setSelectedTour(null); // Reset the form

        // Reset form fields if creating a new tour
        if (!selectedTour) {
          setTourName("");
          setAdultPrice("");
          setChildPrice("")
          setAboutTour("");
          setIncluded("");
          setKeyValuePairs([
            { key: "City", value: "" },
            { key: "Duration", value: "" },
            { key: "Type", value: "" },
          ]);
          setItinerary([{ day: "1", heading: "", content: "" }]);
          setImages([]);
          setPreviews([]);
        }
      } else {
        alert("There was an issue with the request.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was an error submitting the form. Please try again.");
    }
  };

  return (
   <div className="new-tour">
  <div className="center-panel">
    <div className="side-panel">
      <h3>Tour Info</h3>
      <button className="add-button" onClick={addKeyValuePair}>
        Add Tour +
      </button>
      {keyValuePairs.map((pair, index) => (
        <div
          key={index}
          className="key-value-pair"
          style={{ display: "flex", marginBottom: "10px" }}
        >
          <input
            className="key-value-input"
            type="text"
            value={pair.key}
            onChange={(event) =>
              handleChangeKeyValuePair(index, "key", event)
            }
            placeholder="Key"
            disabled={index < 3} // Disable key input for first three pairs
            style={{ marginRight: "10px", padding: "5px" }}
          />
          <input
            className="key-value-input"
            type="text"
            value={pair.value}
            onChange={(event) =>
              handleChangeKeyValuePair(index, "value", event)
            }
            placeholder="Value"
            style={{ marginRight: "10px", padding: "5px" }}
          />
        </div>
      ))}
    </div>

    <div className="main-panel">
      <h3 className="h3-new-tour">Tour Name</h3>
      <input
        className="key-value-input-heading"
        type="text"
        value={tourName}
        onChange={(e) => setTourName(e.target.value)}
        placeholder="Tour Name"
        style={{ marginRight: "1vw", padding: "5px", width: "300px" }}
      />
      <h3 className="h3-new-tour">Price per Adult</h3>
      <input
        className="key-value-input-heading"
        type="text"
        value={adultPrice}
        onChange={(e) => setAdultPrice(e.target.value)}
        placeholder="Price per Adult"
        style={{ marginRight: "1vw", padding: "5px", width: "300px" }}
      />
      <h3 className="h3-new-tour">Price per Child</h3>
      <input
        className="key-value-input-heading"
        type="text"
        value={childPrice}
        onChange={(e) => setChildPrice(e.target.value)}
        placeholder="Price per Child"
        style={{ marginRight: "1vw", padding: "5px", width: "300px" }}
      />
      <h3 className="h3-new-tour">About the Tour</h3>
      <textarea
        className="custom-textbox-about-tour"
        placeholder="Enter your text here..."
        value={aboutTour}
        onChange={(e) => setAboutTour(e.target.value)}
      ></textarea>

      <h3 className="h3-new-tour">What's Included</h3>
      <textarea
        className="custom-textbox-about-tour"
        placeholder="Enter your text here..."
        value={included}
        onChange={(e) => setIncluded(e.target.value)}
      ></textarea>
    </div>
  </div>

  <div className="second-container-new-tour">
    <div className="itinerary-panel">
      <h3 className="h3-new-tour">Itinerary</h3>

      {itinerary.map((section, index) => (
        <div key={index} style={{ marginBottom: "20px" }}>
          <h3 className="h3-new-tour">Day {section.day}</h3>
          <input
            className="key-value-input-heading"
            type="text"
            value={section.heading}
            onChange={(event) => handleChangeDay(index, "heading", event)}
            placeholder="Heading"
            style={{ marginRight: "1vw", padding: "5px", width: "300px" }}
          />
          <br />
          <textarea
            className="custom-textbox-about-tour"
            value={section.content}
            onChange={(event) => handleChangeDay(index, "content", event)}
            placeholder="Content"
            rows="4"
            cols="50"
            style={{ marginTop: "10px", padding: "5px" }}
          />
        </div>
      ))}

      <button className="add-button" onClick={addDaySection}>
        Add Day +{" "}
      </button>
    </div>

    <div className="gallery-new-tour">
      <h3 className="h3-new-tour">Gallery Image</h3>
      <div className="image-upload">
        {selectedTour ? "Only available when new tour is added":
                  <div className="image-upload-content">
                  <h3>Image Upload</h3>
        
                  {/* Display image previews */}
                  <div className="image-upload-preview">
                    {previews.map((preview, index) => (
                      <div key={index} className="image-preview-wrapper">
                        <img
                          src={preview}
                          alt="Selected"
                          className="image-preview"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(index)}
                          className="remove-image-button"
                        >
                          X
                        </button>
                      </div>
                    ))}
                  </div>
        
                  {/* Image input field (hidden) */}
                  <input
                    className="key-value-input-heading-image"
                    name="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    id="imageInput"
                  />
        
                  {/* + Button to add more images */}
                  {images.length < 8 && (
                    <label htmlFor="imageInput" className="add-image-button">
                      +
                    </label>
                  )}
        
                  {/* Minimum one image is necessary */}
                  {images.length === 0 && (
                    <p className="error-message">At least one image is required.</p>
                  )}
                </div>
        }

      </div>
    </div>
  </div>

  <div className="submit-button-new-tour" onClick={handleSubmit}>
    {selectedTour ? "Update Tour" : "Create New Tour"}
  </div>
</div>
  );
}

export default NewTour;