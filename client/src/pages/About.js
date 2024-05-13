import React from "react";
import ourHistoryImg from "../assets/ourHistory.jpg";
import aboutCoffeImg from "../assets/aboutCoffe.jpg";
import youAreImg from "../assets/youAre.jpg";
import "./CSS/about.css";
import { Image } from "react-bootstrap";

export default function About() {
  const data = [
    {
      img: ourHistoryImg,
      header: "Немного нашей истории",
      desc: "Мы открываем свою первую кофейню на улице Гоголя. Наша мечта - предлагать гостям качественный кофе по демократичной цене, в непринужденной и дружелюбной атмосфере. Стать островком спокойствия и уединения среди городского шума.",
    },
    {
      img: aboutCoffeImg,
      header: "Вы, самое ценное в нашей кофейни",
      desc: "Наша кофейня предлагает не только вкуснейшие кофе и десерты, но и место  досуга, где каждый посетитель, исходя из своих предпочтений, найдёт свой уголок. Мы всегда рады всем нашем гостям! Как говориться, от мала до велика.",
    },
    {
      img: youAreImg,
      header: "О кофе",
      desc: "Для нас кофе не просто продукт или товар, это целая экосистема, которая делает жизнь нас и наших гостей лучше.Качественные отборные кофейные зерна, пожаренные на современном оборудовании, не просто дают бодрость в течение дня, они еще и полезны для здоровья, потому что содержат много витаминов и антиоксидантов.Мы жарим зерно уже более двух лет. ",
    },
  ];
  return (
    <div className="content">
      {data.map((item, index) => (
        <div key={item.header} className="frame">
          {index === 1 ? (
            <>
              <div className="cardBody">
                <span className="cardTitle">{item.header}</span>
                <span className="cardText">{item.desc}</span>
              </div>
              {/* <Image width={300} height={400} src={item.img} alt={item.header} /> */}
              <img src={item.img} alt={item.header} className="photo" />
            </>
          ) : (
            <>
              <img src={item.img} alt={item.header} className="photo" />

              <div className="cardBody">
                <span className="cardTitle">{item.header}</span>
                <span className="cardText">{item.desc}</span>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
