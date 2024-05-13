import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import CreateItem from "../components/Modals/CreateItem";
import "../pages/CSS/admin.css";
import DeleteItem from "../components/Modals/DeleteItem";
import AllOrders from "../components/Modals/AllOrders";

const Admin = () => {
  const [itemVisible, setItemVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [ordersVisible, setOrdersVisible] = useState(false);
  return (
    <Container className="d-flex flex-column bd-highlight">
      <Button
        variant={"outline-secondary"}
        className="mt-4"
        onClick={() => setItemVisible(true)}
      >
        Добавить новое блюдо
      </Button>
      {/* <Button variant={"outline-secondary"} className="mt-4">
        Изменить блюдо
      </Button> */}
      <Button
        variant={"outline-secondary"}
        className="mt-4"
        onClick={() => setDeleteVisible(true)}
      >
        Удалить блюдо
      </Button>
      <Button
        variant={"outline-secondary"}
        className="mt-4"
        onClick={() => setOrdersVisible(true)}
      >
        Заказы
      </Button>
      <CreateItem show={itemVisible} onHide={() => setItemVisible(false)} />
      <DeleteItem show={deleteVisible} onHide={() => setDeleteVisible(false)} />
      <AllOrders show={ordersVisible} onHide={() => setOrdersVisible(false)} />
    </Container>
  );
};

export default Admin;
