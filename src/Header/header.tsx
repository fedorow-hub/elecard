import React from "react";
import s from "./header.module.css";
import logo from "./../img/Beats_by_Dr_Dre_logo-1.svg";


const Header = () => {
  return (
    <div className={s.header}>
      <div className={s.container}>
        <img className={s.logo} src={logo} alt="logo"/>
        <div>
          <label className={s.label}>
            Карточки
            <input type="radio" name="view" checked/>
          </label>
          <label className={s.label}>
            Древовидный список
            <input type="radio" name="view" checked/>
          </label>
        </div>

      </div>
    </div>
  )
}

export default Header;
