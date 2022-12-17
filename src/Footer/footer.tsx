import React from "react";
import s from "../Footer/footer.module.css";
import Pagination from "../Content/CardContent/Paginator/paginator";
import {CardType} from "../Types/types";

type MapStateToPropsType = {
    currentPage: number,
    cardsPerPage: number,
    cards: Array<CardType>
}

type MapDispatchToPropsType = {
    setCurrentPage: (page: number) => void
}

type OwnPropsType = {}

type PropsType = MapStateToPropsType & MapDispatchToPropsType & OwnPropsType

const Footer:React.FC<PropsType> = ( {cardsPerPage, currentPage, cards, setCurrentPage}) => {

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <footer className={s.footer}>
      <div className={s.container}>
        <div className={s.content}>
          тел: +7(902)911-65-40
        </div>
          <Pagination cardsPerPage={cardsPerPage} totalCards={cards.length} currentPage={currentPage} paginate={paginate}/>
      </div>
    </footer>
  )
}



export default Footer;
