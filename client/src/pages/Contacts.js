import React from "react";
import { FormComment } from "../components/FormComment";
import polina from "../assets/polina.jpg";
import marat from "../assets/marat.jpg";
import victor from "../assets/victor.jpg";
import { Image, Row, Stack } from "react-bootstrap";
import "./CSS/Contacts.css";


const Contacts = () => {
  return (
  <>
<FormComment/>
<Stack className="m-5 p-5" gap={5}>
        <h2>Наша команда</h2>
        <Row className="d-flex flex-nowrap p-2">
          <Stack className="Marat">
            <Image
             src={marat} alt="" width={205} height={205} roundedCircle />
            <p className="nameStuff">Марат</p>
            <p className="job">Главный бариста</p>
          </Stack>
          <Stack className="Polina">
            <Image src={polina} alt="" width={205} height={205} roundedCircle />
            <p className="nameStuff">Полина</p>
            <p className="job">Менеджер</p>
          </Stack>
          <Stack className="Victor">
            <Image src={victor} alt="" width={205} height={205} roundedCircle />
            <p className="nameStuff">Виктор</p>
            <p className="job">Бухгалтер</p>
          </Stack>
        </Row>
      </Stack>

      <Stack>
        <div className="contact-info">
          <div className="iadress">
            <a href="https://yandex.ru/maps/239/sochi/house/ulitsa_gogolya_11/Z0AYfwZjSUYAQFppfXhydnpmYQ==/?ll=39.913038%2C43.437655&z=16">
              Россия, Сочи, <br />
              ул. Гоголя, 11
            </a>
          </div>
          <div className="iphone">
            <a href="tel:+89100942133">8 (910) 094 21 33</a>
            <a href="tel:+89157700765">8 (915) 770 07 65</a>
          </div>
          <div className="iwork">
            {/* <span className="text">Сотрудничать с нами</span> */}
            <a href="mailto:gustofriend@gmail.com?subject=Предложение о сотрудничестве&body=Привет, у меня есть интересное предложение!">
              gustofriend@gmail.com
            </a>
          </div>
          <div className="iemail">
            {/* <span className="text">Работать у нас</span> */}
            <a href="mailto:gustojob@gmail.com?subject=Хочу у вас работать">
              gustojob@gmail.com
            </a>
          </div>
        </div>
      </Stack>
  </>
  );
};

export default Contacts;
