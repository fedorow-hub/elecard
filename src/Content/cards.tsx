import React from "react";

import {CardType} from '../Types/types';
import s from './content.module.css'
import Pagination from './Paginator/paginator'

import Card from './card';

type PropsType = {
  cards: Array<CardType>
  currentPage: number
  cardsPerPage: number
  setCurrentPage: (page: number) => void
}

const Cards: React.FC<PropsType> = ({cards, currentPage, cardsPerPage, setCurrentPage})  => {
  const lastCardIndex = currentPage * cardsPerPage;
  const firstCardIndex = lastCardIndex - cardsPerPage;
  const currentCards = cards.slice(firstCardIndex, lastCardIndex)


  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className={s.content}>
      <div className={s.cardBox}>
        {
          currentCards.map(u => <Card card={u} key={u.timestamp} />)
        }
      </div>
      <Pagination cardsPerPage={cardsPerPage} totalCards={cards.length} paginate={paginate}/>

    </div>
  )
}

export default Cards;


