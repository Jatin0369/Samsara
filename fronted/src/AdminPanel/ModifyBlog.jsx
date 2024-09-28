// import React from 'react'
import React, { useState, useEffect } from "react";
import './ModifyBlog.css'
import axios from "axios";
import baseUrl from "../baseUrl";

const UpdateBlogForm = ({ blog, setSelectedBlog, refreshBlogs }) => {
    const [formData, setFormData] = useState({
      blogHeading: blog.blogHeading,
      blogContent: blog.blogContent,
      youtubeLink: blog.ytLink,
      writtenBy: blog.writtenBy,
      selectedImage: blog.imageUrl,
      dateCreated: blog.dateCreated,
    });
    // const photoUrl = `http://localhost:5000/uploads/${selectedImage}`;
    // Handle input field changes
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    };
    
    useEffect(() => {
        if (blog) {
          setFormData({
            blogHeading: blog.blogHeading || '',
            blogContent: blog.blogContent || '',
            youtubeLink: blog.ytLink || '',
            writtenBy: blog.writtenBy || '',
            selectedImage: null, // Reset image, or use `blog.selectedImage` if you want to show the current image
            dateCreated: blog.dateCreated || '',
          });
        }
      }, [blog]);

    // Handle form submission
    const handleSubmit = (e) => {
      e.preventDefault();
      axios.put(`${baseUrl}/api/blog/updateblog${blog._id}`, formData)
        .then(() => {
          alert('Blog updated successfully!');
          setSelectedBlog(null); // Optionally, reset the form after update
          refreshBlogs(); // Refresh the blog list after update
        })
        .catch((error) => console.error("Error updating blog:", error));
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <h2>Update Blog</h2>
  
        <label className="label-update-blog">Blog Title:</label>
        <input
          type="text"
          name="blogHeading"
          value={formData.blogHeading}
          onChange={handleChange}
          className="input-update-blog"
        />
  
        <label className="label-update-blog">Blog Content:</label>
        <textarea
          name="blogContent"
          value={formData.blogContent}
          onChange={handleChange}
          className="input-update-blog"
        ></textarea>
  
        <label className="label-update-blog">YouTube Link:</label>
        <input
          type="text"
          name="youtubeLink"
          value={formData.youtubeLink}
          onChange={handleChange}
          className="input-update-blog"
        />
  
        <label className="label-update-blog">Author:</label>
        <input
          type="text"
          name="writtenBy"
          value={formData.writtenBy}
          onChange={handleChange}
          className="input-update-blog"
        />
  
        <label className="label-update-blog">Date Created:</label>
        <input
          type="text"
          name="dateCreated"
          value={formData.dateCreated}
          onChange={handleChange}
          className="input-update-blog"
        />
  
        <label className="label-update-blog">Image:</label>
        <input
          type="file"
          name="selectedImage"
        //   value={photoUrl}
          onChange={(e) => setFormData({ ...formData, selectedImage: e.target.files[0] })}
          className="input-update-blog"
        />
        {/* {photoUrl && (
          <div>
            <h3>Image Preview:</h3>
            <img
              src={photoUrl}
              alt="Selected"
              style={{ width: "150px", height: "200px", objectFit: "contain" }}
            />
          </div>
        )} */}
  
        <button type="submit">Update Blog</button>
      </form>
    );
  };
  
  
function ModifyBlog() {

      // Fetch blogs from backend when component mounts
      const [blogs, setBlogs] = useState([]);
      const [selectedBlog, setSelectedBlog] = useState(null);

      useEffect(() => {
        const fetchBlogs = async () => {
          try {
            const response = await axios.get(`${baseUrl}/api/blog/getallblogs`);  // Your API endpoint
            setBlogs(response.data);
            // console.log(response.data)
          } catch (error) {
            setError('Error fetching blogs');
          } finally {
            setLoading(false);
          }
        };
    
        fetchBlogs();
      }, []);
    
      const fetchBlogs = async () => {
        try {
          const response = await axios.get(`${baseUrl}/api/blog/getallblogs`);
          setBlogs(response.data);
        } catch (error) {
          setError('Error fetching blogs');
        }
      };
 
  const handleUpdateClick = (blog) => {
    setSelectedBlog(blog); // Set the selected blog data for update
    // console.log(selectedBlog);
  };

    const handleDelete = async (blogId) => {
        try {
          const response = await axios.delete(`${baseUrl}/api/blog/deleteblog${blogId}`);
        //   console.log(response)
          if (response.data.success) {
            // Fetch updated blog list after deletion
            fetchBlogs();
            alert('Blog deleted successfully!');
          } else {
            alert('Error deleting blog');
          }
        } catch (error) {
          console.error('Error deleting blog:', error);
          alert('Error deleting blog');
        }
      };

  return (
    // <div>ModifyBlog</div>
    
    <div className="outermost-container-blog">
    <div className="table-view-blog">
    <div>
      <h1>Blog List</h1>
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>Serial No.</th>
            <th>Blog Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog, index) => (
            <tr key={blog._id}>
              <td>{index + 1}</td>
              <td>{blog.blogHeading}</td>
              <td>
                <button onClick={() => handleUpdateClick(blog)}>Update</button>
                <button onClick={() => handleDelete(blog._id)} style={{ marginLeft: '10px' }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
    <div className="new-modify-blog-outer">
    {selectedBlog ? (
          <UpdateBlogForm blog={selectedBlog} setSelectedBlog={setSelectedBlog} refreshBlogs={fetchBlogs} />
        ) : (
          <p>Select a blog to update</p>
        )}
    </div>
    </div>
    
  )
}

export default ModifyBlog