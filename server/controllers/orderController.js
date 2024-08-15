const Order = require('../models/order');
const OrderDetails = require('../models/orderDetails');
const sequelize = require('../sequelize');

exports.checkout = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const { cartItems, customerInfo } = req.body;

    if (!cartItems || cartItems.length === 0) {
      throw new Error('Cart is empty.');
    }

    const totalSum = cartItems.reduce((sum, item) => sum + item.total, 0);

    const orderData = {
      name: customerInfo.name,
      email: customerInfo.email,
      contact: customerInfo.contact,
      total: totalSum,
      shippingAddress: customerInfo.address,
    };

    const createdOrder = await Order.create(orderData, { transaction });

    const createdOrderId = createdOrder.dataValues?.id;

    const orderDetailsArray = cartItems.map(item => ({
      orderId: createdOrderId,
      productId: item.productId,
      unitPrice: item.price,
      quantity: item.quantity,
      subTotal: item.total
    }));

    const createdEntries = await OrderDetails.bulkCreate(orderDetailsArray, { transaction });

    await transaction.commit();

    res.send({
      success: true,
      data: {
        orderDetails: createdEntries,
        order: createdOrder
      },
      message: 'Order placed successfully!'
    });
  } catch (error) {
    await transaction.rollback();
    res.send({
      success: false,
      message: error.message
    });
    console.log(error);
  }
};
