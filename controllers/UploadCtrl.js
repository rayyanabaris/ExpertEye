const { S3Client,GetObjectCommand } = require("@aws-sdk/client-s3");
const { Upload } = require("@aws-sdk/lib-storage");
const fs = require("fs");
const path = require("path");
const { Readable } = require("stream");

const s3Client = new S3Client({
  region: "eu-north-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEYS,
    secretAccessKey: process.env.AWS_SECRET_KEYS,
  },
});

// Assuming the uploads directory is in the root of your project.
const uploadDir = path.join(__dirname, "../uploads");

// Ensure that the uploads directory exists.
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Utility function to upload a file using Upload from @aws-sdk/lib-storage
async function putObjectUrl(filename, contentType, file) {
  const fileStream = fs.createReadStream(file);
  const uploadParams = {
    client: s3Client,
    params: {
      Bucket: "myexperteyebucket",
      Key: filename,
      Body: fileStream,
      ContentType: contentType,
    },
  };

  const upload = new Upload(uploadParams);

  try {
    const data = await upload.done();
    console.log(data, "Upload successful");
    return data;
  } catch (err) {
    console.error("Upload failed", err);
    throw new Error("File upload failed");
  }
}

// Handle single image upload
const addImage1 = async (req, res, next) => {
  try {
    const filePath = path.join(uploadDir, req.file.filename);
    console.log("Uploading file:", filePath);

    // Ensure the file exists before uploading
    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`);
    }

    await putObjectUrl(req.file.filename, req.file.mimetype, filePath);

    // Clean up local file after upload
    fs.unlink(filePath, (err) => {
      if (err) console.error("Error deleting file", err);
    });

    res.json({ url: req.file.filename });
  } catch (error) {
    console.error("Upload error", error);
    // Ensure the file is deleted even after an error
    fs.unlink(path.join(uploadDir, req.file.filename), () => {});
    res.status(402).json({ message: error.message });
  }
};

// Handle multiple images upload
const addMultiImages = async (req, res, next) => {
  try {
    const uploadPromises = req.files.map(async (file) => {
      const filePath = path.join(uploadDir, file.filename);
      console.log("Uploading file:", filePath);

      // Ensure the file exists before uploading
      if (!fs.existsSync(filePath)) {
        throw new Error(`File not found: ${filePath}`);
      }

      await putObjectUrl(file.filename, file.mimetype, filePath);

      // Clean up local file after upload
      fs.unlink(filePath, (err) => { if (err) console.error("Error deleting file", err); });

      return file.filename;
    });

    const uploadedFiles = await Promise.all(uploadPromises);

    res.json({ urls: uploadedFiles });
  } catch (error) {
    console.error("Upload error", error);
    req.files.forEach((file) => {
      fs.unlink(path.join(uploadDir, file.filename), () => {});
    });
    res.status(402).json({ message: error.message });
  }
};

async function getObjectUrl(key) {
  const command = new GetObjectCommand({
    Bucket: "myexperteyebucket",
    Key: key,
  });
  const url = await s3Client.send(command);
  //  console.log(url);
  //  const url = getSignedUrl(s3Client, command, { expiresIn: 60 * 60 * 24 * 7 });
  return url.Body;
}

// Download document
const downloadDoc = async (req, res) => {
  const { filename } = req.params;
  try {
    const url = await getObjectUrl(filename); // Assuming `getObjectUrl` is defined elsewhere
    const pdfStream = Readable.from(url);
    pdfStream.pipe(res);
  } catch (error) {
    console.error("Error downloading document", error);
    res.status(500).json({ message: "Failed to download file" });
  }
};

// Stream video
const streamVideo = async (req, res) => {
  const { filename } = req.params;
  try {
    const data = await getVideoUrl(filename); // Assuming `getVideoUrl` is defined elsewhere
    if (!data || !data.Body) {
      throw new Error("No data returned from S3");
    }

    const { Body, ContentType } = data;

    res.writeHead(200, {
      "Content-Type": ContentType,
    });

    Body.pipe(res);
  } catch (error) {
    console.error("Error streaming video", error);
    res.status(500).json({ message: "Failed to stream file" });
  }
};

module.exports = {
  addImage1,
  addMultiImages,
  downloadDoc,
  streamVideo,
};
