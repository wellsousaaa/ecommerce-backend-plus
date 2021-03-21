const multer = require("multer");

const getType = (mimetype) => {
  return mimetype === "image/jpeg" ? ".jpg" : "image/png" ? ".png" : ".webp";
};

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./uploads");
  },
  filename: function (req, file, callback) {
    callback(
      null,
      file.fieldname +
        "-" +
        Math.random().toString().replace("0.", "") +
        Date.now() +
        getType(file.mimetype)
    );
  },
});

const upload = multer({ storage });

module.exports = upload;
