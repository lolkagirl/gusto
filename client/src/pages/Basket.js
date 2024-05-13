import React, { useContext, useEffect } from "react";
import { Context } from "..";
import { fetchUserOrder } from "../http/itemAPI";
import { Col, Container } from "react-bootstrap";
import UserOrderList from "../components/UserOrderList";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";

const Basket = observer(() => {
  const { order } = useContext(Context);
  const { id } = useParams();
console.log('id = ', id);

  useEffect(() => {
    fetchUserOrder(id).then((data) => {
      order.setUserOrder(data);
    });
  }, []);

  return (
    <Container className="mt-3">
      
      {order.userOrder ? (
        <>
        <h2>Вы выбрали:</h2>
      <Col md={9}>
        <UserOrderList />
        
      </Col>
        </>
      
      ):(
        <Container>
          Вы ещё ничего не выбрали
        </Container>
      )}
      
    </Container>
  );
});

export default Basket;