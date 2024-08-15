const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const Order = require('./order');
const Product = require('./product');

const OrderDetails = sequelize.define('OrderDetails', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  orderId: {
    type: DataTypes.INTEGER,
    references: {
      model: Order,
      key: 'id',
    },
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  },
  productId: {
    type: DataTypes.INTEGER,
    references: {
      model: Product,
      key: 'productId',  
    },
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  },
  unitPrice: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  quantity: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  subTotal: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  timestamps: true,
});

// Associations
Order.hasMany(OrderDetails, { foreignKey: 'orderId' });
OrderDetails.belongsTo(Order, { foreignKey: 'orderId' });

Product.hasMany(OrderDetails, { foreignKey: 'productId' });
OrderDetails.belongsTo(Product, { foreignKey: 'productId' });

module.exports = OrderDetails;
