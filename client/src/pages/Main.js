import React from "react";
import { Button, Container, Image, Stack } from "react-bootstrap";
import backgroundImg from "../assets/background.jpg";
import "./CSS/main.css";

const Main = () => {
  return (
    <Stack className="position-relative" >
      {/* <Container> */}
      <Image style={{ opacity: 0.7 }} src={backgroundImg} fluid></Image>
      <Container style={{ position: "absolute" }}>
        <div class="text">
          <p class="name">Gusto</p>
          <p class="hellotext">
            Мы рады приветствовать <br /> Вас на сайте нашей кофейни!
          </p>
          <Button href="/menu" variant="outline-warning" className="button">
            Меню
          </Button>
        </div>
      </Container>
    </Stack>
    // </Container>
  );
};

export default Main;
