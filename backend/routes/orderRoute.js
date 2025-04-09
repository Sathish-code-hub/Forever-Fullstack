import express from 'express'
import  { placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus, verifyStripe, webhook} from '../controllers/orderController.js'
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'
import stripeWebhook from '../controllers/stripeWebhook.js';


const orderRouter = express.Router()

// Admin features
orderRouter.post('/list', adminAuth, allOrders)
orderRouter.post('/status', adminAuth, updateStatus)

// payment features
orderRouter.post('/place', authUser, placeOrder)
orderRouter.post('/stripe', authUser, placeOrderStripe)
orderRouter.post('/razorpay', authUser, placeOrderRazorpay)
// orderRouter.post('/payment', paymentRoute)

// user feature
orderRouter.post('/userorders', authUser, userOrders)

// verify payment
orderRouter.post('/verifyStripe', authUser,verifyStripe)

// MUST use raw body middleware
orderRouter.post('/webhook',webhook);

export default orderRouter;