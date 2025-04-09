
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import { Stripe } from "stripe"


// gloabal variables
const currency = 'inr'
const deliveryCharges = 10;

// gateway initialize 
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

const webhook = async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;
  
    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
      console.log("Webhook signature verification failed:", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }
  
    // Handle the event
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
  
      const orderId = session.metadata.orderId;
  
      try {
        await orderModel.findByIdAndUpdate(orderId, { payment: true });
        console.log(`✅ Order ${orderId} payment confirmed.`);
      } catch (err) {
        console.error("❌ Error updating order:", err.message);
      }
    }
  
    res.status(200).json({ received: true });
  };
export { webhook };


// using COD
const placeOrder = async (req,res) => {
    try {
        
        const { userId, items, amount, address} = req.body;

        const OrderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: 'COD',
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(OrderData)
        await newOrder.save()

        await userModel.findByIdAndUpdate(userId,{cartData:{}})

        res.json({success: true, message:"Order Placed"} )



    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
        
    }

}

// using Stripe
const placeOrderStripe = async (req,res) => {

    try {
        
        const { userId, items, amount, address, } = req.body
        const { origin} = req.headers;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod:"Stripe",
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save();

        const line_items = items.map((item) => ({
            price_data : {
                currency: currency,
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }))

        line_items.push({
            price_data : {
                currency: currency,
                product_data: {
                    name: 'Delivery Charges'
                },
                unit_amount: deliveryCharges * 100
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode: 'payment', 
            metadata: {
                orderId: newOrder._id.toString(), // Needed for webhook to identify
              }           
        })

        res.json({success:true, session_url:session.url});

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }

}

// verify stripe
const verifyStripe = async (req, res) => {
    const { orderId, userId } = req.body;

    try {
        const order = await orderModel.findById(orderId);
        if (!order) return res.json({ success: false, message: "Order not found" });

        if (order.payment) {
            await userModel.findByIdAndUpdate(userId, { cartData: {} });
            res.json({ success: true });
        } else {
            res.json({ success: false, message: "Payment not confirmed yet" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};



// using Razorpay
const placeOrderRazorpay = async (req,res) => {

}

// All order data for admin panel
const allOrders = async (req,res) => {
    try {

        const orders = await orderModel.find({})
        res.json({success: true, orders})
        
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
        
    }

}


// user order data for Frontend
const userOrders = async (req,res) => {
    try {
        
        const { userId } = req.body

        const orders = await orderModel.find({ userId, payment: true })
        res.json({success:true, orders})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}


// update order details from admin panel
const updateStatus = async (req,res) => {
    try {
    
        const { orderId, status} = req.body

        await orderModel.findByIdAndUpdate(orderId, {status})
        res.json({success: true, message:"Status Updated"})
        
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}


export { placeOrder, placeOrderStripe, verifyStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus}