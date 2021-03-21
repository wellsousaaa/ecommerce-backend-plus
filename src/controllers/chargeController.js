const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const { Product } = require("../models");

async function purchaseCharge(req, res) {
  try {
    const { itemsId, id, receipt_email } = req.body;

    console.log({ itemsId, id, receipt_email });

    const ProductList = await Product.findAll({
      where: {
        id: itemsId,
      },
    });

    let amount = 0;

    ProductList.map((product) => {
      amount += product.price * 100;
    });

    // const charge = await stripe.paymentIntents.create({
    //   amount: 0,
    //   currency: "BRL",
    //   payment_method: id,
    //   description: "Teste",
    //   confirm: true,
    // });

    const charge = true;

    if (!charge)
      return res.json({ message: "charge unsucessful", success: false });

    return res
      .status(200)
      .json({ success: true, charge, message: "charge posted sucessful" });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

module.exports = purchaseCharge;
