import { Stripe } from 'stripe';
import orderModel from '../models/orderModel.js';
import userModel from '../models/userModel.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const stripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature verification failed.', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    try {
      const userId = session.metadata.userId;
      const items = JSON.parse(session.metadata.items);
      const address = JSON.parse(session.metadata.address);
      const amount = parseFloat(session.metadata.amount);

      const newOrder = new orderModel({
        userId,
        items,
        address,
        amount,
        paymentMethod: 'Stripe',
        payment: true,
        date: Date.now()
      });

      await newOrder.save();
      await userModel.findByIdAndUpdate(userId, { cartData: {} });

      console.log("✅ Order created via Stripe Webhook");
      res.status(200).json({ received: true });
    } catch (err) {
      console.error("❌ Failed to create order:", err.message);
      res.status(500).send("Internal Server Error");
    }
  } else {
    res.status(400).end();
  }
};

export default stripeWebhook;
