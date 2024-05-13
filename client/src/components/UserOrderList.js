import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Row } from "react-bootstrap";
import UserOrderItem from "./UserOrderItem";
import { Context } from "..";

const UserOrderList = observer(() => {
  const { order } = useContext(Context);

  return (
    <Row className="d-flex">
      {order.userOrder.map((order) => (
        <UserOrderItem key={order.id} order={order} />
      ))}
      Итого: {order.total}
    </Row>
  );
});

export default UserOrderList;
