const express = require('express');
const router = express.Router();
const upload = require('../config/multerConfig');

const newtourController = require('../contollers/newtourController')
// router.post('/createnewtour', upload.array('image', 8), newtourController.createnewtour);
router.post('/createnewtour', upload.array('image', 8), newtourController.createnewtour);

// Get all tours
router.get('/tours', newtourController.getTours);

// Get single tour by ID
router.get('/tours/:id', newtourController.getTourById);

// Update tour by ID
router.put('/updatetour/:id', upload.array('image', 8), newtourController.updateTour);

// Delete tour by ID
router.delete('/tours/:id', newtourController.deleteTour);

// Add these two routes to your existing route file
// router.delete('/api/image/:imageName', newtourController.deleteImage);
// router.post('/api/remove-image-from-folder', newtourController.removeImageFromFolder);

module.exports = router;