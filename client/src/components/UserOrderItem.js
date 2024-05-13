import React from "react";
import { Card, Col, Container, Image, Row, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const UserOrderItem = ({ order }) => {
  const navigate = useNavigate();
  const handleClick = () => navigate("/item" + "/" + order.id);

  return (
    <Stack direction="horizontal" className="m-3" gap={5} onClick={handleClick} >
      <Image
        width={220}
        height={270}
        src={"http://localhost:8080/" + order.photo}
        style={{cursor:'pointer'}}
      />
      <Stack gap={3} className="align-items-start justify-content-center">
        <h2>{order.name_item}</h2>
        <span>{order.price} руб.</span>
      </Stack>
    </Stack>
  );
};

export default UserOrderItem;
