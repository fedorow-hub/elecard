import React, {useState} from "react";
import s from "./paginator.module.css"

type PropsType = {
  cardsPerPage: number,
  totalCards: number,
  paginate: (page: number) => void,
  currentPage: number
  portionSize?: number
}

const Paginator: React.FC<PropsType> = ({cardsPerPage, totalCards, currentPage, paginate, portionSize = 10}) => {
  const pageNumbers = [];
  for(let i = 1; i<= (totalCards / cardsPerPage); i++) {
    pageNumbers.push(i)
  }

  let pagesCount = Math.ceil(totalCards / cardsPerPage)

  let portionCount = Math.ceil(pagesCount / portionSize)
  let [portionNumber, setPortionNumber] = useState(1)
  let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
  let rightPortionPageNumber = portionNumber * portionSize

  return (
    <div className={s.paginator}>
      {portionNumber > 1 &&
      <button onClick={()=>setPortionNumber(portionNumber - 1)} className={s.button}>Предыдущие</button>}
      <ul className={s.list}>
        {
          pageNumbers.filter(number => number >= leftPortionPageNumber && number <= rightPortionPageNumber)
              .map(number => (
            <li className={currentPage === number? s.selectedPage: s.item} key={number}>
              <button onClick={()=>paginate(number)}>
                {number}
              </button>
            </li>
          ))
        }
      </ul>
      {portionCount > portionNumber &&
      <button onClick={() => setPortionNumber(portionNumber + 1)} className={s.button}>Следующие</button>}
    </div>
  )
}

export default Paginator;
