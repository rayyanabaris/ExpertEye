const cloudinary = require("cloudinary");
const fs = require("fs");

const cloudinaryUpload = async (fileToUploads) => {

  if(false) {
    // await cloudinary.config({
    //   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    //   api_key: process.env.CLOUDINARY_API_KEY,
    //   api_secret: process.env.CLOUDINARY_API_SECRET,
    // });  
  }
  else {
    await cloudinary.config({      
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });    
  }
  
  return new Promise(async (resolve) => {
    try {
      console.log(fileToUploads);
      await cloudinary.uploader.upload(fileToUploads, (result) => {
        resolve(
          {
            url: result?.secure_url,
            asset_id: result?.asset_id,
            public_id: result?.public_id,
          },
  /*         {
            resource_type: "auto",
          }
   */      );
      });
      fs.unlink(fileToUploads, (err) => {});  
    }
    catch(error) {
      console.log(error);
      return { message: error.message }
    }
  });
};

const cloudinaryDelete = async (fileToDelete) => {
  return new Promise((resolve) => {
    try {
      cloudinary.uploader.destroy(fileToDelete, (result) => {
        resolve(
          {
            url: result.secure_url,
            asset_id: result.asset_id,
            public_id: result.public_id,
          },
          {
            resource_type: "auto",
          }
        );
      });  
    }
    catch(error) {
      return { message: error }
    }
  });
};

module.exports = {cloudinaryUpload, cloudinaryDelete};
