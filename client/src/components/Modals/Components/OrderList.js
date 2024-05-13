import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Row, Stack } from "react-bootstrap";
import OrderItem from "./OrderItem";
import { Context } from "../../..";

const OrderList = observer(() => {
    const { order } = useContext(Context);

  return <Row className="d-flex">
    {order.orders.map(order => 
    <OrderItem key={order.id} order={order}/> 
    )}
  </Row>;
});

export default OrderList;
