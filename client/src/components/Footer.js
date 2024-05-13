import React from "react";
import telegram from "../assets/free-icon-telegram.png";
import time from "../assets/free-icon-time.png";
import vk from "../assets/free-icon-vk.png";
import '../pages/CSS/footer.css'

export const Footer = () => {
  return (
    <>
      <div class="footer">
        <div class="contact">
          <p class="footer-text">Следи за последними новостями тут</p>
          <div class="socialnet">
            <a href="https://web.telegram.org/">
              <img class="icon" src={telegram} alt="telegram" />
            </a>
            <a href="https://vk.com/">
              <img class="icon" src={vk} alt="vk" />
            </a>
          </div>
        </div>
        <div class="number">
          <p class="footer-text">
            Телефон для справок: <br /> 8 (910) 094 21 33
          </p>
        </div>
        <div class="time">
          <img class="icon" src={time} alt="time" />
          <p class="footer-text">
            ПН - ВС <br /> 9:00 - 21:00
          </p>
        </div>
      </div>
    </>
  );
};
