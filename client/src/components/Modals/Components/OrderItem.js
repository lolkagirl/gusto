import { values } from "mobx";
import React, { useState } from "react";
import { Button, Card, Col, Form, Image, Row, Stack } from "react-bootstrap";
import { updateStatus } from "../../../http/itemAPI";

const OrderItem = ({ order }) => {
  const [status, setStatus] = useState("");
  const [userId, setUserId] = useState(order.userId);

  const updateStatusOrder = () => {
    // const delName = name.name;
    updateStatus(status, order.userId)
      .then((data) => {
        setStatus(status);
        alert(`заказ пользователя с id: ${userId} успешно обновлён!`);
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
    console.log(status);
    console.log(userId);
  };
  return (
    // <Col md={4} onClick={handleClick}>
    <Row>
      <Stack
        style={{ width: 200, cursor: "pointer" }}
        className="mb-2 cardStyle"
      >
        {/* <Stack gap={3} className="col-md-5 mx-auto"> */}
        <Stack gap={3}>
          <div>Создан: {order.createdAt}</div>
          <div>Обновлён: {order.updatedAt} </div>
          <Stack direction="horizontal" gap={4}>
            <Form.Label>ID пользователя:</Form.Label>

            <Form.Control
              Col={3}
              type="text"
              readOnly
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
          </Stack>
          <div>ID заказа: {order.id} </div>
          <div>Сумма: {order.total}</div>
          <Stack direction="horizontal" gap={4}>
            <Form.Label>Статус:</Form.Label>
            <Form.Select
              defaultValue={order.status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="created">created</option>
              <option value="ready">ready</option>
              <option value="cancelled">cancelled</option>
            </Form.Select>{" "}
            <Button onClick={updateStatusOrder} variant="success">
              Обновить{" "}
            </Button>
          </Stack>
        </Stack>
      </Stack>
      <hr />
    </Row>
  );
};

export default OrderItem;
