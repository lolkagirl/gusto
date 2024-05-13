const { Item, Order, ItemOrder } = require("../models/models");
const uuid = require("uuid");
const path = require("path");
const ApiError = require("../error/ApiError");
const { where, Op } = require("sequelize");
const jwt = require("jsonwebtoken");

class OrderController {
  async addToCart(req, res, next) {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    try {
      const { item_id } = req.body;
      const order = await Order.findOne({
        where: { userId: decoded.id },
      });

      if (!order) {
        const newOrder = await Order.create({
          userId: decoded.id,
          total: Item.sum("price"),
          status: "created",
        });
        await ItemOrder.create({ itemId: item_id, orderId: newOrder.id });
        return res.json({ message: "Товар успешно добавлен в корзину" });
      } else {
        const itemOrder = await ItemOrder.findOne({
          where: { itemId: item_id, orderId: order.id },
        });
        if (itemOrder) {
          return next(ApiError.badRequest("Товар уже добавлен в корзину"));
        } else {
          await ItemOrder.create({ itemId: item_id, orderId: order.id });
          return res.json({ message: "Товар успешно добавлен в корзину" });
        }
      }
    } catch (error) {
      next(
        ApiError.internal("Произошла ошибка при добавлении товара в корзину")
      );
    }
  }

  async getItemsFromBasket(req, res, next) {
    // const token = req.headers.authorization.split(" ")[1];
    // const decoded = jwt.verify(token, process.env.SECRET_KEY);
    // const userId = decoded.id;
    const { id } = req.params;

    const orderUser = await Order.findOne({ where: { userId: id } });

    const itemsInOrder = await ItemOrder.findAll({
      attributes: ["itemId"],
      where: { orderId: orderUser.id },
    });

    let itemIds = itemsInOrder.map((item) => item.itemId);

    let items;

    try {
      if (id) {
        items = await Item.findAll({
          where: { id: { [Op.in]: itemIds } },
        });
      }
    } catch (error) {
      return next(ApiError.badRequest("Заказ пользователя не найден"));
    }

    return res.json(items);
  }

  async getAllOrders(req, res) {
    let orders;
    orders = await Order.findAll();

    return res.json(orders);
  }

  async getOneOrder(req, res, next) {
    const { status } = req.body;
    try {
      let orders;
      if (!status) {
        next(ApiError.badRequest("Укажите статус заказа"));
      } else {
        orders = await Order.findAll({ where: { status: status } });
      }
      if (orders.length === 0) {
        return res
          .status(404)
          .json({ message: "Заказы с указанным статусом не найдены" });
      }

      return res.json(orders);
    } catch (e) {
      next(ApiError.internal("Ошибка поиска заказов"));
    }
  }

  async updateStatus(req, res, next) {
    try {
      const { status, userId } = req.body;

      const newStatus = await Order.update(
        { status: status },
        { where: { userId: userId } }
      );

      return res.json(newStatus);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new OrderController();
