import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { authRoutes, publicRoutes } from "../routes";
import Main from "../pages/Main";
import { Context } from "..";

const AppRouter = () => {
  const { user } = useContext(Context);

  return (
    // <BrowserRouter>
      <Routes>
        {user.isAuth &&
          authRoutes.map(({ path, Component }) => (
            <Route key={path} exact path={path} element={<Component />} />
          ))}
        {publicRoutes.map(({ path, Component }) => (
          <Route key={path} exact path={path} element={<Component />} />
        ))}
        <Route path="/" element={<Main />} />
      </Routes>
    // </BrowserRouter>
  );
};

export default AppRouter;