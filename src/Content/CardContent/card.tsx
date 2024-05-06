import React from "react";
import {CardType} from "../../Types/types";
import s from "./content.module.css";
import imageDel from "../../img/delete.svg"

type PropsType = {
  card: CardType
  deleteCard: (timestamp: number) => void
}

const convertToDate = (timeStamp: number) => {
  return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(timeStamp)
}

const Card: React.FC<PropsType> = ({card, deleteCard}) => {
    const tempDeleteCard = () => {
        deleteCard(card.timestamp)
    }

  return (
    <div className={s.card}>
      <div className={s.imageWrap}>
        <img className={s.image} src={`http://contest.elecard.ru/frontend_data/${card.image}`} alt="Картинка"/>
      </div>
      <button className={s.button} onClick={tempDeleteCard}>
        <img src={imageDel} alt="delete"/>
      </button>
      <div className={s.bodyInfo}>
          <div>
              Имя файла: {card.image.split('/').pop()}
          </div>
        <div>
          Размер файла: {card.filesize} байт
        </div>
        <div>
          Категория: {card.category}
        </div>
        <div>
          Дата и время: {convertToDate(card.timestamp)}
        </div>

      </div>
    </div>
  )
}

export default Card;
