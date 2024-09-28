import React, { useEffect, useState } from "react";
import Bg from "../Bg/Bg";
import m from "../Home/mountains.webp";
import "./BlogDetails.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import baseUrl from "../baseUrl";

function BlogDetails() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [embedUrl, setEmbedUrl] = useState("");
  const [sideblogs, setSideBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to extract YouTube video ID
  const extractVideoId = (url) => {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|embed|shorts|watch)\?v=|[^\/\n\s]+\/[^\/\n\s]+)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  // Fetch blog details by ID
  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/api/blog/blogdetail/${id}`
        );
        const blogData = response.data.blog;
        setBlog(blogData); // Set the blog state with the fetched data

        // Extract and set the YouTube embed URL
        if (blogData.ytLink) {
          const videoId = extractVideoId(blogData.ytLink);
          if (videoId) {
            setEmbedUrl(`https://www.youtube.com/embed/${videoId}`);
          }
        }
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchBlogDetails();
  }, [id]); // Effect depends on 'id' and re-runs when 'id' changes

  // Fetch side blogs once (when the component is mounted)
  useEffect(() => {
    const fetchSideBlogs = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/api/blog/getallblogs`
        );
        setSideBlogs(response.data); // Set the blogs data
      } catch (err) {
        setError("Error fetching blogs. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false); // Set loading to false once data is fetched or error occurs
      }
    };

    fetchSideBlogs();
  }, []); // Empty dependency array ensures this effect runs only once

  // Handle loading state
  if (loading) {
    return <p>Loading blogs...</p>;
  }

  // Handle error state
  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <Bg heading={blog?.blogHeading} />
      <div className="blog-details">
        <div className="content-post">
          <img className="cover-photo-blog-details" src={m} alt="image " />
          <p className="short-detail">
            {blog?.dateCreated} | {blog?.writtenBy}
          </p>
          <h3 className="blog-content-heading">{blog?.blogHeading}</h3>
          <p className="blog-content-detail">{blog?.blogContent}</p>

          {/* Display YouTube video if embedUrl is available */}
          {embedUrl && (
            <div className="video-container">
              <iframe
                src={embedUrl}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}
        </div>
        <div className="side-more-post">
          <h3 className="side-more-heading">Read our latest explorations</h3>
          {sideblogs
          .sort(() => Math.random() - 0.5) // Shuffle the array randomly
          .slice(0, 5) // Select the first 5 items after shuffling
          .map((blog) => (
            <div className="side-blog-news" key={blog._id}>
              <img
                className="blog-detail-page-pic"
                src={`${baseUrl}/${blog.imageUrl}`}
                alt="Blog Pic"
              />
              <div className="side-blog-news-content">
                <p className="side-blog-news-brief">{blog.blogContent}</p>
                <p className="side-blog-news-date">
                  {blog.dateCreated} | {blog.writtenBy}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default BlogDetails;
