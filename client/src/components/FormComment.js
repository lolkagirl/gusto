import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { addComment } from "../http/userAPI";

export const FormComment = () => {
  const [desc, setDesc] = useState("");

  const send = async () => {
    try {
      await addComment(desc);
      alert("Спасибо за отзыв, нам важно Ваше мнение🥰");
      setDesc("");
    } catch (e) {
      alert(e.response.data.message);
    }
  };
  return (
    <Container className="text-center mt-5">
      <h1>Связаться с нами</h1>

      <Form>
        <Form.Group
          as={Row}
          className="mb-3 ms-5 d-flex justify-content-center mt-3 pl-3 pr-3"
        >
          <Form.Label column sm="4" className="label">
            Привет, меня зовут
          </Form.Label>
          <Col sm="6">
            <Form.Control
              className="mt-3 ms-4 input"
              placeholder="Будем рады Вашему отзыву"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />{" "}
          </Col>
        </Form.Group>

        <Button className="mt-3 btnSend" variant="outline-light" onClick={send}>
          Отправить
        </Button>
      </Form>
    </Container>
  );
};
