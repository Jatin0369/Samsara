import React, { useState } from "react";
import "./NewBlog.css";
import baseUrl from "../baseUrl";

function NewBlog() {
  // State for each form field
  const [blogHeading, setBlogHeading] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [youtubeLink, setYoutubeLink] = useState("");
  const [writtenBy, setWrittenBy] = useState("");
  const [dateCreated, setDateCreated] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Handle file selection
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);

      // Preview the image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create a FormData object to send data to the backend, including the image
    const formData = new FormData();
    formData.append("blogHeading", blogHeading);
    formData.append("blogContent", blogContent);
    formData.append("youtubeLink", youtubeLink);
    formData.append("writtenBy", writtenBy);
    formData.append("dateCreated", dateCreated);
    if (selectedImage) {
      formData.append("image", selectedImage);
    }

    try {
      const response = await fetch(`${baseUrl}/api/blog/createblog`, {
        method: 'POST',
        body: formData, // Send formData, not JSON
      });
      if(response.status == 200 || response.status == 201){
        alert("New Blog Created")
      }
      else{
        alert("Error creating new blog")
      }
      const result = await response.json();
      console.log('Response:', result);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="new-blog-outer">
      <div className="new-blog-info-box">
        <h3>Blog Heading</h3>
        <input
          className="key-value-input-heading"
          type="text"
          value={blogHeading}
          onChange={(e) => setBlogHeading(e.target.value)}
          placeholder="Heading"
          style={{ marginRight: "1vw", padding: "5px", width: "300px" }}
        />
        <br />
        <h3>Blog Content</h3>
        <textarea
          className="custom-textbox-about-tour"
          value={blogContent}
          onChange={(e) => setBlogContent(e.target.value)}
          placeholder="Content"
          rows="4"
          cols="50"
          style={{ marginTop: "10px", padding: "5px" }}
        />
        <h3>Image Upload</h3>
        <input
          className="key-value-input-heading"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
        {imagePreview && (
          <div>
            <h3>Image Preview:</h3>
            <img
              src={imagePreview}
              alt="Selected"
              style={{ width: "150px", height: "200px", objectFit: "contain" }}
            />
          </div>
        )}
        <h3>YouTube Link</h3>
        <input
          className="key-value-input-heading"
          type="text"
          value={youtubeLink}
          onChange={(e) => setYoutubeLink(e.target.value)}
          placeholder="YT Link"
          style={{ marginRight: "1vw", padding: "5px", width: "300px" }}
        />
        <h3>Written by</h3>
        <input
          className="key-value-input-heading"
          type="text"
          value={writtenBy}
          onChange={(e) => setWrittenBy(e.target.value)}
          placeholder="Written by"
          style={{ marginRight: "1vw", padding: "5px", width: "300px" }}
        />
        <h3>Date Created</h3>
        <input
          className="key-value-input-heading"
          type="text"
          value={dateCreated}
          onChange={(e) => setDateCreated(e.target.value)}
          placeholder="Date Created"
          style={{ marginRight: "1vw", padding: "5px", width: "300px" }}
        />
        <div type="submit" className="submit-button-new-blog" onClick={handleSubmit}>
          Submit
        </div>
      </div>
    </div>
  );
}

export default NewBlog;
