import React from "react";
import s from "./header.module.css";
import logo from "./../img/Beats_by_Dr_Dre_logo-1.svg";
import {compose} from "redux";
import {connect} from "react-redux";
import {AppStateType} from "../Redux/store";
import {setIsCardsView} from "../Redux/func-reducer";

type MapStateToPropsType = {}

type MapDispatchToPropsType = {
  setIsCardsView: (isCardsView: boolean) => void
}

type OwnPropsType = {}

type PropsType = MapStateToPropsType & MapDispatchToPropsType & OwnPropsType

const Header: React.FC<PropsType> = ({setIsCardsView}) => {

  function changeValue(e: any) {
    if(e.target.value === "1") {
      setIsCardsView(true);
    }
    if(e.target.value === "2") {
      setIsCardsView(false);
    }
  }

  return (
    <header className={s.header}>
      <div className={s.container}>
        <img className={s.logo} src={logo} alt="logo"/>
        <div>
          <label className={s.label}>
            <input type="radio" name="radio" value="1"
                   className={"visually-hidden " + s.input}
                   onChange={changeValue} />
            <span></span>
            Карточки
          </label>
          <label className={s.label}>
            <input type="radio" name="radio" value="2"
                   className={"visually-hidden " + s.input}
                   onChange={changeValue} />
            <span></span>
            Древовидный список
          </label>
        </div>
      </div>
    </header>
  )
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
  return{
  };
};

export default compose(
    connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStateType>(mapStateToProps,
        {
          setIsCardsView
        })
)(Header);
