import { $authHost, $host } from ".";
import { jwtDecode } from "jwt-decode";

export const createItem = async (item) => {
  const { data } = await $authHost.post("api/item", item);
  return data;
};

export const fetchItems = async (category, page, limit = 6) => {
  const { data } = await $host.get("api/item", {
    params: {
      category,
      page,
      limit,
    },
  });
  return data;
};

export const fetchOneItem = async (id) => {
  const { data } = await $host.get("api/item/" + id);
  return data;
};

export const deleteItem = async (name) => {
  const { data } = await $authHost.delete("api/item", {
    params: { name_item: name },
  });
  return data;
};

// Функция для добавления товара в корзину
export const addToCart = async (itemData) => {
  const { data } = await $authHost.post("api/order/add-to-cart", itemData);
  return data;
};

export const fetchUserOrder = async (id) => {
  const { data } = await $host.get("api/order/" + id);
  return data;
};


export const fetchOrders = async () => {
  const { data } = await $authHost.get("api/order");
  return data;
};

export const updateStatus = async (status, userId) => {
  const { data } = await $authHost.post("api/order/status", {
    status: status,
    userId: userId
  });
  return data;
};

export const findOrderByStatus = async (status) => {
  const { data } = await $authHost.post("api/order/user-order", {
   status: status,
  });
  return data; 
};
