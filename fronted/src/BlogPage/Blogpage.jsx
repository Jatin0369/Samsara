import React, { useState, useEffect } from "react";
import "./BlogPage.css";
import m from "../Home/mountains.webp";
import Bg from '../Bg/Bg'
import axios from 'axios'
import { Link } from "react-router-dom";
function Blogpage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

    // Fetch blogs on component mount
    useEffect(() => {
      const fetchBlogs = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/blog/getallblogs'); // Replace with your actual API URL
          setBlogs(response.data); // Set the blogs data
          console.log(response.data)
        } catch (err) {
          setError('Error fetching blogs. Please try again later.');
          console.error(err);
        } finally {
          setLoading(false); // Set loading to false once data is fetched or error occurs
        }
      };
  
      fetchBlogs();
    }, []); // Empty dependency array ensures this effect runs only once
  
    if (loading) {
      return <p>Loading blogs...</p>;
    }
  
    if (error) {
      return <p>{error}</p>;
    }


  return (
    <div className="blog-page-container">
      {/* <h2>Read about our latest adventures</h2> */}
      <Bg heading='Read about our latest adventures' />
      <div className="blog-page-inside-container">
      {blogs.map((blog) => (
        <div className="card-blog-page" key={blog._id}>
          <Link to={`/blogdetail/${blog._id}`} className="no-underline">
          {/* <img className="blog-page-pic" src={`http://localhost:5000/${blog.imageUrl}`} alt="Blog Pic" /> */}
          {blog.imageUrl ? (
                    <img
                      className="blog-page-pic"
                      src={`http://localhost:5000/${blog.imageUrl}`}
                      alt='img'
                    />
                  ) : (
                    <img className="tour-pic" src="path/to/default/image.jpg" alt="default tour" />
                  )}
          <p>
            {blog.dateCreated} | {blog.writtenBy}
          </p>
          <p>{blog.blogHeading}</p>
        </Link>
        </div>
      ))}
      </div>
    </div>
  );
}

export default Blogpage;
