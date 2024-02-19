import {v2 as cloudinary} from "cloudinary"
import fs from "fs";


cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUD_KEY, 
    api_secret: process.env.CLOUD_KEY_SECRET 
  });



const uploadImage = async (req, res, next) => {
  try {
      if (!req.file) {
          return res.status(400).json({ error: 'No image uploaded' });
      }

      const result = await cloudinary.uploader.upload(req.file.path);
      req.imageURL = result.secure_url;
      fs.unlinkSync(req.file.path)
      next();
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Image upload failed' });
  }
};

export {uploadImage}