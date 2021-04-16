const router = require('express').Router();
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');
let path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, '../frontend/public/images_uploads/');
  },
  filename: function(req, file, cb) {   
      cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
  }
});
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ['application/pdf'];
  if(allowedFileTypes.includes(file.mimetype)) {
    req.isAdded = true;
      cb(null, true);
  } else {
      req.isAdded = false;
      cb(null, false);
  }
} 
let upload = multer({ storage, fileFilter });

router.route('/add').post(upload.single('file'), (req, res) => {
    const fileName = req.file.filename;
    if(req.isAdded){
      res.json({uploaded:true, fileName: fileName});
    }else{
      res.json({uploaded:false});
    }
    
});
router.route('/delete').post((req, res) => {
  const fileName = req.body.fileName;
  const filePath = '../frontend/public/images_uploads/'+fileName; 
  fs.unlinkSync(filePath);
  res.json("Image Removed");
  
});
//for getting the image, you can access the image by its source directly from html


module.exports = router;