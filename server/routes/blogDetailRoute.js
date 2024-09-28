const express = require('express');
const router = express.Router();
const upload = require('../config/multerConfig');
const blogdetailController = require('../contollers/blogdetailContoller');

router.post('/createblog', upload.single('image'), blogdetailController.createblog);
router.get('/getallblogs', blogdetailController.getAllBlogs);
router.get('/blogdetail/:id', blogdetailController.getBlogById);
router.put('/updateblog:id', blogdetailController.updateBlog);
router.delete('/deleteblog:id', blogdetailController.deleteBlog);

module.exports = router;
