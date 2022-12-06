import React from 'react';
import './App.module.css';
import Header from "../Header/header";
import Footer from "../Footer/footer";
import s from "./App.module.css";
import CardsContainer from "../Content/cardsContainer";
import {compose} from "redux";
import {connect} from "react-redux";
import {AppStateType} from "../Redux/store";
import {getIsCardsView} from "../Redux/func-selector";
import TreeViewContainer from "../Content/treeViewContainer";

type MapStateToPropsType = {
    isCardsView: boolean
}

type MapDispatchToPropsType = {

}

type OwnPropsType = {}

type PropsType = MapStateToPropsType & MapDispatchToPropsType & OwnPropsType

const App: React.FC<PropsType> =({isCardsView}) => {
  return (
    <div className={s.wrapper}>
      <Header/>
      {isCardsView
          ?<CardsContainer/>
          :<TreeViewContainer/>
      }
      <Footer/>
    </div>
  );
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return{
        isCardsView: getIsCardsView(state)
    };
};

export default compose(
    connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStateType>(mapStateToProps,
        {

        })
)(App);
