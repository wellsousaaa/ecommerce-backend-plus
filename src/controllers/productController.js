const Op = require("sequelize").Op;
const { Product, sequelize } = require("../models");
const router = require("express").Router();
const upload = require("../middlewares/multer");

const pagination = (sequelizeResult, page, limit, url) => ({
  page: page,
  limit: limit,
  next:
    sequelizeResult.count > page * limit
      ? `${url}?n=${limit}&page=${page + 1}`
      : null,
  total: sequelizeResult.count,
  data: sequelizeResult.rows,
});

router.get("/", async (req, res) => {
  const limit = parseInt(req.query.n) || 16;
  const page = parseInt(req.query.page) || 1;
  const random = req.query.random || false;
  let tags = req.query.tags ? `${req.query.tags}` : "";

  console.log({ limit, random });

  tags = tags ? tags.split("-") : [];
  console.log(tags);

  let Products = await Product.findAndCountAll({
    order: random ? [[sequelize.fn("RAND")]] : [["id", "DESC"]],
    limit: limit,
    offset: limit * (page - 1),
    where:
      tags.length !== 0
        ? {
            quantity: { [Op.gt]: 0 },
            categories: { [Op.regexp]: `(${tags.join("|")})` },
          }
        : {
            quantity: { [Op.gt]: 0 },
          },
  });

  console.log(Products);

  res.json(pagination(Products, page, limit, req.baseUrl));
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  let idProduct = await Product.findOne({ where: { id } });

  if (!idProduct)
    return res.status(404).json({ error: "This product does not exist" });

  return res.json(idProduct);
});

router.post("/", upload.array("files", 3), async (req, res) => {
  let image = req.files.map((img) => img.filename);
  image = image.join("&");

  req.body.image = image;

  const newProduct = await Product.create({
    ...req.body,
  });

  return res.json(newProduct);
});

module.exports = router;
