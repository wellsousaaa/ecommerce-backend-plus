module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("Product", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DOUBLE(10, 2),
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    categories: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        return this.getDataValue("categories").split("-");
      },
    },
    discount: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        return this.getDataValue("image").split("&");
      },
    },
  });
  return Product;
};
