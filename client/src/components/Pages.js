import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "..";
import { Pagination } from "react-bootstrap";
import './CSS/pages.css'

const Pages = observer(() => {
  const { item } = useContext(Context);
  const pageCount = Math.ceil(item.totalCount / item.limit);
  // console.log(pageCount);
  // console.log(item.totalCount);
  // console.log(item.limit);
  const pages = [];

  for (let i = 0; i < pageCount; i++) {
    pages.push(i + 1);
  }

  return (
    <Pagination className="mt-5">
      {pages.map((page) => (
        <Pagination.Item
          key={page}
          active={item.page === page}
          onClick={() => item.setPage(page)}
        >
          {page}
        </Pagination.Item>
      ))}
    </Pagination>
  );
});

export default Pages;
