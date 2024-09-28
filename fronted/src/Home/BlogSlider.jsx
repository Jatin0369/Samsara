import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './BlogSlider.css'
import a from './right-arrow.png'
import m from './mountains.webp'
import axios from "axios";
import { Link } from "react-router-dom";


function BlogSlider() {

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <img className={className}
      onClick={onClick}
      src={a}></img>
    );
  }
  
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <img className={className}
      style={{transform: 'scaleX(-1)'}}
      onClick={onClick}
      src={a}></img>
   
    );
  }
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };
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
    <div className="blog-slider-container-outermost">
      <Slider {...settings}>
        {/* <div className="card">
          <img className='blog-pic' src={m} alt=""></img>
          <p>31st Feb, 2069 | John Hulk</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia placeat veritatis similique corrupti minima deserunt distinctio, accusantium porro delectus provident.</p>
        </div> */}
        {blogs.map((blog) => (
        <div className="card" key={blog._id}>
          <Link to={`/blogdetail/${blog._id}`} className="no-underline">
          {/* <img className="blog-page-pic" src={`http://localhost:5000/${blog.imageUrl}`} alt="Blog Pic" /> */}
          {blog.imageUrl ? (
                    <img
                      className="blog-pic"
                      src={`http://localhost:5000/${blog.imageUrl}`}
                      alt='img'
                    />
                  ) : (
                    <img className="blog-pic" src="path/to/default/image.jpg" alt="default tour" />
                  )}
          <p>
            {blog.dateCreated} | {blog.writtenBy}
          </p>
          <p>{blog.blogHeading}</p>
        </Link>
        </div>
      ))}
  
      </Slider>
      </div>
  );
}

export default BlogSlider;
