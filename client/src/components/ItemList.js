import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Row } from "react-bootstrap";
import MenuItem from "./MenuItem";
import { Context } from "..";

const ItemList = observer(() => {
    const { item } = useContext(Context);

  return <Row className="d-flex">
    {item.items.map(item => 
    <MenuItem key={item.id} item={item}/>
    )}
  </Row>;
});

export default ItemList;
