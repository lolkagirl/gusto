import React, { useContext, useState } from "react";
import { Button, Dropdown, Form, Modal } from "react-bootstrap";
import { Context } from "../..";
import { observer } from "mobx-react-lite";
import { createItem } from "../../http/itemAPI";

const CreateItem = observer(({ show, onHide }) => {
  const { item } = useContext(Context);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  // const [category, setCategory] = useState(null);
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);

  const selectFile = (e) => {
    setFile(e.target.files[0]);
  };

  const addItem = () => {
    const formData = new FormData();
    formData.append("name_item", name);
    formData.append("category", item.selectedCategory.name);
    formData.append("photo", file);
    formData.append("description", desc);
    formData.append("price", `${price}`);
    // formData.append("username", "Groucho");

    console.log(formData);
    createItem(formData)
      .then((data) => {
        onHide()
        alert(`Блюдо ${name} успешно добавлено!`);

      })
      .catch((error) => {
        alert(error.response.data.message);
      });

    setDesc("");
    setName("");
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Добавить новое блюдо{" "}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Dropdown>
            <Dropdown.Toggle variant="warning">
              {item.selectedCategory.name || "Категория"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {item.categories.map((category) => (
                <Dropdown.Item
                  onClick={() => item.setSelectedCategory(category)}
                  key={category.id}
                >
                  {category.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Form.Control
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-3"
            placeholder="Название блюда"
          ></Form.Control>
          <Form.Control
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="mt-3"
            placeholder="Описание блюда"
          ></Form.Control>
          <Form.Control
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="mt-3"
            placeholder="Стоимость блюда"
            type="number"
          ></Form.Control>
          <Form.Control
            className="mt-3"
            type="file"
            onChange={selectFile}
          ></Form.Control>
          <hr />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>
          Закрыть
        </Button>
        <Button variant="outline-warning" onClick={addItem}>
          Добавить
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default CreateItem;
