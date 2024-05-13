import { makeAutoObservable } from "mobx";

export default class UserStore {
  constructor() {
    this._isAuth = false;
    this._isUserId = 0;
    this._isAdmin = false;
    this._user = {};
    makeAutoObservable(this);
  }

  setIsAuth(bool) {
    this._isAuth = bool;
  }
  setIsUserId(id) {
    this._isUserId = id;
  }
  setIsAdmin(bool) {
    this._isAdmin = bool;
  }
  setUser(user) {
    this._user = user;
  }

  get isAuth() {
    return this._isAuth;
  }
  get isUserId() {
    return this._isUserId;
  }
  get isAdmin() {
    return this._isAuth && this._isAdmin;
  }
  get user() {
    return this._user;
  }
}
