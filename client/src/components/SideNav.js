import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "..";
import { ListGroup, ListGroupItem } from "react-bootstrap";

const SideNav = observer(() => {
  const { item } = useContext(Context);

  return (
    <ListGroup>
      {item.categories.map((category) => (
        <ListGroup.Item
          action
          variant="light"
          style={{ cursor: "pointer" }}
          active={category.id === item.selectedCategory.id}
          onClick={() => item.setSelectedCategory(category)}
          key={category.id} 
        >
          {category.name}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
});

export default SideNav;
