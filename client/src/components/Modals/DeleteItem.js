import React, { useContext, useEffect, useState } from "react";
import { Button, Dropdown, Form, Modal, Stack } from "react-bootstrap";
import { Context } from "../..";
import { observer } from "mobx-react-lite";
import { deleteItem, fetchItems } from "../../http/itemAPI";

const DeleteItem = observer(({ show, onHide }) => {
  const { item } = useContext(Context);
  const [name, setName] = useState("");
  const [nameItem, setNameItem] = useState("");
  useEffect(() => {
    fetchItems(null, null, 1000).then((data) => {
      item.setItems(data.rows);
      item.setTotalCount(data.count);
    });
  }, []);

  const removeItemWithName = () => {
    deleteItem(name)
      .then((data) => {
        setName("");
        onHide();
        alert(`Блюдо ${nameItem} успешно удалёно!`);
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
    console.log(name);
  };

  const removeItem = () => {
    deleteItem(nameItem)
      .then((data) => {
        setName("");
        alert(`Блюдо ${nameItem} успешно удалёно!`);
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
    console.log(name);
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Удалить блюдо{" "}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Stack direction="horizontal" gap={5}>
          <Form className="col-sm-10">
            <Form.Control
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-3"
              placeholder="Название блюда"
            ></Form.Control>
          </Form>
          <Button variant="outline-danger" onClick={removeItemWithName}>
            Удалить
          </Button>
        </Stack>
        <hr />
        <Stack direction="horizontal" gap={5}>

        <Form.Select
          defaultValue="Блюдо"
          onChange={(e) => setNameItem(e.target.value)}
        >
          {item.items.map((item) => (
            <option key={item.id}>{item.name_item}</option>
          ))}
        </Form.Select>{" "}
        <Button variant="outline-danger" onClick={removeItem}>
          Удалить
        </Button>
        </Stack>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-warning" onClick={onHide}>
          Закрыть
        </Button>

        
      </Modal.Footer>
    </Modal>
  );
});

export default DeleteItem;
