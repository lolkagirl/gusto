import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Dropdown, Form, Modal, Row } from "react-bootstrap";
import { Context } from "../..";
import { observer } from "mobx-react-lite";
import { fetchOrders, findOrderByStatus, updateStatus } from "../../http/itemAPI";
import OrderList from "./Components/OrderList";
import { Search } from "react-bootstrap-icons";
import OrderItem from "./Components/OrderItem";

const AllOrders = observer(({ show, onHide }) => {
  const { order } = useContext(Context);
  const [status, setStatus] = useState();
  const [foundOrders, setFoundOrders] = useState([]);
  useEffect(() => {
    fetchOrders()
      .then((data) => {
        order.setOrders(data);
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  }, []);

  const findOrder = () => {
    findOrderByStatus(status)
      .then((data) => {
        // order.setOrders(data);
        setFoundOrders(data);
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
    console.log(status);
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered scrollable>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Список заказов
        </Modal.Title>
        <Form inline className="ms-5">
          <Row>
            <Col xs="auto">
              <Form.Control
                type="text"
                placeholder="Поиск по статусу заказа"
                className=" mr-sm-2"
                onChange={(e) => setStatus(e.target.value)}
              />
            </Col>

            <Col xs="auto">
              <Search cursor="pointer" onClick={findOrder} />
            </Col>
          </Row>
        </Form>
      </Modal.Header>
      <Modal.Body>
      {/* {order.orders.map(order => 
    <OrderItem key={order.id} order={order}/> 
    )} */}
{foundOrders.length > 0 && (
    <div>
        <h2>Заказы со статусом {status}:</h2>
        <ul>
            {foundOrders.map((order) => (
                // <li key={order.id}>{order.name}</li>
                <OrderItem key={order.id} order={order}/> 

            ))}
        </ul>
    </div>
)}
        <Col md={9}>
          <OrderList />
        </Col>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-warning" onClick={onHide}>
          Закрыть
        </Button>
        {/* <Button variant="outline-danger">Обновить</Button> */}
      </Modal.Footer>
    </Modal>
  );
});

export default AllOrders;
