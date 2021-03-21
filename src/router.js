const router = require("express").Router();
const userController = require("./controllers/userController");
const productController = require("./controllers/productController");
const chargeController = require("./controllers/chargeController");
const path = require("path");

router.use("/users", userController);
router.use("/products", productController);
router.use("/purchase", chargeController);

router.get("/media/:file", (req, res) => {
  const filePath = path.resolve(__dirname, "..", "uploads/" + req.params.file);
  console.log(filePath);
  return res.sendFile(filePath);
});

module.exports = router;
