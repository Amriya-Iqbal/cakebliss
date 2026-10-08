const express = require("express");
const router = express.Router();
const stripe = require("../config/stripe");
const Order = require("../models/Order");

router.post("/create-payment-intent", async (req, res) => {
  try {
    const {
      user,
      cake,
      customization,
      quantity,
      totalPrice,
      deliveryAddress,
      deliveryDate
    } = req.body;

    // Create order first (Pending)
    const order = new Order({
      user,
      cake,
      customization,
      quantity,
      totalPrice,
      deliveryAddress,
      deliveryDate,
      paymentStatus: "Pending"
    });

    await order.save();

    // Create Stripe payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalPrice * 100,
      currency: "lkr"
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
      orderId: order._id
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/confirm-payment", async (req, res) => {
  try {
    const { orderId, paymentIntentId } = req.body;

    const order = await Order.findByIdAndUpdate(
      orderId,
      {
        paymentStatus: "Paid",
        stripePaymentId: paymentIntentId
      },
      { new: true }
    );

    res.json({
      message: "Payment confirmed successfully",
      order
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;