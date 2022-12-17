import React from 'react';
import './App.module.css';
import Header from "../Header/header";
import Footer from "../Footer/footer";
import s from "./App.module.css";
import CardsContainer from "../Content/CardContent/cardsContainer";
import {compose} from "redux";
import {connect} from "react-redux";
import {AppStateType} from "../Redux/store";
import {getCardsPerPage, getCurrentPage, getIsCardsView} from "../Redux/func-selector";
import TreeViewContainer from "../Content/TreeViewContent/treeViewContainer";
import {setCurrentPage} from "../Redux/func-reducer";
import {getCards} from "../Redux/card-selector";
import {CardType} from "../Types/types";

type MapStateToPropsType = {
    isCardsView: boolean,
    currentPage: number,
    cardsPerPage: number,
    cardsOnCategory: Array<CardType>
}

type MapDispatchToPropsType = {
    setCurrentPage: (page: number) => void
}

type OwnPropsType = {}

type PropsType = MapStateToPropsType & MapDispatchToPropsType & OwnPropsType

const App: React.FC<PropsType> =({isCardsView, currentPage, cardsPerPage, cardsOnCategory, setCurrentPage}) => {
  return (
    <div className={s.wrapper}>
      <Header/>
      {isCardsView
          ?<CardsContainer/>
          :<TreeViewContainer/>
      }
      <Footer currentPage = {currentPage} cardsPerPage = {cardsPerPage} setCurrentPage = {setCurrentPage} cards = {cardsOnCategory}/>
    </div>
  );
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return{
        isCardsView: getIsCardsView(state),
        currentPage: getCurrentPage(state),
        cardsPerPage: getCardsPerPage(state),
        cardsOnCategory: getCards(state)
    };
};

export default compose(
    connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStateType>(mapStateToProps,
        {setCurrentPage}))(App);
