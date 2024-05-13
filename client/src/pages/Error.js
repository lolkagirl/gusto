import React from "react";
import { Container, Row } from "react-bootstrap";

export default function Error() {
  return (
    <Container
      className="d-flex justify-content-center align-items-center flex-column"
      style={{ height: window.innerHeight - 15 }}
    >
      <h3>На нашем сайте нет страницы по указанному адресу🤷🏻‍♀️</h3>
      <div>Возможно, вам следует проверить адрес</div>
    </Container>
  );
}
