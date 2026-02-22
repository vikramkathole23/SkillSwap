
export const UploadMulterFile = (req, res, next) => {
  try {
    if (!req.file) return next();

    const isImage = req.file.mimetype.startsWith("image/");
    const isPDF = req.file.mimetype === "application/pdf";

    req.body.file = {
      url: req.file.path,        // Cloudinary secure_url
      filename: req.file.filename,
      resourceType: req.file.mimetype,
      format: isImage ? "image" : isPDF ? "pdf" : "file",
    };

    next();
  } catch (error) {
    console.log(error);
    res.status(500).json("File processing error");
  }
};