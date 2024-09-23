import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";



//@route    /api/orders/
//@desc     post create a new order
//@access   protected
export const createOrder = asyncHandler(async (req, res) => {
    const order = new Order({ ...req.body, user: req.user._id })
    const newOrder = await order.save()
    return res.status(200).json({
        success: true,
        data: newOrder
    });
})

//@route    /api/orders/myorders
//@desc     GET get my orders
//@access   protected
export const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id })
    return res.status(200).json({
        success: true,
        data: orders
    });
})

//@route    /api/orders/myorders/:id
//@desc     GET get one of my order details
//@access   protected
export const getMyOrder = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'id name email')
    return res.status(200).json({
        success: true,
        data: order
    });
})

//@route    /api/orders/myorders/:id/pay
//@desc     put update order to paid
//@access   protected
export const updateOrderToPaid = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    order.isPaid = true;
    order.paidAt = Date.now();
    // order.paymentResult = {
    //     id:req.body.id,
    //     status:req.body.status,
    //     update_time:req.body.update_time,
    //     email_address:req.body.payer.email_address,
    // }

    const updatedOrder = await order.save();
    return res.status(200).json({
        success: true,
        data: updatedOrder
    });
})


//@route    /api/orders/
//@desc     GET all  orders
//@access   protected/Admin
export const getAllOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate('user', 'id name')
    return res.status(200).json({
        success: true,
        data: orders
    });
})

//@route    /api/orders/:id/mark-as-delivered
//@desc     GET     update order to delivered
//@access   protected/Admin
export const updateOrderToDelivered = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    
    const updatedOrder = await order.save();
    return res.status(200).json({
        success: true,
        data: updatedOrder
    });
})


