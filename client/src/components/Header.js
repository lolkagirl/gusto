import React from "react";

import { Button, Nav, Navbar, Container } from "react-bootstrap";
import logo from "../assets/logo.svg";
import basket from "../assets/basket.png";
import { useContext } from "react";
import { Context } from "..";
import { observer } from "mobx-react-lite";
import { NavLink, useNavigate } from "react-router-dom";

const Header = observer(() => {
  const { user } = useContext(Context);
  const navigate = useNavigate();
  const handleClickAdmin = () => navigate("/admin");
  const handleClickUser = () => navigate("/signin");
  const handleClickBasket = () => navigate("/order" + "/" + user.isUserId);

  const logOut = () => {
    user.setUser({});
    user.setIsAuth(false);
    user.setIsAdmin(false);
    user.setIsUserId(0);
  };
  return (
    <Navbar
      sticky="top"
      collapseOnSelect
      expand="md"
      bg="light"
      variant="light"
      className="nav-centered"
      style={{ opacity: 0.8 }}
    >
      <Container>
        <Navbar.Brand href="/">
          <img
            src={logo}
            width="130"
            className="d-inline-block align-top"
            alt="Logo"
          ></img>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          {/* марджин лефт авто (марджин старт) */}

          {user.isAuth ? (
            <Nav className="ms-auto ">
              <Nav.Link to="/"> Главная</Nav.Link>
              <Nav.Link to="/menu"> Меню</Nav.Link>
              <Nav.Link to="/contacts"> Контакты</Nav.Link>
              <Nav.Link to="/about"> О нас</Nav.Link>
              <Nav.Link onClick={handleClickBasket}> Корзина</Nav.Link>
              <Navbar.Brand>
                {" "}
                <img
                  src={basket}
                  width="30"
                  className="d-inline-block align-top"
                  alt="basket"
                  onClick={handleClickBasket}
                />
              </Navbar.Brand>
              {user.isAdmin && (
                <Button variant="warning" onClick={handleClickAdmin}>
                  Админ панель
                </Button>
              )}

              <Button variant="warning" className="ms-3" onClick={logOut}>
                Выйти
              </Button>
            </Nav>
          ) : (
            <Nav className="ms-auto ">
              <NavLink to="/"> Главная</NavLink>
              <NavLink to="/menu"> Меню</NavLink>
              <Nav.Link to="/contacts"> Контакты</Nav.Link>
              <Nav.Link to="/about"> О нас</Nav.Link>
              <Button variant="warning" onClick={handleClickUser}>
                Вход
              </Button>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
});
export default Header;
