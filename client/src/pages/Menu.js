import React, { useContext, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import SideNav from "../components/SideNav";
import ItemList from "../components/ItemList";
import { observer } from "mobx-react-lite";
import { Context } from "..";
import { fetchItems } from "../http/itemAPI";
import Pages from "../components/Pages";

const Menu = observer(() => {
  const { item } = useContext(Context);
  useEffect(() => {
    fetchItems(null, 1, 2).then((data) => {
      item.setItems(data.rows);
      item.setTotalCount(data.count);
    });
  }, []);

  useEffect(() => {
    fetchItems(item.selectedCategory.name, item.page, 6).then((data) => {
      item.setItems(data.rows);
      item.setTotalCount(data.count);
    });
  }, [item.page, item.selectedCategory]);


  return (
    <Container>
      <Row className="mt-5">
        <Col md={3}>
          <SideNav />
        </Col>

        <Col md={9}>
          <ItemList />
          <Pages />
        </Col>
      </Row>
    </Container>
  );
});

export default Menu;
