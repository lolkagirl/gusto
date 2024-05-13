import { makeAutoObservable } from "mobx";
export default class ItemStore {
  constructor() {
    this._categories = [
      {
        id: 1,
        name: "coffe",
      },
      { id: 2, name: "tea" },
      { id: 3, name: "dessert" },
    ];
    this._items = [];
    this._page = 1;
    this._totalCount = 0;
    this._limit = 6;

    this._selectedCategory = {};
    makeAutoObservable(this);
  }

  setItems(items) {
    this._items = items;
  }
  setСategories(categories) {
    this._categories = categories;
  }

  setSelectedCategory(category) {
    this.setPage(1)
    this._selectedCategory = category;
  }
  setPage(page) {
    this._page = page;
  }
  setTotalCount(count) {
    this._totalCount = count;
  }
  setLimit(limit) {
    this._limit = limit;
  }

 
  get items() {
    return this._items;
  }

  get categories() {
    return this._categories;
  }
  get selectedCategory() {
    return this._selectedCategory;
  }
  get page() {
    return this._page;
  }
  get totalCount() {
    return this._totalCount;
  }
  get limit() {
    return this._limit;
  }
}
