import React, { useContext, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { signin, signup } from "../http/userAPI";
import { observer } from "mobx-react-lite";
import { Context } from "../index";

const Auth = observer(() => {
  const { user } = useContext(Context);
  const location = useLocation();
  const navigate = useNavigate();

  const isLogin = location.pathname === "/signin";
  // const isAdmin = user.role === "ADMIN";

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [validated, setValidated] = useState(false);

  const click = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);

    try {
      let data;
      if (isLogin) {
        data = await signin(email, password);
        // user.setIsUserId(data.id)
        console.log(data.role);
        console.log(data.id);
      } else {
        data = await signup(username, email, password);
      }
      user.setUser(user);
      user.setIsUserId(data.id);
      user.setIsAuth(true);
      if (data.role === "ADMIN") {
        user.setIsAdmin(true);
      }
      navigate("/");
    } catch (e) {
      alert(e.response.data.message);
    }
    console.log(user.isAdmin);
    console.log(user.isAuth);
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: window.innerHeight - 54 }}
    >
      <Card style={{ width: 600 }} className="p-5">
        <h2 className="m-auto">{isLogin ? "Авторизация" : "Регистрация"}</h2>
        <Form
          className="d-flex flex-column"
          noValidate
          validated={validated}
          onSubmit={click}
        >
          {isLogin ? (
            ""
          ) : (
            <Form.Group md="4" controlId="validationCustom01">
              <Form.Control
                required
                className="mt-3"
                placeholder="name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
          )}
          <Form.Group md="4" controlId="validationCustom01">
            <Form.Control
              required
              className="mt-3"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />{" "}
          </Form.Group>
          <Form.Group md="4" controlId="validationCustom01">
            <Form.Control
              required
              className="mt-3"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />{" "}
          </Form.Group>

          <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
            {isLogin ? (
              <div>
                Нет аккаунта? <NavLink to="/signup">Зарегестрируйтесь!</NavLink>
              </div>
            ) : (
              <div>
                Есть аккаунт? <NavLink to="/signin">Войдите</NavLink>
              </div>
            )}
            <Button className="mt-3" variant="outline-warning" onClick={click}>
              {isLogin ? "Войти" : "Зарегестрироваться"}
            </Button>
          </Row>
        </Form>
      </Card>
    </Container>
  );
});

export default Auth;
