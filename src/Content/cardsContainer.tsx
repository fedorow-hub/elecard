
import {connect} from 'react-redux';

import React from 'react';

import {compose} from 'redux';

import Preloader from '../Common/Preloader';
import {getIsFetching, getCards} from '../Redux/card-selector';
import {getCurrentPage, getCardsPerPage} from '../Redux/func-selector';
import {CardType} from '../Types/types';
import {AppStateType} from '../Redux/store';

import {deleteCardWithLocalStorage, setAllCards} from "../Redux/card-reducer";
import {setCurrentPage} from "../Redux/func-reducer";
import Cards from "./cards";
import Sidebar from "./Sidebar/sidebar";
import s from "./content.module.css";

type MapStateToPropsType = {
  isFetching: boolean
  cardsOnCategory: Array<CardType>
  currentPage: number
  cardsPerPage: number
}

type MapDispatchToPropsType = {
  setAllCards: () => void
  setCurrentPage: (page: number) => void
  deleteCardWithLocalStorage: (timestamp: number) => void
}

type OwnPropsType = {}

type PropsType = MapStateToPropsType & MapDispatchToPropsType & OwnPropsType

class CardsContainer extends React.Component<PropsType> {

  componentDidMount() {
    this.props.setAllCards();
  }

  render() {
    return <div className={s.main}>
      <div className={s.container}>
        <Sidebar/>
        {this.props.isFetching
          ? <Preloader/>
          : <Cards cards={this.props.cardsOnCategory}
                   currentPage={this.props.currentPage}
                   cardsPerPage={this.props.cardsPerPage}
                   setCurrentPage = {this.props.setCurrentPage}
                   deleteCard = {this.props.deleteCardWithLocalStorage}
          />}
      </div>
    </div>;
  }
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
  return{
    cardsOnCategory: getCards(state),
    isFetching: getIsFetching(state),
    currentPage: getCurrentPage(state),
    cardsPerPage: getCardsPerPage(state)
  };
};

export default compose(
  connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStateType>(mapStateToProps,
    {
      setAllCards, setCurrentPage, deleteCardWithLocalStorage
    })
)(CardsContainer);
