import React from "react";
import s from "./paginator.module.css"

type PropsType = {
  cardsPerPage: number,
  totalCards: number,
  paginate: (page: number) => void
}

const Paginator: React.FC<PropsType> = ({cardsPerPage, totalCards, paginate}) => {
  const pageNumbers = [];
  for(let i = 1; i<= (totalCards / cardsPerPage); i++) {
    pageNumbers.push(i)
  }

  return (
    <div>
      <ul className={s.list}>
        {
          pageNumbers.map(number => (
            <li className={s.item} key={number}>
              <a href="#" onClick={()=>paginate(number)}>
                {number}
              </a>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default Paginator;
