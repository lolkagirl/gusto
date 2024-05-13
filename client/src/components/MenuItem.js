import React from "react";
import { Card, Col, Image, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../pages/CSS/card.css";

const MenuItem = ({ item }) => {
  const navigate = useNavigate();
  const handleClick = () => navigate("/item" + "/" + item.id);
  return (
    <Col md={4} onClick={handleClick}>
      <Card
        style={{ width: 220, height: 385, cursor: "pointer" }}
        className="mb-5 cardStyle"
      >
        <Image
          width={220}
          height={270}
          src={"http://localhost:8080/" + item.photo}
        />
        <Stack gap={3} className="col-md-5 mx-auto">
          <div className="nameItem">{item.name_item}</div>
          <div>
            <div className="priceItem">{item.price} руб.</div>
          </div>
        </Stack>
      </Card>
    </Col>
  );
};

export default MenuItem;
