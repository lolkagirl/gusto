const { Item, Order, ItemOrder } = require("../models/models");
const uuid = require("uuid");
const path = require("path");
const ApiError = require("../error/ApiError");
const { where, Op } = require("sequelize");
const jwt = require("jsonwebtoken");

class ItemController {
  async create(req, res, next) {
    try {
      const { name_item, category, description, price } = req.body;
      const { photo } = req.files;
      let fileName = uuid.v4() + ".jpg";
      photo.mv(path.resolve(__dirname, "..", "static", fileName));

      const item = await Item.create({
        name_item,
        category,
        description,
        price,
        photo: fileName,
      });

      return res.json({ message: `Блюдо ${name_item} успешно добавлено` });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res) {
    let { name_item, category, limit, page } = req.query;
    page = page || 1;
    limit = limit || 9;
    let offset = page * limit - limit;
    let items;
    if (!name_item & !category) {
      items = await Item.findAndCountAll({ limit, offset });
    }
    if (name_item && !category) {
      items = await Item.findAndCountAll({
        where: { name_item },
        limit,
        offset,
      });
    }
    if (!name_item && category) {
      items = await Item.findAndCountAll({
        where: { category },
        limit,
        offset,
      });
    }
    if (name_item && category) {
      items = await Item.findAndCountAll({
        where: { name_item, category },
        limit,
        offset,
      });
    }
    return res.json(items);
  }

  async getOne(req, res) {
    const { id } = req.params;
    const item = await Item.findOne({ where: { id } });
    return res.json(item);
  }

  async deleteItem(req, res, next) {
    try {
      const { name_item } = req.query;
      const candidateItem = await Item.findOne({ where: { name_item } });
      if (!candidateItem) {
        return next(ApiError.notFound(`Блюдо ${name_item} не найдено`));
      }
      console.log(candidateItem);
      if (!name_item) {
        return next(ApiError.badRequest("Параметр не указан"));
      }

      await Item.destroy({ where: { name_item } });
      return res.json({ message: `Блюдо ${name_item} успешно удалено` });
    } catch (error) {
      next(ApiError.internal("Произошла ошибка при удалении блюда"));
    }
  }

  async addToCart(req, res, next) {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    // console.log(decoded.id);
    try {
      const { item_id } = req.body;
      const order = await Order.findOne({
        where: { userId: decoded.id, status: "created" },
      });

      if (!order) {
        const newOrder = await Order.create({
          userId: decoded.id,
          total: 0,
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
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    // req.user = decoded;
    const userId = decoded.id;
    const orderUser = await Order.findOne({ where: { userId: userId } });
    const itemsInOrder = await ItemOrder.findAll({
      attributes: ["itemId"],
      where: { orderId: orderUser.id },
    });
    console.log(itemsInOrder);
    // console.log(itemsInOrder);
    // console.log(itemsInOrder);

    let itemIds = itemsInOrder.map((item) => item.itemId);
    console.log(itemIds);

    let items;

    try {
      if (decoded.id) {
        items = await Item.findAll({
          // where: { id: { [Op.in]: [1, 7, 15, 5, 8, 2, 3, 6] }},
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
}

module.exports = new ItemController();
