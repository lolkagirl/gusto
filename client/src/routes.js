import About from "./pages/About";
import Admin from "./pages/Admin";
import Basket from "./pages/Basket";
import Contacts from "./pages/Contacts";
import Main from "./pages/Main";
import Auth from "./pages/Auth";
import ItemPage from "./pages/ItemPage";
import Menu from "./pages/Menu";
import Error from "./pages/Error";

export const adminRoutes = [
  {
    path: "/admin",
    Component: Admin,
  },
];

export const authRoutes = [
  {
    path: "/admin",
    Component: Admin,
  },
  {
    path: "/order" + "/:id",
    Component: Basket,
  },
  {
    path: "*",
    Component: Error,
  },
];

export const publicRoutes = [
  {
    path: "/contacts",
    Component: Contacts,
  },
  {
    path: "/admin",
    Component: Admin,
  },
  {
    path: "/menu",
    Component: Menu,
  },
  {
    path: "/about",
    Component: About,
  },
  {
    path: "/signup",
    Component: Auth,
  },
  {
    path: "/signin",
    Component: Auth,
  },

  {
    path: "/item" + "/:id",
    Component: ItemPage,
  },
  {
    path: "/",
    Component: Main,
  },
];
