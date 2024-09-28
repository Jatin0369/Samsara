const newTour = require('../models/newtour');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

// const multer = require('multer'); // Assuming you're using multer for file uploads

exports.createnewtour = async (req, res) => {
    try {
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ success: false, error: 'No images were uploaded' });
      }
  
      const compressedImageUrls = [];
      for (const file of req.files) {
        const inputPath = file.path;
        const outputPath = path.join('uploads', 'compressed-' + file.filename);
  
        await sharp(inputPath)
          .resize({
            width: 1500,
            height: 1500,
            fit: 'inside'
          })
          .webp({ compressionLevel: 9, quality: 80 })
          .toFile(outputPath);
  
        // Delete the original image
        fs.unlinkSync(inputPath);
  
        compressedImageUrls.push({
          imgkey: file.fieldname, // Ensure this matches your schema field
          value: outputPath
        });
      }
  
      const newTourDetail = new newTour({
        tourName: req.body.tourName,
        adultPrice: req.body.adultPrice,
        childPrice: req.body.childPrice,
        tourInfo: JSON.parse(req.body.tourInfo || '[]'),
        included: req.body.included,
        images: compressedImageUrls,
        aboutTour: req.body.aboutTour,
        itinerary: JSON.parse(req.body.itinerary || '[]')
      });
  
      await newTourDetail.save();
  
      res.status(201).json({
        success: true,
        tour: newTourDetail
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };

// controllers/tourController.js
// const newTour = require('../models/newtour');

exports.getTours = async (req, res) => {
  try {
    const { tourType, duration, destination } = req.query;

    // Initialize an empty object to hold query conditions
    let query = {};

    // Add individual conditions if the corresponding query parameters are provided
    if (tourType) {
      query["tourInfo"] = {
        ...query["tourInfo"], // Keep existing conditions if any
        $elemMatch: { key: "Type", value: tourType }
      };
    }

    if (duration) {
      query["tourInfo"] = {
        ...query["tourInfo"], // Keep existing conditions if any
        $elemMatch: { key: "Duration", value: duration }
      };
    }

    if (destination) {
      query["tourInfo"] = {
        ...query["tourInfo"], // Keep existing conditions if any
        $elemMatch: { key: "City", value: destination }
      };
    }

    // Fetch tours based on the constructed query (even if no filters are provided, it will return all tours)
    const tours = await newTour.find(query);

    res.status(200).json({ success: true, tours });
  } catch (error) {
    console.error('Error fetching tours:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};


  

  exports.getTourById = async (req, res) => {
    try {
      const tour = await newTour.findById(req.params.id);
      console.log(tour)
      if (!tour) {
        return res.status(404).json({ success: false, error: 'Tour not found' });
      }
      res.status(200).json({ success: true, tour });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };

  exports.updateTour = async (req, res) => {
    try {
      const tourId = req.params.id;
      const tour = await newTour.findById(tourId);
  
      if (!tour) {
        return res.status(404).json({ success: false, message: 'Tour not found' });
      }
      
      
      // Update tour fields
      tour.tourName = req.body.tourName;
      tour.included = req.body.included;
      tour.aboutTour = req.body.aboutTour;
      tour.adultPrice = req.body.adultPrice;
      tour.childPrice = req.body.childPrice;
      try {
        tour.tourInfo = JSON.parse(req.body.tourInfo);
        tour.itinerary = JSON.parse(req.body.itinerary);
      } catch (error) {
        console.error('Error parsing JSON:', error);
        // Handle the error, e.g. by returning a 400 error response
      }
      
      console.log(req.body.tourName);
      
      // Handle image updates
      const oldImageUrls = [...tour.images];
      const newImageUrls = [];
  
      if (req.files.image && req.files.image.length > 0) {
        req.files.image.forEach((file) => {
          const existingImageIndex = oldImageUrls.findIndex(oldImage => oldImage.imgkey === file.fieldname);
          if (existingImageIndex !== -1) {
            // Delete the old image
            const oldImagePath = path.join(__dirname, '..', oldImageUrls[existingImageIndex].value);
            fs.unlink(oldImagePath, (err) => {
              if (err) {
                console.error(err);
              }
            });
            // Replace the old image with the new one
            oldImageUrls[existingImageIndex] = {
              imgkey: file.fieldname,
              value: file.path,
            };
          } else {
            // Add the new image
            newImageUrls.push({
              imgkey: file.fieldname,
              value: file.path,
            });
          }
        });
      }
  
      // Update the tour images
      tour.images = [...oldImageUrls, ...newImageUrls];
  
      // Save the updated tour
      await tour.save();
  
      res.status(200).json({ success: true, tour: tour });
    } catch (error) {
      console.error('Error updating tour:', error);
      res.status(500).json({ error: 'Failed to update tour', lodu: req.body });
    }
  };

  // Delete a tour by ID
exports.deleteTour = async (req, res) => {
    try {
      const tour = await newTour.findByIdAndDelete(req.params.id);
  
      if (!tour) {
        return res.status(404).json({ success: false, error: 'Tour not found' });
      }
  
      // Optionally, delete the associated images from the file system
      for (const image of tour.images) {
        fs.unlink(image.value, (err) => {
          if (err) {
            console.error('Error deleting image:', err);
          }
        });
      }
  
      res.status(200).json({ success: true, message: 'Tour deleted successfully' });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };

//   exports.deleteImage = async (req, res) => {
//     const imageName = req.params.imageName;
//     const imagePath = path.join(__dirname, '..', imageName);
//     fs.unlink(imagePath, (err) => {
//       if (err) {
//         console.error(err);
//         res.status(404).send({ message: 'Image not found' });
//       } else {
//         res.send({ message: 'Image deleted successfully' });
//       }
//     });
//   };
  
//   exports.removeImageFromFolder = async (req, res) => {
//     const imageName = req.body.imageName;
//     const imagePath = path.join(__dirname, '..', imageName);
//     fs.unlink(imagePath, (err) => {
//       if (err) {
//         console.error(err);
//         res.status(404).send({ message: 'Image not found' });
//       } else {
//         res.send({ message: 'Image removed from folder successfully' });
//       }
//     });
//   };
