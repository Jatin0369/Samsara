const BlogDetail = require('../models/blogdetail'); // Import the model correctly
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

// Create a new blog with a single image upload
exports.createblog = async (req, res) => {
    try {
        // Check if a file is uploaded
        if (!req.file) {
            return res.status(400).json({ success: false, error: 'No image was uploaded' });
        }
        const inputPath = req.file.path;
        const outputPath = path.join('uploads', 'compressed-' + req.file.filename);

        await sharp(inputPath)
        .resize({ 
            width: 1500, 
            height: 1500, 
            fit: 'inside',  // Maintain aspect ratio without cropping
            background: { r: 0, g: 0, b: 0, alpha: 0 } // Ensure transparent background
        })
        .webp({ compressionLevel: 9,quality: 80})
        // .jpeg({ quality: 80 }) // Compress JPEG image to 80% quality
        .toFile(outputPath);

        fs.unlinkSync(inputPath);
        
        // Create a new blog with the provided data and the uploaded image URL
        const newBlog = new BlogDetail({
            blogHeading: req.body.blogHeading,
            blogContent: req.body.blogContent,
            imageUrl: outputPath, // Save the image URL
            dateCreated: req.body.dateCreated,
            writtenBy: req.body.writtenBy,
            ytLink: req.body.youtubeLink
        });

        // Save the new blog to the database
        await newBlog.save();
        res.status(201).json({ success: true, blog: newBlog, imageSize: (fs.statSync(outputPath).size / (1024 * 1024)).toFixed(2) });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.getAllBlogs = async (req, res) => {
    try {
        const blogs = await BlogDetail.find();
        res.status(200).json(blogs);
    } catch (error) {
        console.error('Error fetching blogs:', error);  // Log the error for debugging
        res.status(500).json({ error: 'Error fetching blogs' });
    }
};
exports.getBlogById = async (req, res) => {
    try {
      const blog = await BlogDetail.findById(req.params.id);
      console.log(blog)
      if (!blog) {
        return res.status(404).json({ success: false, error: 'Blog not found' });
      }
      res.status(200).json({ success: true, blog });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };
  
exports.updateBlog = async (req, res) => {
    const { id } = req.params;  // Get the blog ID from the URL
    const updateData = req.body; // Get the updated data from the request body
  
    try {
      const updatedBlog = await BlogDetail.findByIdAndUpdate(id, updateData, { new: true });
      res.status(200).json(updatedBlog);
    } catch (error) {
      console.error('Error updating blog:', error);
      res.status(500).json({ error: 'Failed to update blog' });
    }
  };

  exports.deleteBlog = async (req, res) => {
    try {
        const blogId = req.params.id;
        // console.log(blogId);
        
        const blog = await BlogDetail.findById(blogId);
        // console.log(blog);
        
        if (!blog) {
            return res.status(404).json({ success: false, error: 'Blog not found' });
        }

        // Delete the image file associated with the blog
        const imgUrl = blog.imageUrl; // Assuming imageUrl is a string with the image path
        if (imgUrl) {
            const imagePath = path.join(__dirname, '..', imgUrl); // Adjust path as needed
            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.error(`Failed to delete image: ${imgUrl}`, err);
                }
            });
        }

        // Delete the blog from the database
        await BlogDetail.findByIdAndDelete(blogId);

        res.status(200).json({ success: true, message: 'Blog deleted successfully' });
    } catch (error) {
        console.error('Error deleting blog:', error);
        res.status(500).json({ success: false, error: 'Error deleting blog' });
    }
};
