import { makeAutoObservable } from "mobx";
export default class OrderStore {
  constructor() {
    this._orders = [];
    this._userOrder = [];

    makeAutoObservable(this);
  }

  setOrders(orders) {
    this._orders = orders;
  }

  setUserOrder(userOrder) {
    this._userOrder = userOrder;
  }

  get orders() {
    return this._orders;
  }
  
  get userOrder() {
    return this._userOrder;
  }
}
