const sequelize = require('../sequelize');
const OrderDetails = require('../models/orderDetails');
const getHistory = (req, res) => {

  sequelize.query(
    `SELECT 
        OrderDetails.*, 
        Products.image, 
        Products.productName
     FROM 
        OrderDetails
     INNER JOIN 
        Products 
     ON 
        OrderDetails.productId = Products.productId
     WHERE 
        OrderDetails.orderId IN (
          SELECT
            Orders.id
          FROM 
            Orders
          WHERE 
            Orders.userId = :userId )`,
    {
      replacements: { userId: req.params.id },
      type: sequelize.QueryTypes.SELECT
    }
  )
  .then(result => {
    res.json(result);
  })
  .catch(err => {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while fetching the order details.' });
  });
};

module.exports = { getHistory};
