const sequelize = require("../db");
const { DataType, DataTypes } = require("sequelize");

const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  username: { type: DataTypes.STRING, unique: true },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: "USER" },
});

const ItemOrder = sequelize.define("item_order", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const Order = sequelize.define("order", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  time: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  total: { type: DataTypes.DECIMAL(20, 2), defaultValue: 0 },
  status: {
    type: DataTypes.ENUM("created", "ready", "cancelled"), defaultValue: "created"
  },
});


// // Хук жизненного цикла для пересчета суммы при создании или обновлении заказа
// Order.addHook("beforeSave", async (order) => {  
//   if (order.changed("total") || order.isNewRecord) {
//     const items = await order.getItems(); // Получаем все товары в заказе
//     let total = 0;
//     items.forEach((item) => {
//       total += item.price; // Предположим, что у товара есть поле price
//     });
//     order.total = total;
//   }
// });



const Item = sequelize.define("item", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name_item: { type: DataTypes.STRING, unique: true, allowNull: false },
  category: {
    type: DataTypes.ENUM("coffe", "tea", "dessert"),
    allowNull: false,
  },
  photo: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.DECIMAL(20, 2), allowNull: false },
});

const Feedback = sequelize.define("feedback", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  description: { type: DataTypes.STRING, allowNull: false },
});

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(Feedback);
Feedback.belongsTo(User);

Item.hasOne(ItemOrder);
ItemOrder.belongsTo(Item);

// Item.hasMany(Feedback);
// Feedback.belongsTo(Item);

Order.hasOne(ItemOrder);
ItemOrder.belongsTo(Order);

module.exports = {
  User,
  Item,
  ItemOrder,
  Order,
  Feedback,
};


