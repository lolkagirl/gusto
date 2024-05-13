import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Image,
  Row,
  Stack,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import { addToCart, fetchOneItem } from "../http/itemAPI";
import { observer } from "mobx-react-lite";
import { Context } from "..";

const ItemPage = observer(() => {
  const { user } = useContext(Context);

  const [item, setItem] = useState({ item: [] });
  const { id } = useParams();
  useEffect(() => {
    fetchOneItem(id).then((data) => setItem(data));
  }, []);



  const createCart = (item) => {
    addToCart({
      item_id: id,
    })
      .then((data) => {
        alert("Товар добавлен в корзину!");
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
    console.log(id);
  };

  return (
    <Container className="mt-4 mb-5">
      <Row>
        <Col md={6}>
          <Image
            width={300}
            height={400}
            src={"http://localhost:8080/" + item.photo}
            rounded
          />
        </Col>
        <Col md={3}>
          <Row>
            <h2>{item.name_item}</h2>
            <div>{item.description}</div>
          </Row>
        </Col>
        <Col md={3}>
          <Stack
            className="d-flex flex colomn align-items-center justify-content-center"
            style={{ width: 300, height: 400, fontSize: 32 }}
          >
            <h3>{item.price} руб.</h3>
            <Button variant={"warning"} onClick={createCart}>
              Добавить в корзину
            </Button>
          </Stack>
        </Col>
      </Row>
    </Container>
  );
});

export default ItemPage;
