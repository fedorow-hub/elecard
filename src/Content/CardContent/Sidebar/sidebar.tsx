import React from "react";
import s from "./sidebar.module.css"
import {compose} from "redux";
import {connect} from "react-redux";
import {AppStateType} from "../../../Redux/store";
import {
    recoveryCard,
    sortByCategory,
    sortByDate,
    sortByName,
    sortBySize, toggle
} from "../../../Redux/card-reducer";

type MapStateToPropsType = {}

type MapDispatchToPropsType = {
    sortByDate: () => void
    sortBySize: () => void
    sortByName: () => void
    sortByCategory: () => void
    recoveryCard: () => void
    toggle: () => void
}

type OwnPropsType = {}

type PropsType = MapStateToPropsType & MapDispatchToPropsType & OwnPropsType

const Sidebar: React.FC<PropsType> = ({sortByDate, sortBySize, recoveryCard, sortByName, sortByCategory, toggle}) => {

    function changeValue(e: React.ChangeEvent<HTMLInputElement>) {
        if(e.target.value === "1") {
            sortByDate();
            toggle();
        }
        if(e.target.value === "2") {
            sortBySize();
            toggle();
        }
        if(e.target.value === "3") {
            sortByName();
            toggle();
        }
        if(e.target.value === "4") {
            sortByCategory();
            toggle();
        }
    }

    const recovery = () => {
        recoveryCard()
    }

  return (
    <div className={s.sidebar}>
      <h3 className={s.title}>Сортировка</h3>
      <div className={s.selection}>
          <label className={s.label}>
              <input type="radio" name="radio" value="1"
                     onChange={changeValue} />
              по дате
          </label>
          <label className={s.label}>
              <input type="radio" name="radio" value="2"
                     onChange={changeValue} />
              по размеру файла
          </label>
          <label className={s.label}>
              <input type="radio" name="radio" value="3"
                     onChange={changeValue} />
              по имени файла
          </label>
          <label className={s.label}>
              <input type="radio" name="radio" value="4"
                     onChange={changeValue} />
              по категории
          </label>
      </div>
       <button onClick={recovery} className={s.button} >Восстановить удаленные карточки</button>
    </div>
  )
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return{

    };
};

export default compose(
    connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStateType>(mapStateToProps,
        {
            sortByDate,
            sortBySize,
            sortByName,
            sortByCategory,
            recoveryCard,
            toggle
        })
)(Sidebar);


